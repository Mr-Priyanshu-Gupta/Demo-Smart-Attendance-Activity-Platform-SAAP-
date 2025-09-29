import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Clock, 
  Play, 
  Pause, 
  RotateCcw, 
  Calendar,
  Bell,
  Coffee,
  BookOpen,
  Users
} from "lucide-react";

interface Schedule {
  time: string;
  subject: string;
  type: 'class' | 'break' | 'lunch';
  duration: number;
  room?: string;
}

const todaySchedule: Schedule[] = [
  { time: "09:00", subject: "Mathematics", type: "class", duration: 60, room: "Room 101" },
  { time: "10:00", subject: "Break", type: "break", duration: 15 },
  { time: "10:15", subject: "Physics", type: "class", duration: 60, room: "Lab 2" },
  { time: "11:15", subject: "Chemistry", type: "class", duration: 60, room: "Lab 1" },
  { time: "12:15", subject: "Lunch Break", type: "lunch", duration: 45 },
  { time: "13:00", subject: "Literature", type: "class", duration: 60, room: "Room 205" },
  { time: "14:00", subject: "Biology", type: "class", duration: 60, room: "Lab 3" },
];

const TimerWidget = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [targetTime, setTargetTime] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isActive, setIsActive] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState(25); // Pomodoro default

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Find current and next classes
  const getCurrentClass = () => {
    const now = currentTime;
    const currentTimeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    for (let i = 0; i < todaySchedule.length; i++) {
      const schedule = todaySchedule[i];
      const [hours, minutes] = schedule.time.split(':').map(Number);
      const scheduleTime = new Date(now);
      scheduleTime.setHours(hours, minutes, 0, 0);
      
      const endTime = new Date(scheduleTime);
      endTime.setMinutes(endTime.getMinutes() + schedule.duration);
      
      if (now >= scheduleTime && now <= endTime) {
        return { current: schedule, timeLeft: Math.ceil((endTime.getTime() - now.getTime()) / 1000 / 60) };
      }
    }
    return null;
  };

  const getNextClass = () => {
    const now = currentTime;
    
    for (let i = 0; i < todaySchedule.length; i++) {
      const schedule = todaySchedule[i];
      const [hours, minutes] = schedule.time.split(':').map(Number);
      const scheduleTime = new Date(now);
      scheduleTime.setHours(hours, minutes, 0, 0);
      
      if (scheduleTime > now) {
        const minutesUntil = Math.ceil((scheduleTime.getTime() - now.getTime()) / 1000 / 60);
        return { next: schedule, minutesUntil };
      }
    }
    return null;
  };

  const currentClass = getCurrentClass();
  const nextClass = getNextClass();

  // Custom timer functionality
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      // Timer completed - could trigger notification
    }
  }, [isActive, timeLeft]);

  const startTimer = () => {
    if (timeLeft === 0) {
      setTimeLeft(timerMinutes * 60);
    }
    setIsActive(true);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(timerMinutes * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTypeIcon = (type: Schedule['type']) => {
    switch (type) {
      case 'class': return BookOpen;
      case 'break': return Coffee;
      case 'lunch': return Users;
      default: return Clock;
    }
  };

  const getTypeColor = (type: Schedule['type']) => {
    switch (type) {
      case 'class': return 'text-primary';
      case 'break': return 'text-secondary';
      case 'lunch': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const timerProgress = timerMinutes > 0 ? ((timerMinutes * 60 - timeLeft) / (timerMinutes * 60)) * 100 : 0;

  return (
    <div className="min-h-screen gradient-card p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Classroom Timer
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
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Current Class Status */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="edu-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Clock className="w-8 h-8" />
                {currentClass ? "Current Class" : "Break Time"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentClass ? (
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {currentClass.current.subject}
                  </div>
                  <div className="text-xl text-muted-foreground mb-4">
                    {currentClass.current.room && `${currentClass.current.room} • `}
                    {currentClass.timeLeft} minutes remaining
                  </div>
                  <Progress 
                    value={((currentClass.current.duration - currentClass.timeLeft) / currentClass.current.duration) * 100}
                    className="h-4 mb-4"
                  />
                  <Badge className="text-sm px-4 py-2">
                    In Progress
                  </Badge>
                </div>
              ) : (
                <div className="text-center">
                  <Coffee className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <div className="text-2xl font-bold text-muted-foreground mb-2">
                    Break Time
                  </div>
                  <div className="text-lg text-muted-foreground">
                    Enjoy your free time!
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Next Class */}
        {nextClass && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="edu-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-6 h-6" />
                  Next Class
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center ${getTypeColor(nextClass.next.type)}`}>
                      {(() => {
                        const Icon = getTypeIcon(nextClass.next.type);
                        return <Icon className="w-6 h-6" />;
                      })()}
                    </div>
                    <div>
                      <div className="font-semibold text-lg">{nextClass.next.subject}</div>
                      <div className="text-sm text-muted-foreground">
                        {nextClass.next.room && `${nextClass.next.room} • `}
                        Starts at {nextClass.next.time}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {nextClass.minutesUntil}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      minutes
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Custom Timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="edu-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-6 h-6" />
                Study Timer
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-6">
                {/* Circular Progress */}
                <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth="6"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - timerProgress / 100)}`}
                    transition={{ duration: 0.5 }}
                  />
                </svg>
                
                {/* Timer Display */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">
                      {formatTime(timeLeft)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {isActive ? 'Running' : 'Paused'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Timer Controls */}
              <div className="flex items-center justify-center gap-4 mb-4">
                <Button
                  onClick={isActive ? pauseTimer : startTimer}
                  size="lg"
                  className="w-16 h-16 rounded-full"
                >
                  {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </Button>
                <Button
                  onClick={resetTimer}
                  variant="outline"
                  size="lg"
                  className="w-16 h-16 rounded-full"
                >
                  <RotateCcw className="w-6 h-6" />
                </Button>
              </div>

              {/* Timer Presets */}
              <div className="flex items-center justify-center gap-2">
                {[15, 25, 45].map((minutes) => (
                  <Button
                    key={minutes}
                    variant={timerMinutes === minutes ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setTimerMinutes(minutes);
                      if (!isActive) {
                        setTimeLeft(minutes * 60);
                      }
                    }}
                  >
                    {minutes}m
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Today's Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="edu-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-6 h-6" />
                Today's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {todaySchedule.map((item, index) => {
                  const Icon = getTypeIcon(item.type);
                  const isCurrentClass = currentClass?.current === item;
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      className={`flex items-center gap-4 p-3 rounded-lg ${
                        isCurrentClass 
                          ? 'bg-primary/10 border border-primary/20' 
                          : 'bg-muted/30'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isCurrentClass ? 'bg-primary/20' : 'bg-muted/50'
                      }`}>
                        <Icon className={`w-5 h-5 ${
                          isCurrentClass ? 'text-primary' : getTypeColor(item.type)
                        }`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className={`font-medium ${
                          isCurrentClass ? 'text-primary' : 'text-foreground'
                        }`}>
                          {item.subject}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {item.time} • {item.duration} min
                          {item.room && ` • ${item.room}`}
                        </div>
                      </div>
                      
                      {isCurrentClass && (
                        <Badge className="animate-pulse-glow">
                          Current
                        </Badge>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default TimerWidget;