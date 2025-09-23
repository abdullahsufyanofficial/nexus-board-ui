import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Scale, Shield, AlertTriangle, Download, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const TermsPage = () => {
  const navigate = useNavigate();

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

  const keyPoints = [
    {
      title: "Service Availability",
      description: "We strive for 99.9% uptime but cannot guarantee uninterrupted service",
      icon: <Shield className="h-6 w-6" />
    },
    {
      title: "Data Ownership",
      description: "You retain ownership of all data you upload to our platform",
      icon: <FileText className="h-6 w-6" />
    },
    {
      title: "Termination Rights",
      description: "Either party may terminate the agreement with appropriate notice",
      icon: <AlertTriangle className="h-6 w-6" />
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
              Terms & Conditions
            </Badge>
            
            <h1 className="text-6xl md:text-8xl font-bold leading-tight">
              Terms of
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Service
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Clear, fair terms that protect both you and ProjectFlow. 
              We believe in transparency and mutual respect.
            </p>
            
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span>Last updated: {new Date().toLocaleDateString()}</span>
              <div className="w-1 h-1 bg-muted-foreground rounded-full" />
              <span>Effective immediately</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Points */}
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
              Key
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Highlights</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              The most important points you should know
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {keyPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center h-full">
                  <CardContent className="p-6">
                    <div className="text-primary mb-4">
                      {point.icon}
                    </div>
                    <h3 className="font-semibold mb-3">{point.title}</h3>
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
      <section className="py-20 px-6 bg-gradient-to-br from-muted/30 via-background to-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="space-y-12">
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
                  <CardContent className="space-y-6">
                    {section.content && (
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {section.content}
                      </p>
                    )}
                    {section.items && (
                      <ul className="space-y-3">
                        {section.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-primary mt-2" />
                            <span className="text-muted-foreground leading-relaxed">{item}</span>
                          </li>
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
                These Terms?
              </span>
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our legal team is here to help clarify any questions you may have about our terms of service.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                onClick={() => navigate('/contact')}
              >
                <Mail className="mr-2 h-4 w-4" />
                Contact Legal Team
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="hover:bg-primary/5 border-2 transition-all duration-300 hover:scale-105"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Terms PDF
              </Button>
            </div>
            
            <div className="text-sm text-muted-foreground">
              Email us directly at: <span className="font-medium text-primary">legal@projectflow.com</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TermsPage;