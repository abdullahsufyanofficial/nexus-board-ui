import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Menu, X, Sun, Moon, Monitor, Layers } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function PublicHeader() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-4 w-4" />;
      case 'dark':
        return <Moon className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/20 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <div 
            className="flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform group"
            onClick={() => navigate('/')}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary shadow-lg group-hover:shadow-xl transition-shadow">
              <Layers className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              ProjectFlow
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-1">
            <Button 
              variant="ghost" 
              className="text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-200" 
              onClick={() => navigate('/')}
            >
              Home
            </Button>
            <Button 
              variant="ghost" 
              className="text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-200" 
              onClick={() => navigate('/about')}
            >
              About
            </Button>
            <Button 
              variant="ghost" 
              className="text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-200" 
              onClick={() => navigate('/pricing')}
            >
              Pricing
            </Button>
            <Button 
              variant="ghost" 
              className="text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-200" 
              onClick={() => navigate('/contact')}
            >
              Contact
            </Button>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {/* Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-200"
              >
                {getThemeIcon()}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')}>
                <Sun className="mr-2 h-4 w-4" />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                <Moon className="mr-2 h-4 w-4" />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                <Monitor className="mr-2 h-4 w-4" />
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button 
            variant="ghost" 
            className="text-muted-foreground hover:text-foreground transition-all duration-200" 
            onClick={() => navigate('/auth/login')}
          >
            Sign In
          </Button>
          <Button 
            className="bg-gradient-primary hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105" 
            onClick={() => navigate('/auth/register')}
          >
            Get Started Free
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
          <nav className="container mx-auto px-6 py-6 space-y-4">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-muted-foreground hover:text-foreground" 
              onClick={() => { navigate('/'); setIsMenuOpen(false); }}
            >
              Home
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-muted-foreground hover:text-foreground" 
              onClick={() => { navigate('/about'); setIsMenuOpen(false); }}
            >
              About
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-muted-foreground hover:text-foreground" 
              onClick={() => { navigate('/pricing'); setIsMenuOpen(false); }}
            >
              Pricing
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-muted-foreground hover:text-foreground" 
              onClick={() => { navigate('/contact'); setIsMenuOpen(false); }}
            >
              Contact
            </Button>
            
            {/* Theme Toggle for Mobile */}
            <div className="pt-4 border-t border-border/20">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-medium">Theme:</span>
                <div className="flex gap-1">
                  <Button 
                    variant={theme === 'light' ? 'default' : 'ghost'} 
                    size="sm"
                    onClick={() => setTheme('light')}
                  >
                    <Sun className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant={theme === 'dark' ? 'default' : 'ghost'} 
                    size="sm"
                    onClick={() => setTheme('dark')}
                  >
                    <Moon className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant={theme === 'system' ? 'default' : 'ghost'} 
                    size="sm"
                    onClick={() => setTheme('system')}
                  >
                    <Monitor className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="pt-4 space-y-3 border-t border-border/20">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-muted-foreground hover:text-foreground" 
                onClick={() => { navigate('/auth/login'); setIsMenuOpen(false); }}
              >
                Sign In
              </Button>
              <Button 
                className="w-full bg-gradient-primary hover:opacity-90" 
                onClick={() => { navigate('/auth/register'); setIsMenuOpen(false); }}
              >
                Get Started Free
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}