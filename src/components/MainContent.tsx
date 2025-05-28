
import React, { useState } from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { DashboardView } from '@/components/DashboardView';
import { TasksView } from '@/components/TasksView';
import { ProjectsView } from '@/components/ProjectsView';
import { CalendarView } from '@/components/CalendarView';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function MainContent() {
  const [activeView, setActiveView] = useState('dashboard');

  const renderActiveView = () => {
    switch (activeView) {
      case 'tasks':
        return <TasksView />;
      case 'projects':
        return <ProjectsView />;
      case 'calendar':
        return <CalendarView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <main className="flex-1 flex flex-col">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <SidebarTrigger className="hover:bg-gray-100 transition-colors" />
            <h1 className="text-2xl font-bold text-gray-900">
              {activeView.charAt(0).toUpperCase() + activeView.slice(1)}
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search tasks, projects..." 
                className="pl-10 w-64 bg-gray-50 border-gray-200"
              />
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              New Task
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="border-b bg-white">
        <nav className="flex space-x-8 px-4">
          {['dashboard', 'tasks', 'projects', 'calendar'].map((view) => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeView === view
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-auto">
        {renderActiveView()}
      </div>
    </main>
  );
}
