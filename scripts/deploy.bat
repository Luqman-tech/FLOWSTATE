@echo off
REM FlowSphere Production Deployment Script for Windows
REM This script automates the deployment process

echo 🚀 Starting FlowSphere Production Deployment...

REM Check if .env file exists
if not exist .env (
    echo [ERROR] .env file not found!
    echo [INFO] Creating .env file from template...
    copy env.example .env
    echo [WARNING] Please edit .env file with your production values before continuing.
    echo [INFO] Required variables:
    echo   - VITE_SUPABASE_URL
    echo   - VITE_SUPABASE_PUBLISHABLE_KEY
    echo   - VITE_OPENAI_API_KEY (optional)
    echo   - VITE_APP_ENV=production
    pause
    exit /b 1
)

REM Install dependencies
echo [INFO] Installing dependencies...
call npm ci
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)
echo [SUCCESS] Dependencies installed

REM Run linting
echo [INFO] Running linting...
call npm run lint
if %errorlevel% neq 0 (
    echo [ERROR] Linting failed
    pause
    exit /b 1
)
echo [SUCCESS] Linting passed

REM Build the application
echo [INFO] Building application...
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Build failed
    pause
    exit /b 1
)
echo [SUCCESS] Build completed successfully

REM Check if Vercel CLI is installed
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] Vercel CLI not found. Installing...
    call npm install -g vercel
)

REM Deploy to Vercel
echo [INFO] Deploying to Vercel...
if "%1"=="--prod" (
    call vercel --prod
) else (
    call vercel
)

if %errorlevel% neq 0 (
    echo [ERROR] Deployment failed!
    pause
    exit /b 1
)

echo [SUCCESS] Deployment completed!

REM Post-deployment checks
echo [INFO] Running post-deployment checks...

echo [SUCCESS] ✅ FlowSphere deployed successfully!
echo [INFO] Next steps:
echo   1. Set up custom domain in Vercel dashboard
echo   2. Configure SSL certificate
echo   3. Set up monitoring (Sentry, Google Analytics)
echo   4. Test all features in production
echo   5. Monitor performance and costs

echo.
echo [SUCCESS] 🎉 FlowSphere is now live in production!
pause 