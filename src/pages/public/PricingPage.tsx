import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Check, Star, ArrowRight, Zap, Shield, Users, Globe, Headphones, Crown } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const PricingPage = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small teams getting started",
      monthlyPrice: 0,
      yearlyPrice: 0,
      popular: false,
      icon: <Zap className="h-6 w-6" />,
      gradient: "from-gray-500 to-gray-600",
      features: [
        "Up to 5 team members",
        "3 projects",
        "Basic task management",
        "Email support",
        "Mobile app access",
        "Basic reporting"
      ]
    },
    {
      name: "Professional",
      description: "Great for growing teams and businesses",
      monthlyPrice: 12,
      yearlyPrice: 120,
      popular: true,
      icon: <Users className="h-6 w-6" />,
      gradient: "from-blue-500 to-purple-600",
      features: [
        "Up to 25 team members",
        "Unlimited projects",
        "Advanced task management",
        "Priority support",
        "Custom integrations",
        "Advanced analytics",
        "Time tracking",
        "Custom fields",
        "API access"
      ]
    },
    {
      name: "Enterprise",
      description: "For large organizations with specific needs",
      monthlyPrice: 29,
      yearlyPrice: 290,
      popular: false,
      icon: <Crown className="h-6 w-6" />,
      gradient: "from-purple-600 to-pink-600",
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
        "Custom integrations"
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
      answer: "Yes! All paid plans come with a 14-day free trial. No credit card required to start."
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
              Simple Pricing
            </Badge>
            
            <h1 className="text-6xl md:text-8xl font-bold leading-tight">
              Choose Your
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Perfect Plan
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Start free and scale as you grow. No hidden fees, no surprises. 
              Just transparent pricing that grows with your team.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mt-12">
              <span className={`font-medium transition-colors ${billingCycle === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
                  billingCycle === 'yearly' ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                  billingCycle === 'yearly' ? 'translate-x-7' : 'translate-x-1'
                }`} />
              </button>
              <span className={`font-medium transition-colors ${billingCycle === 'yearly' ? 'text-foreground' : 'text-muted-foreground'}`}>
                Yearly
              </span>
              {billingCycle === 'yearly' && (
                <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                  Save 20%
                </Badge>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-6">
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
              >
                <Card className={`relative bg-card/50 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden ${
                  plan.popular ? 'scale-105 ring-2 ring-primary/50' : 'hover:scale-105'
                }`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-gradient-primary text-white shadow-lg px-6 py-2">
                        <Star className="mr-1 h-4 w-4 fill-current" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-8 pt-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.gradient} text-white shadow-lg mb-6`}>
                      {plan.icon}
                    </div>
                    
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <CardDescription className="text-base mt-2">
                      {plan.description}
                    </CardDescription>
                    
                    <div className="space-y-2 mt-6">
                      <div className="text-5xl font-bold">
                        {getPrice(plan)}
                        {plan.monthlyPrice > 0 && (
                          <span className="text-lg text-muted-foreground font-normal">
                            /{getPeriod(plan)}
                          </span>
                        )}
                      </div>
                      {billingCycle === 'yearly' && plan.monthlyPrice > 0 && getSavings(plan) && (
                        <div className="text-sm text-green-600 font-medium">
                          Save {getSavings(plan)}% annually
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <ul className="space-y-4">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                            <Check className="h-3 w-3 text-primary" />
                          </div>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full transition-all duration-300 hover:scale-105 ${
                        plan.popular 
                          ? "bg-gradient-primary hover:opacity-90 shadow-lg" 
                          : "bg-gradient-primary hover:opacity-90"
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
                      {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-6 bg-gradient-to-br from-muted/30 via-background to-muted/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              FAQ
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Frequently Asked
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
          </motion.div>
          
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold leading-tight">
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

      {/* CTA Section */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
        
        <div className="relative container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-5xl md:text-7xl font-bold leading-tight">
              Ready to Get
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Started?
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Join thousands of teams already using ProjectFlow to manage their projects and boost productivity
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:opacity-90 shadow-xl hover:shadow-2xl text-lg px-10 py-6 h-auto transition-all duration-300 hover:scale-105" 
                onClick={() => navigate('/auth/register')}
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-10 py-6 h-auto hover:bg-primary/5 border-2 transition-all duration-300 hover:scale-105" 
                onClick={() => navigate('/contact')}
              >
                Contact Sales
              </Button>
            </div>
            
            <div className="text-sm text-muted-foreground space-y-2">
              <div>No credit card required • 14-day free trial • Cancel anytime</div>
              <div className="flex items-center justify-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Enterprise-grade security & compliance</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;