import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Eye, FileText, Download, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const PrivacyPage = () => {
  const navigate = useNavigate();

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
              Privacy Policy
            </Badge>
            
            <h1 className="text-6xl md:text-8xl font-bold leading-tight">
              Your Privacy
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Matters
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              We're committed to protecting your privacy and being transparent about how we handle your data. 
              Here's everything you need to know.
            </p>
            
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span>Last updated: {new Date().toLocaleDateString()}</span>
              <div className="w-1 h-1 bg-muted-foreground rounded-full" />
              <span>Effective immediately</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
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
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">We Don't Sell Data</h3>
                <p className="text-sm text-muted-foreground">Your information is never sold to third parties</p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <Lock className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Encrypted & Secure</h3>
                <p className="text-sm text-muted-foreground">All data is encrypted and stored securely</p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <Eye className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Full Transparency</h3>
                <p className="text-sm text-muted-foreground">Clear policies with no hidden practices</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Detailed Sections */}
      <section className="py-20 px-6 bg-gradient-to-br from-muted/30 via-background to-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="space-y-16">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        {section.icon}
                      </div>
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {section.content.map((subsection, subIndex) => (
                      <div key={subIndex} className="space-y-4">
                        <h3 className="text-lg font-semibold text-primary">{subsection.subtitle}</h3>
                        <ul className="space-y-3">
                          {subsection.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-3">
                              <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
                              <span className="text-muted-foreground leading-relaxed">{item}</span>
                            </li>
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
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Your Data
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Rights</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              You have full control over your personal information
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
                    className="flex items-center gap-3"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Shield className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{right}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 text-center">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold">
              Questions About
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Your Privacy?
              </span>
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our privacy team is here to help. Contact us with any questions about this policy or how we handle your data.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                onClick={() => navigate('/contact')}
              >
                <Mail className="mr-2 h-4 w-4" />
                Contact Privacy Team
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="hover:bg-primary/5 border-2 transition-all duration-300 hover:scale-105"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Policy PDF
              </Button>
            </div>
            
            <div className="text-sm text-muted-foreground">
              Email us directly at: <span className="font-medium text-primary">privacy@projectflow.com</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPage;