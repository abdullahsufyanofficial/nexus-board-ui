import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Scale, Shield, AlertTriangle, Download, Mail, CheckCircle, Users, Globe, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const TermsPage = () => {
  const navigate = useNavigate();

  const keyPoints = [
    {
      title: "Service Availability",
      description: "We strive for 99.9% uptime but cannot guarantee uninterrupted service due to maintenance and updates",
      icon: <Shield className="h-6 w-6" />,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Data Ownership",
      description: "You retain full ownership of all data you upload to our platform, with complete control over access",
      icon: <FileText className="h-6 w-6" />,
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Termination Rights",
      description: "Either party may terminate the agreement with appropriate notice, ensuring fair treatment for all",
      icon: <AlertTriangle className="h-6 w-6" />,
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const sections = [
    {
      title: "Agreement to Terms",
      icon: <Scale className="h-5 w-5" />,
      content: "By accessing and using ProjectFlow, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this service."
    },
    {
      title: "Account Terms",
      icon: <Shield className="h-5 w-5" />,
      items: [
        "You must be 18 years or older to use this service",
        "You must provide accurate and complete registration information",
        "You are responsible for maintaining the security of your account",
        "You are responsible for all activities that occur under your account",
        "You may not use our service for any illegal or unauthorized purpose",
        "You may not violate any laws in your jurisdiction while using our service"
      ]
    },
    {
      title: "Payment Terms",
      icon: <FileText className="h-5 w-5" />,
      items: [
        "Subscription fees are billed in advance on a monthly or yearly basis",
        "All fees are exclusive of applicable taxes, levies, or duties",
        "We reserve the right to change our pricing with 30 days notice",
        "Downgrading your service may cause the loss of features or capacity",
        "Refunds are provided according to our refund policy",
        "Failed payments may result in service suspension"
      ]
    },
    {
      title: "Acceptable Use",
      icon: <AlertTriangle className="h-5 w-5" />,
      items: [
        "Do not upload, transmit, or distribute any malicious software",
        "Do not violate any applicable laws or regulations",
        "Do not infringe on intellectual property rights of others",
        "Do not harass, abuse, or harm other users of the service",
        "Do not attempt to gain unauthorized access to our systems",
        "Do not use our service to send spam or unsolicited communications"
      ]
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
              Terms & Conditions
            </Badge>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tight">
              Terms of
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Service
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-5xl mx-auto leading-relaxed font-light">
              Clear, fair terms that protect both you and ProjectFlow. 
              We believe in transparency, mutual respect, and building lasting partnerships.
            </p>
            
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground bg-background/50 px-6 py-3 rounded-full backdrop-blur-sm border border-border/20">
              <span>Last updated: {new Date().toLocaleDateString()}</span>
              <div className="w-1 h-1 bg-muted-foreground rounded-full" />
              <span>Effective immediately</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Points */}
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
              Key
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Highlights</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              The most important points you should know about our terms
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {keyPoints.map((point, index) => (
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
                      <div className={`absolute inset-0 bg-gradient-to-br ${point.gradient} rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity`} />
                      <div className={`relative p-4 bg-gradient-to-br ${point.gradient} rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110`}>
                        <div className="text-white">
                          {point.icon}
                        </div>
                      </div>
                    </div>
                    <h3 className="font-semibold text-xl mb-4 group-hover:text-primary transition-colors">
                      {point.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {point.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Terms */}
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
                  <CardContent className="space-y-6">
                    {section.content && (
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {section.content}
                      </p>
                    )}
                    {section.items && (
                      <ul className="space-y-4">
                        {section.items.map((item, itemIndex) => (
                          <motion.li 
                            key={itemIndex} 
                            className="flex items-start gap-3"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: itemIndex * 0.05 }}
                            viewport={{ once: true }}
                          >
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                              <CheckCircle className="h-3 w-3 text-primary" />
                            </div>
                            <span className="text-muted-foreground leading-relaxed">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    )}
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
                  These Terms?
                </span>
              </h2>
              
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                Our legal team is here to help clarify any questions you may have about our terms of service.
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
                  <span className="relative z-10">Contact Legal Team</span>
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
                  Download Terms PDF
                </Button>
              </motion.div>
            </div>
            
            <div className="text-sm text-muted-foreground bg-background/50 px-6 py-3 rounded-full backdrop-blur-sm border border-border/20 inline-block">
              Email us directly at: <span className="font-medium text-primary">legal@projectflow.com</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TermsPage;