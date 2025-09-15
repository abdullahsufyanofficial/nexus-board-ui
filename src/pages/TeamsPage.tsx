import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Users, Mail, MoreHorizontal, Edit, Trash2, Eye, X } from 'lucide-react';

import { RootState, AppDispatch } from '@/store';
import { fetchTeams, createTeam, updateTeam, deleteTeam } from '@/store/slices/teamsSlice';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { Team, UserSummary } from '@/types';

const TeamsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();
  
  const { teams, isLoading } = useSelector((state: RootState) => state.teams);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [deletingTeam, setDeletingTeam] = useState<Team | null>(null);
  const [viewingTeam, setViewingTeam] = useState<Team | null>(null);
  const [invitingToTeam, setInvitingToTeam] = useState<Team | null>(null);
  const [inviteEmail, setInviteEmail] = useState('');

  const [newTeam, setNewTeam] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    dispatch(fetchTeams());
  }, [dispatch]);

  const handleCreateTeam = async () => {
    if (!newTeam.name.trim()) {
      toast({
        title: "Error",
        description: "Team name is required",
        variant: "destructive",
      });
      return;
    }

    try {
      await dispatch(createTeam({
        ...newTeam,
        members: [],
      })).unwrap();

      toast({
        title: "Success",
        description: "Team created successfully",
      });
      
      setIsCreateDialogOpen(false);
      setNewTeam({ name: '', description: '' });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create team",
        variant: "destructive",
      });
    }
  };

  const handleUpdateTeam = async () => {
    if (!editingTeam) return;

    try {
      await dispatch(updateTeam(editingTeam)).unwrap();
      toast({
        title: "Success",
        description: "Team updated successfully",
      });
      setEditingTeam(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update team",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTeam = async () => {
    if (!deletingTeam) return;

    try {
      await dispatch(deleteTeam(deletingTeam.id)).unwrap();
      toast({
        title: "Success",
        description: "Team deleted successfully",
      });
      setDeletingTeam(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete team",
        variant: "destructive",
      });
    }
  };

  const handleInviteMember = async () => {
    if (!invitingToTeam || !inviteEmail.trim()) {
      toast({
        title: "Error",
        description: "Email address is required",
        variant: "destructive",
      });
      return;
    }

    // Mock invite functionality - in real app, this would send an API request
    const newMember: UserSummary = {
      id: `invited-${Date.now()}`,
      name: inviteEmail.split('@')[0],
      email: inviteEmail,
      role: 'member',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${inviteEmail}`,
    };

    try {
      const updatedTeam = {
        ...invitingToTeam,
        members: [...invitingToTeam.members, newMember],
      };
      
      await dispatch(updateTeam(updatedTeam)).unwrap();
      
      toast({
        title: "Success",
        description: `Invitation sent to ${inviteEmail}`,
      });
      
      setInvitingToTeam(null);
      setInviteEmail('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to invite member",
        variant: "destructive",
      });
    }
  };

  const handleRemoveMember = async (team: Team, memberId: string) => {
    try {
      const updatedTeam = {
        ...team,
        members: team.members.filter(m => m.id !== memberId),
      };
      
      await dispatch(updateTeam(updatedTeam)).unwrap();
      
      toast({
        title: "Success",
        description: "Member removed successfully",
      });
      
      // Update viewing team if it's the same team
      if (viewingTeam?.id === team.id) {
        setViewingTeam(updatedTeam);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove member",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Teams</h1>
          <p className="text-muted-foreground">Manage your teams and team members</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Team
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Team</DialogTitle>
              <DialogDescription>Add a new team to your organization.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Team Name *</Label>
                <Input
                  id="name"
                  value={newTeam.name}
                  onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                  placeholder="Enter team name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newTeam.description}
                  onChange={(e) => setNewTeam({ ...newTeam, description: e.target.value })}
                  placeholder="Enter team description"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTeam}>Create Team</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Teams Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <div className="col-span-full text-center py-8">Loading teams...</div>
        ) : teams.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No teams yet</h3>
                <p className="text-muted-foreground">Create your first team to get started</p>
                <Button className="mt-4" onClick={() => setIsCreateDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Team
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          teams.map((team) => (
            <Card key={team.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{team.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {team.description || 'No description'}
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setEditingTeam(team)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => setDeletingTeam(team)}
                        className="text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {team.members.length} member{team.members.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="flex -space-x-1">
                    {team.members.slice(0, 4).map((member) => (
                      <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="text-xs">
                          {member.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {team.members.length > 4 && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                        +{team.members.length - 4}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => setInvitingToTeam(team)}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Invite
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setViewingTeam(team)}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Edit Team Dialog */}
      {editingTeam && (
        <Dialog open={!!editingTeam} onOpenChange={() => setEditingTeam(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Team</DialogTitle>
              <DialogDescription>Update team information.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Team Name</Label>
                <Input
                  id="edit-name"
                  value={editingTeam.name}
                  onChange={(e) => setEditingTeam({ ...editingTeam, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingTeam.description || ''}
                  onChange={(e) => setEditingTeam({ ...editingTeam, description: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingTeam(null)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateTeam}>Update Team</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* View Team Dialog */}
      {viewingTeam && (
        <Dialog open={!!viewingTeam} onOpenChange={() => setViewingTeam(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                {viewingTeam.name}
              </DialogTitle>
              <DialogDescription>
                {viewingTeam.description || 'No description provided'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-3">Team Members ({viewingTeam.members.length})</h4>
                {viewingTeam.members.length === 0 ? (
                  <div className="text-center py-6 text-muted-foreground">
                    <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No members in this team yet</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => {
                        setViewingTeam(null);
                        setInvitingToTeam(viewingTeam);
                      }}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Invite Members
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {viewingTeam.members.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>
                              {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                            {member.role}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveMember(viewingTeam, member.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-between pt-4">
              <Button 
                variant="outline"
                onClick={() => {
                  setViewingTeam(null);
                  setInvitingToTeam(viewingTeam);
                }}
              >
                <Mail className="mr-2 h-4 w-4" />
                Invite Members
              </Button>
              <Button variant="outline" onClick={() => setViewingTeam(null)}>
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Invite Member Dialog */}
      {invitingToTeam && (
        <Dialog open={!!invitingToTeam} onOpenChange={() => setInvitingToTeam(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Member to {invitingToTeam.name}</DialogTitle>
              <DialogDescription>
                Send an invitation to join this team.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="invite-email">Email Address *</Label>
                <Input
                  id="invite-email"
                  type="email"
                  placeholder="Enter email address"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => {
                  setInvitingToTeam(null);
                  setInviteEmail('');
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleInviteMember} disabled={!inviteEmail.trim()}>
                Send Invitation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Team Dialog */}
      <AlertDialog open={!!deletingTeam} onOpenChange={() => setDeletingTeam(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Team</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deletingTeam?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteTeam}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TeamsPage;