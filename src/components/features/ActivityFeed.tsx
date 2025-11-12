import { Activity } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';
import { 
  FileText, 
  MessageSquare, 
  Clock, 
  UserPlus, 
  CheckCircle2,
  Upload
} from 'lucide-react';

interface ActivityFeedProps {
  activities: Activity[];
  maxHeight?: string;
}

const ActivityFeed = ({ activities, maxHeight = '600px' }: ActivityFeedProps) => {
  const getActivityIcon = (type: Activity['type']) => {
    const iconProps = { className: 'h-4 w-4' };
    switch (type) {
      case 'task_created':
        return <CheckCircle2 {...iconProps} />;
      case 'task_updated':
        return <FileText {...iconProps} />;
      case 'comment_added':
        return <MessageSquare {...iconProps} />;
      case 'time_logged':
        return <Clock {...iconProps} />;
      case 'user_joined':
        return <UserPlus {...iconProps} />;
      case 'file_uploaded':
        return <Upload {...iconProps} />;
      default:
        return <FileText {...iconProps} />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea style={{ height: maxHeight }}>
          <div className="space-y-4 p-6">
            {activities.map((activity) => (
              <div key={activity.id} className="flex gap-3 items-start">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={activity.user.avatar} />
                  <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    {getActivityIcon(activity.type)}
                    <p className="text-sm">
                      <span className="font-medium">{activity.user.name}</span>{' '}
                      {activity.title}
                    </p>
                  </div>
                  {activity.description && (
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
