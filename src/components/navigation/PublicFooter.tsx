import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Github, Twitter, Linkedin, Mail, Heart } from "lucide-react";

export function PublicFooter() {
  const navigate = useNavigate();

  return (
    <footer className="relative bg-gradient-mesh border-t border-border/20">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div className="relative container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                ProjectFlow
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                Transform your team's productivity with modern project management. Built for the future of work.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="h-10 w-10 p-0 hover:bg-primary/10 hover:text-primary">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="h-10 w-10 p-0 hover:bg-primary/10 hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="h-10 w-10 p-0 hover:bg-primary/10 hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="h-10 w-10 p-0 hover:bg-primary/10 hover:text-primary">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Product Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Product</h4>
            <div className="space-y-3">
              <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary justify-start" onClick={() => navigate('/about')}>
                About Us
              </Button>
              <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary justify-start" onClick={() => navigate('/pricing')}>
                Pricing Plans
              </Button>
              <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary justify-start">
                Features
              </Button>
              <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary justify-start">
                Integrations
              </Button>
            </div>
          </div>
          
          {/* Support Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Support</h4>
            <div className="space-y-3">
              <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary justify-start" onClick={() => navigate('/contact')}>
                Contact Us
              </Button>
              <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary justify-start">
                Help Center
              </Button>
              <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary justify-start">
                Documentation
              </Button>
              <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary justify-start">
                API Reference
              </Button>
            </div>
          </div>
          
          {/* Legal Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Legal</h4>
            <div className="space-y-3">
              <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary justify-start" onClick={() => navigate('/privacy')}>
                Privacy Policy
              </Button>
              <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary justify-start" onClick={() => navigate('/terms')}>
                Terms of Service
              </Button>
              <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary justify-start">
                Cookie Policy
              </Button>
              <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary justify-start">
                GDPR
              </Button>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-border/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© 2024 ProjectFlow. Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>for productive teams</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm">
            <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary">
              Status
            </Button>
            <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary">
              Changelog
            </Button>
            <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary">
              Security
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}