// Environment configuration with fallbacks
export const config = {
  // Supabase
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || '',
    anonKey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '',
  },
  
  // AI Services
  ai: {
    openaiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
    anthropicKey: import.meta.env.VITE_ANTHROPIC_API_KEY || '',
    enabled: import.meta.env.VITE_ENABLE_AI_FEATURES === 'true' && 
             (import.meta.env.VITE_OPENAI_API_KEY || import.meta.env.VITE_ANTHROPIC_API_KEY),
  },
  
  // App Configuration
  app: {
    name: import.meta.env.VITE_APP_NAME || 'FlowSphere',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    environment: import.meta.env.VITE_APP_ENV || 'development',
  },
  
  // Analytics
  analytics: {
    googleId: import.meta.env.VITE_GOOGLE_ANALYTICS_ID || '',
    sentryDsn: import.meta.env.VITE_SENTRY_DSN || '',
    enabled: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  },
  
  // Features
  features: {
    offlineMode: import.meta.env.VITE_ENABLE_OFFLINE_MODE === 'true',
  },
} as const;

// Validation
export const validateConfig = () => {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Check for placeholder values
  if (config.supabase.url === 'your_supabase_project_url' || !config.supabase.url) {
    warnings.push('Supabase URL not configured - Database features will be disabled');
  }
  
  if (config.supabase.anonKey === 'your_supabase_anon_key' || !config.supabase.anonKey) {
    warnings.push('Supabase API key not configured - Database features will be disabled');
  }
  
  if (config.ai.openaiKey === 'your_openai_api_key' || !config.ai.openaiKey) {
    warnings.push('OpenAI API key not configured - AI features will use fallbacks');
  }
  
  // Log warnings in development
  if (config.app.environment === 'development') {
    warnings.forEach(warning => {
      console.warn(`⚠️ ${warning}`);
    });
  }
  
  return { errors, warnings };
};

// Runtime config validation
if (typeof window !== 'undefined') {
  const { errors, warnings } = validateConfig();
  
  if (errors.length > 0) {
    console.error('Configuration errors:', errors);
  }
  
  if (warnings.length > 0 && config.app.environment === 'development') {
    console.log('🔧 Development mode - Some features may be limited');
    console.log('💡 To enable all features, configure your .env file');
  }
} 