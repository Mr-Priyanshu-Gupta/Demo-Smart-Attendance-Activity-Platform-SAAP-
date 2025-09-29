import { motion } from "framer-motion";
import AppLayout from "@/shared/ui/AppLayout";
import StatsCard from "@/shared/ui/StatsCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  Target, 
  TrendingUp, 
  Clock, 
  BookOpen, 
  Users,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useStudentProfile, useGoalsData } from "@/hooks/useApi";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  const { data: profile } = useStudentProfile();
  const { data: goals } = useGoalsData();

  const todaySchedule = [
    { time: "09:00", subject: "Mathematics", room: "Room 101", status: "completed" },
    { time: "10:00", subject: "Physics", room: "Lab 2", status: "current" },
    { time: "11:00", subject: "Chemistry", room: "Lab 1", status: "upcoming" },
    { time: "14:00", subject: "Literature", room: "Room 205", status: "upcoming" },
  ];

  const recentActivities = [
    { title: "Math Quiz Submitted", time: "2 hours ago", type: "success" },
    { title: "Physics Lab Report Due", time: "Tomorrow", type: "warning" },
    { title: "Science Fair Registration", time: "3 days left", type: "info" },
  ];

  return (
    <AppLayout
      title={`Welcome back, ${profile?.name || "Student"}!`}
      subtitle="Here's your academic overview for today"
      showBackButton={false}
      headerContent={
        <div className="flex gap-2">
          <Link to="/student-app/attendance">
            <Button variant="outline" size="sm">
              Scan Attendance
            </Button>
          </Link>
          <Link to="/student-app/profile">
            <Button variant="ghost" size="sm">
              Profile
            </Button>
          </Link>
        </div>
      }
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatsCard
          title="Attendance Rate"
          value={`${profile?.attendanceRate || 94.2}%`}
          icon={Calendar}
          trend={{ value: 2.3, isPositive: true }}
        />
        <StatsCard
          title="Active Goals"
          value={profile?.currentGoals || 3}
          subtitle="2 near completion"
          icon={Target}
        />
        <StatsCard
          title="Activities Completed"
          value={profile?.completedActivities || 28}
          icon={CheckCircle2}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Current Grade"
          value="A-"
          subtitle="Physics Class"
          icon={TrendingUp}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Today's Schedule */}
        <div className="lg:col-span-2">
          <Card className="edu-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Today's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todaySchedule.map((class_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center gap-4 p-3 rounded-lg ${
                      class_.status === 'current' 
                        ? 'bg-primary/10 border border-primary/20' 
                        : class_.status === 'completed'
                        ? 'bg-success/10 border border-success/20'
                        : 'bg-muted/50'
                    }`}
                  >
                    <div className="text-sm font-medium w-12">
                      {class_.time}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{class_.subject}</div>
                      <div className="text-sm text-muted-foreground">
                        {class_.room}
                      </div>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${
                      class_.status === 'current' ? 'bg-primary' :
                      class_.status === 'completed' ? 'bg-success' : 'bg-muted-foreground'
                    }`} />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Goals & Activities */}
        <div className="space-y-6">
          {/* Active Goals */}
          <Card className="edu-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-base">
                <span className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Goals Progress
                </span>
                <Link to="/student-app/goals">
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {goals?.slice(0, 2).map((goal) => (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{goal.title}</span>
                    <span className="text-muted-foreground">{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="edu-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-base">
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Recent Activity
                </span>
                <Link to="/student-app/activities">
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'success' ? 'bg-success' :
                      activity.type === 'warning' ? 'bg-secondary' : 'bg-primary'
                    }`} />
                    <div className="flex-1 space-y-1">
                      <div className="text-sm font-medium">
                        {activity.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {activity.time}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default StudentDashboard;