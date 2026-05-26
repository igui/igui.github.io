import asyncio
import json
import logging
from functools import cache
from pathlib import Path

from jinja2 import Environment, FileSystemLoader
from livekit.agents import (
    Agent,
    AgentServer,
    AgentSession,
    APIError,
    JobContext,
    JobProcess,
    cli,
    inference,
    room_io,
)
from livekit.plugins import ai_coustics, silero
from livekit.plugins.turn_detector.multilingual import MultilingualModel
from livekit.plugins import anam  # noqa: F401
from os import environ  # noqa: F401

logger = logging.getLogger("agent")

@cache
def load_instructions() -> str:
    """Load profile.json and render the Jinja2 system prompt. Cached after first call."""
    src_dir = Path(__file__).parent
    with open(src_dir / "profile.json", encoding="utf-8") as f:
        profile = json.load(f)
    jinja_env = Environment(loader=FileSystemLoader(str(src_dir)), autoescape=False)
    template = jinja_env.get_template("system-prompt.jinja")
    return template.render(profile=profile)


class Assistant(Agent):
    def __init__(self, instructions: str) -> None:
        super().__init__(
            # A Large Language Model (LLM) is your agent's brain, processing user input and generating a response
            # See all available models at https://docs.livekit.io/agents/models/llm/
            llm=inference.LLM(model="openai/gpt-5.2-chat-latest"),
            # To use a realtime model instead of a voice pipeline, replace the LLM
            # with a RealtimeModel and remove the STT/TTS from the AgentSession
            # (Note: This is for the OpenAI Realtime API. For other providers, see https://docs.livekit.io/agents/models/realtime/)
            # 1. Install livekit-agents[openai]
            # 2. Set OPENAI_API_KEY in .env.local
            # 3. Add `from livekit.plugins import openai` to the top of this file
            # 4. Replace the llm argument with:
            #     llm=openai.realtime.RealtimeModel(voice="marin")
            instructions=instructions,
        )

    # To add tools, use the @function_tool decorator.
    # Here's an example that adds a simple weather tool.
    # You also have to add `from livekit.agents import function_tool, RunContext` to the top of this file
    # @function_tool
    # async def lookup_weather(self, context: RunContext, location: str):
    #     """Use this tool to look up current weather information in the given location.
    #
    #     If the location is not supported by the weather service, the tool will indicate this. You must tell the user the location's weather is unavailable.
    #
    #     Args:
    #         location: The location to look up weather information for (e.g. city name)
    #     """
    #
    #     logger.info(f"Looking up weather for {location}")
    #
    #     return "sunny with a temperature of 70 degrees."


server = AgentServer()


def prewarm(proc: JobProcess):
    proc.userdata["vad"] = silero.VAD.load()
    proc.userdata["instructions"] = load_instructions()


server.setup_fnc = prewarm


@server.rtc_session(agent_name="ignacio_website_agent")
async def main_entrypoint(ctx: JobContext):
    # Logging setup
    # Add any other context you want in all log entries here
    ctx.log_context_fields = {
        "room": ctx.room.name,
    }

    # Set up a voice AI pipeline using OpenAI, Cartesia, Deepgram, and the LiveKit turn detector
    session = AgentSession(
        # Speech-to-text (STT) is your agent's ears, turning the user's speech into text that the LLM can understand
        # See all available models at https://docs.livekit.io/agents/models/stt/
        stt=inference.STT(model="deepgram/nova-3", language="multi"),
        # Text-to-speech (TTS) is your agent's voice, turning the LLM's text into speech that the user can hear
        # See all available models as well as voice selections at https://docs.livekit.io/agents/models/tts/
        tts=inference.TTS(
            model="cartesia/sonic-3", voice="9626c31c-bec5-4cca-baa8-f8ba9e84c8bc"
        ),
        # VAD and turn detection are used to determine when the user is speaking and when the agent should respond
        # See more at https://docs.livekit.io/agents/build/turns
        turn_detection=MultilingualModel(),
        vad=ctx.proc.userdata["vad"],
        # allow the LLM to generate a response while waiting for the end of turn
        # See more at https://docs.livekit.io/agents/build/audio/#preemptive-generation
        preemptive_generation=True,
    )

    logger.info("Ommiting avatar start")

    # Start the session, which initializes the voice pipeline and warms up the models
    await session.start(
        agent=Assistant(instructions=ctx.proc.userdata["instructions"]),
        room=ctx.room,
        room_options=room_io.RoomOptions(
            audio_input=room_io.AudioInputOptions(
                noise_cancellation=ai_coustics.audio_enhancement(
                    model=ai_coustics.EnhancerModel.QUAIL_VF_S
                ),
            ),
        ),
    )

    avatar = anam.AvatarSession(
        api_key=environ["ANAM_API_KEY"],
        persona_config=anam.PersonaConfig(
            name="Liv",
            avatarId="071b0286-4cce-4808-bee2-e642f1062de3", 
        ),
    )
    
    logger.info("Starting avatar")
    # FIXME: uncomment later
    # try:
    #     await avatar.start(session, room=ctx.room)
    # except APIError as e:
    #     logger.error("Failed to start avatar: %s", e)
    #     logger.info("Continuing without avatar")
    #     pass
    logger.info("Avatar started")

    @ctx.room.on("connected")
    def _on_room_connected():
        # Send an image file to the frontend once the room is connected
        logger.info("Room connected, sending image")
        task = asyncio.ensure_future(
            ctx.room.local_participant.send_file(
                file_path="assets/liv_home.png",
                topic="agent-images",
            )
        )
        task.add_done_callback(
            lambda t: logger.warning("Failed to send image: %s", t.exception())
            if t.exception()
            else None
        )

    # Join the room and connect to the user
    await ctx.connect()

    # Enforce a 5-minute session limit
    await asyncio.sleep(5 * 60)
    logger.info("Session time limit reached, shutting down")
    await session.shutdown()


if __name__ == "__main__":
    cli.run_app(server)
