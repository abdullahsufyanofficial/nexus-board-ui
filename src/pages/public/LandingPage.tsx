import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle, Users, Target, Zap, Star, BarChart3, Shield, Rocket } from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Target className="h-10 w-10 text-primary" />,
      title: "Smart Goal Tracking",
      description: "AI-powered goal setting with predictive analytics and milestone management for better project outcomes."
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Team Collaboration",
      description: "Real-time collaboration with advanced communication tools, file sharing, and team synchronization."
    },
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: "Workflow Automation",
      description: "Intelligent automation that learns from your patterns and optimizes workflows for maximum efficiency."
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-primary" />,
      title: "Advanced Analytics",
      description: "Deep insights into team performance, project progress, and resource utilization with custom dashboards."
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Enterprise Security",
      description: "Bank-level security with end-to-end encryption, SSO integration, and compliance certifications."
    },
    {
      icon: <Rocket className="h-10 w-10 text-primary" />,
      title: "Rapid Deployment",
      description: "Get started in minutes with pre-built templates, integrations, and guided onboarding."
    }
  ];

  const benefits = [
    "Increase team productivity by 40%",
    "Reduce project delivery time by 30%",
    "Improve team communication by 60%",
    "Track progress in real-time",
    "Manage resources effectively",
    "Scale with your growing team"
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      company: "TechCorp",
      content: "ProjectFlow transformed how our team collaborates. We've never been more productive!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Engineering Lead",
      company: "StartupXYZ",
      content: "The automation features save us hours every week. Incredible value for money.",
      rating: 5
    },
    {
      name: "Emily Davis",
      role: "Operations Director",
      company: "GlobalCorp",
      content: "Best project management tool we've used. The analytics are game-changing.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
        <div className="relative container mx-auto max-w-5xl">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="h-4 w-4" />
              Trusted by 10,000+ teams worldwide
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-primary bg-clip-text text-transparent leading-tight">
              Transform Your Team's 
              <br className="hidden md:block" />
              <span className="text-foreground">Productivity</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              The modern project management platform that helps teams collaborate seamlessly, track progress intelligently, and deliver exceptional results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 shadow-glow text-lg px-8 py-6 h-auto" onClick={() => navigate('/auth/register')}>
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto hover:bg-primary/5" onClick={() => navigate('/about')}>
                Watch Demo
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span>4.9/5 rating</span>
              </div>
              <span>•</span>
              <span>No credit card required</span>
              <span>•</span>
              <span>14-day free trial</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6">Powerful Features for Modern Teams</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage projects efficiently, collaborate effectively, and deliver results that matter
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="relative group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-card/50 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 rounded-lg transition-opacity" />
                <CardHeader className="pb-4">
                  <div className="mb-4 p-3 bg-primary/10 rounded-2xl w-fit group-hover:bg-primary/20 transition-colors">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 bg-muted/20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-5xl font-bold mb-6">Why Choose ProjectFlow?</h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Join thousands of teams who have transformed their project management with our intuitive, powerful platform designed for the future of work.
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-primary/5 transition-colors">
                    <div className="flex-shrink-0 p-1 bg-primary/10 rounded-full">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-primary/10 rounded-3xl p-12 text-center backdrop-blur-sm border border-primary/20">
                <div className="grid grid-cols-1 gap-8">
                  <div className="space-y-2">
                    <div className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">10K+</div>
                    <div className="text-muted-foreground text-lg">Happy Teams</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">99.9%</div>
                    <div className="text-muted-foreground text-lg">Uptime</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">24/7</div>
                    <div className="text-muted-foreground text-lg">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6">Loved by Teams Worldwide</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See what our customers are saying about their experience with ProjectFlow
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="relative bg-card/50 backdrop-blur-sm border-0 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardDescription className="text-base leading-relaxed text-foreground">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role} at {testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 text-center bg-gradient-mesh">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-5xl font-bold mb-8">Ready to Transform Your Team?</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of teams already using ProjectFlow to streamline their workflows, boost productivity, and deliver exceptional results.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button size="lg" className="bg-gradient-primary hover:opacity-90 shadow-glow text-lg px-8 py-6 h-auto" onClick={() => navigate('/auth/register')}>
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto hover:bg-primary/5" onClick={() => navigate('/pricing')}>
              View Pricing
            </Button>
          </div>
          
          <div className="mt-8 text-sm text-muted-foreground">
            No credit card required • 14-day free trial • Cancel anytime
          </div>
        </div>
      </section>
    </div>
  );
}