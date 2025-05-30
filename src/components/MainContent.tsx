
import React, { useState, useEffect } from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { DashboardView } from '@/components/DashboardView';
import { TasksView } from '@/components/TasksView';
import { ProjectsView } from '@/components/ProjectsView';
import { CalendarView } from '@/components/CalendarView';
import { TimeTrackingView } from '@/components/TimeTrackingView';
import { GoalsView } from '@/components/GoalsView';
import { TeamView } from '@/components/TeamView';
import { SettingsView } from '@/components/SettingsView';
import { Button } from '@/components/ui/button';
import { Plus, Search, Bell, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { CreateTaskDialog } from '@/components/CreateTaskDialog';
import { CreateProjectDialog } from '@/components/CreateProjectDialog';

export function MainContent() {
  const [activeView, setActiveView] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  // Listen for navigation events from sidebar
  useEffect(() => {
    const handleNavigationEvent = (event: CustomEvent) => {
      if (event.detail && event.detail.viewId) {
        setActiveView(event.detail.viewId);
      }
    };

    window.addEventListener('navigate', handleNavigationEvent as EventListener);
    return () => window.removeEventListener('navigate', handleNavigationEvent as EventListener);
  }, []);

  const views = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'tasks', label: 'Tasks', icon: '✓' },
    { id: 'projects', label: 'Projects', icon: '📁' },
    { id: 'calendar', label: 'Calendar', icon: '📅' },
    { id: 'time', label: 'Time Tracking', icon: '⏱️' },
    { id: 'goals', label: 'Goals', icon: '🎯' },
    { id: 'team', label: 'Team', icon: '👥' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  const renderActiveView = () => {
    switch (activeView) {
      case 'tasks':
        return <TasksView />;
      case 'projects':
        return <ProjectsView />;
      case 'calendar':
        return <CalendarView />;
      case 'time':
        return <TimeTrackingView />;
      case 'goals':
        return <GoalsView />;
      case 'team':
        return <TeamView />;
      case 'settings':
        return <SettingsView />;
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

  const renderQuickAddButton = () => {
    switch (activeView) {
      case 'tasks':
        return (
          <CreateTaskDialog
            trigger={
              <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                <Plus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Quick Add</span>
                <span className="sm:hidden">Add</span>
              </Button>
            }
          />
        );
      case 'projects':
        return (
          <CreateProjectDialog
            trigger={
              <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                <Plus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Quick Add</span>
                <span className="sm:hidden">Add</span>
              </Button>
            }
          />
        );
      default:
        return (
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            onClick={() => {
              toast({
                title: "Quick Add",
                description: "Select what you'd like to create...",
              });
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Quick Add</span>
            <span className="sm:hidden">Add</span>
          </Button>
        );
    }
  };

  const handleNotifications = () => {
    toast({
      title: "Notifications",
      description: "No new notifications",
    });
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      toast({
        title: "Search",
        description: `Searching for "${searchQuery}"...`,
      });
    }
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Listen for navigation events from sidebar
  useEffect(() => {
    const handleNavigationEvent = (event: CustomEvent) => {
      if (event.detail && event.detail.viewId) {
        setActiveView(event.detail.viewId);
      }
    };

    window.addEventListener('navigate', handleNavigationEvent as EventListener);
    return () => window.removeEventListener('navigate', handleNavigationEvent as EventListener);
  }, []);

  return (
    <main className="flex-1 flex flex-col bg-blue-50/30">
      {/* Enhanced Header - Mobile Optimized */}
      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between p-3 md:p-4 lg:px-6">
          <div className="flex items-center space-x-3 md:space-x-4 flex-1 min-w-0">
            <SidebarTrigger className="hover:bg-blue-100 transition-colors rounded-lg p-2" />
            <div className="flex flex-col min-w-0">
              <h1 className="text-lg md:text-2xl font-bold text-blue-900 truncate">
                {getViewTitle()}
              </h1>
              <p className="text-xs md:text-sm text-blue-600 hidden sm:block">
                {getWelcomeMessage()}, let's make today productive!
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-3">
            {/* Smart Search - Hidden on small screens */}
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-4 w-4" />
              <Input 
                placeholder="Search everything..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearchKeyPress}
                className="pl-10 w-64 xl:w-72 bg-blue-50 border-blue-200 focus:bg-white focus:border-blue-400 transition-colors"
              />
              {searchQuery && (
                <div className="absolute top-full mt-1 w-full bg-white border border-blue-200 rounded-lg shadow-lg p-2 z-50">
                  <button 
                    onClick={handleSearch}
                    className="text-sm text-blue-600 hover:text-blue-800 w-full text-left"
                  >
                    Press Enter to search for "{searchQuery}"
                  </button>
                </div>
              )}
            </div>

            {/* Notifications - Hidden on mobile */}
            <Button 
              variant="outline" 
              size="sm"
              className="hidden md:flex items-center space-x-2 hover:bg-blue-50 border-blue-200"
              onClick={handleNotifications}
            >
              <Bell className="h-4 w-4" />
              <span className="hidden lg:inline">Notifications</span>
              <Badge variant="destructive" className="h-5 w-5 text-xs bg-blue-600">0</Badge>
            </Button>

            {/* Quick Add - Context Aware */}
            {renderQuickAddButton()}

            {/* User Menu */}
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full p-2 border-blue-200 hover:bg-blue-50"
              onClick={() => setActiveView('settings')}
            >
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Enhanced Navigation Tabs - Mobile Optimized */}
      <div className="border-b bg-white border-blue-200">
        <nav className="flex space-x-1 px-3 md:px-4 lg:px-6 overflow-x-auto scrollbar-hide">
          {views.map((view) => (
            <button
              key={view.id}
              onClick={() => setActiveView(view.id)}
              className={`flex items-center space-x-1 md:space-x-2 py-2 md:py-3 px-2 md:px-4 border-b-2 font-medium text-xs md:text-sm transition-all duration-200 whitespace-nowrap ${
                activeView === view.id
                  ? 'border-blue-500 text-blue-700 bg-blue-50/70'
                  : 'border-transparent text-blue-600 hover:text-blue-800 hover:border-blue-300 hover:bg-blue-50/50'
              }`}
            >
              <span className="text-sm md:text-base">{view.icon}</span>
              <span className="hidden sm:inline">{view.label}</span>
              <span className="sm:hidden">
                {view.label.split(' ')[0]}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content Area - Mobile Optimized */}
      <div className="flex-1 p-3 md:p-4 lg:p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {renderActiveView()}
        </div>
      </div>

      {/* Floating Action Button for Mobile - Context Aware */}
      <div className="fixed bottom-6 right-6 md:hidden">
        {activeView === 'tasks' ? (
          <CreateTaskDialog
            trigger={
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-full h-14 w-14"
                size="icon"
              >
                <Plus className="h-6 w-6" />
              </Button>
            }
          />
        ) : activeView === 'projects' ? (
          <CreateProjectDialog
            trigger={
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-full h-14 w-14"
                size="icon"
              >
                <Plus className="h-6 w-6" />
              </Button>
            }
          />
        ) : (
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-full h-14 w-14"
            size="icon"
            onClick={() => {
              toast({
                title: "Quick Add",
                description: "Select what you'd like to create...",
              });
            }}
          >
            <Plus className="h-6 w-6" />
          </Button>
        )}
      </div>
    </main>
  );
}
