-- Add missing columns to task_templates table
ALTER TABLE public.task_templates
ADD COLUMN IF NOT EXISTS priority TEXT DEFAULT 'medium',
ADD COLUMN IF NOT EXISTS checklist_items JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS custom_fields JSONB DEFAULT '{}';

-- Add missing columns to activities table for better tracking
ALTER TABLE public.activities
ADD COLUMN IF NOT EXISTS type TEXT,
ADD COLUMN IF NOT EXISTS title TEXT,
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
ADD COLUMN IF NOT EXISTS task_id UUID REFERENCES public.tasks(id) ON DELETE CASCADE;

-- Create automation_rules table
CREATE TABLE IF NOT EXISTS public.automation_rules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  trigger TEXT NOT NULL,
  conditions JSONB DEFAULT '[]',
  actions JSONB DEFAULT '[]',
  enabled BOOLEAN DEFAULT true,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on automation_rules
ALTER TABLE public.automation_rules ENABLE ROW LEVEL SECURITY;

-- Create policies for automation_rules
CREATE POLICY "Users can view automation rules for their projects"
ON public.automation_rules FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.projects
    WHERE projects.id = automation_rules.project_id
    AND projects.owner_id = auth.uid()
  )
);

CREATE POLICY "Users can create automation rules for their projects"
ON public.automation_rules FOR INSERT
WITH CHECK (
  auth.uid() = created_by AND
  EXISTS (
    SELECT 1 FROM public.projects
    WHERE projects.id = automation_rules.project_id
    AND projects.owner_id = auth.uid()
  )
);

CREATE POLICY "Users can update automation rules for their projects"
ON public.automation_rules FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.projects
    WHERE projects.id = automation_rules.project_id
    AND projects.owner_id = auth.uid()
  )
);

CREATE POLICY "Users can delete automation rules for their projects"
ON public.automation_rules FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.projects
    WHERE projects.id = automation_rules.project_id
    AND projects.owner_id = auth.uid()
  )
);

-- Create trigger for automation_rules updated_at
CREATE TRIGGER update_automation_rules_updated_at
BEFORE UPDATE ON public.automation_rules
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();