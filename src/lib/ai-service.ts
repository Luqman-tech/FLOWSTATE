import { config } from './config';

interface AIResponse {
  content: string;
  suggestions?: string[];
  actions?: Array<{
    id: string;
    type: string;
    title: string;
    description: string;
    data?: any;
  }>;
}

interface AIServiceConfig {
  maxRetries: number;
  timeout: number;
  rateLimit: number; // requests per minute
}

class AIService {
  private config: AIServiceConfig;
  private requestCount: number = 0;
  private lastRequestTime: number = 0;

  constructor() {
    this.config = {
      maxRetries: 3,
      timeout: 30000,
      rateLimit: 60, // 60 requests per minute
    };
  }

  private async checkRateLimit(): Promise<boolean> {
    const now = Date.now();
    const timeWindow = 60 * 1000; // 1 minute

    if (now - this.lastRequestTime < timeWindow) {
      if (this.requestCount >= this.config.rateLimit) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
    } else {
      this.requestCount = 0;
      this.lastRequestTime = now;
    }

    this.requestCount++;
    return true;
  }

  private async makeOpenAIRequest(prompt: string): Promise<AIResponse> {
    if (!config.ai.openaiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.ai.openaiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are FlowSphere, an AI productivity assistant. Help users with task management, scheduling, and productivity insights.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '';

    return this.parseAIResponse(content);
  }

  private async makeAnthropicRequest(prompt: string): Promise<AIResponse> {
    if (!config.ai.anthropicKey) {
      throw new Error('Anthropic API key not configured');
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.ai.anthropicKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 500,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.content[0]?.text || '';

    return this.parseAIResponse(content);
  }

  private parseAIResponse(content: string): AIResponse {
    // Parse the AI response and extract suggestions and actions
    const suggestions: string[] = [];
    const actions: Array<{
      id: string;
      type: string;
      title: string;
      description: string;
      data?: any;
    }> = [];

    // Extract suggestions (lines starting with "-")
    const lines = content.split('\n');
    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('-') || trimmed.startsWith('•')) {
        suggestions.push(trimmed.substring(1).trim());
      }
    });

    // Extract actions (lines containing "ACTION:")
    lines.forEach(line => {
      if (line.includes('ACTION:')) {
        const actionMatch = line.match(/ACTION:\s*(.+)/);
        if (actionMatch) {
          actions.push({
            id: Date.now().toString(),
            type: 'general',
            title: actionMatch[1],
            description: actionMatch[1],
          });
        }
      }
    });

    return {
      content,
      suggestions: suggestions.length > 0 ? suggestions : undefined,
      actions: actions.length > 0 ? actions : undefined,
    };
  }

  async generateResponse(userInput: string): Promise<AIResponse> {
    try {
      await this.checkRateLimit();

      // Try OpenAI first, then Anthropic as fallback
      try {
        return await this.makeOpenAIRequest(userInput);
      } catch (error) {
        console.warn('OpenAI request failed, trying Anthropic:', error);
        return await this.makeAnthropicRequest(userInput);
      }
    } catch (error) {
      console.error('AI service error:', error);
      
      // Return fallback response
      return {
        content: "I'm having trouble connecting to my AI services right now. Please try again later, or check your internet connection.",
        suggestions: [
          'Try again in a few minutes',
          'Check your internet connection',
          'Contact support if the problem persists',
        ],
      };
    }
  }

  async extractTasksFromText(text: string): Promise<string[]> {
    try {
      const prompt = `Extract actionable tasks from the following text. Return only the tasks, one per line, starting with "-":
      
Text: ${text}

Tasks:`;

      const response = await this.generateResponse(prompt);
      const lines = response.content.split('\n');
      
      return lines
        .map(line => line.trim())
        .filter(line => line.startsWith('-') || line.startsWith('•'))
        .map(line => line.substring(1).trim())
        .filter(Boolean);
    } catch (error) {
      console.error('Error extracting tasks:', error);
      return [];
    }
  }

  async generateMeetingSummary(meetingText: string): Promise<string> {
    try {
      const prompt = `Summarize the following meeting notes and extract key action items:

${meetingText}

Summary:`;

      const response = await this.generateResponse(prompt);
      return response.content;
    } catch (error) {
      console.error('Error generating meeting summary:', error);
      return 'Unable to generate summary at this time.';
    }
  }

  async suggestTimeBlocks(tasks: string[]): Promise<Array<{
    title: string;
    duration: number;
    priority: 'high' | 'medium' | 'low';
  }>> {
    try {
      const prompt = `Suggest time blocks for the following tasks. For each task, suggest:
1. A focused title
2. Duration in minutes (15, 30, 45, 60, 90, 120)
3. Priority (high, medium, low)

Tasks: ${tasks.join(', ')}

Format each suggestion as: "Title | Duration | Priority"`;

      const response = await this.generateResponse(prompt);
      const lines = response.content.split('\n');
      
      return lines
        .map(line => {
          const parts = line.split('|').map(p => p.trim());
          if (parts.length === 3) {
            return {
              title: parts[0],
              duration: parseInt(parts[1]) || 30,
              priority: (parts[2] as 'high' | 'medium' | 'low') || 'medium',
            };
          }
          return null;
        })
        .filter(Boolean) as Array<{
          title: string;
          duration: number;
          priority: 'high' | 'medium' | 'low';
        }>;
    } catch (error) {
      console.error('Error suggesting time blocks:', error);
      return [];
    }
  }
}

// Export singleton instance
export const aiService = new AIService(); 