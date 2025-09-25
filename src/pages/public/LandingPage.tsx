import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CircleCheck as CheckCircle, Users, Target, Zap, Star, ChartBar as BarChart3, Shield, Rocket, Play, TrendingUp, Globe, Clock, Sparkles, Award, Infinity } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Smart Goal Tracking",
      description: "AI-powered goal setting with predictive analytics and milestone management for better project outcomes.",
      gradient: "from-blue-500 via-blue-600 to-cyan-500",
      delay: 0.1
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Team Collaboration",
      description: "Real-time collaboration with advanced communication tools, file sharing, and team synchronization.",
      gradient: "from-purple-500 via-purple-600 to-pink-500",
      delay: 0.2
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Workflow Automation",
      description: "Intelligent automation that learns from your patterns and optimizes workflows for maximum efficiency.",
      gradient: "from-orange-500 via-red-500 to-pink-500",
      delay: 0.3
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Advanced Analytics",
      description: "Deep insights into team performance, project progress, and resource utilization with custom dashboards.",
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      delay: 0.4
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Enterprise Security",
      description: "Bank-level security with end-to-end encryption, SSO integration, and compliance certifications.",
      gradient: "from-indigo-500 via-purple-500 to-blue-500",
      delay: 0.5
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "Rapid Deployment",
      description: "Get started in minutes with pre-built templates, integrations, and guided onboarding.",
      gradient: "from-pink-500 via-rose-500 to-red-500",
      delay: 0.6
    }
  ];

  const benefits = [
    { text: "Increase team productivity by 40%", icon: <TrendingUp className="h-5 w-5" /> },
    { text: "Reduce project delivery time by 30%", icon: <Clock className="h-5 w-5" /> },
    { text: "Improve team communication by 60%", icon: <Users className="h-5 w-5" /> },
    { text: "Track progress in real-time", icon: <BarChart3 className="h-5 w-5" /> },
    { text: "Manage resources effectively", icon: <Target className="h-5 w-5" /> },
    { text: "Scale with your growing team", icon: <Infinity className="h-5 w-5" /> }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      company: "TechCorp",
      content: "ProjectFlow transformed how our team collaborates. We've never been more productive and organized!",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
      name: "Michael Chen",
      role: "Engineering Lead",
      company: "StartupXYZ",
      content: "The automation features save us hours every week. Incredible value for money and amazing support.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    {
      name: "Emily Davis",
      role: "Operations Director",
      company: "GlobalCorp",
      content: "Best project management tool we've used. The analytics are game-changing for our decision making.",
      rating: 5,
      avatar: "https://i.pravatar.cc/150?img=3"
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Users", icon: <Users className="h-6 w-6" />, gradient: "from-blue-500 to-cyan-500" },
    { number: "99.9%", label: "Uptime", icon: <TrendingUp className="h-6 w-6" />, gradient: "from-green-500 to-emerald-500" },
    { number: "150+", label: "Countries", icon: <Globe className="h-6 w-6" />, gradient: "from-purple-500 to-pink-500" },
    { number: "24/7", label: "Support", icon: <Clock className="h-6 w-6" />, gradient: "from-orange-500 to-red-500" }
  ];

  const companies = [
    { name: "TechCorp", logo: "TC" },
    { name: "StartupXYZ", logo: "SX" },
    { name: "GlobalCorp", logo: "GC" },
    { name: "InnovateLab", logo: "IL" },
    { name: "FutureTech", logo: "FT" },
    { name: "NextGen", logo: "NG" }
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-mesh opacity-40" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" />
        
        <div className="relative container mx-auto max-w-7xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 text-primary px-8 py-4 rounded-full text-sm font-medium border border-primary/20 backdrop-blur-sm shadow-lg"
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span>Trusted by 50,000+ teams worldwide</span>
              <Sparkles className="h-4 w-4" />
            </motion.div>
            
            {/* Main Headline */}
            <div className="space-y-8">
              <motion.h1 
                className="text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Transform
                </span>
                <br />
                <span className="text-foreground">Your Team's</span>
                <br />
                <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
                  Productivity
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-5xl mx-auto leading-relaxed font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                The most intuitive project management platform that helps teams collaborate seamlessly, 
                track progress intelligently, and deliver exceptional results faster than ever before.
              </motion.p>
            </div>
            
            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="relative bg-gradient-primary hover:opacity-90 shadow-2xl hover:shadow-3xl text-lg px-12 py-8 h-auto transition-all duration-300 group overflow-hidden rounded-2xl font-semibold" 
                  onClick={() => navigate('/auth/register')}
                >
                  <span className="relative z-10">Start Free Trial</span>
                  <ArrowRight className="ml-3 h-6 w-6 relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-12 py-8 h-auto hover:bg-primary/5 border-2 border-border/50 hover:border-primary/50 transition-all duration-300 backdrop-blur-sm rounded-2xl font-semibold group" 
                >
                  <Play className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>
            
            {/* Trust Indicators */}
            <motion.div 
              className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground pt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <div className="flex items-center gap-2 bg-background/50 px-4 py-2 rounded-full backdrop-blur-sm border border-border/20">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="font-medium">4.9/5 rating</span>
              </div>
              <div className="flex items-center gap-2 bg-background/50 px-4 py-2 rounded-full backdrop-blur-sm border border-border/20">
                <Shield className="h-4 w-4 text-green-500" />
                <span className="font-medium">No credit card required</span>
              </div>
              <div className="flex items-center gap-2 bg-background/50 px-4 py-2 rounded-full backdrop-blur-sm border border-border/20">
                <Award className="h-4 w-4 text-primary" />
                <span className="font-medium">14-day free trial</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-muted/30 via-background to-muted/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-muted-foreground text-lg mb-8">Trusted by innovative teams at</p>
            <div className="flex flex-wrap items-center justify-center gap-12">
              {companies.map((company, index) => (
                <motion.div
                  key={company.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-primary/10 flex items-center justify-center font-bold text-primary group-hover:bg-gradient-primary/20 transition-colors">
                    {company.logo}
                  </div>
                  <span className="font-semibold text-lg">{company.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-6 py-2 text-sm">
              Impact & Results
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Numbers That
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Speak Volumes
              </span>
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center space-y-4 group"
              >
                <div className="relative mx-auto w-fit">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity`} />
                  <div className={`relative flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${stat.gradient} text-white shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110`}>
                    {stat.icon}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-5xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground font-medium text-lg">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 bg-gradient-to-br from-muted/20 via-background to-muted/20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-mesh opacity-20" />
        
        <div className="relative container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-6 py-2 text-sm">
              Powerful Features
            </Badge>
            <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Everything You Need to
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Succeed Together
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Comprehensive tools designed for modern teams who demand excellence, 
              efficiency, and seamless collaboration in every project they undertake.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: feature.delay }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="relative group h-full border-0 bg-card/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  {/* Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <CardHeader className="pb-4 relative z-10">
                    <div className="relative mb-6 w-fit">
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity`} />
                      <div className={`relative p-4 bg-gradient-to-br ${feature.gradient} rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110`}>
                        <div className="text-white">
                          {feature.icon}
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <CardDescription className="text-base leading-relaxed text-muted-foreground">
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
      <section className="py-32 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div className="space-y-6">
                <Badge className="bg-primary/10 text-primary border-primary/20 px-6 py-2 text-sm">
                  Why Choose ProjectFlow
                </Badge>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  Built for
                  <br />
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    High-Performance
                  </span>
                  <br />
                  Teams
                </h2>
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                  Join thousands of teams who have transformed their project management 
                  with our intuitive, powerful platform designed for the future of work.
                </p>
              </div>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-primary/5 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="flex-shrink-0 p-3 bg-gradient-primary/10 rounded-xl group-hover:bg-gradient-primary/20 transition-all duration-300 group-hover:scale-110">
                      <div className="text-primary">
                        {benefit.icon}
                      </div>
                    </div>
                    <span className="text-lg font-medium group-hover:text-primary transition-colors">
                      {benefit.text}
                    </span>
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
              <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-3xl p-12 backdrop-blur-sm border border-primary/20 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-mesh opacity-30 rounded-3xl" />
                <div className="relative grid grid-cols-2 gap-8">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-center space-y-4 group"
                    >
                      <div className="relative mx-auto w-fit">
                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity`} />
                        <div className={`relative flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                          {stat.icon}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                          {stat.number}
                        </div>
                        <div className="text-muted-foreground font-medium">{stat.label}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 px-6 bg-gradient-to-br from-muted/20 via-background to-muted/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-20" />
        
        <div className="relative container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-6 py-2 text-sm">
              Customer Stories
            </Badge>
            <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Loved by Teams
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Worldwide
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              See what our customers are saying about their transformative experience with ProjectFlow
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
                whileHover={{ y: -10 }}
              >
                <Card className="relative bg-card/50 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
                  
                  <CardHeader className="relative z-10 pb-4">
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.2 + i * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        </motion.div>
                      ))}
                    </div>
                    <CardDescription className="text-lg leading-relaxed text-foreground font-medium">
                      "{testimonial.content}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-primary rounded-full blur-md opacity-40" />
                        <div className="relative w-14 h-14 rounded-full bg-gradient-primary p-0.5">
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-lg">{testimonial.name}</div>
                        <div className="text-muted-foreground">
                          {testimonial.role}
                        </div>
                        <div className="text-sm text-primary font-medium">
                          {testimonial.company}
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

      {/* Final CTA Section */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-40" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
        
        <div className="relative container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="space-y-8">
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
                Ready to Transform
                <br />
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Your Workflow?
                </span>
              </h2>
              
              <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Join thousands of teams already using ProjectFlow to streamline their workflows, 
                boost productivity, and deliver exceptional results that exceed expectations.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="relative bg-gradient-primary hover:opacity-90 shadow-2xl hover:shadow-3xl text-xl px-12 py-8 h-auto transition-all duration-300 group overflow-hidden rounded-2xl font-semibold" 
                  onClick={() => navigate('/auth/register')}
                >
                  <span className="relative z-10">Start Your Free Trial</span>
                  <ArrowRight className="ml-3 h-6 w-6 relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-xl px-12 py-8 h-auto hover:bg-primary/5 border-2 border-border/50 hover:border-primary/50 transition-all duration-300 backdrop-blur-sm rounded-2xl font-semibold" 
                  onClick={() => navigate('/pricing')}
                >
                  View Pricing Plans
                </Button>
              </motion.div>
            </div>
            
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-sm text-muted-foreground">
                No credit card required • 14-day free trial • Cancel anytime
              </div>
              <div className="flex items-center justify-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-green-500" />
                <span className="text-muted-foreground">Enterprise-grade security & compliance</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}