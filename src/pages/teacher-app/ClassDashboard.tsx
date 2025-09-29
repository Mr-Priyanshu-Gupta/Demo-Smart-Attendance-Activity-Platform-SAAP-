import { motion } from "framer-motion";
import AppLayout from "@/shared/ui/AppLayout";
import StatsCard from "@/shared/ui/StatsCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  UserCheck, 
  UserX, 
  Clock, 
  TrendingUp,
  Bell,
  Calendar,
  RefreshCw
} from "lucide-react";
import { useClassData } from "@/hooks/useApi";
import { Link } from "react-router-dom";

const ClassDashboard = () => {
  const { data: classData } = useClassData();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-success text-success-foreground';
      case 'absent': return 'bg-destructive text-destructive-foreground';
      case 'late': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return <UserCheck className="w-4 h-4" />;
      case 'absent': return <UserX className="w-4 h-4" />;
      case 'late': return <Clock className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  return (
    <AppLayout
      title={classData?.className || "Class Dashboard"}
      subtitle="Monitor student attendance and class performance"
      showBackButton={false}
      headerContent={
        <div className="flex gap-2">
          <Link to="/teacher-app/notifications">
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Send Alert
            </Button>
          </Link>
          <Link to="/teacher-app/analytics">
            <Button variant="outline" size="sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
            </Button>
          </Link>
          <Button size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <StatsCard
            title="Total Students"
            value={classData?.totalStudents || 0}
            icon={Users}
          />
          <StatsCard
            title="Present Today"
            value={classData?.presentToday || 0}
            icon={UserCheck}
            trend={{ value: 5.2, isPositive: true }}
          />
          <StatsCard
            title="Attendance Rate"
            value={`${classData?.averageAttendance || 0}%`}
            icon={TrendingUp}
            trend={{ value: 2.1, isPositive: true }}
          />
          <StatsCard
            title="On Time"
            value="92%"
            icon={Clock}
            trend={{ value: 3.4, isPositive: true }}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Live Attendance List */}
          <div className="lg:col-span-2">
            <Card className="edu-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Live Attendance
                  </span>
                  <Badge variant="outline" className="animate-pulse-glow">
                    Live
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-auto">
                  {classData?.students?.map((student, index) => (
                    <motion.div
                      key={student.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={`/placeholder-student-${student.id}.jpg`} />
                          <AvatarFallback className="text-sm">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Last seen: {student.lastSeen}
                          </div>
                        </div>
                      </div>
                      <Badge className={getStatusColor(student.status)}>
                        <span className="flex items-center gap-1">
                          {getStatusIcon(student.status)}
                          {student.status}
                        </span>
                      </Badge>
                    </motion.div>
                  )) || []}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Summary */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="edu-card">
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/teacher-app/timetable">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Manage Timetable
                  </Button>
                </Link>
                <Link to="/teacher-app/notifications">
                  <Button variant="outline" className="w-full justify-start">
                    <Bell className="w-4 h-4 mr-2" />
                    Send Announcement
                  </Button>
                </Link>
                <Link to="/teacher-app/analytics">
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Today's Summary */}
            <Card className="edu-card">
              <CardHeader>
                <CardTitle className="text-base">Today's Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Present</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="font-medium">{classData?.presentToday || 0}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Late</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span className="font-medium">2</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Absent</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-destructive rounded-full"></div>
                      <span className="font-medium">
                        {(classData?.totalStudents || 0) - (classData?.presentToday || 0)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Attendance Chart */}
                <div className="pt-4">
                  <div className="flex items-end gap-1 h-20">
                    {[85, 92, 78, 94, 89, 91, 87].map((value, index) => (
                      <motion.div
                        key={index}
                        initial={{ height: 0 }}
                        animate={{ height: `${value}%` }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="flex-1 bg-primary/20 rounded-t-sm relative"
                      >
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${Math.min(value, 100)}%` }}
                          transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                          className="w-full bg-primary rounded-t-sm absolute bottom-0"
                        />
                      </motion.div>
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground text-center mt-2">
                    Last 7 days attendance trend
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ClassDashboard;