import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle, Users, Target, Zap, Star, BarChart3, Shield, Rocket, Play, TrendingUp, Globe, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Smart Goal Tracking",
      description: "AI-powered goal setting with predictive analytics and milestone management for better project outcomes.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Team Collaboration",
      description: "Real-time collaboration with advanced communication tools, file sharing, and team synchronization.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Workflow Automation",
      description: "Intelligent automation that learns from your patterns and optimizes workflows for maximum efficiency.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Advanced Analytics",
      description: "Deep insights into team performance, project progress, and resource utilization with custom dashboards.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Enterprise Security",
      description: "Bank-level security with end-to-end encryption, SSO integration, and compliance certifications.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "Rapid Deployment",
      description: "Get started in minutes with pre-built templates, integrations, and guided onboarding.",
      gradient: "from-pink-500 to-rose-500"
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
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
      name: "Michael Chen",
      role: "Engineering Lead",
      company: "StartupXYZ",
      content: "The automation features save us hours every week. Incredible value for money.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    {
      name: "Emily Davis",
      role: "Operations Director",
      company: "GlobalCorp",
      content: "Best project management tool we've used. The analytics are game-changing.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=3"
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Users", icon: <Users className="h-6 w-6" /> },
    { number: "99.9%", label: "Uptime", icon: <TrendingUp className="h-6 w-6" /> },
    { number: "150+", label: "Countries", icon: <Globe className="h-6 w-6" /> },
    { number: "24/7", label: "Support", icon: <Clock className="h-6 w-6" /> }
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-32 px-6 text-center">
        <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        
        <div className="relative container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-medium border border-primary/20 backdrop-blur-sm">
              <Star className="h-4 w-4 fill-current" />
              Trusted by 50,000+ teams worldwide
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold leading-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Transform
              </span>
              <br />
              Your Team's
              <br />
              <span className="text-foreground">Productivity</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              The modern project management platform that helps teams collaborate seamlessly, 
              track progress intelligently, and deliver exceptional results faster than ever.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:opacity-90 shadow-xl hover:shadow-2xl text-lg px-10 py-6 h-auto transition-all duration-300 hover:scale-105" 
                onClick={() => navigate('/auth/register')}
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-10 py-6 h-auto hover:bg-primary/5 border-2 transition-all duration-300 hover:scale-105 backdrop-blur-sm" 
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground pt-8">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="font-medium">4.9/5 rating</span>
              </div>
              <div className="w-1 h-1 bg-muted-foreground rounded-full" />
              <span className="font-medium">No credit card required</span>
              <div className="w-1 h-1 bg-muted-foreground rounded-full" />
              <span className="font-medium">14-day free trial</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-primary text-white shadow-lg">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              Powerful Features
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Everything You Need to
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Succeed
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Comprehensive tools designed for modern teams who demand excellence, 
              efficiency, and seamless collaboration in every project.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="relative group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-card/50 backdrop-blur-sm overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500" style={{
                    backgroundImage: `linear-gradient(135deg, var(--primary), var(--primary))`
                  }} />
                  
                  <CardHeader className="pb-4 relative">
                    <div className={`mb-6 p-4 bg-gradient-to-br ${feature.gradient} rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <div className="text-white">
                        {feature.icon}
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 px-6 bg-gradient-to-br from-muted/30 via-background to-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
                  Why Choose Us
                </Badge>
                <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  Built for
                  <br />
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    High-Performance
                  </span>
                  <br />
                  Teams
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Join thousands of teams who have transformed their project management 
                  with our intuitive, powerful platform designed for the future of work.
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-primary/5 transition-all duration-300 group"
                  >
                    <div className="flex-shrink-0 p-2 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-lg font-medium">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-3xl p-12 backdrop-blur-sm border border-primary/20 shadow-2xl">
                <div className="grid grid-cols-2 gap-8">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-center space-y-3"
                    >
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-primary text-white shadow-lg">
                        {stat.icon}
                      </div>
                      <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                        {stat.number}
                      </div>
                      <div className="text-muted-foreground font-medium">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              Customer Stories
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Loved by Teams
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Worldwide
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              See what our customers are saying about their experience with ProjectFlow
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="relative bg-card/50 backdrop-blur-sm border-0 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                  
                  <CardHeader className="relative">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <CardDescription className="text-base leading-relaxed text-foreground font-medium">
                      "{testimonial.content}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-primary p-0.5">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.role} at {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
        
        <div className="relative container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-5xl md:text-7xl font-bold leading-tight">
              Ready to Transform
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Your Workflow?
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Join thousands of teams already using ProjectFlow to streamline their workflows, 
              boost productivity, and deliver exceptional results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:opacity-90 shadow-xl hover:shadow-2xl text-lg px-10 py-6 h-auto transition-all duration-300 hover:scale-105" 
                onClick={() => navigate('/auth/register')}
              >
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-10 py-6 h-auto hover:bg-primary/5 border-2 transition-all duration-300 hover:scale-105" 
                onClick={() => navigate('/pricing')}
              >
                View Pricing
              </Button>
            </div>
            
            <div className="text-sm text-muted-foreground space-y-2">
              <div>No credit card required • 14-day free trial • Cancel anytime</div>
              <div className="flex items-center justify-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Enterprise-grade security & compliance</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}