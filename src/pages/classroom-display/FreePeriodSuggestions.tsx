import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Beaker, 
  Palette, 
  Users, 
  Trophy,
  Clock,
  Star,
  Target,
  Zap,
  Calendar
} from "lucide-react";

const activities = [
  {
    id: 1,
    title: "Science Quiz Challenge",
    description: "Test your knowledge with interactive science questions",
    category: "STEM",
    duration: "15 min",
    icon: Beaker,
    difficulty: "Medium",
    points: 50,
    color: "bg-blue-500"
  },
  {
    id: 2,
    title: "Creative Writing Corner",
    description: "Express yourself through poetry and short stories",
    category: "Literature",
    duration: "20 min", 
    icon: BookOpen,
    difficulty: "Easy",
    points: 30,
    color: "bg-green-500"
  },
  {
    id: 3,
    title: "Math Puzzle Solver",
    description: "Challenge your brain with mathematical puzzles",
    category: "STEM",
    duration: "10 min",
    icon: Target,
    difficulty: "Hard",
    points: 75,
    color: "bg-purple-500"
  },
  {
    id: 4,
    title: "Art Gallery Visit",
    description: "Explore virtual art exhibitions and create your own",
    category: "Arts",
    duration: "25 min",
    icon: Palette,
    difficulty: "Easy",
    points: 40,
    color: "bg-pink-500"
  },
  {
    id: 5,
    title: "Debate Club Discussion",
    description: "Practice argumentation and public speaking skills",
    category: "Social",
    duration: "30 min",
    icon: Users,
    difficulty: "Medium",
    points: 60,
    color: "bg-orange-500"
  },
  {
    id: 6,
    title: "Speed Reading Challenge",
    description: "Improve your reading speed and comprehension",
    category: "Literature", 
    duration: "15 min",
    icon: Zap,
    difficulty: "Medium",
    points: 45,
    color: "bg-yellow-500"
  }
];

const FreePeriodSuggestions = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activities.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentActivity = activities[currentIndex];
  const nextActivities = activities.slice(currentIndex + 1, currentIndex + 4);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-success text-success-foreground';
      case 'Medium': return 'bg-secondary text-secondary-foreground';
      case 'Hard': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'STEM': return Beaker;
      case 'Literature': return BookOpen;
      case 'Arts': return Palette;
      case 'Social': return Users;
      default: return BookOpen;
    }
  };

  return (
    <div className="min-h-screen gradient-hero p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-white mb-2">
          Free Period Activities
        </h1>
        <div className="flex items-center justify-center gap-4 text-white/80">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            {currentTime.toLocaleDateString()}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            {currentTime.toLocaleTimeString()}
          </div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        {/* Featured Activity */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Card className="edu-card bg-white/95 backdrop-blur-sm border-0 shadow-glow">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-16 h-16 ${currentActivity.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <currentActivity.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <Badge variant="outline" className="mb-2">
                        {currentActivity.category}
                      </Badge>
                      <h2 className="text-3xl font-bold text-foreground">
                        {currentActivity.title}
                      </h2>
                    </div>
                  </div>
                  
                  <p className="text-lg text-muted-foreground mb-6">
                    {currentActivity.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4">
                    <Badge className={getDifficultyColor(currentActivity.difficulty)}>
                      {currentActivity.difficulty}
                    </Badge>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {currentActivity.duration}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Trophy className="w-4 h-4" />
                      {currentActivity.points} points
                    </div>
                  </div>
                </div>

                {/* Visual Element */}
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-48 h-48 mx-auto rounded-full gradient-primary opacity-20"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className={`absolute inset-0 w-48 h-48 mx-auto ${currentActivity.color} rounded-full flex items-center justify-center shadow-glow`}
                  >
                    <currentActivity.icon className="w-20 h-20 text-white" />
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Next Activities Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="edu-card bg-white/90 backdrop-blur-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Star className="w-6 h-6" />
                Coming Up Next
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {nextActivities.map((activity, index) => {
                  const Icon = getCategoryIcon(activity.category);
                  
                  return (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="p-4 rounded-lg bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 ${activity.color} rounded-lg flex items-center justify-center`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {activity.category}
                        </Badge>
                      </div>
                      
                      <h3 className="font-semibold mb-2">{activity.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {activity.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {activity.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Trophy className="w-3 h-3" />
                          {activity.points}pts
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Activity Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 grid gap-4 md:grid-cols-4"
        >
          <Card className="edu-card bg-white/90 backdrop-blur-sm border-0">
            <CardContent className="p-4 text-center">
              <BookOpen className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-primary">6</div>
              <div className="text-xs text-muted-foreground">Activities Available</div>
            </CardContent>
          </Card>

          <Card className="edu-card bg-white/90 backdrop-blur-sm border-0">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-secondary" />
              <div className="text-2xl font-bold text-secondary">24</div>
              <div className="text-xs text-muted-foreground">Students Online</div>
            </CardContent>
          </Card>

          <Card className="edu-card bg-white/90 backdrop-blur-sm border-0">
            <CardContent className="p-4 text-center">
              <Trophy className="w-8 h-8 mx-auto mb-2 text-success" />
              <div className="text-2xl font-bold text-success">1,250</div>
              <div className="text-xs text-muted-foreground">Points Available</div>
            </CardContent>
          </Card>

          <Card className="edu-card bg-white/90 backdrop-blur-sm border-0">
            <CardContent className="p-4 text-center">
              <Clock className="w-8 h-8 mx-auto mb-2 text-accent" />
              <div className="text-2xl font-bold text-accent">25</div>
              <div className="text-xs text-muted-foreground">Minutes Left</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Progress Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
            {activities.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FreePeriodSuggestions;