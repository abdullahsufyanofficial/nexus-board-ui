import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Target, Users, Lightbulb, Award, ArrowRight, Heart, Globe, Zap, Shield } from "lucide-react";
import { motion } from "framer-motion";

const AboutPage = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Mission Focused",
      description: "We're dedicated to helping teams achieve their goals through better project management and seamless collaboration.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Team First",
      description: "Everything we build is designed with collaboration and team success in mind, fostering better relationships.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Innovation Driven",
      description: "We continuously evolve our platform with cutting-edge features and improvements based on user feedback.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Excellence Committed",
      description: "We strive for excellence in every aspect of our product and customer experience, never settling for good enough.",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  const team = [
    {
      name: "Alex Thompson",
      role: "CEO & Co-founder",
      bio: "Former project manager with 10+ years experience leading teams at Fortune 500 companies.",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
      name: "Sarah Chen",
      role: "CTO & Co-founder",
      bio: "Full-stack engineer and architect who previously built scalable systems at major tech companies.",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Design",
      bio: "UX designer passionate about creating intuitive interfaces that teams actually love to use.",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    {
      name: "Emily Johnson",
      role: "Head of Customer Success",
      bio: "Customer advocate ensuring every team gets maximum value from our platform.",
      avatar: "https://i.pravatar.cc/150?img=4"
    }
  ];

  const milestones = [
    { year: "2022", title: "Company Founded", description: "Started with a vision to revolutionize project management" },
    { year: "2023", title: "First 1,000 Users", description: "Reached our first major milestone with growing user base" },
    { year: "2023", title: "Series A Funding", description: "Raised $10M to accelerate product development" },
    { year: "2024", title: "50,000+ Users", description: "Expanded globally with teams in over 150 countries" }
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-32 px-6 text-center">
        <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        
        <div className="relative container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              Our Story
            </Badge>
            
            <h1 className="text-6xl md:text-8xl font-bold leading-tight">
              Building the
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Future
              </span>
              <br />
              of Work
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              We're on a mission to revolutionize how teams collaborate and manage projects. 
              Built by project managers, for project managers who demand excellence.
            </p>
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
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                From Frustration to
                <br />
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Innovation
                </span>
              </h2>
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
              <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-3xl p-12 backdrop-blur-sm border border-primary/20 shadow-2xl">
                <div className="space-y-8 text-center">
                  <h3 className="text-3xl font-bold">Impact by Numbers</h3>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">50K+</div>
                      <div className="text-sm text-muted-foreground font-medium">Active Teams</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">2M+</div>
                      <div className="text-sm text-muted-foreground font-medium">Projects Managed</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">99.9%</div>
                      <div className="text-sm text-muted-foreground font-medium">Uptime</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">150+</div>
                      <div className="text-sm text-muted-foreground font-medium">Countries</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 px-6 bg-gradient-to-br from-muted/30 via-background to-muted/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              Our Values
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              What Drives
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Everything We Do
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The principles that guide our decisions, shape our culture, and define our commitment to excellence
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="relative group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-card/50 backdrop-blur-sm overflow-hidden h-full">
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500" style={{
                    backgroundImage: `linear-gradient(135deg, var(--primary), var(--primary))`
                  }} />
                  
                  <CardHeader className="relative">
                    <div className={`mb-6 p-4 bg-gradient-to-br ${value.gradient} rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <div className="text-white">
                        {value.icon}
                      </div>
                    </div>
                    <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative">
                    <CardDescription className="text-base leading-relaxed">
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
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              Meet the Team
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              The People Behind
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                ProjectFlow
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A passionate team of builders, designers, and problem-solvers dedicated to creating the best project management experience
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
              >
                <Card className="relative group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-card/50 backdrop-blur-sm overflow-hidden text-center">
                  <CardHeader className="relative">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-primary p-1 group-hover:scale-110 transition-transform duration-300">
                      <img 
                        src={member.avatar} 
                        alt={member.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                      {member.name}
                    </CardTitle>
                    <CardDescription className="text-primary font-medium">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
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
      <section className="py-32 px-6 bg-gradient-to-br from-muted/30 via-background to-muted/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              Our Journey
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Milestones &
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Achievements
              </span>
            </h2>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-primary opacity-20" />
              
              <div className="space-y-12">
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
                      <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <Badge className="bg-gradient-primary text-white">
                              {milestone.year}
                            </Badge>
                            <CardTitle className="text-xl">{milestone.title}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">{milestone.description}</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    {/* Timeline dot */}
                    <div className="relative z-10 w-4 h-4 rounded-full bg-gradient-primary shadow-lg" />
                    
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
              Ready to Join
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Our Mission?
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Be part of the revolution in project management. Start your journey with ProjectFlow today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:opacity-90 shadow-xl hover:shadow-2xl text-lg px-10 py-6 h-auto transition-all duration-300 hover:scale-105" 
                onClick={() => navigate('/auth/register')}
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-10 py-6 h-auto hover:bg-primary/5 border-2 transition-all duration-300 hover:scale-105" 
                onClick={() => navigate('/contact')}
              >
                Contact Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;