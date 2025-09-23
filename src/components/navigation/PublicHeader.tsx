import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function PublicHeader() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/20 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <h1 
            className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform"
            onClick={() => navigate('/')}
          >
            ProjectFlow
          </h1>
          
          <nav className="hidden md:flex items-center gap-2">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground" onClick={() => navigate('/')}>Home</Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground" onClick={() => navigate('/about')}>About</Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground" onClick={() => navigate('/pricing')}>Pricing</Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground" onClick={() => navigate('/contact')}>Contact</Button>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground" onClick={() => navigate('/auth/login')}>
            Sign In
          </Button>
          <Button className="bg-gradient-primary hover:opacity-90 shadow-glow" onClick={() => navigate('/auth/register')}>
            Get Started
          </Button>
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/20 bg-background/95 backdrop-blur-xl">
          <nav className="container mx-auto px-6 py-4 space-y-2">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground" onClick={() => { navigate('/'); setIsMenuOpen(false); }}>Home</Button>
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground" onClick={() => { navigate('/about'); setIsMenuOpen(false); }}>About</Button>
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground" onClick={() => { navigate('/pricing'); setIsMenuOpen(false); }}>Pricing</Button>
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground" onClick={() => { navigate('/contact'); setIsMenuOpen(false); }}>Contact</Button>
            <div className="pt-4 space-y-2 border-t border-border/20">
              <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground" onClick={() => { navigate('/auth/login'); setIsMenuOpen(false); }}>
                Sign In
              </Button>
              <Button className="w-full bg-gradient-primary hover:opacity-90" onClick={() => { navigate('/auth/register'); setIsMenuOpen(false); }}>
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}