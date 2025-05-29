
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
    { id: 'tasks', label: 'Tasks', icon: '✓', badge: '8' },
    { id: 'projects', label: 'Projects', icon: '📁', badge: '3' },
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

  const handleQuickAdd = () => {
    // Navigate to appropriate add form based on current view
    switch (activeView) {
      case 'tasks':
        toast({
          title: "Create New Task",
          description: "Opening task creation form...",
        });
        break;
      case 'projects':
        toast({
          title: "Create New Project",
          description: "Opening project creation form...",
        });
        break;
      case 'goals':
        toast({
          title: "Create New Goal",
          description: "Opening goal creation form...",
        });
        break;
      case 'team':
        toast({
          title: "Invite Team Member",
          description: "Opening team member invitation form...",
        });
        break;
      default:
        toast({
          title: "Quick Add",
          description: "Select what you'd like to create...",
        });
    }
  };

  const handleNotifications = () => {
    toast({
      title: "Notifications",
      description: "You have 3 new notifications",
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

  return (
    <main className="flex-1 flex flex-col bg-blue-50/30">
      {/* Enhanced Header */}
      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between p-4 lg:px-6">
          <div className="flex items-center space-x-4">
            <SidebarTrigger className="hover:bg-blue-100 transition-colors rounded-lg p-2" />
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-blue-900">
                {getViewTitle()}
              </h1>
              <p className="text-sm text-blue-600 hidden sm:block">
                {getWelcomeMessage()}, let's make today productive!
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Smart Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-4 w-4" />
              <Input 
                placeholder="Search everything..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearchKeyPress}
                className="pl-10 w-72 bg-blue-50 border-blue-200 focus:bg-white focus:border-blue-400 transition-colors"
              />
              {searchQuery && (
                <div className="absolute top-full mt-1 w-full bg-white border border-blue-200 rounded-lg shadow-lg p-2">
                  <button 
                    onClick={handleSearch}
                    className="text-sm text-blue-600 hover:text-blue-800 w-full text-left"
                  >
                    Press Enter to search for "{searchQuery}"
                  </button>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <Button 
              variant="outline" 
              size="sm"
              className="hidden lg:flex items-center space-x-2 hover:bg-blue-50 border-blue-200"
              onClick={handleNotifications}
            >
              <Bell className="h-4 w-4" />
              <span className="hidden xl:inline">Notifications</span>
              <Badge variant="destructive" className="h-5 w-5 text-xs bg-blue-600">3</Badge>
            </Button>

            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              onClick={handleQuickAdd}
            >
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Quick Add</span>
            </Button>

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

      {/* Enhanced Navigation Tabs */}
      <div className="border-b bg-white border-blue-200">
        <nav className="flex space-x-1 px-4 lg:px-6 overflow-x-auto">
          {views.map((view) => (
            <button
              key={view.id}
              onClick={() => setActiveView(view.id)}
              className={`flex items-center space-x-2 py-3 px-4 border-b-2 font-medium text-sm transition-all duration-200 whitespace-nowrap ${
                activeView === view.id
                  ? 'border-blue-500 text-blue-700 bg-blue-50/70'
                  : 'border-transparent text-blue-600 hover:text-blue-800 hover:border-blue-300 hover:bg-blue-50/50'
              }`}
            >
              <span className="text-base">{view.icon}</span>
              <span>{view.label}</span>
              {view.badge && (
                <Badge 
                  variant={activeView === view.id ? "default" : "secondary"} 
                  className={`h-5 text-xs ${activeView === view.id ? 'bg-blue-600' : 'bg-blue-200 text-blue-700'}`}
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
        className="fixed bottom-6 right-6 md:hidden bg-blue-600 hover:bg-blue-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-full h-14 w-14"
        size="icon"
        onClick={handleQuickAdd}
      >
        <Plus className="h-6 w-6" />
      </Button>
    </main>
  );
}
