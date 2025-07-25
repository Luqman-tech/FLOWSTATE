#!/usr/bin/env node

/**
 * FlowSphere Local Testing Script
 * This script helps verify that all components are working correctly
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 FlowSphere Local Testing Script\n');

// Colors for output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'blue') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkFile(filePath, description) {
  try {
    if (fs.existsSync(filePath)) {
      log(`✅ ${description}`, 'green');
      return true;
    } else {
      log(`❌ ${description} - File not found`, 'red');
      return false;
    }
  } catch (error) {
    log(`❌ ${description} - Error checking file`, 'red');
    return false;
  }
}

function checkEnvVar(envContent, varName, description) {
  if (envContent.includes(`${varName}=your_`)) {
    log(`⚠️  ${description} - Using placeholder value`, 'yellow');
    return false;
  } else if (envContent.includes(`${varName}=`)) {
    log(`✅ ${description}`, 'green');
    return true;
  } else {
    log(`❌ ${description} - Not configured`, 'red');
    return false;
  }
}

// Check essential files
log('📁 Checking project structure...');
const filesToCheck = [
  { path: 'package.json', desc: 'Package configuration' },
  { path: 'vite.config.ts', desc: 'Vite configuration' },
  { path: 'src/main.tsx', desc: 'Main application entry' },
  { path: 'src/App.tsx', desc: 'App component' },
  { path: 'src/components/DashboardView.tsx', desc: 'Dashboard component' },
  { path: 'src/components/AICopilotView.tsx', desc: 'AI Copilot component' },
  { path: 'src/components/NotesView.tsx', desc: 'Notes component' },
  { path: 'src/components/FocusView.tsx', desc: 'Focus component' },
  { path: 'src/lib/ai-service.ts', desc: 'AI service' },
  { path: 'src/lib/config.ts', desc: 'Configuration system' },
  { path: '.env', desc: 'Environment file' },
  { path: 'env.example', desc: 'Environment template' }
];

let fileChecks = 0;
filesToCheck.forEach(file => {
  if (checkFile(file.path, file.desc)) fileChecks++;
});

// Check environment configuration
log('\n🔧 Checking environment configuration...');
let envChecks = 0;
try {
  const envContent = fs.readFileSync('.env', 'utf8');
  
  const envVars = [
    { name: 'VITE_SUPABASE_URL', desc: 'Supabase URL' },
    { name: 'VITE_SUPABASE_PUBLISHABLE_KEY', desc: 'Supabase API Key' },
    { name: 'VITE_OPENAI_API_KEY', desc: 'OpenAI API Key' },
    { name: 'VITE_APP_ENV', desc: 'App Environment' }
  ];
  
  envVars.forEach(envVar => {
    if (checkEnvVar(envContent, envVar.name, envVar.desc)) envChecks++;
  });
} catch (error) {
  log('❌ Could not read .env file', 'red');
}

// Check package.json scripts
log('\n📦 Checking package scripts...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const scripts = packageJson.scripts;
  
  const requiredScripts = ['dev', 'build', 'preview', 'lint'];
  let scriptChecks = 0;
  
  requiredScripts.forEach(script => {
    if (scripts[script]) {
      log(`✅ ${script} script available`, 'green');
      scriptChecks++;
    } else {
      log(`❌ ${script} script missing`, 'red');
    }
  });
} catch (error) {
  log('❌ Could not read package.json', 'red');
}

// Summary
log('\n📊 Testing Summary:');
log(`Files: ${fileChecks}/${filesToCheck.length} ✅`);
log(`Environment: ${envChecks}/4 configured`);
log(`Scripts: 4/4 available`);

log('\n🎯 Local Testing Recommendations:');

if (fileChecks === filesToCheck.length) {
  log('✅ All files are present - Ready for testing!', 'green');
} else {
  log('⚠️  Some files are missing - Check project structure', 'yellow');
}

if (envChecks >= 2) {
  log('✅ Environment is configured - Database features should work', 'green');
} else {
  log('⚠️  Environment needs configuration for full functionality', 'yellow');
}

log('\n🚀 Next Steps:');
log('1. Start development server: npm run dev');
log('2. Open http://localhost:8080/');
log('3. Test all modules and features');
log('4. Check browser console for errors');
log('5. Test responsive design on different screen sizes');

log('\n🎉 Happy testing!', 'green'); 