import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle, Sparkles, Lightbulb, Calendar, FileText, Target, Send, Bot, AlertCircle } from 'lucide-react';
import { aiService } from '@/lib/ai-service';
import { config } from '@/lib/config';
import { useToast } from '@/hooks/use-toast';
import { FloatingActionButton } from './ui/FloatingActionButton';

interface AIMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestions?: string[];
  actions?: AIAction[];
}

interface AIAction {
  id: string;
  type: 'create_task' | 'schedule_meeting' | 'summarize' | 'generate_content';
  title: string;
  description: string;
  data?: any;
}

interface AISuggestion {
  id: string;
  type: 'productivity' | 'scheduling' | 'content' | 'insight';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  action?: () => void;
}

export function AICopilotView() {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([]);
  const [activeTab, setActiveTab] = useState('chat');
  const [aiEnabled, setAiEnabled] = useState(config.ai.enabled);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Sample suggestions
  useEffect(() => {
    setSuggestions([
      {
        id: '1',
        type: 'productivity',
        title: 'Schedule Focus Time',
        description: 'You have 3 high-priority tasks. Would you like me to block 2 hours of focus time?',
        priority: 'high',
        action: () => handleSuggestion('Schedule focus time for high-priority tasks'),
      },
      {
        id: '2',
        type: 'scheduling',
        title: 'Meeting Summary',
        description: 'I can summarize your recent team meeting and extract action items.',
        priority: 'medium',
        action: () => handleSuggestion('Summarize the recent team meeting'),
      },
      {
        id: '3',
        type: 'content',
        title: 'Generate Report',
        description: 'Based on your project data, I can help generate a weekly progress report.',
        priority: 'low',
        action: () => handleSuggestion('Generate a weekly progress report'),
      },
    ]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      if (!aiEnabled) {
        // Fallback response when AI is disabled
        const fallbackResponse: AIMessage = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: "AI features are currently disabled. Please enable them in your environment configuration to use the AI Copilot.",
          timestamp: new Date().toISOString(),
        };
        setMessages(prev => [...prev, fallbackResponse]);
        setIsTyping(false);
        return;
      }

      const aiResponse = await aiService.generateResponse(inputValue);
      const assistantMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: aiResponse.content,
        timestamp: new Date().toISOString(),
        suggestions: aiResponse.suggestions,
        actions: aiResponse.actions,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('AI service error:', error);
      
      const errorMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "I'm sorry, I encountered an error while processing your request. Please try again or check your internet connection.",
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "AI Service Error",
        description: "There was an issue with the AI service. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestion = (suggestion: string) => {
    setInputValue(suggestion);
    setActiveTab('chat');
  };

  const handleAction = (action: AIAction) => {
    console.log('Executing action:', action);
    toast({
      title: "Action Executed",
      description: `Executed: ${action.title}`,
    });
  };

  return (
    <div className="h-full flex flex-col relative">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AI Copilot</h2>
          <p className="text-gray-600">Your intelligent productivity assistant</p>
        </div>
        <div className="flex items-center gap-2">
          {!aiEnabled && (
            <Badge variant="destructive" className="flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              AI Disabled
            </Badge>
          )}
          <Badge variant="outline" className="flex items-center gap-1">
            <Bot className="w-3 h-3" />
            {aiEnabled ? 'AI Active' : 'AI Unavailable'}
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  AI Assistant
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="chat">Chat</TabsTrigger>
                    <TabsTrigger value="insights">Insights</TabsTrigger>
                    <TabsTrigger value="actions">Actions</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="chat" className="flex-1 flex flex-col mt-4">
                    <ScrollArea className="flex-1 mb-4">
                      <div className="space-y-4">
                        {messages.map(message => (
                          <div
                            key={message.id}
                            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[80%] p-3 rounded-lg ${
                                message.type === 'user'
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-gray-100 text-gray-900'
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              {message.suggestions && (
                                <div className="mt-3 space-y-2">
                                  {message.suggestions.map((suggestion, index) => (
                                    <Button
                                      key={index}
                                      variant="outline"
                                      size="sm"
                                      className="w-full justify-start"
                                      onClick={() => handleSuggestion(suggestion)}
                                    >
                                      {suggestion}
                                    </Button>
                                  ))}
                                </div>
                              )}
                              {message.actions && (
                                <div className="mt-3 space-y-2">
                                  {message.actions.map(action => (
                                    <Button
                                      key={action.id}
                                      variant="default"
                                      size="sm"
                                      className="w-full justify-start"
                                      onClick={() => handleAction(action)}
                                    >
                                      {action.title}
                                    </Button>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                        {isTyping && (
                          <div className="flex justify-start">
                            <div className="bg-gray-100 p-3 rounded-lg">
                              <div className="flex items-center gap-2">
                                <div className="flex space-x-1">
                                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                                <span className="text-sm text-gray-500">AI is thinking...</span>
                              </div>
                            </div>
                          </div>
                        )}
                        <div ref={messagesEndRef} />
                      </div>
                    </ScrollArea>
                    
                    <div className="flex gap-2">
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={aiEnabled ? "Ask me anything..." : "AI features are disabled"}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1"
                        disabled={!aiEnabled}
                      />
                      <Button 
                        onClick={handleSendMessage} 
                        disabled={!inputValue.trim() || !aiEnabled}
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="insights" className="flex-1 mt-4">
                    <div className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Lightbulb className="w-5 h-5" />
                            Productivity Insights
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="p-3 bg-blue-50 rounded-lg">
                              <h4 className="font-medium text-blue-900">Peak Productivity Time</h4>
                              <p className="text-sm text-blue-700">You're most productive between 9-11 AM. Consider scheduling important tasks during this window.</p>
                            </div>
                            <div className="p-3 bg-green-50 rounded-lg">
                              <h4 className="font-medium text-green-900">Task Completion Rate</h4>
                              <p className="text-sm text-green-700">You've completed 85% of scheduled tasks this week. Great job!</p>
                            </div>
                            <div className="p-3 bg-orange-50 rounded-lg">
                              <h4 className="font-medium text-orange-900">Meeting Efficiency</h4>
                              <p className="text-sm text-orange-700">Your meetings are running 15% longer than scheduled. Consider setting stricter time limits.</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="actions" className="flex-1 mt-4">
                    <div className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Target className="w-5 h-5" />
                            Quick Actions
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-3">
                            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                              <Calendar className="w-6 h-6 mb-2" />
                              Schedule Meeting
                            </Button>
                            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                              <FileText className="w-6 h-6 mb-2" />
                              Create Task
                            </Button>
                            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                              <Sparkles className="w-6 h-6 mb-2" />
                              Generate Report
                            </Button>
                            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                              <MessageCircle className="w-6 h-6 mb-2" />
                              Summarize Notes
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Suggestions Sidebar */}
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <div className="space-y-3">
                    {suggestions.map(suggestion => (
                      <Card key={suggestion.id} className="cursor-pointer hover:shadow-sm transition-shadow">
                        <CardContent className="p-3">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-sm">{suggestion.title}</h4>
                            <Badge
                              variant={
                                suggestion.priority === 'high' ? 'destructive' :
                                suggestion.priority === 'medium' ? 'default' : 'secondary'
                              }
                              className="text-xs"
                            >
                              {suggestion.priority}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-600 mb-3">{suggestion.description}</p>
                          <Button
                            size="sm"
                            className="w-full"
                            onClick={suggestion.action}
                            disabled={!aiEnabled}
                          >
                            Take Action
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <FloatingActionButton />
    </div>
  );
} 