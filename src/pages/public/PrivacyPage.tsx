import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Eye, FileText, Download, Mail, CheckCircle, Globe, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const PrivacyPage = () => {
  const navigate = useNavigate();

  const principles = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "We Don't Sell Data",
      description: "Your information is never sold to third parties. Your data belongs to you, always.",
      gradient: "from-blue-500 via-blue-600 to-cyan-500"
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "Encrypted & Secure",
      description: "All data is encrypted in transit and at rest with enterprise-grade security.",
      gradient: "from-green-500 via-emerald-500 to-teal-500"
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: "Full Transparency",
      description: "Clear policies with no hidden practices. We tell you exactly what we do.",
      gradient: "from-purple-500 via-purple-600 to-pink-500"
    }
  ];

  const sections = [
    {
      title: "Information We Collect",
      icon: <Eye className="h-5 w-5" />,
      content: [
        {
          subtitle: "Personal Information",
          items: [
            "Name and email address when you create an account",
            "Profile information you choose to provide",
            "Communication preferences and settings",
            "Billing information for paid subscriptions"
          ]
        },
        {
          subtitle: "Usage Data",
          items: [
            "Log files and usage patterns to improve our service",
            "Device and browser information for compatibility",
            "IP address and general location for security",
            "Cookies and similar technologies for functionality"
          ]
        }
      ]
    },
    {
      title: "How We Use Your Information",
      icon: <FileText className="h-5 w-5" />,
      content: [
        {
          subtitle: "Service Provision",
          items: [
            "Provide and maintain our project management platform",
            "Process transactions and send important notifications",
            "Offer customer support and respond to inquiries",
            "Improve and optimize our platform based on usage"
          ]
        },
        {
          subtitle: "Communication",
          items: [
            "Send product updates and feature announcements",
            "Provide security alerts and important notices",
            "Share educational content and best practices",
            "Send marketing communications (with your consent)"
          ]
        }
      ]
    },
    {
      title: "Information Sharing",
      icon: <Lock className="h-5 w-5" />,
      content: [
        {
          subtitle: "We Never Sell Your Data",
          items: [
            "We do not sell, trade, or rent your personal information",
            "We only share data with your explicit consent",
            "Trusted service providers help us operate our platform",
            "Legal compliance when required by law or court order"
          ]
        }
      ]
    },
    {
      title: "Data Security",
      icon: <Shield className="h-5 w-5" />,
      content: [
        {
          subtitle: "Enterprise-Grade Protection",
          items: [
            "End-to-end encryption for all data transmission",
            "Regular security audits and penetration testing",
            "SOC 2 Type II compliance and GDPR adherence",
            "Secure data centers with 24/7 monitoring"
          ]
        }
      ]
    }
  ];

  const rights = [
    "Access your personal data and download a copy",
    "Correct any inaccurate or incomplete information",
    "Delete your data (right to be forgotten)",
    "Restrict or object to certain processing activities",
    "Data portability to another service provider",
    "Withdraw consent for marketing communications"
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
              Privacy Policy
            </Badge>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tight">
              Your Privacy
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Matters
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-5xl mx-auto leading-relaxed font-light">
              We're committed to protecting your privacy and being completely transparent about how we handle your data. 
              Here's everything you need to know about our privacy practices.
            </p>
            
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground bg-background/50 px-6 py-3 rounded-full backdrop-blur-sm border border-border/20">
              <span>Last updated: {new Date().toLocaleDateString()}</span>
              <div className="w-1 h-1 bg-muted-foreground rounded-full" />
              <span>Effective immediately</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Privacy Principles */}
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
              Privacy at a
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Glance</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our core privacy principles that guide everything we do
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {principles.map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 text-center h-full group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <CardContent className="p-8 relative z-10">
                    <div className="relative mx-auto mb-6 w-fit">
                      <div className={`absolute inset-0 bg-gradient-to-br ${principle.gradient} rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity`} />
                      <div className={`relative p-4 bg-gradient-to-br ${principle.gradient} rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110`}>
                        <div className="text-white">
                          {principle.icon}
                        </div>
                      </div>
                    </div>
                    <h3 className="font-semibold text-xl mb-4 group-hover:text-primary transition-colors">
                      {principle.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {principle.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Sections */}
      <section className="py-32 px-6 bg-gradient-to-br from-muted/20 via-background to-muted/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-20" />
        
        <div className="relative container mx-auto max-w-6xl">
          <div className="space-y-16">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                        {section.icon}
                      </div>
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {section.content.map((subsection, subIndex) => (
                      <div key={subIndex} className="space-y-4">
                        <h3 className="text-xl font-semibold text-primary">{subsection.subtitle}</h3>
                        <ul className="space-y-3">
                          {subsection.items.map((item, itemIndex) => (
                            <motion.li 
                              key={itemIndex} 
                              className="flex items-start gap-3"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: itemIndex * 0.05 }}
                              viewport={{ once: true }}
                            >
                              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                                <CheckCircle className="h-3 w-3 text-primary" />
                              </div>
                              <span className="text-muted-foreground leading-relaxed">{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Your Rights */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-6 py-2 text-sm">
              Your Rights
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              You Have Full
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Control</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              You have complete control over your personal information and how it's used
            </p>
          </motion.div>
          
          <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rights.map((right, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-primary/5 transition-all duration-200 group"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-primary/10 flex items-center justify-center group-hover:bg-gradient-primary/20 transition-colors">
                      <Shield className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">{right}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Security Features */}
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
              Security Features
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              Enterprise-Grade
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Security
              </span>
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Shield className="h-6 w-6" />, title: "SOC 2 Compliant", description: "Certified security controls" },
              { icon: <Lock className="h-6 w-6" />, title: "End-to-End Encryption", description: "256-bit AES encryption" },
              { icon: <Globe className="h-6 w-6" />, title: "GDPR Compliant", description: "Full European compliance" },
              { icon: <Users className="h-6 w-6" />, title: "Access Controls", description: "Role-based permissions" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-lg text-center group hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="text-primary mb-4 mx-auto w-fit p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-40" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
        
        <div className="relative container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="space-y-8">
              <h2 className="text-5xl md:text-7xl font-bold leading-tight">
                Questions About
                <br />
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Your Privacy?
                </span>
              </h2>
              
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                Our privacy team is here to help. Contact us with any questions about this policy or how we handle your data.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="bg-gradient-primary hover:opacity-90 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl px-8 py-6 text-lg font-semibold group overflow-hidden relative"
                  onClick={() => navigate('/contact')}
                >
                  <span className="relative z-10">Contact Privacy Team</span>
                  <Mail className="ml-2 h-5 w-5 relative z-10" />
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
                  className="hover:bg-primary/5 border-2 border-border/50 hover:border-primary/50 transition-all duration-300 rounded-xl px-8 py-6 text-lg font-semibold"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Policy PDF
                </Button>
              </motion.div>
            </div>
            
            <div className="text-sm text-muted-foreground bg-background/50 px-6 py-3 rounded-full backdrop-blur-sm border border-border/20 inline-block">
              Email us directly at: <span className="font-medium text-primary">privacy@projectflow.com</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPage;