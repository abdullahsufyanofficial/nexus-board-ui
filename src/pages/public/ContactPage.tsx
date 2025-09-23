import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Headphones, Globe } from "lucide-react";
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
      content: "support@projectflow.com",
      description: "Send us an email anytime",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone Support",
      content: "+1 (555) 123-4567",
      description: "Mon-Fri from 8am to 6pm PST",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Headquarters",
      content: "123 Business Street",
      description: "San Francisco, CA 94105",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Business Hours",
      content: "Mon-Fri 8:00-18:00 PST",
      description: "Saturday 9:00-17:00 PST",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const supportOptions = [
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Live Chat",
      description: "Get instant help from our support team",
      action: "Start Chat",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: "Phone Support",
      description: "Speak directly with our experts",
      action: "Call Now",
      gradient: "from-green-500 to-teal-600"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Help Center",
      description: "Browse our comprehensive documentation",
      action: "Visit Help Center",
      gradient: "from-purple-500 to-pink-600"
    }
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
              Get in Touch
            </Badge>
            
            <h1 className="text-6xl md:text-8xl font-bold leading-tight">
              We're Here
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                to Help
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Have questions? Need support? Want to explore enterprise solutions? 
              Our team is ready to help you succeed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Multiple Ways to
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Connect</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the support channel that works best for you
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {supportOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="relative group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-card/50 backdrop-blur-sm overflow-hidden text-center">
                  <CardHeader>
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${option.gradient} text-white shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {option.icon}
                    </div>
                    <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                      {option.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {option.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-gradient-primary hover:opacity-90">
                      {option.action}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 px-6 bg-gradient-to-br from-muted/30 via-background to-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold">Send us a Message</CardTitle>
                  <CardDescription className="text-base">
                    Fill out the form below and we'll get back to you within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your full name"
                          required
                          className="bg-background/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="your.email@example.com"
                          required
                          className="bg-background/50"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Your company name"
                        className="bg-background/50"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Select 
                        value={formData.subject} 
                        onValueChange={(value) => setFormData({ ...formData, subject: value })}
                      >
                        <SelectTrigger className="bg-background/50">
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
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us how we can help you..."
                        className="min-h-[150px] bg-background/50"
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-primary hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" 
                      size="lg"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
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
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Contact
                  <br />
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    Information
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We're here to help! Reach out to us through any of these channels 
                  and we'll respond as quickly as possible.
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl bg-gradient-to-br ${info.gradient} text-white shadow-lg`}>
                            {info.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{info.title}</h3>
                            <p className="font-medium text-foreground">{info.content}</p>
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
                  <CardTitle className="text-xl">Need Immediate Help?</CardTitle>
                  <CardDescription className="text-base">
                    Check out our resources for instant support and answers
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start hover:bg-primary/5 transition-all duration-200">
                    <Globe className="mr-2 h-4 w-4" />
                    View Documentation
                  </Button>
                  <Button variant="outline" className="w-full justify-start hover:bg-primary/5 transition-all duration-200">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Join Community
                  </Button>
                  <Button variant="outline" className="w-full justify-start hover:bg-primary/5 transition-all duration-200">
                    <Headphones className="mr-2 h-4 w-4" />
                    Schedule a Demo
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;