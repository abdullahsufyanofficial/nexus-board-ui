import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Github, Twitter, Linkedin, Mail, Heart, Layers, ArrowUp, Send, MapPin, Phone, Clock } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export function PublicFooter() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    toast({
      title: "Subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    });
    setEmail("");
  };

  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "Features", action: () => navigate('/') },
        { name: "Pricing", action: () => navigate('/pricing') },
        { name: "Integrations", action: () => {} },
        { name: "API", action: () => {} },
        { name: "Changelog", action: () => {} },
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", action: () => navigate('/about') },
        { name: "Careers", action: () => {} },
        { name: "Blog", action: () => {} },
        { name: "Press Kit", action: () => {} },
        { name: "Partners", action: () => {} },
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", action: () => {} },
        { name: "Contact Us", action: () => navigate('/contact') },
        { name: "Documentation", action: () => {} },
        { name: "Community", action: () => {} },
        { name: "Status", action: () => {} },
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", action: () => navigate('/privacy') },
        { name: "Terms of Service", action: () => navigate('/terms') },
        { name: "Cookie Policy", action: () => {} },
        { name: "Security", action: () => {} },
        { name: "GDPR", action: () => {} },
      ]
    }
  ];

  const contactInfo = [
    { icon: <Mail className="h-4 w-4" />, text: "hello@projectflow.com" },
    { icon: <Phone className="h-4 w-4" />, text: "+1 (555) 123-4567" },
    { icon: <MapPin className="h-4 w-4" />, text: "San Francisco, CA" },
  ];

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, label: "GitHub", href: "#" },
    { icon: <Twitter className="h-5 w-5" />, label: "Twitter", href: "#" },
    { icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn", href: "#" },
    { icon: <Mail className="h-5 w-5" />, label: "Email", href: "mailto:hello@projectflow.com" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-background via-muted/20 to-background border-t border-border/20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-20" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      
      <div className="relative container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Brand Section */}
            <motion.div 
              className="lg:col-span-4 space-y-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-primary rounded-xl blur-lg opacity-40" />
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-primary shadow-xl">
                      <Layers className="h-7 w-7 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                      ProjectFlow
                    </h3>
                    <p className="text-sm text-muted-foreground">Modern Project Management</p>
                  </div>
                </div>
                
                <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                  Transform your team's productivity with the most intuitive project management platform. 
                  Built for modern teams who demand excellence.
                </p>
                
                {/* Contact Info */}
                <div className="space-y-3">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        {info.icon}
                      </div>
                      <span>{info.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Links Sections */}
            <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-4 gap-8">
              {footerSections.map((section, sectionIndex) => (
                <motion.div 
                  key={section.title}
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-semibold text-foreground text-lg">{section.title}</h4>
                  <div className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: (sectionIndex * 0.1) + (linkIndex * 0.05) }}
                        viewport={{ once: true }}
                      >
                        <Button 
                          variant="link" 
                          className="h-auto p-0 text-muted-foreground hover:text-primary justify-start transition-all duration-200 hover:translate-x-1" 
                          onClick={link.action}
                        >
                          {link.name}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Newsletter Section */}
            <motion.div 
              className="lg:col-span-2 space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div>
                <h4 className="font-semibold text-foreground text-lg mb-2">Stay Updated</h4>
                <p className="text-sm text-muted-foreground">
                  Get the latest updates, tips, and insights delivered to your inbox.
                </p>
              </div>
              
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="relative">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="pr-12 bg-background/50 border-border/50 focus:border-primary/50 transition-all"
                    required
                  />
                  <Button 
                    type="submit" 
                    size="sm" 
                    className="absolute right-1 top-1 h-8 w-8 p-0 bg-gradient-primary hover:opacity-90"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  No spam, unsubscribe at any time.
                </p>
              </form>
              
              {/* Social Links */}
              <div className="space-y-4">
                <h5 className="font-medium text-sm">Follow Us</h5>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.div
                      key={social.label}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-10 w-10 rounded-xl bg-primary/5 hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-200 shadow-sm hover:shadow-md"
                        asChild
                      >
                        <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                          {social.icon}
                        </a>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <motion.div 
          className="border-t border-border/20 py-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>© 2024 ProjectFlow. Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart className="h-4 w-4 text-red-500 fill-current" />
              </motion.div>
              <span>for productive teams worldwide</span>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-sm">
                <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary transition-colors text-sm">
                  Status
                </Button>
                <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary transition-colors text-sm">
                  Security
                </Button>
                <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary transition-colors text-sm">
                  Sitemap
                </Button>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={scrollToTop}
                  className="h-10 w-10 rounded-xl bg-gradient-primary/10 hover:bg-gradient-primary/20 text-primary transition-all duration-200 shadow-sm hover:shadow-lg"
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}