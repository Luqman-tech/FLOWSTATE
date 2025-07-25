
import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { MainContent } from '@/components/MainContent';

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-blue-50">
        <AppSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
        <MainContent sidebarCollapsed={sidebarCollapsed} />
      </div>
    </SidebarProvider>
  );
};

export default Index;
