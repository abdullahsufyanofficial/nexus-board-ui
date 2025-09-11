import { useState } from 'react';
import { format } from 'date-fns';
import { CreditCard, Download, Check, Zap, Users, Shield, Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

// Mock billing data
const mockInvoices = [
  { id: '1', date: '2024-01-01', amount: 29.00, status: 'paid', plan: 'Pro' },
  { id: '2', date: '2023-12-01', amount: 29.00, status: 'paid', plan: 'Pro' },
  { id: '3', date: '2023-11-01', amount: 15.00, status: 'paid', plan: 'Starter' },
  { id: '4', date: '2023-10-01', amount: 15.00, status: 'paid', plan: 'Starter' },
];

const plans = [
  {
    name: 'Free',
    price: 0,
    billing: 'forever',
    description: 'Perfect for getting started',
    features: [
      'Up to 3 projects',
      '5 team members',
      'Basic task management',
      'Email support',
    ],
    popular: false,
  },
  {
    name: 'Starter',
    price: 15,
    billing: 'month',
    description: 'For growing teams',
    features: [
      'Up to 10 projects',
      '15 team members',
      'Advanced task management',
      'Calendar integration',
      'Priority support',
    ],
    popular: false,
  },
  {
    name: 'Pro',
    price: 29,
    billing: 'month',
    description: 'For professional teams',
    features: [
      'Unlimited projects',
      '50 team members',
      'Advanced analytics',
      'Custom integrations',
      'API access',
      '24/7 support',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 99,
    billing: 'month',
    description: 'For large organizations',
    features: [
      'Everything in Pro',
      'Unlimited team members',
      'Advanced security',
      'Custom branding',
      'Dedicated support',
      'SLA guarantee',
    ],
    popular: false,
  },
];

const BillingPage = () => {
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState('Pro');
  const [isChangingPlan, setIsChangingPlan] = useState(false);

  const currentPlan = plans.find(plan => plan.name === 'Pro');

  const handlePlanChange = async () => {
    setIsChangingPlan(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsChangingPlan(false);
    
    toast({
      title: "Plan Updated",
      description: `Successfully upgraded to ${selectedPlan} plan`,
    });
  };

  const downloadInvoice = (invoiceId: string) => {
    toast({
      title: "Download Started",
      description: `Invoice ${invoiceId} is being downloaded`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Billing</h1>
          <p className="text-muted-foreground">Manage your subscription and billing information</p>
        </div>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Current Plan
              </CardTitle>
              <CardDescription>Your active subscription details</CardDescription>
            </div>
            <Badge className="bg-primary text-primary-foreground">Active</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold">{currentPlan?.name}</h3>
                <p className="text-muted-foreground">{currentPlan?.description}</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">${currentPlan?.price}</span>
                <span className="text-muted-foreground">/{currentPlan?.billing}</span>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Next billing date: February 1, 2024</p>
                <p className="text-sm text-muted-foreground">Payment method: •••• •••• •••• 4242</p>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Plan includes:</h4>
              <ul className="space-y-2">
                {currentPlan?.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Change Plan</Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Change Plan</DialogTitle>
                  <DialogDescription>
                    Choose the plan that best fits your needs
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4 md:grid-cols-2 lg:grid-cols-4">
                  <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
                    {plans.map((plan) => (
                      <div key={plan.name} className="relative">
                        <Label
                          htmlFor={plan.name}
                          className={`
                            flex cursor-pointer flex-col rounded-lg border p-4 hover:bg-accent
                            ${selectedPlan === plan.name ? 'border-primary bg-accent' : ''}
                            ${plan.popular ? 'ring-2 ring-primary' : ''}
                          `}
                        >
                          {plan.popular && (
                            <Badge className="absolute -top-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                              Popular
                            </Badge>
                          )}
                          <RadioGroupItem value={plan.name} id={plan.name} className="sr-only" />
                          <div className="space-y-2">
                            <h3 className="font-semibold">{plan.name}</h3>
                            <div className="flex items-baseline gap-1">
                              <span className="text-2xl font-bold">${plan.price}</span>
                              <span className="text-sm text-muted-foreground">/{plan.billing}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{plan.description}</p>
                            <ul className="space-y-1">
                              {plan.features.slice(0, 3).map((feature, index) => (
                                <li key={index} className="flex items-center gap-2 text-xs">
                                  <Check className="h-3 w-3 text-primary" />
                                  {feature}
                                </li>
                              ))}
                              {plan.features.length > 3 && (
                                <li className="text-xs text-muted-foreground">
                                  +{plan.features.length - 3} more features
                                </li>
                              )}
                            </ul>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setSelectedPlan('Pro')}>
                    Cancel
                  </Button>
                  <Button onClick={handlePlanChange} disabled={isChangingPlan}>
                    {isChangingPlan ? 'Updating...' : `Upgrade to ${selectedPlan}`}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button variant="outline">Update Payment Method</Button>
          </div>
        </CardContent>
      </Card>

      {/* Usage Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projects</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">of unlimited</p>
            <div className="mt-3 h-2 bg-secondary rounded-full">
              <div className="h-2 bg-primary rounded-full" style={{ width: '25%' }} />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">of 50</p>
            <div className="mt-3 h-2 bg-secondary rounded-full">
              <div className="h-2 bg-primary rounded-full" style={{ width: '16%' }} />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Calls</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.1k</div>
            <p className="text-xs text-muted-foreground">of 10k this month</p>
            <div className="mt-3 h-2 bg-secondary rounded-full">
              <div className="h-2 bg-primary rounded-full" style={{ width: '21%' }} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>Download your invoices and view payment history</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Invoice</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{format(new Date(invoice.date), 'MMM dd, yyyy')}</TableCell>
                  <TableCell>{invoice.plan}</TableCell>
                  <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={invoice.status === 'paid' ? 'default' : 'secondary'}>
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => downloadInvoice(invoice.id)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Manage your payment information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <CreditCard className="h-8 w-8" />
              <div>
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-muted-foreground">Expires 12/2025</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Edit</Button>
              <Button variant="outline" size="sm">Remove</Button>
            </div>
          </div>
          <div className="mt-4">
            <Button variant="outline">Add New Payment Method</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingPage;