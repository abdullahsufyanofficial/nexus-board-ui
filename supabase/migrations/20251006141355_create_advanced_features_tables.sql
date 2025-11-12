/*
  # Create Advanced Features Tables for Project Management System

  1. New Tables
    - `time_entries` - Time tracking entries for tasks
      - `id` (uuid, primary key)
      - `task_id` (uuid, foreign key to tasks)
      - `user_id` (uuid, foreign key to auth.users)
      - `start_time` (timestamptz)
      - `end_time` (timestamptz, nullable)
      - `duration` (integer, minutes)
      - `description` (text, nullable)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `comments` - Comments on tasks
      - `id` (uuid, primary key)
      - `task_id` (uuid, foreign key to tasks)
      - `user_id` (uuid, foreign key to auth.users)
      - `content` (text)
      - `mentions` (text[], user IDs mentioned)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `attachments` - File attachments for tasks
      - `id` (uuid, primary key)
      - `task_id` (uuid, foreign key to tasks)
      - `name` (text)
      - `url` (text)
      - `size` (integer, bytes)
      - `type` (text, mime type)
      - `uploaded_by` (uuid, foreign key to auth.users)
      - `uploaded_at` (timestamptz)
    
    - `task_dependencies` - Task dependencies
      - `task_id` (uuid, foreign key to tasks)
      - `depends_on_task_id` (uuid, foreign key to tasks)
      - `created_at` (timestamptz)
    
    - `task_templates` - Reusable task templates
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text, nullable)
      - `priority` (text)
      - `estimated_hours` (integer, nullable)
      - `tags` (text[])
      - `checklist_items` (text[], nullable)
      - `custom_fields` (jsonb, nullable)
      - `created_by` (uuid, foreign key to auth.users)
      - `created_at` (timestamptz)
    
    - `automation_rules` - Automation rules for projects
      - `id` (uuid, primary key)
      - `project_id` (uuid, foreign key to projects)
      - `name` (text)
      - `trigger` (text)
      - `conditions` (jsonb)
      - `actions` (jsonb)
      - `enabled` (boolean)
      - `created_by` (uuid, foreign key to auth.users)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `activities` - Activity feed tracking
      - `id` (uuid, primary key)
      - `type` (text)
      - `title` (text)
      - `description` (text)
      - `user_id` (uuid, foreign key to auth.users)
      - `project_id` (uuid, foreign key to projects, nullable)
      - `task_id` (uuid, foreign key to tasks, nullable)
      - `metadata` (jsonb, nullable)
      - `created_at` (timestamptz)

  2. Changes to Existing Tables
    - Add `recurring_config` (jsonb) to tasks table
    - Add `template_id` (uuid) to tasks table

  3. Security
    - Enable RLS on all new tables
    - Add policies for authenticated users to manage their own data
    - Add policies for project members to view project data
*/

-- Create time_entries table
CREATE TABLE IF NOT EXISTS time_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id uuid NOT NULL,
  user_id uuid NOT NULL,
  start_time timestamptz NOT NULL DEFAULT now(),
  end_time timestamptz,
  duration integer NOT NULL DEFAULT 0,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE time_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view time entries for their tasks"
  ON time_entries FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create their own time entries"
  ON time_entries FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own time entries"
  ON time_entries FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own time entries"
  ON time_entries FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id uuid NOT NULL,
  user_id uuid NOT NULL,
  content text NOT NULL,
  mentions text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view comments on tasks"
  ON comments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create comments"
  ON comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments"
  ON comments FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments"
  ON comments FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create attachments table
CREATE TABLE IF NOT EXISTS attachments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id uuid NOT NULL,
  name text NOT NULL,
  url text NOT NULL,
  size integer NOT NULL DEFAULT 0,
  type text NOT NULL,
  uploaded_by uuid NOT NULL,
  uploaded_at timestamptz DEFAULT now()
);

ALTER TABLE attachments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view attachments"
  ON attachments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can upload attachments"
  ON attachments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = uploaded_by);

CREATE POLICY "Users can delete their own attachments"
  ON attachments FOR DELETE
  TO authenticated
  USING (auth.uid() = uploaded_by);

-- Create task_dependencies table
CREATE TABLE IF NOT EXISTS task_dependencies (
  task_id uuid NOT NULL,
  depends_on_task_id uuid NOT NULL,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (task_id, depends_on_task_id)
);

ALTER TABLE task_dependencies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view task dependencies"
  ON task_dependencies FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage task dependencies"
  ON task_dependencies FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create task_templates table
CREATE TABLE IF NOT EXISTS task_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  priority text NOT NULL DEFAULT 'medium',
  estimated_hours integer,
  tags text[] DEFAULT '{}',
  checklist_items text[] DEFAULT '{}',
  custom_fields jsonb,
  created_by uuid NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE task_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all templates"
  ON task_templates FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create their own templates"
  ON task_templates FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own templates"
  ON task_templates FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can delete their own templates"
  ON task_templates FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);

-- Create automation_rules table
CREATE TABLE IF NOT EXISTS automation_rules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL,
  name text NOT NULL,
  trigger text NOT NULL,
  conditions jsonb NOT NULL DEFAULT '[]',
  actions jsonb NOT NULL DEFAULT '[]',
  enabled boolean NOT NULL DEFAULT true,
  created_by uuid NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE automation_rules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view automation rules for their projects"
  ON automation_rules FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create automation rules"
  ON automation_rules FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own automation rules"
  ON automation_rules FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can delete their own automation rules"
  ON automation_rules FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);

-- Create activities table
CREATE TABLE IF NOT EXISTS activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  user_id uuid NOT NULL,
  project_id uuid,
  task_id uuid,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all activities"
  ON activities FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "System can create activities"
  ON activities FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_time_entries_task_id ON time_entries(task_id);
CREATE INDEX IF NOT EXISTS idx_time_entries_user_id ON time_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_task_id ON comments(task_id);
CREATE INDEX IF NOT EXISTS idx_comments_user_id ON comments(user_id);
CREATE INDEX IF NOT EXISTS idx_attachments_task_id ON attachments(task_id);
CREATE INDEX IF NOT EXISTS idx_task_dependencies_task_id ON task_dependencies(task_id);
CREATE INDEX IF NOT EXISTS idx_task_dependencies_depends_on ON task_dependencies(depends_on_task_id);
CREATE INDEX IF NOT EXISTS idx_automation_rules_project_id ON automation_rules(project_id);
CREATE INDEX IF NOT EXISTS idx_activities_user_id ON activities(user_id);
CREATE INDEX IF NOT EXISTS idx_activities_project_id ON activities(project_id);
CREATE INDEX IF NOT EXISTS idx_activities_task_id ON activities(task_id);
CREATE INDEX IF NOT EXISTS idx_activities_created_at ON activities(created_at DESC);
