# FlowSphere Production Deployment Guide

## 🚀 Pre-Deployment Checklist

### 1. Environment Setup
- [ ] Create `.env` file from `env.example`
- [ ] Set up Supabase production project
- [ ] Configure AI API keys (OpenAI/Anthropic)
- [ ] Set up analytics (Google Analytics, Sentry)

### 2. Database Preparation
- [ ] Run Supabase migrations in production
- [ ] Set up Row Level Security (RLS) policies
- [ ] Configure database backups
- [ ] Test database connections

### 3. Code Quality
- [ ] Run `npm run build` successfully
- [ ] Fix any TypeScript errors
- [ ] Test all features in development
- [ ] Optimize bundle size

## 📋 Production Deployment Steps

### Step 1: Environment Configuration

1. **Create production environment file:**
```bash
cp env.example .env
```

2. **Fill in required values:**
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key
VITE_OPENAI_API_KEY=your_openai_key
VITE_APP_ENV=production
```

### Step 2: Supabase Production Setup

1. **Create production project:**
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Note down URL and anon key

2. **Run migrations:**
```bash
npx supabase db push
```

3. **Set up RLS policies:**
```sql
-- Enable RLS on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own projects" ON projects
  FOR SELECT USING (auth.uid() = created_by);

CREATE POLICY "Users can insert own projects" ON projects
  FOR INSERT WITH CHECK (auth.uid() = created_by);
```

### Step 3: AI Services Setup

1. **OpenAI API:**
   - Sign up at [openai.com](https://openai.com)
   - Get API key
   - Set usage limits

2. **Anthropic API (Alternative):**
   - Sign up at [anthropic.com](https://anthropic.com)
   - Get API key

### Step 4: Deployment Platforms

#### Option A: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Option B: Netlify
```bash
# Build the project
npm run build

# Deploy dist folder to Netlify
```

#### Option C: AWS S3 + CloudFront
```bash
# Build the project
npm run build

# Upload dist/ to S3 bucket
# Configure CloudFront distribution
```

### Step 5: Domain & SSL

1. **Custom Domain:**
   - Configure DNS records
   - Set up SSL certificate
   - Update CORS settings in Supabase

2. **Update Supabase settings:**
```sql
-- Add your domain to allowed origins
INSERT INTO auth.config (key, value) 
VALUES ('site_url', 'https://yourdomain.com');
```

## 🔧 Post-Deployment

### 1. Testing
- [ ] Test all features in production
- [ ] Verify AI functionality
- [ ] Check mobile responsiveness
- [ ] Test authentication flow

### 2. Monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Configure performance monitoring
- [ ] Set up uptime monitoring
- [ ] Monitor API usage and costs

### 3. Security
- [ ] Enable Supabase security features
- [ ] Set up rate limiting
- [ ] Configure CORS properly
- [ ] Review security headers

## 📊 Performance Optimization

### 1. Bundle Optimization
- [ ] Enable code splitting
- [ ] Optimize images
- [ ] Enable gzip compression
- [ ] Use CDN for static assets

### 2. Caching Strategy
- [ ] Set up service worker
- [ ] Configure browser caching
- [ ] Implement API response caching
- [ ] Use Redis for session storage

## 🛡️ Security Checklist

- [ ] Environment variables secured
- [ ] API keys not exposed in client
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Input validation implemented
- [ ] SQL injection prevention
- [ ] XSS protection enabled

## 📈 Analytics & Monitoring

### 1. Error Tracking
```javascript
// Add to main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: "production",
});
```

### 2. Performance Monitoring
```javascript
// Add to main.tsx
import { webVitals } from 'web-vitals';

webVitals(console.log);
```

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy to Production
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🚨 Emergency Procedures

### Rollback Plan
1. Keep previous deployment ready
2. Database backup strategy
3. Feature flags for critical features
4. Monitoring alerts

### Support Contacts
- Technical issues: [your-email]
- Security issues: [security-email]
- User support: [support-email]

## 📝 Legal Requirements

- [ ] Privacy Policy
- [ ] Terms of Service
- [ ] GDPR compliance
- [ ] Cookie consent
- [ ] Data retention policy

---

**Remember:** Always test in staging environment before deploying to production! 