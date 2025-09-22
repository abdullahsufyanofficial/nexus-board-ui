import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Users, Calendar, BarChart3, Zap, Shield, Globe } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Team Collaboration",
      description: "Work together seamlessly with real-time updates and communication tools."
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Project Planning",
      description: "Plan, organize, and track your projects with intuitive boards and timelines."
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Analytics & Reports",
      description: "Get insights into your team's productivity and project progress."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Fast & Efficient",
      description: "Lightning-fast performance with modern technology stack."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security to keep your data safe and protected."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Access",
      description: "Access your projects from anywhere, on any device, at any time."
    }
  ];

  const benefits = [
    "Streamlined workflow management",
    "Real-time collaboration tools",
    "Advanced project tracking",
    "Customizable dashboards",
    "Integration capabilities",
    "Mobile-friendly interface"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <Badge variant="secondary" className="mb-4">
            Modern Project Management
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold">
            Streamline Your{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Project Workflow
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            ProjectFlow helps teams collaborate, plan, and deliver projects faster than ever before. 
            Simple, powerful, and designed for modern teams.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/auth/register')}>
              Get Started Free
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/about')}>
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to make project management effortless
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <div className="text-primary mb-4">
                  {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Choose ProjectFlow?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of teams who trust ProjectFlow to manage their projects 
              and boost productivity.
            </p>
            
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-subtle rounded-2xl p-8 border border-border/20">
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">Ready to Get Started?</h3>
                <p className="text-muted-foreground">
                  Join our community and transform how you manage projects
                </p>
              </div>
              
              <div className="space-y-4">
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={() => navigate('/auth/register')}
                >
                  Start Your Free Trial
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  size="lg"
                  onClick={() => navigate('/pricing')}
                >
                  View Pricing Plans
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground text-center">
                No credit card required • Free 14-day trial • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;