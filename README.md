# FLOWSTATE

FLOWSTATE is a modern, full-featured productivity and project management application built with React, TypeScript, Vite, Tailwind CSS, and Supabase. It is designed to help teams and individuals manage projects, tasks, goals, time tracking, and collaboration efficiently—all in a beautiful, responsive interface.

---

## Features

### 🏠 Dashboard
- **Overview of your productivity:** See active tasks, completed items, time tracked, and team members at a glance.
- **Quick Actions:** Instantly create tasks, schedule meetings, track time, or view reports.
- **Recent Tasks & Projects:** Stay up to date with your most important work.

### 📁 Project Management
- **Create, edit, and manage projects** with details like name, description, status, priority, budget, and timeline.
- **Project progress tracking** and visual indicators.
- **Assign team members** and monitor project health.

### ✅ Task Management
- **Create, assign, and track tasks** for yourself or your team.
- **Set priorities, due dates, and completion status.**
- **View tasks by project, assignee, or status.**
- **Progress bars and completion tracking.**

### 🗓️ Calendar & Scheduling
- **Integrated calendar view** for meetings, deadlines, and milestones.
- **Schedule and manage events** directly from the dashboard.

### ⏱️ Time Tracking
- **Track time spent** on tasks and projects.
- **Visualize productivity trends** and time allocation.

### 🎯 Goals & Progress
- **Set and monitor goals** for yourself or your team.
- **Visual progress indicators** and motivational feedback.

### 👥 Team Collaboration
- **Invite and manage team members.**
- **Assign roles and responsibilities.**
- **Collaborate on projects and tasks in real time.**

### ⚙️ Settings & Customization
- **Personalize your experience** with theme and notification settings.
- **Manage account and preferences.**

### 🔒 Authentication & Security
- **Secure login and signup** powered by Supabase.
- **Role-based access control** for teams.

---

## Technologies Used

- **React** (with Vite for fast development)
- **TypeScript** (type safety)
- **Tailwind CSS** (utility-first styling)
- **shadcn/ui** (modern UI components)
- **Supabase** (backend, authentication, and database)
- **Radix UI** (accessible UI primitives)
- **React Hook Form** (form management)
- **Recharts** (data visualization)
- **date-fns** (date utilities)

---

## Getting Started

### 1. Clone the repository
```sh
git clone <YOUR_GIT_URL>
cd FLOWSTATE
```

### 2. Install dependencies
```sh
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root of the `FLOWSTATE` directory:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```
*(Replace with your actual Supabase project credentials.)*

### 4. Start the development server
```sh
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## Project Structure

- `src/components/` — Main UI components (Dashboard, Projects, Tasks, Calendar, Team, etc.)
- `src/hooks/` — Custom React hooks for tasks, projects, authentication, and more.
- `src/pages/` — Main application pages and routing.
- `src/integrations/supabase/` — Supabase client and types.
- `public/` — Static assets.

---

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

---

## License

This project is licensed under the MIT License.

---

## Acknowledgements

- [Supabase](https://supabase.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**FLOWSTATE** — Achieve more, together.
