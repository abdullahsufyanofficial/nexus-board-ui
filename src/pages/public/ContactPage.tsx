import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Headphones, Globe, Sparkles, ArrowRight, Shield } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours."
    });
    setFormData({ name: "", email: "", company: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Support",
      content: "hello@projectflow.com",
      description: "Send us an email anytime, we respond within 4 hours",
      gradient: "from-blue-500 via-blue-600 to-cyan-500"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone Support",
      content: "+1 (555) 123-4567",
      description: "Mon-Fri from 8am to 6pm PST",
      gradient: "from-green-500 via-emerald-500 to-teal-500"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Headquarters",
      content: "123 Innovation Street",
      description: "San Francisco, CA 94105, USA",
      gradient: "from-purple-500 via-purple-600 to-pink-500"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Business Hours",
      content: "Mon-Fri 8:00-18:00 PST",
      description: "Saturday 9:00-17:00 PST",
      gradient: "from-orange-500 via-red-500 to-pink-500"
    }
  ];

  const supportOptions = [
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Live Chat",
      description: "Get instant help from our support team with real-time assistance",
      action: "Start Chat",
      gradient: "from-blue-500 via-blue-600 to-purple-600",
      delay: 0.1
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: "Phone Support",
      description: "Speak directly with our experts for personalized guidance",
      action: "Call Now",
      gradient: "from-green-500 via-emerald-500 to-teal-600",
      delay: 0.2
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Help Center",
      description: "Browse our comprehensive documentation and tutorials",
      action: "Visit Help Center",
      gradient: "from-purple-500 via-pink-500 to-red-600",
      delay: 0.3
    }
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
              Get in Touch
            </Badge>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tight">
              We're Here
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                to Help
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-5xl mx-auto leading-relaxed font-light">
              Have questions? Need support? Want to explore enterprise solutions? 
              Our dedicated team is ready to help you succeed and thrive.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-20 px-6 -mt-20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Multiple Ways to
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Connect</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Choose the support channel that works best for you and your team
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {supportOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: option.delay }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="relative group h-full border-0 bg-card/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden text-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <CardHeader className="relative z-10">
                    <div className="relative mx-auto mb-6 w-fit">
                      <div className={`absolute inset-0 bg-gradient-to-br ${option.gradient} rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity`} />
                      <div className={`relative flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${option.gradient} text-white shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110`}>
                        {option.icon}
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                      {option.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {option.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button className="w-full bg-gradient-primary hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl py-3 font-semibold group overflow-hidden relative">
                        <span className="relative z-10">{option.action}</span>
                        <ArrowRight className="ml-2 h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-32 px-6 bg-gradient-to-br from-muted/20 via-background to-muted/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-20" />
        
        <div className="relative container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold">Send us a Message</CardTitle>
                  <CardDescription className="text-lg leading-relaxed">
                    Fill out the form below and we'll get back to you within 24 hours with a detailed response
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your full name"
                          required
                          className="bg-background/50 border-border/50 focus:border-primary/50 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="your.email@example.com"
                          required
                          className="bg-background/50 border-border/50 focus:border-primary/50 transition-all"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-sm font-medium">Company</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Your company name"
                        className="bg-background/50 border-border/50 focus:border-primary/50 transition-all"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-sm font-medium">Subject *</Label>
                      <Select 
                        value={formData.subject} 
                        onValueChange={(value) => setFormData({ ...formData, subject: value })}
                      >
                        <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary/50">
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="support">Technical Support</SelectItem>
                          <SelectItem value="sales">Sales Question</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="feedback">Product Feedback</SelectItem>
                          <SelectItem value="enterprise">Enterprise Solutions</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-medium">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us how we can help you..."
                        className="min-h-[150px] bg-background/50 border-border/50 focus:border-primary/50 transition-all resize-none"
                        required
                      />
                    </div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-primary hover:opacity-90 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl py-6 text-lg font-semibold group overflow-hidden relative" 
                        size="lg"
                      >
                        <span className="relative z-10">Send Message</span>
                        <Send className="ml-2 h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  Contact
                  <br />
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    Information
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We're here to help! Reach out to us through any of these channels 
                  and we'll respond as quickly as possible with expert assistance.
                </p>
              </div>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5 }}
                  >
                    <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className={`absolute inset-0 bg-gradient-to-br ${info.gradient} rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity`} />
                            <div className={`relative p-3 bg-gradient-to-br ${info.gradient} rounded-xl text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                              {info.icon}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{info.title}</h3>
                            <p className="font-medium text-foreground text-base">{info.content}</p>
                            <p className="text-sm text-muted-foreground">{info.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
              
              <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Need Immediate Help?
                  </CardTitle>
                  <CardDescription className="text-base">
                    Check out our resources for instant support and comprehensive answers
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start hover:bg-primary/5 transition-all duration-200 py-3 rounded-xl group">
                    <Globe className="mr-3 h-5 w-5 group-hover:text-primary transition-colors" />
                    <span className="text-base">View Documentation</span>
                  </Button>
                  <Button variant="outline" className="w-full justify-start hover:bg-primary/5 transition-all duration-200 py-3 rounded-xl group">
                    <MessageCircle className="mr-3 h-5 w-5 group-hover:text-primary transition-colors" />
                    <span className="text-base">Join Community</span>
                  </Button>
                  <Button variant="outline" className="w-full justify-start hover:bg-primary/5 transition-all duration-200 py-3 rounded-xl group">
                    <Headphones className="mr-3 h-5 w-5 group-hover:text-primary transition-colors" />
                    <span className="text-base">Schedule a Demo</span>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Response Time Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our Response
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Commitment</span>
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { time: "< 4 hours", type: "Email Support", description: "Average response time for all email inquiries" },
              { time: "< 1 minute", type: "Live Chat", description: "Instant connection with our support team" },
              { time: "24/7", type: "Enterprise", description: "Round-the-clock support for enterprise customers" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-lg text-center group hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                      {item.time}
                    </div>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {item.type}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;