import { useState, useEffect, useRef } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, UIMessage } from 'ai';
import ReactMarkdown from 'react-markdown';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function Chatbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { messages, sendMessage, status, error } = useChat<UIMessage>({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
    messages: [
      {
        id: 'welcome',
        role: 'assistant',
        parts: [{ type: 'text', text: "Hi! I'm Ignacio's virtual assistant. How can I help you today?" }],
      },
    ],
  });

  const isLoading = status === 'submitted' || status === 'streaming';
  const MAX_CHARS = 300;

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim().length === 0 || input.length > MAX_CHARS) return;
    sendMessage({ text: input });
    setInput('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Action Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 shadow-lg hover:scale-105 transition-transform duration-200 bg-primary text-primary-foreground"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}

      {/* Chat Window */}
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
                className={`flex w-full ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-tr-sm'
                      : 'bg-muted text-foreground rounded-tl-sm prose-sm prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0'
                  }`}
                >
                  {message.role === 'user' ? (
                    <p className="text-sm whitespace-pre-wrap">
                      {message.parts.filter((p: any) => p.type === 'text').map((p: any) => p.text).join('')}
                    </p>
                  ) : (
                    message.parts.filter((p: any) => p.type === 'text').map((p: any, i: number) => (
                      <ReactMarkdown key={i}>{p.text}</ReactMarkdown>
                    ))
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
            
            {isLoading && messages[messages.length - 1]?.role === 'user' && (
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
                  onChange={handleInputChange}
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
                <span className="text-[10px] text-muted-foreground">
                  Powered by AI
                </span>
                <span className={`text-[10px] ${input.length >= MAX_CHARS ? 'text-destructive' : 'text-muted-foreground'}`}>
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
