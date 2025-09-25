import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Target, Users, Lightbulb, Award, ArrowRight, Heart, Globe, Zap, Shield, Sparkles, TrendingUp, Clock, Star } from "lucide-react";
import { motion } from "framer-motion";

const AboutPage = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Mission Focused",
      description: "We're dedicated to helping teams achieve their goals through better project management and seamless collaboration that drives real results.",
      gradient: "from-blue-500 via-blue-600 to-cyan-500",
      delay: 0.1
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Team First",
      description: "Everything we build is designed with collaboration and team success in mind, fostering better relationships and stronger outcomes.",
      gradient: "from-purple-500 via-purple-600 to-pink-500",
      delay: 0.2
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Innovation Driven",
      description: "We continuously evolve our platform with cutting-edge features and improvements based on user feedback and industry trends.",
      gradient: "from-orange-500 via-red-500 to-pink-500",
      delay: 0.3
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Excellence Committed",
      description: "We strive for excellence in every aspect of our product and customer experience, never settling for good enough.",
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      delay: 0.4
    }
  ];

  const team = [
    {
      name: "Alex Thompson",
      role: "CEO & Co-founder",
      bio: "Former project manager with 10+ years experience leading teams at Fortune 500 companies. Passionate about building tools that actually work.",
      avatar: "https://i.pravatar.cc/150?img=1",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      name: "Sarah Chen",
      role: "CTO & Co-founder",
      bio: "Full-stack engineer and architect who previously built scalable systems at major tech companies. Loves solving complex problems.",
      avatar: "https://i.pravatar.cc/150?img=2",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Design",
      bio: "UX designer passionate about creating intuitive interfaces that teams actually love to use. Believes design should be invisible.",
      avatar: "https://i.pravatar.cc/150?img=3",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      name: "Emily Johnson",
      role: "Head of Customer Success",
      bio: "Customer advocate ensuring every team gets maximum value from our platform. Former consultant with deep industry knowledge.",
      avatar: "https://i.pravatar.cc/150?img=4",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const milestones = [
    { 
      year: "2022", 
      title: "Company Founded", 
      description: "Started with a vision to revolutionize project management for modern teams",
      icon: <Sparkles className="h-6 w-6" />
    },
    { 
      year: "2023", 
      title: "First 1,000 Users", 
      description: "Reached our first major milestone with rapidly growing user base and positive feedback",
      icon: <Users className="h-6 w-6" />
    },
    { 
      year: "2023", 
      title: "Series A Funding", 
      description: "Raised $10M to accelerate product development and expand our talented team",
      icon: <TrendingUp className="h-6 w-6" />
    },
    { 
      year: "2024", 
      title: "50,000+ Users", 
      description: "Expanded globally with teams in over 150 countries trusting our platform daily",
      icon: <Globe className="h-6 w-6" />
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Teams", gradient: "from-blue-500 to-cyan-500" },
    { number: "2M+", label: "Projects Managed", gradient: "from-purple-500 to-pink-500" },
    { number: "99.9%", label: "Uptime", gradient: "from-green-500 to-emerald-500" },
    { number: "150+", label: "Countries", gradient: "from-orange-500 to-red-500" }
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-40" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" />
        
        <div className="relative container mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-6 py-2 text-sm">
              Our Story
            </Badge>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tight">
              Building the
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Future
              </span>
              <br />
              of Work
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-5xl mx-auto leading-relaxed font-light">
              We're on a mission to revolutionize how teams collaborate and manage projects. 
              Built by project managers, for project managers who demand excellence and innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="py-20 px-6 bg-gradient-to-r from-muted/30 via-background to-muted/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-4 group">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative mx-auto w-fit"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity`} />
                  <div className={`relative flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${stat.gradient} text-white shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110`}>
                    <div className="text-2xl font-bold">{stat.number.slice(0, 2)}</div>
                  </div>
                </motion.div>
                <div className="space-y-2">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground font-medium text-lg">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-32 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <Badge className="bg-primary/10 text-primary border-primary/20 px-6 py-2 text-sm">
                  Our Journey
                </Badge>
                <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                  From Frustration to
                  <br />
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    Innovation
                  </span>
                </h2>
              </div>
              
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  ProjectFlow was born from the frustration of using complex, outdated project 
                  management tools that hindered rather than helped team productivity. We knew there had to be a better way.
                </p>
                <p>
                  Our founders, experienced project managers themselves, recognized the need for 
                  a modern, intuitive platform that could adapt to any team's workflow while 
                  remaining simple enough for everyone to use effectively.
                </p>
                <p>
                  Today, thousands of teams around the world trust ProjectFlow to manage their 
                  projects, collaborate effectively, and deliver exceptional results that exceed expectations.
                </p>
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
                <div className="relative space-y-8 text-center">
                  <h3 className="text-3xl font-bold">Our Impact</h3>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <div className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">40%</div>
                      <div className="text-muted-foreground font-medium">Productivity Increase</div>
                    </div>
                    <div className="space-y-3">
                      <div className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">30%</div>
                      <div className="text-muted-foreground font-medium">Faster Delivery</div>
                    </div>
                    <div className="space-y-3">
                      <div className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">60%</div>
                      <div className="text-muted-foreground font-medium">Better Communication</div>
                    </div>
                    <div className="space-y-3">
                      <div className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">95%</div>
                      <div className="text-muted-foreground font-medium">Customer Satisfaction</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              Our Values
            </Badge>
            <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              What Drives
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Everything We Do
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              The principles that guide our decisions, shape our culture, and define our unwavering commitment to excellence
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: value.delay }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="relative group h-full border-0 bg-card/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <CardHeader className="pb-4 relative z-10">
                    <div className="relative mb-6 w-fit">
                      <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity`} />
                      <div className={`relative p-4 bg-gradient-to-br ${value.gradient} rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110`}>
                        <div className="text-white">
                          {value.icon}
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <CardDescription className="text-base leading-relaxed text-muted-foreground">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-6 py-2 text-sm">
              Meet the Team
            </Badge>
            <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              The People Behind
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                ProjectFlow
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              A passionate team of builders, designers, and problem-solvers dedicated to creating 
              the best project management experience in the world
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="relative group h-full border-0 bg-card/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden text-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <CardHeader className="relative z-10 pb-4">
                    <div className="relative mx-auto mb-6 w-fit">
                      <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity`} />
                      <div className={`relative w-24 h-24 rounded-full bg-gradient-to-br ${member.gradient} p-1 group-hover:scale-110 transition-transform duration-300 shadow-xl`}>
                        <img 
                          src={member.avatar} 
                          alt={member.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                      {member.name}
                    </CardTitle>
                    <CardDescription className="text-primary font-medium text-base">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
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
              Our Journey
            </Badge>
            <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Milestones &
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Achievements
              </span>
            </h2>
          </motion.div>
          
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-primary opacity-30" />
              
              <div className="space-y-16">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className={`flex items-center gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    <div className="flex-1">
                      <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group">
                        <CardHeader>
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-gradient-primary/10 rounded-xl text-primary group-hover:bg-gradient-primary/20 transition-colors">
                              {milestone.icon}
                            </div>
                            <div>
                              <Badge className="bg-gradient-primary text-white mb-2 px-4 py-1">
                                {milestone.year}
                              </Badge>
                              <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                                {milestone.title}
                              </CardTitle>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground text-lg leading-relaxed">
                            {milestone.description}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    {/* Timeline dot */}
                    <div className="relative z-10 w-6 h-6 rounded-full bg-gradient-primary shadow-xl" />
                    
                    <div className="flex-1" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
                Ready to Join
                <br />
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Our Mission?
                </span>
              </h2>
              
              <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Be part of the revolution in project management. Start your transformative journey with ProjectFlow today.
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
                  <span className="relative z-10">Start Your Journey</span>
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
                  onClick={() => navigate('/contact')}
                >
                  Contact Sales
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;