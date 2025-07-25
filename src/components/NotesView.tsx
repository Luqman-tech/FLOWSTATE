import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Plus, FileText, Tag, Link, Sparkles, FolderOpen } from 'lucide-react';
import { FloatingActionButton } from './ui/FloatingActionButton';

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  folder?: string;
  created_at: string;
  updated_at: string;
  linked_notes: string[];
  linked_tasks: string[];
}

export function NotesView() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '', tags: [] as string[] });
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [selectedFolder, setSelectedFolder] = useState<string>('all');

  const folders = ['all', 'work', 'personal', 'ideas', 'meetings'];

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFolder = selectedFolder === 'all' || note.folder === selectedFolder;
    return matchesSearch && matchesFolder;
  });

  const handleCreateNote = () => {
    const note: Note = {
      id: Date.now().toString(),
      title: newNote.title,
      content: newNote.content,
      tags: newNote.tags,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      linked_notes: [],
      linked_tasks: [],
    };
    setNotes([note, ...notes]);
    setNewNote({ title: '', content: '', tags: [] });
    setIsCreating(false);
  };

  const handleUpdateNote = (id: string, updates: Partial<Note>) => {
    setNotes(notes.map(note => 
      note.id === id 
        ? { ...note, ...updates, updated_at: new Date().toISOString() }
        : note
    ));
  };

  const extractTasksFromNote = (content: string) => {
    // AI-powered task extraction logic would go here
    const taskPattern = /- \[ \] (.+)/g;
    const tasks = [];
    let match;
    while ((match = taskPattern.exec(content)) !== null) {
      tasks.push(match[1]);
    }
    return tasks;
  };

  const generateAISummary = (content: string) => {
    // AI summary generation would go here
    return content.length > 200 ? content.substring(0, 200) + '...' : content;
  };

  return (
    <div className="h-full flex flex-col relative">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Notes & Knowledge</h2>
          <p className="text-gray-600">Capture ideas, meeting notes, and knowledge</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}>
            {viewMode === 'list' ? 'Grid' : 'List'}
          </Button>
          <Dialog open={isCreating} onOpenChange={setIsCreating}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Note
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Create New Note</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Note title..."
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                />
                <Tabs defaultValue="rich" className="w-full">
                  <TabsList>
                    <TabsTrigger value="rich">Rich Text</TabsTrigger>
                    <TabsTrigger value="markdown">Markdown</TabsTrigger>
                  </TabsList>
                  <TabsContent value="rich" className="mt-4">
                    <Textarea
                      placeholder="Start writing your note..."
                      value={newNote.content}
                      onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                      className="min-h-[300px]"
                    />
                  </TabsContent>
                  <TabsContent value="markdown" className="mt-4">
                    <Textarea
                      placeholder="Write in markdown..."
                      value={newNote.content}
                      onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                      className="min-h-[300px] font-mono"
                    />
                  </TabsContent>
                </Tabs>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-gray-500" />
                  <Input
                    placeholder="Add tags (comma separated)..."
                    value={newNote.tags.join(', ')}
                    onChange={(e) => setNewNote({ 
                      ...newNote, 
                      tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                    })}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreating(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateNote}>
                    Create Note
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="p-6 border-b bg-gray-50">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            {folders.map(folder => (
              <Button
                key={folder}
                variant={selectedFolder === folder ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFolder(folder)}
              >
                <FolderOpen className="w-4 h-4 mr-1" />
                {folder.charAt(0).toUpperCase() + folder.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Notes Content */}
      <div className="flex-1 p-6">
        {viewMode === 'list' ? (
          <div className="space-y-4">
            {filteredNotes.map(note => (
              <Card key={note.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{note.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {generateAISummary(note.content)}
                      </p>
                      <div className="flex items-center gap-2">
                        {note.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{new Date(note.updated_at).toLocaleDateString()}</span>
                      {note.linked_tasks.length > 0 && (
                        <Badge variant="outline" className="text-xs">
                          {note.linked_tasks.length} tasks
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNotes.map(note => (
              <Card key={note.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{note.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {generateAISummary(note.content)}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {note.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {note.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{note.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{new Date(note.updated_at).toLocaleDateString()}</span>
                    {note.linked_tasks.length > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {note.linked_tasks.length} tasks
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredNotes.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notes found</h3>
            <p className="text-gray-500 mb-4">
              {searchQuery ? 'Try adjusting your search terms' : 'Create your first note to get started'}
            </p>
            {!searchQuery && (
              <Button onClick={() => setIsCreating(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Note
              </Button>
            )}
          </div>
        )}
      </div>
      <FloatingActionButton />
    </div>
  );
} 