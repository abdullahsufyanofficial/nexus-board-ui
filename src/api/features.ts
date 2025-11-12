import { supabase } from './client';
import {
  TimeEntry,
  Comment,
  Attachment,
  TaskTemplate,
  AutomationRule,
  Activity
} from '@/types';

export const timeEntriesApi = {
  async getByTaskId(taskId: string) {
    const { data, error } = await supabase
      .from('time_entries')
      .select('*')
      .eq('task_id', taskId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async create(entry: Omit<TimeEntry, 'id' | 'createdAt'>) {
    const { data, error } = await supabase
      .from('time_entries')
      .insert({
        task_id: entry.taskId,
        user_id: entry.userId,
        start_time: entry.startTime,
        end_time: entry.endTime,
        duration: entry.duration,
        description: entry.description,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};

export const commentsApi = {
  async getByTaskId(taskId: string) {
    const { data, error } = await supabase
      .from('comments')
      .select(`
        *,
        user:user_id (
          id,
          name,
          email,
          avatar,
          role
        )
      `)
      .eq('task_id', taskId)
      .order('created_at', { ascending: true });

    if (error) throw error;

    return (data || []).map(comment => ({
      id: comment.id,
      taskId: comment.task_id,
      userId: comment.user_id,
      user: {
        id: comment.user.id,
        name: comment.user.name || 'Unknown User',
        email: comment.user.email || '',
        avatar: comment.user.avatar,
        role: comment.user.role || 'member',
      },
      content: comment.content,
      mentions: comment.mentions || [],
      createdAt: comment.created_at,
      updatedAt: comment.updated_at,
    }));
  },

  async create(taskId: string, content: string, userId: string) {
    const { data, error } = await supabase
      .from('comments')
      .insert({
        task_id: taskId,
        user_id: userId,
        content,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};

export const attachmentsApi = {
  async getByTaskId(taskId: string) {
    const { data, error } = await supabase
      .from('attachments')
      .select('*')
      .eq('task_id', taskId)
      .order('uploaded_at', { ascending: false });

    if (error) throw error;

    return (data || []).map(att => ({
      id: att.id,
      name: att.name,
      url: att.url,
      size: att.size,
      type: att.type,
      uploadedAt: att.uploaded_at,
      uploadedBy: att.uploaded_by,
    }));
  },

  async create(taskId: string, file: File, userId: string) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${taskId}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('task-attachments')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('task-attachments')
      .getPublicUrl(filePath);

    const { data, error } = await supabase
      .from('attachments')
      .insert({
        task_id: taskId,
        name: file.name,
        url: publicUrl,
        size: file.size,
        type: file.type,
        uploaded_by: userId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(attachmentId: string) {
    const { error } = await supabase
      .from('attachments')
      .delete()
      .eq('id', attachmentId);

    if (error) throw error;
  },
};

export const dependenciesApi = {
  async getByTaskId(taskId: string) {
    const { data, error } = await supabase
      .from('task_dependencies')
      .select('depends_on_task_id')
      .eq('task_id', taskId);

    if (error) throw error;
    return (data || []).map(d => d.depends_on_task_id);
  },

  async add(taskId: string, dependsOnTaskId: string) {
    const { error } = await supabase
      .from('task_dependencies')
      .insert({
        task_id: taskId,
        depends_on_task_id: dependsOnTaskId,
      });

    if (error) throw error;
  },

  async remove(taskId: string, dependsOnTaskId: string) {
    const { error } = await supabase
      .from('task_dependencies')
      .delete()
      .eq('task_id', taskId)
      .eq('depends_on_task_id', dependsOnTaskId);

    if (error) throw error;
  },
};

export const templatesApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('task_templates')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || []).map(t => ({
      id: t.id,
      name: t.name,
      description: t.description,
      priority: t.priority,
      estimatedHours: t.estimated_hours,
      tags: t.tags || [],
      checklistItems: t.checklist_items || [],
      customFields: t.custom_fields,
      createdBy: t.created_by,
      createdAt: t.created_at,
    }));
  },

  async create(template: Omit<TaskTemplate, 'id' | 'createdAt'>) {
    const { data, error } = await supabase
      .from('task_templates')
      .insert({
        name: template.name,
        description: template.description,
        priority: template.priority,
        estimated_hours: template.estimatedHours,
        tags: template.tags,
        checklist_items: template.checklistItems,
        custom_fields: template.customFields,
        created_by: template.createdBy,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};

export const automationApi = {
  async getByProjectId(projectId: string) {
    const { data, error } = await supabase
      .from('automation_rules')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || []).map(r => ({
      id: r.id,
      name: r.name,
      trigger: r.trigger,
      conditions: r.conditions || [],
      actions: r.actions || [],
      enabled: r.enabled,
    }));
  },

  async toggle(ruleId: string, enabled: boolean) {
    const { error } = await supabase
      .from('automation_rules')
      .update({ enabled })
      .eq('id', ruleId);

    if (error) throw error;
  },

  async create(projectId: string, rule: Omit<AutomationRule, 'id'>, userId: string) {
    const { data, error } = await supabase
      .from('automation_rules')
      .insert({
        project_id: projectId,
        name: rule.name,
        trigger: rule.trigger,
        conditions: rule.conditions,
        actions: rule.actions,
        enabled: rule.enabled,
        created_by: userId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};

export const activitiesApi = {
  async getRecent(limit = 20) {
    const { data, error } = await supabase
      .from('activities')
      .select(`
        *,
        user:user_id (
          id,
          name,
          email,
          avatar,
          role
        )
      `)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return (data || []).map(act => ({
      id: act.id,
      type: act.type,
      title: act.title,
      description: act.description,
      user: {
        id: act.user.id,
        name: act.user.name || 'Unknown User',
        email: act.user.email || '',
        avatar: act.user.avatar,
        role: act.user.role || 'member',
      },
      projectId: act.project_id,
      taskId: act.task_id,
      metadata: act.metadata,
      createdAt: act.created_at,
    }));
  },

  async create(activity: Omit<Activity, 'id' | 'createdAt'>) {
    const { error } = await supabase
      .from('activities')
      .insert({
        type: activity.type,
        title: activity.title,
        description: activity.description,
        user_id: activity.user.id,
        project_id: activity.projectId,
        task_id: activity.taskId,
        metadata: activity.metadata,
      });

    if (error) throw error;
  },
};
