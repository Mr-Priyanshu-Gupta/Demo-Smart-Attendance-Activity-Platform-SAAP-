import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Wifi,
  Calendar
} from "lucide-react";
import { useLiveAttendance } from "@/hooks/useApi";

const LiveAttendanceBoard = () => {
  const { data: attendance } = useLiveAttendance();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const attendancePercentage = attendance 
    ? Math.round((attendance.studentsPresent / attendance.totalStudents) * 100)
    : 0;

  return (
    <div className="min-h-screen gradient-card p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Live Attendance Board
        </h1>
        <div className="flex items-center justify-center gap-4 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            {currentTime.toLocaleDateString()}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            {currentTime.toLocaleTimeString()}
          </div>
          <div className="flex items-center gap-2">
            <Wifi className="w-5 h-5 text-success animate-pulse-glow" />
            Live
          </div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="edu-card bg-primary/5 border-primary/20">
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-3xl font-bold text-primary mb-1">
                  {attendance?.studentsPresent || 0}
                </div>
                <div className="text-sm text-muted-foreground">
                  Students Present
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="edu-card bg-success/5 border-success/20">
              <CardContent className="p-6 text-center">
                <CheckCircle2 className="w-8 h-8 mx-auto mb-3 text-success" />
                <div className="text-3xl font-bold text-success mb-1">
                  {attendancePercentage}%
                </div>
                <div className="text-sm text-muted-foreground">
                  Attendance Rate
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="edu-card bg-secondary/5 border-secondary/20">
              <CardContent className="p-6 text-center">
                <Clock className="w-8 h-8 mx-auto mb-3 text-secondary" />
                <div className="text-3xl font-bold text-secondary mb-1">
                  {attendance?.startTime || "09:00"}
                </div>
                <div className="text-sm text-muted-foreground">
                  Class Started
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="edu-card bg-accent/5 border-accent/20">
              <CardContent className="p-6 text-center">
                <AlertCircle className="w-8 h-8 mx-auto mb-3 text-accent" />
                <div className="text-3xl font-bold text-accent mb-1">
                  {(attendance?.totalStudents || 0) - (attendance?.studentsPresent || 0)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Still Missing
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Current Class Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="edu-card">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                {attendance?.currentClass || "Current Class"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-6xl font-bold text-primary mb-4">
                  {attendancePercentage}%
                </div>
                <div className="text-xl text-muted-foreground mb-6">
                  Class Attendance Rate
                </div>
                
                {/* Progress Bar */}
                <div className="max-w-md mx-auto mb-6">
                  <div className="w-full bg-muted rounded-full h-6">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${attendancePercentage}%` }}
                      transition={{ duration: 1, delay: 0.8 }}
                      className="progress-bar h-6 rounded-full flex items-center justify-center text-white font-medium"
                    >
                      {attendancePercentage > 20 && `${attendancePercentage}%`}
                    </motion.div>
                  </div>
                </div>

                <div className="text-lg">
                  <span className="font-semibold">{attendance?.studentsPresent || 0}</span>
                  <span className="text-muted-foreground"> out of </span>
                  <span className="font-semibold">{attendance?.totalStudents || 0}</span>
                  <span className="text-muted-foreground"> students present</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Check-ins */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="edu-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-success" />
                Recent Check-ins
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {attendance?.recentCheck?.map((checkIn, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.2 }}
                    className="flex items-center justify-between p-4 rounded-lg bg-success/5 border border-success/20"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12 ring-2 ring-success/30">
                        <AvatarImage src={`/placeholder-student-${index + 1}.jpg`} />
                        <AvatarFallback className="bg-success/10 text-success font-semibold">
                          {checkIn.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-lg">{checkIn.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Checked in at {checkIn.time}
                        </div>
                      </div>
                    </div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1 + index * 0.2 }}
                    >
                      <Badge className="bg-success text-success-foreground text-sm px-3 py-1">
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        Present
                      </Badge>
                    </motion.div>
                  </motion.div>
                )) || []}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Live Status Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="fixed bottom-6 right-6"
        >
          <Card className="edu-card border-success/30 bg-success/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse-glow" />
                <span className="font-medium text-success">Live Updates Active</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default LiveAttendanceBoard;