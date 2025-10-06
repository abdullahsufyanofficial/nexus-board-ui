import { useState } from 'react';
import { TaskTemplate } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, Plus } from 'lucide-react';

interface TaskTemplatesProps {
  templates: TaskTemplate[];
  onUseTemplate: (template: TaskTemplate) => void;
}

const TaskTemplates = ({ templates, onUseTemplate }: TaskTemplatesProps) => {
  const [open, setOpen] = useState(false);

  const handleUseTemplate = (template: TaskTemplate) => {
    onUseTemplate(template);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FileText className="h-4 w-4 mr-2" />
          Use Template
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Task Templates</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[500px]">
          <div className="grid gap-4 p-4">
            {templates.map((template) => (
              <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-base">{template.name}</CardTitle>
                  {template.description && (
                    <p className="text-sm text-muted-foreground">{template.description}</p>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      <Badge>{template.priority}</Badge>
                      {template.estimatedHours && (
                        <Badge variant="outline">{template.estimatedHours}h</Badge>
                      )}
                      {template.tags.map(tag => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                    <Button size="sm" onClick={() => handleUseTemplate(template)}>
                      <Plus className="h-4 w-4 mr-1" />
                      Use
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default TaskTemplates;
