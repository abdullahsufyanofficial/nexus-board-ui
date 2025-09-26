import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { ArrowLeft, Settings, Users, Calendar, ExternalLink, UserPlus, SquareCheck as CheckSquare, Clock, CircleAlert as AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { RootState } from '../store';
import { fetchProjectById } from '../store/slices/projectsSlice';
import { fetchTasks } from '../store/slices/tasksSlice';
import TeamMemberDialog from '../components/dialogs/TeamMemberDialog';
import AddTeamMemberDialog from '../components/dialogs/AddTeamMemberDialog';

const ProjectDetailPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const dispatch = useDispatch();
  const { currentProject, isLoading } = useSelector((state: RootState) => state.projects);
  const { tasks } = useSelector((state: RootState) => state.tasks);
  
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [showMemberDialog, setShowMemberDialog] = useState(false);
  const [showAddMemberDialog, setShowAddMemberDialog] = useState(false);

  useEffect(() => {
    if (projectId) {
      dispatch(fetchProjectById(projectId) as any);
      dispatch(fetchTasks(projectId) as any);
    }
  }, [dispatch, projectId]);

  if (!projectId) {
    return <Navigate to="/projects" replace />;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!currentProject) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold">Project not found</h3>
        <Link to="/projects">
          <Button className="mt-4">Back to Projects</Button>
        </Link>
      </div>
    );
  }

  const projectTasks = tasks.filter(task => task.projectId === projectId);
  const completedTasks = projectTasks.filter(task => task.status === 'done').length;
  const totalTasks = projectTasks.length;

  const handleMemberManage = (member: any) => {
    setSelectedMember(member);
    setShowMemberDialog(true);
  };

  // Mock activity data
  const mockActivities = [
    { id: 1, user: 'John Doe', action: 'completed task', target: 'Fix login bug', time: '2 hours ago' },
    { id: 2, user: 'Jane Smith', action: 'created task', target: 'Update dashboard UI', time: '4 hours ago' },
    { id: 3, user: 'Mike Johnson', action: 'commented on', target: 'API integration', time: '6 hours ago' },
    { id: 4, user: 'Sarah Wilson', action: 'updated status', target: 'User authentication', time: '1 day ago' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success text-success-foreground';
      case 'paused':
        return 'bg-warning text-warning-foreground';
      case 'completed':
        return 'bg-primary text-primary-foreground';
      case 'archived':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-4 mb-4">
          <Link to="/dashboard/projects">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{currentProject.name}</h1>
              <Badge className={getStatusColor(currentProject.status)}>
                {currentProject.status}
              </Badge>
            </div>
            <p className="text-muted-foreground">{currentProject.description}</p>
          </div>
          <div className="flex gap-2">
            <Link to={`/dashboard/projects/${projectId}/board`}>
              <Button variant="outline">
                View Board
              </Button>
            </Link>
            <Link to={`/dashboard/projects/${projectId}/settings`}>
              <Button>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Progress</p>
                  <p className="text-2xl font-bold">{currentProject.progress}%</p>
                </div>
                <Progress value={currentProject.progress} className="w-16 h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tasks</p>
                  <p className="text-2xl font-bold">{completedTasks}/{totalTasks}</p>
                </div>
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Team Size</p>
                  <p className="text-2xl font-bold">{currentProject.members.length}</p>
                </div>
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Due Date</p>
                  <p className="text-sm font-medium">
                    {currentProject.endDate 
                      ? new Date(currentProject.endDate).toLocaleDateString()
                      : 'No date set'
                    }
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Content Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tasks">Tasks ({totalTasks})</TabsTrigger>
            <TabsTrigger value="team">Team ({currentProject.members.length})</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                {/* Project Description */}
                <Card>
                  <CardHeader>
                    <CardTitle>About this project</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {currentProject.description}
                    </p>
                    
                    {currentProject.repo && (
                      <div className="mt-4">
                        <a
                          href={`https://${currentProject.repo}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary hover:underline"
                        >
                          <ExternalLink className="h-4 w-4" />
                          View Repository
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Tags */}
                <Card>
                  <CardHeader>
                    <CardTitle>Tags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {currentProject.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {/* Project Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Project Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <Badge className={getStatusColor(currentProject.status)}>
                        {currentProject.status}
                      </Badge>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Visibility</p>
                      <p className="font-medium capitalize">{currentProject.visibility}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Start Date</p>
                      <p className="font-medium">
                        {currentProject.startDate 
                          ? new Date(currentProject.startDate).toLocaleDateString()
                          : 'Not set'
                        }
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">End Date</p>
                      <p className="font-medium">
                        {currentProject.endDate 
                          ? new Date(currentProject.endDate).toLocaleDateString()
                          : 'Not set'
                        }
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Created</p>
                      <p className="font-medium">
                        {new Date(currentProject.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Team Members */}
                <Card>
                  <CardHeader>
                    <CardTitle>Team Members</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {currentProject.members.map((member) => (
                      <div key={member.id} className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>
                            {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground capitalize">
                            {member.role}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tasks">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Project Tasks</CardTitle>
                  <Link to={`/dashboard/projects/${projectId}/board`}>
                    <Button variant="outline">View Kanban Board</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projectTasks.length > 0 ? (
                    projectTasks.slice(0, 10).map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${
                            task.status === 'done' ? 'bg-success' :
                            task.status === 'in-progress' ? 'bg-primary' :
                            task.status === 'review' ? 'bg-warning' :
                            'bg-muted-foreground'
                          }`} />
                          <div>
                            <p className="font-medium">{task.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {task.assignees[0]?.name} • {task.priority} priority
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={task.status === 'done' ? 'default' : 'outline'}>
                            {task.status}
                          </Badge>
                          {task.dueDate && (
                            <Badge variant="outline" className="text-xs">
                              Due {new Date(task.dueDate).toLocaleDateString()}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <CheckSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                      <p>No tasks yet</p>
                      <Link to={`/dashboard/projects/${projectId}/board`}>
                        <Button className="mt-4">Create First Task</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Team Management</CardTitle>
                    <Button onClick={() => setShowAddMemberDialog(true)}>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add Member
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {currentProject.members.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback className="bg-gradient-primary text-white">
                              {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.email}</p>
                            <Badge variant="outline" className="mt-1 capitalize">
                              {member.role}
                            </Badge>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleMemberManage(member)}
                        >
                          Manage
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Project Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-4 border rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span>
                          {' '}{activity.action}{' '}
                          <span className="font-medium">{activity.target}</span>
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      <TeamMemberDialog
        open={showMemberDialog}
        onOpenChange={setShowMemberDialog}
        member={selectedMember}
      />

      <AddTeamMemberDialog
        open={showAddMemberDialog}
        onOpenChange={setShowAddMemberDialog}
        projectId={projectId!}
      />
    </div>
  );
};

export default ProjectDetailPage;