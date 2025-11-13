-- Add mentions column to comments table
ALTER TABLE public.comments
ADD COLUMN IF NOT EXISTS mentions TEXT[] DEFAULT '{}';

-- Create attachments table for file uploads
CREATE TABLE IF NOT EXISTS public.attachments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  task_id UUID NOT NULL REFERENCES public.tasks(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  size INTEGER NOT NULL,
  type TEXT NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  uploaded_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on attachments
ALTER TABLE public.attachments ENABLE ROW LEVEL SECURITY;

-- Create policies for attachments
CREATE POLICY "Users can view attachments for tasks they can access"
ON public.attachments FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.tasks
    WHERE tasks.id = attachments.task_id
  )
);

CREATE POLICY "Users can upload attachments to tasks"
ON public.attachments FOR INSERT
WITH CHECK (auth.uid() = uploaded_by);

CREATE POLICY "Users can delete their own attachments"
ON public.attachments FOR DELETE
USING (auth.uid() = uploaded_by);

-- Create task_templates table
CREATE TABLE IF NOT EXISTS public.task_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  default_assignee UUID REFERENCES auth.users(id),
  estimated_hours INTEGER,
  tags TEXT[] DEFAULT '{}',
  checklist JSONB DEFAULT '[]',
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on task_templates
ALTER TABLE public.task_templates ENABLE ROW LEVEL SECURITY;

-- Create policies for task_templates
CREATE POLICY "Users can view all task templates"
ON public.task_templates FOR SELECT
USING (true);

CREATE POLICY "Users can create task templates"
ON public.task_templates FOR INSERT
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own task templates"
ON public.task_templates FOR UPDATE
USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own task templates"
ON public.task_templates FOR DELETE
USING (auth.uid() = created_by);

-- Create trigger for task_templates updated_at
CREATE TRIGGER update_task_templates_updated_at
BEFORE UPDATE ON public.task_templates
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Create storage bucket for task attachments
INSERT INTO storage.buckets (id, name, public)
VALUES ('task-attachments', 'task-attachments', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for task attachments
CREATE POLICY "Users can upload task attachments"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'task-attachments' AND
  auth.uid() IS NOT NULL
);

CREATE POLICY "Users can view task attachments"
ON storage.objects FOR SELECT
USING (bucket_id = 'task-attachments');

CREATE POLICY "Users can delete their own task attachments"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'task-attachments' AND
  auth.uid()::text = (storage.foldername(name))[1]
);