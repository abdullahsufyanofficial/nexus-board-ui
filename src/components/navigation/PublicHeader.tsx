import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function PublicHeader() {
  const navigate = useNavigate();

  return (
    <header className="border-b border-border/20 bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <h1 
            className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent cursor-pointer"
            onClick={() => navigate('/')}
          >
            ProjectFlow
          </h1>
          
          <nav className="hidden md:flex items-center gap-6">
            <Button variant="ghost" onClick={() => navigate('/')}>Home</Button>
            <Button variant="ghost" onClick={() => navigate('/about')}>About</Button>
            <Button variant="ghost" onClick={() => navigate('/pricing')}>Pricing</Button>
            <Button variant="ghost" onClick={() => navigate('/contact')}>Contact</Button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/auth/login')}>
            Sign In
          </Button>
          <Button onClick={() => navigate('/auth/register')}>
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}