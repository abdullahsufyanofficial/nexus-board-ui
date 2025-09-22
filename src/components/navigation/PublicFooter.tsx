import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function PublicFooter() {
  const navigate = useNavigate();

  return (
    <footer className="border-t border-border/20 bg-card/30">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold bg-gradient-primary bg-clip-text text-transparent">
              ProjectFlow
            </h3>
            <p className="text-muted-foreground text-sm">
              Modern project management for teams. Streamline your workflow and boost productivity.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Product</h4>
            <div className="space-y-2">
              <Button variant="link" className="h-auto p-0 text-muted-foreground" onClick={() => navigate('/about')}>
                About
              </Button>
              <Button variant="link" className="h-auto p-0 text-muted-foreground" onClick={() => navigate('/pricing')}>
                Pricing
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Support</h4>
            <div className="space-y-2">
              <Button variant="link" className="h-auto p-0 text-muted-foreground" onClick={() => navigate('/contact')}>
                Contact Us
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Legal</h4>
            <div className="space-y-2">
              <Button variant="link" className="h-auto p-0 text-muted-foreground" onClick={() => navigate('/privacy')}>
                Privacy Policy
              </Button>
              <Button variant="link" className="h-auto p-0 text-muted-foreground" onClick={() => navigate('/terms')}>
                Terms & Conditions
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border/20 mt-8 pt-8 text-center text-sm text-muted-foreground">
          © 2024 ProjectFlow. All rights reserved.
        </div>
      </div>
    </footer>
  );
}