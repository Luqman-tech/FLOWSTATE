import React from 'react';
import { Plus, X, Calendar, Brain, FileText } from 'lucide-react';

export function FloatingActionButton() {
  const [fabOpen, setFabOpen] = React.useState(false);
  const handleFabToggle = () => setFabOpen((open) => !open);
  const handleNavigate = (viewId: string) => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: { viewId } }));
    setFabOpen(false);
  };
  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      {fabOpen && (
        <div className="mb-4 flex flex-col gap-3 items-end animate-fade-in">
          <button
            className="bg-white shadow-lg rounded-full p-4 flex items-center justify-center hover:bg-blue-100 transition-colors"
            onClick={() => handleNavigate('ai')}
            aria-label="AI Copilot"
          >
            <Brain className="h-6 w-6 text-blue-700" />
          </button>
          <button
            className="bg-white shadow-lg rounded-full p-4 flex items-center justify-center hover:bg-blue-100 transition-colors"
            onClick={() => handleNavigate('calendar')}
            aria-label="Calendar"
          >
            <Calendar className="h-6 w-6 text-blue-700" />
          </button>
          <button
            className="bg-white shadow-lg rounded-full p-4 flex items-center justify-center hover:bg-blue-100 transition-colors"
            onClick={() => handleNavigate('notes')}
            aria-label="Notes"
          >
            <FileText className="h-6 w-6 text-blue-700" />
          </button>
        </div>
      )}
      <button
        className={`bg-blue-600 hover:bg-blue-700 text-white shadow-2xl rounded-full h-16 w-16 flex items-center justify-center transition-transform duration-300 ${fabOpen ? 'rotate-45' : ''}`}
        onClick={handleFabToggle}
        aria-label="Open quick actions"
      >
        {fabOpen ? <X className="h-8 w-8" /> : <Plus className="h-8 w-8" />}
      </button>
    </div>
  );
} 