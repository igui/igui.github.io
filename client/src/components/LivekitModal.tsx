import { useMemo, useEffect, useRef } from 'react';
import { TokenSource } from 'livekit-client';
import { AnimatePresence, motion } from 'motion/react';
import { useSession, useSessionContext } from '@livekit/components-react';
import { WarningIcon } from '@phosphor-icons/react';
import { AgentSessionProvider } from '@/components/livekit/agents-ui/agent-session-provider';
import { StartAudioButton } from '@/components/livekit/agents-ui/start-audio-button';
import { AgentSessionView_01 } from '@/components/livekit/agents-ui/blocks/agent-session-view-01';
import { useAgentErrors } from '@/hooks/livekit/useAgentErrors';
import { useDebugMode } from '@/hooks/livekit/useDebug';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { Mic } from 'lucide-react';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

const IN_DEVELOPMENT = import.meta.env.DEV;

const VIEW_MOTION_PROPS = {
  variants: {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  },
  initial: 'hidden' as const,
  animate: 'visible' as const,
  exit: 'hidden' as const,
  transition: { duration: 0.5, ease: 'linear' as const },
};

function WelcomeView({ onStartCall }: { onStartCall: () => void }) {
  return (
    <motion.div {...VIEW_MOTION_PROPS} key="welcome" className="flex flex-col items-center justify-center gap-6 py-8">
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-foreground size-16"
      >
        <path
          d="M15 24V40C15 40.7957 14.6839 41.5587 14.1213 42.1213C13.5587 42.6839 12.7956 43 12 43C11.2044 43 10.4413 42.6839 9.87868 42.1213C9.31607 41.5587 9 40.7957 9 40V24C9 23.2044 9.31607 22.4413 9.87868 21.8787C10.4413 21.3161 11.2044 21 12 21C12.7956 21 13.5587 21.3161 14.1213 21.8787C14.6839 22.4413 15 23.2044 15 24ZM22 5C21.2044 5 20.4413 5.31607 19.8787 5.87868C19.3161 6.44129 19 7.20435 19 8V56C19 56.7957 19.3161 57.5587 19.8787 58.1213C20.4413 58.6839 21.2044 59 22 59C22.7956 59 23.5587 58.6839 24.1213 58.1213C24.6839 57.5587 25 56.7957 25 56V8C25 7.20435 24.6839 6.44129 24.1213 5.87868C23.5587 5.31607 22.7956 5 22 5ZM32 13C31.2044 13 30.4413 13.3161 29.8787 13.8787C29.3161 14.4413 29 15.2044 29 16V48C29 48.7957 29.3161 49.5587 29.8787 50.1213C30.4413 50.6839 31.2044 51 32 51C32.7956 51 33.5587 50.6839 34.1213 50.1213C34.6839 49.5587 35 48.7957 35 48V16C35 15.2044 34.6839 14.4413 34.1213 13.8787C33.5587 13.3161 32.7956 13 32 13ZM42 21C41.2043 21 40.4413 21.3161 39.8787 21.8787C39.3161 22.4413 39 23.2044 39 24V40C39 40.7957 39.3161 41.5587 39.8787 42.1213C40.4413 42.6839 41.2043 43 42 43C42.7957 43 43.5587 42.6839 44.1213 42.1213C44.6839 41.5587 45 40.7957 45 40V24C45 23.2044 44.6839 22.4413 44.1213 21.8787C43.5587 21.3161 42.7957 21 42 21ZM52 17C51.2043 17 50.4413 17.3161 49.8787 17.8787C49.3161 18.4413 49 19.2044 49 20V44C49 44.7957 49.3161 45.5587 49.8787 46.1213C50.4413 46.6839 51.2043 47 52 47C52.7957 47 53.5587 46.6839 54.1213 46.1213C54.6839 45.5587 55 44.7957 55 44V20C55 19.2044 54.6839 18.4413 54.1213 17.8787C53.5587 17.3161 52.7957 17 52 17Z"
          fill="currentColor"
        />
      </svg>
      <p className="text-foreground max-w-prose text-center leading-6 font-medium">
        Talk live with Ignacio's voice AI agent
      </p>
      <Button
        size="lg"
        onClick={onStartCall}
        className="w-64 rounded-full font-mono text-xs font-bold tracking-wider uppercase"
      >
        Start call
      </Button>
    </motion.div>
  );
}

function SessionView({ onClose }: { onClose: () => void }) {
  const { theme } = useTheme();

  return (
    <motion.div {...VIEW_MOTION_PROPS} key="session" className="relative h-[500px]">
      <AgentSessionView_01
        supportsChatInput={true}
        supportsVideoInput={false}
        supportsScreenShare={false}
        isPreConnectBufferEnabled={true}
        className="rounded-lg"
      />
    </motion.div>
  );
}

function AppSetup() {
  useDebugMode({ enabled: IN_DEVELOPMENT });
  useAgentErrors();
  return null;
}

function LivekitSessionContent({ onClose }: { onClose: () => void }) {
  const { isConnected, start } = useSessionContext();

  return (
    <>
      <AppSetup />
      <AnimatePresence mode="wait">
        {!isConnected ? (
          <WelcomeView key="welcome" onStartCall={start} />
        ) : (
          <SessionView key="session" onClose={onClose} />
        )}
      </AnimatePresence>
      <StartAudioButton label="Start Audio" className="hidden" />
    </>
  );
}

interface LivekitModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LivekitModal({ open, onOpenChange }: LivekitModalProps) {
  const session = useSession(TokenSource.endpoint('/api/livekit-token'));

  // End call when modal is closed
  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && session.isConnected) {
      session.end();
    }
    onOpenChange(nextOpen);
  };

  // Close modal when the call ends (e.g. END CALL button or session timeout)
  const wasConnected = useRef(false);
  useEffect(() => {
    if (session.isConnected) {
      wasConnected.current = true;
    } else if (wasConnected.current) {
      wasConnected.current = false;
      onOpenChange(false);
    }
  }, [session.isConnected, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden gap-0" showCloseButton>
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="flex items-center gap-2">
            <Mic className="w-5 h-5" />
            Talk with this page
          </DialogTitle>
        </DialogHeader>
        <div className="px-4 pb-4">
          <AgentSessionProvider session={session}>
            <Toaster
              icons={{ warning: <WarningIcon weight="bold" /> }}
              position="top-center"
            />
            <LivekitSessionContent onClose={() => onOpenChange(false)} />
          </AgentSessionProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
}
