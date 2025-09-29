import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GraduationCap, Users, Monitor } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const apps = [
    {
      title: "Student App",
      description: "Access your dashboard, track attendance, and manage your goals",
      icon: GraduationCap,
      href: "/student-app/login",
      color: "gradient-primary"
    },
    {
      title: "Teacher App", 
      description: "Manage classes, view analytics, and send notifications",
      icon: Users,
      href: "/teacher-app/login",
      color: "gradient-secondary"
    },
    {
      title: "Classroom Display",
      description: "Live attendance board and activity suggestions",
      icon: Monitor,
      href: "/classroom-display/attendance",
      color: "bg-gradient-to-br from-accent to-purple-600"
    }
  ];

  return (
    <div className="min-h-screen gradient-hero flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          EduManager
        </h1>
        <p className="text-xl text-white/90 max-w-2xl mx-auto">
       Smart Curriculum Actvities and Attendance App
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid md:grid-cols-3 gap-6 w-full max-w-6xl"
      >
        {apps.map((app, index) => {
          const Icon = app.icon;
          return (
            <motion.div
              key={app.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to={app.href}>
                <Card className="edu-card h-full p-8 text-center cursor-pointer bg-white/95 backdrop-blur-sm border-0">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl ${app.color} flex items-center justify-center shadow-glow`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">
                    {app.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {app.description}
                  </p>
                  <Button className="w-full" size="lg">
                    Launch App
                  </Button>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-12 text-center"
      >
        <p className="text-white/80 text-sm">
          To Secure The Relatinship Between Student And Teacher
        </p>
      </motion.div>
    </div>
  );
};

export default Index;