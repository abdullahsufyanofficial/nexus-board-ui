import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Target, Users, Lightbulb, Award } from "lucide-react";

const AboutPage = () => {
  const navigate = useNavigate();

  const values = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Mission Focused",
      description: "We're dedicated to helping teams achieve their goals through better project management."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Team First",
      description: "Everything we build is designed with collaboration and team success in mind."
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Innovation Driven",
      description: "We continuously evolve our platform with cutting-edge features and improvements."
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Excellence Committed",
      description: "We strive for excellence in every aspect of our product and customer experience."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold">
            About{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              ProjectFlow
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're on a mission to revolutionize how teams collaborate and manage projects. 
            Built by project managers, for project managers.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                ProjectFlow was born from the frustration of using complex, outdated project 
                management tools that hindered rather than helped team productivity.
              </p>
              <p>
                Our founders, experienced project managers themselves, recognized the need for 
                a modern, intuitive platform that could adapt to any team's workflow while 
                remaining simple enough for everyone to use.
              </p>
              <p>
                Today, thousands of teams around the world trust ProjectFlow to manage their 
                projects, collaborate effectively, and deliver exceptional results.
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-subtle rounded-2xl p-8 border border-border/20">
            <div className="space-y-6 text-center">
              <h3 className="text-2xl font-bold">By the Numbers</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold text-primary">10K+</div>
                  <div className="text-sm text-muted-foreground">Active Teams</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">50K+</div>
                  <div className="text-sm text-muted-foreground">Projects Managed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <div className="text-primary mb-4">
                  {value.icon}
                </div>
                <CardTitle>{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {value.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of teams who have already made the switch to ProjectFlow
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/auth/register')}>
              Get Started Free
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/contact')}>
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;