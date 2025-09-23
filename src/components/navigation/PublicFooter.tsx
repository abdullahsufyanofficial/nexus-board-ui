import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Github, Twitter, Linkedin, Mail, Heart, Layers, ArrowUp } from "lucide-react";
import { useState } from "react";

export function PublicFooter() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    setEmail("");
  };

  return (
    <footer className="relative bg-gradient-to-br from-background via-background to-muted/20 border-t border-border/20">
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
      
      <div className="relative container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary shadow-lg">
                <Layers className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                ProjectFlow
              </h3>
            </div>
            
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
              Transform your team's productivity with modern project management. 
              Built for the future of work, designed for today's teams.
            </p>
            
            {/* Newsletter Signup */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Stay Updated</h4>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-lg border border-border bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
                <Button type="submit" size="sm" className="bg-gradient-primary hover:opacity-90">
                  Subscribe
                </Button>
              </form>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="h-10 w-10 p-0 hover:bg-primary/10 hover:text-primary transition-all duration-200 hover:scale-110">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="h-10 w-10 p-0 hover:bg-primary/10 hover:text-primary transition-all duration-200 hover:scale-110">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="h-10 w-10 p-0 hover:bg-primary/10 hover:text-primary transition-all duration-200 hover:scale-110">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="h-10 w-10 p-0 hover:bg-primary/10 hover:text-primary transition-all duration-200 hover:scale-110">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Product Links */}
          <div className="space-y-6">
            <h4 className="font-semibold text-foreground text-lg">Product</h4>
            <div className="space-y-3">
              <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary justify-start transition-colors" onClick={() => navigate('/about')}>
                About Us
              </Button>
              <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary justify-start transition-colors" onClick={() => navigate('/pricing')}>
                Pricing Plans
              </Button>
              <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary justify-start transition-colors">
                Features
              </Button>
              <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary justify-start transition-colors">
                Integrations
              </Button>
              <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary justify-start transition-colors">
                Roadmap
              </Button>
            </div>
          </div>
          
          {/* Support Links */}
          <div className="space-y-6">
            <h4 className="font-semibold text-foreground text-lg">Support</h4>
            <div className="space-y-3">
              <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary justify-start transition-colors" onClick={() => navigate('/contact')}>
                Contact Us
              </Button>
              <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary justify-start transition-colors">
                Help Center
              </Button>
              <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary justify-start transition-colors">
                Documentation
              </Button>
              <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary justify-start transition-colors">
                API Reference
              </Button>
              <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary justify-start transition-colors">
                Status Page
              </Button>
            </div>
          </div>
          
          {/* Legal Links */}
          <div className="space-y-6">
            <h4 className="font-semibold text-foreground text-lg">Legal</h4>
            <div className="space-y-3">
              <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary justify-start transition-colors" onClick={() => navigate('/privacy')}>
                Privacy Policy
              </Button>
              <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary justify-start transition-colors" onClick={() => navigate('/terms')}>
                Terms of Service
              </Button>
              <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary justify-start transition-colors">
                Cookie Policy
              </Button>
              <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary justify-start transition-colors">
                GDPR
              </Button>
              <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary justify-start transition-colors">
                Security
              </Button>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-border/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>© 2024 ProjectFlow. Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current animate-pulse" />
            <span>for productive teams worldwide</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-sm">
              <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary transition-colors">
                Status
              </Button>
              <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary transition-colors">
                Changelog
              </Button>
              <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary transition-colors">
                Security
              </Button>
            </div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={scrollToTop}
              className="h-10 w-10 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-200 hover:scale-110"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}