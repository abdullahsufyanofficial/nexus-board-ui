import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Check, Star, ArrowRight, Zap, Shield, Users, Crown, Sparkles, TrendingUp, Globe, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const PricingPage = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small teams getting started with project management",
      monthlyPrice: 0,
      yearlyPrice: 0,
      popular: false,
      icon: <Zap className="h-6 w-6" />,
      gradient: "from-gray-500 to-gray-600",
      features: [
        "Up to 5 team members",
        "3 active projects",
        "Basic task management",
        "Email support",
        "Mobile app access",
        "Basic reporting",
        "1GB file storage"
      ]
    },
    {
      name: "Professional",
      description: "Great for growing teams and established businesses",
      monthlyPrice: 12,
      yearlyPrice: 120,
      popular: true,
      icon: <Users className="h-6 w-6" />,
      gradient: "from-blue-500 via-blue-600 to-purple-600",
      features: [
        "Up to 25 team members",
        "Unlimited projects",
        "Advanced task management",
        "Priority support",
        "Custom integrations",
        "Advanced analytics",
        "Time tracking",
        "Custom fields",
        "API access",
        "10GB file storage",
        "Team collaboration tools"
      ]
    },
    {
      name: "Enterprise",
      description: "For large organizations with specific security and compliance needs",
      monthlyPrice: 29,
      yearlyPrice: 290,
      popular: false,
      icon: <Crown className="h-6 w-6" />,
      gradient: "from-purple-600 via-pink-600 to-red-500",
      features: [
        "Unlimited team members",
        "Everything in Professional",
        "SSO integration",
        "Advanced permissions",
        "Dedicated support manager",
        "Custom onboarding",
        "SLA guarantee",
        "White-label options",
        "Advanced security",
        "Custom integrations",
        "Unlimited file storage",
        "Advanced compliance"
      ]
    }
  ];

  const faqs = [
    {
      question: "Can I change plans at any time?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes! All paid plans come with a 14-day free trial. No credit card required to start your journey with us."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express) and PayPal. Enterprise customers can also pay by invoice."
    },
    {
      question: "Can I cancel at any time?",
      answer: "Absolutely. You can cancel your subscription at any time from your account settings. No questions asked, no cancellation fees."
    },
    {
      question: "Do you offer discounts for nonprofits?",
      answer: "Yes, we offer special pricing for nonprofits, educational institutions, and open-source projects. Contact us for details."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we use enterprise-grade security with end-to-end encryption, regular security audits, and compliance with major standards."
    }
  ];

  const getPrice = (plan: typeof plans[0]) => {
    if (plan.monthlyPrice === 0) return "Free";
    const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
    return `$${price}`;
  };

  const getPeriod = (plan: typeof plans[0]) => {
    if (plan.monthlyPrice === 0) return "forever";
    return billingCycle === 'monthly' ? "per month" : "per year";
  };

  const getSavings = (plan: typeof plans[0]) => {
    if (plan.monthlyPrice === 0) return null;
    const monthlyCost = plan.monthlyPrice * 12;
    const savings = monthlyCost - plan.yearlyPrice;
    return Math.round((savings / monthlyCost) * 100);
  };

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
              Simple Pricing
            </Badge>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tight">
              Choose Your
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Perfect Plan
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-5xl mx-auto leading-relaxed font-light">
              Start free and scale as you grow. No hidden fees, no surprises. 
              Just transparent pricing that evolves with your team's success.
            </p>

            {/* Billing Toggle */}
            <motion.div 
              className="flex items-center justify-center gap-6 mt-16"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className={`text-lg font-medium transition-colors ${billingCycle === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <div className="relative">
                <button
                  onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                  className={`relative w-16 h-8 rounded-full transition-all duration-300 shadow-lg ${
                    billingCycle === 'yearly' ? 'bg-gradient-primary' : 'bg-muted'
                  }`}
                >
                  <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                    billingCycle === 'yearly' ? 'translate-x-8' : 'translate-x-1'
                  }`} />
                </button>
              </div>
              <span className={`text-lg font-medium transition-colors ${billingCycle === 'yearly' ? 'text-foreground' : 'text-muted-foreground'}`}>
                Yearly
              </span>
              {billingCycle === 'yearly' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Badge className="bg-green-500/10 text-green-600 border-green-500/20 px-4 py-1">
                    <Sparkles className="mr-1 h-3 w-3" />
                    Save 20%
                  </Badge>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-6 -mt-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
                whileHover={{ y: -10 }}
              >
                <Card className={`relative bg-card/50 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden h-full ${
                  plan.popular ? 'scale-105 ring-2 ring-primary/50' : ''
                }`}>
                  {plan.popular && (
                    <motion.div 
                      className="absolute -top-4 left-1/2 -translate-x-1/2 z-10"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <Badge className="bg-gradient-primary text-white shadow-xl px-6 py-2 text-sm font-semibold">
                        <Star className="mr-1 h-4 w-4 fill-current" />
                        Most Popular
                      </Badge>
                    </motion.div>
                  )}
                  
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />
                  
                  <CardHeader className="text-center pb-8 pt-12 relative z-10">
                    <div className="relative mx-auto mb-6 w-fit">
                      <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} rounded-2xl blur-lg opacity-40`} />
                      <div className={`relative flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${plan.gradient} text-white shadow-xl`}>
                        {plan.icon}
                      </div>
                    </div>
                    
                    <CardTitle className="text-3xl font-bold">{plan.name}</CardTitle>
                    <CardDescription className="text-base mt-3 leading-relaxed">
                      {plan.description}
                    </CardDescription>
                    
                    <div className="space-y-3 mt-8">
                      <div className="text-6xl font-bold">
                        {getPrice(plan)}
                        {plan.monthlyPrice > 0 && (
                          <span className="text-lg text-muted-foreground font-normal">
                            /{getPeriod(plan)}
                          </span>
                        )}
                      </div>
                      {billingCycle === 'yearly' && plan.monthlyPrice > 0 && getSavings(plan) && (
                        <div className="text-sm text-green-600 font-medium bg-green-500/10 px-3 py-1 rounded-full inline-block">
                          Save {getSavings(plan)}% annually
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-8 relative z-10">
                    <ul className="space-y-4">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.li 
                          key={featureIndex} 
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: featureIndex * 0.05 }}
                          viewport={{ once: true }}
                        >
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-primary/10 flex items-center justify-center">
                            <Check className="h-4 w-4 text-primary" />
                          </div>
                          <span className="text-sm leading-relaxed">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        className={`w-full transition-all duration-300 rounded-xl py-6 text-lg font-semibold group overflow-hidden relative ${
                          plan.popular 
                            ? "bg-gradient-primary hover:opacity-90 shadow-xl hover:shadow-2xl" 
                            : "bg-gradient-primary hover:opacity-90 shadow-lg hover:shadow-xl"
                        }`}
                        size="lg"
                        onClick={() => {
                          if (plan.name === "Enterprise") {
                            navigate('/contact');
                          } else {
                            navigate('/auth/register');
                          }
                        }}
                      >
                        <span className="relative z-10">
                          {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                        </span>
                        <ArrowRight className="ml-2 h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-32 px-6 bg-gradient-to-br from-muted/20 via-background to-muted/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-20" />
        
        <div className="relative container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-6 py-2 text-sm">
              Why Choose Us
            </Badge>
            <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              More Than Just
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Project Management
              </span>
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Enterprise Security",
                description: "Bank-level security with SOC 2 compliance, end-to-end encryption, and regular security audits.",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: <TrendingUp className="h-8 w-8" />,
                title: "Advanced Analytics",
                description: "Deep insights into team performance, project progress, and resource utilization with AI-powered recommendations.",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: <Globe className="h-8 w-8" />,
                title: "Global Scale",
                description: "Built to scale globally with 99.9% uptime, multi-region deployment, and 24/7 monitoring.",
                gradient: "from-green-500 to-emerald-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 text-center h-full group">
                  <CardContent className="p-8">
                    <div className="relative mx-auto mb-6 w-fit">
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity`} />
                      <div className={`relative p-4 bg-gradient-to-br ${feature.gradient} rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110`}>
                        <div className="text-white">
                          {feature.icon}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-6 py-2 text-sm">
              FAQ
            </Badge>
            <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Frequently Asked
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to know about our pricing and plans
            </p>
          </motion.div>
          
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full group">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors">
                      {faq.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-40" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
        
        <div className="relative container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="space-y-8">
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
                Ready to Get
                <br />
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Started?
                </span>
              </h2>
              
              <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Join thousands of teams already using ProjectFlow to manage their projects and boost productivity
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="relative bg-gradient-primary hover:opacity-90 shadow-2xl hover:shadow-3xl text-xl px-12 py-8 h-auto transition-all duration-300 group overflow-hidden rounded-2xl font-semibold" 
                  onClick={() => navigate('/auth/register')}
                >
                  <span className="relative z-10">Start Free Trial</span>
                  <ArrowRight className="ml-3 h-6 w-6 relative z-10 group-hover:translate-x-1 transition-transform" />
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
                  className="text-xl px-12 py-8 h-auto hover:bg-primary/5 border-2 border-border/50 hover:border-primary/50 transition-all duration-300 backdrop-blur-sm rounded-2xl font-semibold" 
                  onClick={() => navigate('/contact')}
                >
                  Contact Sales
                </Button>
              </motion.div>
            </div>
            
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-sm text-muted-foreground">
                No credit card required • 14-day free trial • Cancel anytime
              </div>
              <div className="flex items-center justify-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-green-500" />
                <span className="text-muted-foreground">Enterprise-grade security & compliance</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;