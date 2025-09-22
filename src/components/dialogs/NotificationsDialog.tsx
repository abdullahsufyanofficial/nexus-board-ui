import { Bell, Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface NotificationsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockNotifications = [
  {
    id: 1,
    title: "Task Assigned",
    message: "You've been assigned to 'Implement user authentication'",
    time: "2 minutes ago",
    unread: true,
    type: "task"
  },
  {
    id: 2,
    title: "Project Update",
    message: "Project 'Mobile App' has been updated",
    time: "1 hour ago",
    unread: true,
    type: "project"
  },
  {
    id: 3,
    title: "Team Member Added",
    message: "Sarah Johnson joined your team",
    time: "3 hours ago",
    unread: false,
    type: "team"
  }
];

export function NotificationsDialog({ open, onOpenChange }: NotificationsDialogProps) {
  const unreadCount = mockNotifications.filter(n => n.unread).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-auto">
                {unreadCount}
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[400px]">
          <div className="space-y-4">
            {mockNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg border ${
                  notification.unread 
                    ? 'bg-primary/5 border-primary/20' 
                    : 'bg-muted/30 border-border'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium">{notification.title}</h4>
                      {notification.unread && (
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {notification.time}
                    </p>
                  </div>
                  
                  <div className="flex gap-1 ml-2">
                    {notification.unread && (
                      <Button size="icon" variant="ghost" className="h-6 w-6">
                        <Check className="h-3 w-3" />
                      </Button>
                    )}
                    <Button size="icon" variant="ghost" className="h-6 w-6 text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="flex justify-between pt-4">
          <Button variant="outline" size="sm">
            Mark All Read
          </Button>
          <Button variant="outline" size="sm">
            Clear All
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}