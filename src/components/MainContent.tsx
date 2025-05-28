
import React, { useState } from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { DashboardView } from '@/components/DashboardView';
import { TasksView } from '@/components/TasksView';
import { ProjectsView } from '@/components/ProjectsView';
import { CalendarView } from '@/components/CalendarView';
import { Button } from '@/components/ui/button';
import { Plus, Search, Bell, User, Settings } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export function MainContent() {
  const [activeView, setActiveView] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const views = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'tasks', label: 'Tasks', icon: '✓', badge: '8' },
    { id: 'projects', label: 'Projects', icon: '📁', badge: '3' },
    { id: 'calendar', label: 'Calendar', icon: '📅' }
  ];

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

  const getViewTitle = () => {
    const view = views.find(v => v.id === activeView);
    return view ? view.label : 'Dashboard';
  };

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <main className="flex-1 flex flex-col bg-gray-50/50">
      {/* Enhanced Header */}
      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between p-4 lg:px-6">
          <div className="flex items-center space-x-4">
            <SidebarTrigger className="hover:bg-gray-100 transition-colors rounded-lg p-2" />
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-gray-900">
                {getViewTitle()}
              </h1>
              <p className="text-sm text-gray-500 hidden sm:block">
                {getWelcomeMessage()}, let's make today productive!
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Smart Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search everything..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-72 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
              />
              {searchQuery && (
                <div className="absolute top-full mt-1 w-full bg-white border rounded-lg shadow-lg p-2">
                  <p className="text-sm text-gray-500">Press Enter to search</p>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <Button 
              variant="outline" 
              size="sm"
              className="hidden lg:flex items-center space-x-2 hover:bg-gray-50"
            >
              <Bell className="h-4 w-4" />
              <span className="hidden xl:inline">Notifications</span>
              <Badge variant="destructive" className="h-5 w-5 text-xs">3</Badge>
            </Button>

            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Quick Add</span>
            </Button>

            {/* User Menu */}
            <Button variant="outline" size="sm" className="rounded-full p-2">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Enhanced Navigation Tabs */}
      <div className="border-b bg-white">
        <nav className="flex space-x-1 px-4 lg:px-6 overflow-x-auto">
          {views.map((view) => (
            <button
              key={view.id}
              onClick={() => setActiveView(view.id)}
              className={`flex items-center space-x-2 py-3 px-4 border-b-2 font-medium text-sm transition-all duration-200 whitespace-nowrap ${
                activeView === view.id
                  ? 'border-blue-500 text-blue-600 bg-blue-50/50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50/50'
              }`}
            >
              <span className="text-base">{view.icon}</span>
              <span>{view.label}</span>
              {view.badge && (
                <Badge 
                  variant={activeView === view.id ? "default" : "secondary"} 
                  className="h-5 text-xs"
                >
                  {view.badge}
                </Badge>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 lg:p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {renderActiveView()}
        </div>
      </div>

      {/* Floating Action Button for Mobile */}
      <Button 
        className="fixed bottom-6 right-6 md:hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-full h-14 w-14"
        size="icon"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </main>
  );
}
