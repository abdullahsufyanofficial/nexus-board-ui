import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon, Monitor, Layers, ChevronDown, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function PublicHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/20 shadow-lg' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        {/* Logo */}
        <motion.div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
            <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary shadow-xl group-hover:shadow-2xl transition-all duration-300">
              <Layers className="h-6 w-6 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              ProjectFlow
            </h1>
            <p className="text-xs text-muted-foreground -mt-1">Modern Project Management</p>
          </div>
        </motion.div>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Button 
                variant="ghost" 
                className={`relative px-6 py-2 text-sm font-medium transition-all duration-200 hover:bg-primary/10 hover:text-primary ${
                  isActive(item.path) ? 'text-primary' : 'text-muted-foreground'
                }`}
                onClick={() => navigate(item.path)}
              >
                {item.name}
                {isActive(item.path) && (
                  <motion.div
                    className="absolute bottom-0 left-1/2 h-0.5 w-8 bg-gradient-primary rounded-full"
                    layoutId="activeTab"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ x: '-50%' }}
                  />
                )}
              </Button>
            </motion.div>
          ))}
          
          {/* Resources Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="px-6 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200">
                Resources
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-background/95 backdrop-blur-xl border border-border/20">
              <DropdownMenuItem onClick={() => navigate('/privacy')} className="cursor-pointer">
                Privacy Policy
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/terms')} className="cursor-pointer">
                Terms of Service
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Documentation
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                API Reference
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Help Center
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
              >
                {getThemeIcon()}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-xl border border-border/20">
              <DropdownMenuItem onClick={() => setTheme('light')} className="cursor-pointer">
                <Sun className="mr-2 h-4 w-4" />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')} className="cursor-pointer">
                <Moon className="mr-2 h-4 w-4" />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')} className="cursor-pointer">
                <Monitor className="mr-2 h-4 w-4" />
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button 
            variant="ghost" 
            className="text-muted-foreground hover:text-primary transition-all duration-200 font-medium" 
            onClick={() => navigate('/auth/login')}
          >
            Sign In
          </Button>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              className="relative bg-gradient-primary hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300 font-medium px-6 group overflow-hidden" 
              onClick={() => navigate('/auth/register')}
            >
              <span className="relative z-10">Get Started Free</span>
              <ArrowRight className="ml-2 h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </Button>
          </motion.div>
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-muted-foreground hover:text-primary"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isMenuOpen ? 'close' : 'menu'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.div>
          </AnimatePresence>
        </Button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden border-t border-border/20 bg-background/95 backdrop-blur-xl overflow-hidden"
          >
            <nav className="container mx-auto px-6 py-6 space-y-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Button 
                    variant="ghost" 
                    className={`w-full justify-start text-left py-3 px-4 rounded-xl transition-all duration-200 ${
                      isActive(item.path) 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                    }`}
                    onClick={() => { 
                      navigate(item.path); 
                      setIsMenuOpen(false); 
                    }}
                  >
                    {item.name}
                  </Button>
                </motion.div>
              ))}
              
              {/* Mobile Resources */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="pt-4 space-y-1"
              >
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-2">
                  Resources
                </p>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-muted-foreground hover:text-primary hover:bg-primary/5 py-3 px-4 rounded-xl" 
                  onClick={() => { navigate('/privacy'); setIsMenuOpen(false); }}
                >
                  Privacy Policy
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-muted-foreground hover:text-primary hover:bg-primary/5 py-3 px-4 rounded-xl" 
                  onClick={() => { navigate('/terms'); setIsMenuOpen(false); }}
                >
                  Terms of Service
                </Button>
              </motion.div>
              
              {/* Mobile Theme Toggle */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="pt-6 border-t border-border/20"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium">Theme</span>
                  <div className="flex gap-1 bg-muted/50 rounded-lg p-1">
                    <Button 
                      variant={theme === 'light' ? 'default' : 'ghost'} 
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => setTheme('light')}
                    >
                      <Sun className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant={theme === 'dark' ? 'default' : 'ghost'} 
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => setTheme('dark')}
                    >
                      <Moon className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant={theme === 'system' ? 'default' : 'ghost'} 
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => setTheme('system')}
                    >
                      <Monitor className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
              
              {/* Mobile Auth Buttons */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                className="pt-4 space-y-3 border-t border-border/20"
              >
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-muted-foreground hover:text-primary hover:bg-primary/5 py-3 px-4 rounded-xl" 
                  onClick={() => { navigate('/auth/login'); setIsMenuOpen(false); }}
                >
                  Sign In
                </Button>
                <Button 
                  className="w-full bg-gradient-primary hover:opacity-90 shadow-lg py-3 rounded-xl font-medium" 
                  onClick={() => { navigate('/auth/register'); setIsMenuOpen(false); }}
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}