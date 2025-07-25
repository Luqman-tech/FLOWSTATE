# FlowSphere

**FlowSphere** is an AI-powered, modular, cross-platform productivity ecosystem combining task management, notes, calendar, time tracking, and collaboration. Built with React, TypeScript, Vite, Tailwind CSS, and Supabase, it's designed to help teams and individuals achieve peak productivity through intelligent automation and seamless workflows.

---

## 🚀 Core Modules

### 🤖 AI Copilot
- **Context-aware assistant** that summarizes meetings, emails, and notes
- **Intelligent task scheduling** based on priority and availability
- **Proactive suggestions** for focus blocks and productivity optimization
- **Natural language processing** for task creation and content generation
- **Chat interface** with actionable insights and recommendations

### 📝 Notes & Knowledge Management
- **Rich text and markdown support** with WYSIWYG editor
- **Bi-directional linking** between notes and tasks
- **AI-powered task extraction** from meeting notes and documents
- **Smart tagging and nested folders** for organized knowledge
- **Embed support** for images, files, audio, and videos

### ✅ Task Management
- **Natural language task creation** ("Call Mom tomorrow at 5")
- **Smart recurring tasks** with intelligent scheduling
- **Multiple views**: List, Board (Kanban), Calendar, Timeline
- **Priority levels, tags, and dependencies**
- **AI-assisted task prioritization** and time estimation

### 🗓️ Calendar & Time Blocking
- **AI-assisted time blocking** with intelligent scheduling
- **Meeting buffer automation** and conflict resolution
- **Drag-and-drop task-to-calendar conversion**
- **Full calendar integration** (Google, Outlook, Apple)
- **Smart scheduling suggestions** based on workload and priorities

### ⏱️ Focus & Time Tracking
- **Pomodoro timer** with customizable focus sessions
- **Distraction blocking** with browser integration
- **Passive time tracking** for automatic task attribution
- **Daily/weekly productivity analytics** and insights
- **Focus mode** with ambient sounds and notifications

### 📊 Dashboard & Analytics
- **Overview of your productivity** with AI-generated insights
- **Quick Actions** for instant task creation and scheduling
- **Recent activity tracking** and progress visualization
- **Team performance metrics** and collaboration insights

### 📁 Project Management
- **Create, edit, and manage projects** with comprehensive details
- **AI-powered project health monitoring** and risk assessment
- **Team collaboration tools** with real-time updates
- **Budget tracking** and resource allocation
- **Progress visualization** with smart milestone tracking

### 👥 Team Collaboration
- **Shared workspaces** for teams and projects
- **Real-time collaboration** on documents and tasks
- **Role-based access control** and permissions
- **Team analytics** and performance insights
- **Communication tools** with AI-powered summaries

### ⚙️ Settings & Customization
- **Modular UX** - activate only the modules you need
- **AI personalization** based on your work patterns
- **Theme customization** and accessibility options
- **Integration management** for third-party services

---

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript for type safety
- **Vite** for lightning-fast development and building
- **Tailwind CSS** for utility-first styling
- **shadcn/ui** for modern, accessible components
- **Radix UI** for unstyled, accessible UI primitives

### Backend & Database
- **Supabase** for backend, authentication, and real-time database
- **PostgreSQL** for structured data storage
- **Real-time subscriptions** for live collaboration

### AI & Integrations
- **OpenAI/Anthropic APIs** for natural language processing
- **Custom AI models** for productivity recommendations
- **Third-party integrations** (Google Calendar, Slack, etc.)

### Development Tools
- **React Hook Form** for efficient form management
- **React Query** for server state management
- **Recharts** for data visualization
- **date-fns** for date utilities

---

## 🚀 Getting Started

### 1. Clone the repository
```sh
git clone <YOUR_GIT_URL>
cd flowsphere
```

### 2. Install dependencies
```sh
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
VITE_OPENAI_API_KEY=your_openai_api_key
```
*(Replace with your actual credentials)*

### 4. Start the development server
```sh
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🏗️ Project Structure

```
src/
├── components/          # UI components
│   ├── ui/             # shadcn/ui components
│   ├── DashboardView.tsx
│   ├── TasksView.tsx
│   ├── NotesView.tsx   # New AI-powered notes
│   ├── FocusView.tsx   # New focus & time tracking
│   ├── AICopilotView.tsx # New AI assistant
│   └── ...
├── hooks/              # Custom React hooks
├── integrations/       # External service integrations
│   └── supabase/      # Supabase client and types
├── pages/             # Main application pages
└── lib/               # Utility functions
```

---

## 🎯 Key Features

### AI-Powered Productivity
- **Smart task scheduling** based on your work patterns
- **Automatic meeting summaries** and action item extraction
- **Intelligent time blocking** for optimal focus periods
- **Proactive productivity insights** and recommendations

### Modular Design
- **Activate only the modules you need**
- **Customizable workspace** to match your workflow
- **Scalable architecture** for teams of any size

### Cross-Platform
- **Responsive design** works on desktop, tablet, and mobile
- **Offline-first architecture** for reliability
- **Real-time synchronization** across all devices

### Privacy & Security
- **End-to-end encryption** for sensitive data
- **User-owned data** with export capabilities
- **Secure authentication** with Supabase

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- [Supabase](https://supabase.com/) for backend infrastructure
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [OpenAI](https://openai.com/) for AI capabilities
- [Vite](https://vitejs.dev/) for fast development
- [Tailwind CSS](https://tailwindcss.com/) for styling

---

**FlowSphere** — Where AI meets productivity. 🚀
