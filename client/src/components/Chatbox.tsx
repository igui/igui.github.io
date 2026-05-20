import { useState, useEffect, useRef, useCallback } from 'react';
import { nanoid } from 'nanoid';
import ReactMarkdown from 'react-markdown';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

type ChatMessage = { id: string; role: 'user' | 'assistant'; content: string };

const WELCOME: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content: "Hi! I'm Ignacio's virtual assistant. How can I help you today?",
};

const MAX_CHARS = 300;

function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [status, setStatus] = useState<'idle' | 'streaming' | 'error'>('idle');
  const [error, setError] = useState<Error | null>(null);

  const sendMessage = useCallback(
    async (text: string) => {
      const userMsg: ChatMessage = { id: nanoid(), role: 'user', content: text };
      const assistantId = nanoid();

      // Snapshot of history sent to the server (excluding the placeholder)
      const history = [...messages, userMsg];

      setMessages([...history, { id: assistantId, role: 'assistant', content: '' }]);
      setStatus('streaming');
      setError(null);

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: history.map(({ role, content }) => ({ role, content })),
          }),
        });

        if (!response.ok || !response.body) {
          const errText = await response.text().catch(() => 'Request failed');
          throw new Error(errText || `HTTP ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          if (!chunk) continue;
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantId ? { ...m, content: m.content + chunk } : m)),
          );
        }
        setStatus('idle');
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
        setStatus('error');
      }
    },
    [messages],
  );

  return { messages, status, error, sendMessage };
}

export default function Chatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, status, error, sendMessage } = useChat();

  const isLoading = status === 'streaming';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed.length === 0 || trimmed.length > MAX_CHARS) return;
    sendMessage(trimmed);
    setInput('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 shadow-lg hover:scale-105 transition-transform duration-200 bg-primary text-primary-foreground"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}

      {isOpen && (
        <Card className="w-[350px] sm:w-[400px] h-[500px] flex flex-col shadow-2xl animate-in slide-in-from-bottom-5">
          <CardHeader className="flex flex-row items-center justify-between p-4 border-b bg-muted/50 rounded-t-xl">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Chat Assistant
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex w-full ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-tr-sm'
                      : 'bg-muted text-foreground rounded-tl-sm prose-sm prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0'
                  }`}
                >
                  {message.role === 'user' ? (
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  ) : (
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  )}
                </div>
              </div>
            ))}

            {error && (
              <div className="flex w-full justify-center">
                <span className="text-xs text-destructive bg-destructive/10 px-3 py-1 rounded-full">
                  {error.message || 'An error occurred'}
                </span>
              </div>
            )}

            {isLoading && messages[messages.length - 1]?.content === '' && (
              <div className="flex w-full justify-start">
                <div className="bg-muted text-muted-foreground rounded-2xl rounded-tl-sm px-4 py-2 text-sm flex gap-1 items-center">
                  <span className="animate-bounce">●</span>
                  <span className="animate-bounce delay-100">●</span>
                  <span className="animate-bounce delay-200">●</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          <CardFooter className="p-3 border-t bg-background rounded-b-xl">
            <form onSubmit={onFormSubmit} className="flex flex-col w-full gap-2">
              <div className="flex w-full items-center gap-2">
                <input
                  className="flex-1 bg-transparent border-0 focus:ring-0 px-2 text-sm outline-none resize-none"
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  maxLength={MAX_CHARS}
                  disabled={isLoading}
                  autoFocus
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={isLoading || input.length === 0 || input.length > MAX_CHARS}
                  className="h-8 w-8 rounded-full shrink-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex justify-between px-2">
                <span className="text-[10px] text-muted-foreground">Powered by AI</span>
                <span
                  className={`text-[10px] ${input.length >= MAX_CHARS ? 'text-destructive' : 'text-muted-foreground'}`}
                >
                  {input.length}/{MAX_CHARS}
                </span>
              </div>
            </form>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
