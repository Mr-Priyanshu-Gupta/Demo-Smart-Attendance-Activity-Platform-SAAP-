import { motion } from "framer-motion";
import AppLayout from "@/shared/ui/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Plus, 
  Calendar, 
  CheckCircle2, 
  TrendingUp,
  Award,
  Clock
} from "lucide-react";
import { useGoalsData } from "@/hooks/useApi";

const GoalTracker = () => {
  const { data: goals } = useGoalsData();

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return "text-success";
    if (progress >= 70) return "text-primary";
    if (progress >= 50) return "text-secondary";
    return "text-muted-foreground";
  };

  const getProgressBg = (progress: number) => {
    if (progress >= 90) return "bg-success/10 border-success/20";
    if (progress >= 70) return "bg-primary/10 border-primary/20";
    if (progress >= 50) return "bg-secondary/10 border-secondary/20";
    return "bg-muted/20 border-border";
  };

  return (
    <AppLayout
      title="Goal Tracker"
      subtitle="Monitor your academic progress and achievements"
      headerContent={
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Goal
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Progress Overview */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="edu-card">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary mb-1">
                {goals?.length || 0}
              </div>
              <div className="text-sm text-muted-foreground">
                Active Goals
              </div>
            </CardContent>
          </Card>

          <Card className="edu-card">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-success/10 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-success" />
              </div>
              <div className="text-2xl font-bold text-success mb-1">
                12
              </div>
              <div className="text-sm text-muted-foreground">
                Completed Goals
              </div>
            </CardContent>
          </Card>

          <Card className="edu-card">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-secondary/10 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-secondary" />
              </div>
              <div className="text-2xl font-bold text-secondary mb-1">
                84.5%
              </div>
              <div className="text-sm text-muted-foreground">
                Average Progress
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Goals */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Active Goals</h2>
          
          {goals?.map((goal, index) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`edu-card border ${getProgressBg(goal.progress)}`}>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{goal.title}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Target className="w-4 h-4" />
                          {goal.target}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Due {new Date(goal.deadline).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <Badge 
                      variant="outline"
                      className={`${getProgressColor(goal.progress)} border-current`}
                    >
                      {goal.progress}%
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className={getProgressColor(goal.progress)}>
                        {goal.progress}% Complete
                      </span>
                    </div>
                    <Progress 
                      value={goal.progress} 
                      className="h-3"
                    />
                  </div>

                  {/* Milestones */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Milestones</h4>
                    <div className="space-y-2">
                      {goal.milestones.map((milestone, milestoneIndex) => {
                        const isCompleted = milestoneIndex < Math.floor(goal.progress / (100 / goal.milestones.length));
                        
                        return (
                          <motion.div
                            key={milestoneIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: milestoneIndex * 0.1 }}
                            className={`flex items-center gap-3 p-2 rounded-lg ${
                              isCompleted ? 'bg-success/5' : 'bg-muted/30'
                            }`}
                          >
                            <div className={`w-2 h-2 rounded-full ${
                              isCompleted ? 'bg-success' : 'bg-muted-foreground'
                            }`} />
                            <span className={`text-sm ${
                              isCompleted ? 'text-foreground line-through' : 'text-muted-foreground'
                            }`}>
                              {milestone}
                            </span>
                            {isCompleted && (
                              <CheckCircle2 className="w-4 h-4 text-success ml-auto" />
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Clock className="w-4 h-4 mr-2" />
                      Update Progress
                    </Button>
                    <Button variant="ghost" size="sm">
                      Edit Goal
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Recent Achievements */}
        <Card className="edu-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { title: "Perfect Attendance Week", date: "2 days ago", points: 50 },
                { title: "Math Quiz Perfect Score", date: "1 week ago", points: 100 },
                { title: "Science Project Excellence", date: "2 weeks ago", points: 150 },
              ].map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-success/5 border border-success/20"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                      <Award className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <div className="font-medium">{achievement.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {achievement.date}
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-success text-success-foreground">
                    +{achievement.points} pts
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default GoalTracker;