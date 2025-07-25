-- Enable Row Level Security on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_tags ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE task_tag ENABLE ROW LEVEL SECURITY;

-- Projects policies
CREATE POLICY "Users can view own projects" ON projects
  FOR SELECT USING (auth.uid()::text = created_by::text);

CREATE POLICY "Users can insert own projects" ON projects
  FOR INSERT WITH CHECK (auth.uid()::text = created_by::text);

CREATE POLICY "Users can update own projects" ON projects
  FOR UPDATE USING (auth.uid()::text = created_by::text);

CREATE POLICY "Users can delete own projects" ON projects
  FOR DELETE USING (auth.uid()::text = created_by::text);

-- Tasks policies
CREATE POLICY "Users can view own tasks" ON tasks
  FOR SELECT USING (
    auth.uid()::text = created_by::text OR 
    auth.uid()::text = assignee_id::text
  );

CREATE POLICY "Users can insert own tasks" ON tasks
  FOR INSERT WITH CHECK (auth.uid()::text = created_by::text);

CREATE POLICY "Users can update own tasks" ON tasks
  FOR UPDATE USING (
    auth.uid()::text = created_by::text OR 
    auth.uid()::text = assignee_id::text
  );

CREATE POLICY "Users can delete own tasks" ON tasks
  FOR DELETE USING (auth.uid()::text = created_by::text);

-- Users policies
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Events policies
CREATE POLICY "Users can view own events" ON events
  FOR SELECT USING (auth.uid()::text = created_by::text);

CREATE POLICY "Users can insert own events" ON events
  FOR INSERT WITH CHECK (auth.uid()::text = created_by::text);

CREATE POLICY "Users can update own events" ON events
  FOR UPDATE USING (auth.uid()::text = created_by::text);

CREATE POLICY "Users can delete own events" ON events
  FOR DELETE USING (auth.uid()::text = created_by::text);

-- Notifications policies
CREATE POLICY "Users can view own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own notifications" ON notifications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own notifications" ON notifications
  FOR DELETE USING (auth.uid() = user_id);

-- Project members policies
CREATE POLICY "Users can view project members" ON project_members
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = project_members.project_id 
      AND projects.created_by::text = auth.uid()::text
    )
  );

CREATE POLICY "Users can insert project members" ON project_members
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = project_members.project_id 
      AND projects.created_by::text = auth.uid()::text
    )
  );

CREATE POLICY "Users can update project members" ON project_members
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = project_members.project_id 
      AND projects.created_by::text = auth.uid()::text
    )
  );

CREATE POLICY "Users can delete project members" ON project_members
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = project_members.project_id 
      AND projects.created_by::text = auth.uid()::text
    )
  );

-- Project tags policies
CREATE POLICY "Users can view project tags" ON project_tags
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = project_tags.project_id 
      AND projects.created_by::text = auth.uid()::text
    )
  );

CREATE POLICY "Users can insert project tags" ON project_tags
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = project_tags.project_id 
      AND projects.created_by::text = auth.uid()::text
    )
  );

CREATE POLICY "Users can update project tags" ON project_tags
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = project_tags.project_id 
      AND projects.created_by::text = auth.uid()::text
    )
  );

CREATE POLICY "Users can delete project tags" ON project_tags
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = project_tags.project_id 
      AND projects.created_by::text = auth.uid()::text
    )
  );

-- Task tags policies
-- CREATE POLICY "Users can view task tags" ON task_tag
--   FOR SELECT USING (
--     EXISTS (
--       SELECT 1 FROM tasks 
--       WHERE tasks.id = task_tag.task_id 
--       AND (tasks.created_by::text = auth.uid()::text OR tasks.assignee_id::text = auth.uid()::text)
--     )
--   );

-- CREATE POLICY "Users can insert task tags" ON task_tag
--   FOR INSERT WITH CHECK (
--     EXISTS (
--       SELECT 1 FROM tasks 
--       WHERE tasks.id = task_tag.task_id 
--       AND tasks.created_by::text = auth.uid()::text
--     )
--   );

-- CREATE POLICY "Users can update task tags" ON task_tag
--   FOR UPDATE USING (
--     EXISTS (
--       SELECT 1 FROM tasks 
--       WHERE tasks.id = task_tag.task_id 
--       AND tasks.created_by::text = auth.uid()::text
--     )
--   );

-- CREATE POLICY "Users can delete task tags" ON task_tag
--   FOR DELETE USING (
--     EXISTS (
--       SELECT 1 FROM tasks 
--       WHERE tasks.id = task_tag.task_id 
--       AND tasks.created_by::text = auth.uid()::text
--     )
--   );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_created_by ON projects(created_by);
CREATE INDEX IF NOT EXISTS idx_tasks_created_by ON tasks(created_by);
CREATE INDEX IF NOT EXISTS idx_tasks_assignee_id ON tasks(assignee_id);
CREATE INDEX IF NOT EXISTS idx_events_created_by ON events(created_by);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_project_members_project_id ON project_members(project_id);
CREATE INDEX IF NOT EXISTS idx_project_tags_project_id ON project_tags(project_id);
-- CREATE INDEX IF NOT EXISTS idx_task_tag_task_id ON task_tag(task_id); 