import { useState } from "react";
import { motion } from "framer-motion";
import AppLayout from "@/shared/ui/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Edit3, 
  Trash2,
  Save
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ScheduleItem {
  id: string;
  subject: string;
  time: string;
  room: string;
  day: string;
  duration: string;
}

const TimetableForm = () => {
  const [schedules, setSchedules] = useState<ScheduleItem[]>([
    { id: "1", subject: "Mathematics", time: "09:00", room: "Room 101", day: "Monday", duration: "60" },
    { id: "2", subject: "Physics", time: "10:00", room: "Lab 2", day: "Monday", duration: "60" },
    { id: "3", subject: "Chemistry", time: "11:00", room: "Lab 1", day: "Monday", duration: "60" },
    { id: "4", subject: "Literature", time: "14:00", room: "Room 205", day: "Monday", duration: "60" },
  ]);

  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [newSchedule, setNewSchedule] = useState({
    subject: "",
    time: "",
    room: "",
    day: "Monday",
    duration: "60"
  });

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 8;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  const handleAddSchedule = () => {
    if (newSchedule.subject && newSchedule.time && newSchedule.room) {
      const schedule: ScheduleItem = {
        id: Date.now().toString(),
        ...newSchedule
      };
      setSchedules([...schedules, schedule]);
      setNewSchedule({
        subject: "",
        time: "",
        room: "",
        day: "Monday",
        duration: "60"
      });
      toast({
        title: "Schedule Added",
        description: "New class has been added to the timetable.",
      });
    }
  };

  const handleDeleteSchedule = (id: string) => {
    setSchedules(schedules.filter(s => s.id !== id));
    toast({
      title: "Schedule Deleted",
      description: "Class has been removed from the timetable.",
    });
  };

  const getTimeSlotSchedules = (day: string, time: string) => {
    return schedules.filter(s => s.day === day && s.time === time);
  };

  return (
    <AppLayout
      title="Timetable Management"
      subtitle="Create and manage class schedules"
      headerContent={
        <Button onClick={() => toast({ title: "Timetable Saved", description: "All changes have been saved." })}>
          <Save className="w-4 h-4 mr-2" />
          Save Timetable
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Add New Schedule */}
        <Card className="edu-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add New Class
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-5">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="e.g., Mathematics"
                  value={newSchedule.subject}
                  onChange={(e) => setNewSchedule({...newSchedule, subject: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label>Day</Label>
                <Select value={newSchedule.day} onValueChange={(value) => setNewSchedule({...newSchedule, day: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map(day => (
                      <SelectItem key={day} value={day}>{day}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Time</Label>
                <Select value={newSchedule.time} onValueChange={(value) => setNewSchedule({...newSchedule, time: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map(time => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="room">Room</Label>
                <Input
                  id="room"
                  placeholder="e.g., Room 101"
                  value={newSchedule.room}
                  onChange={(e) => setNewSchedule({...newSchedule, room: e.target.value})}
                />
              </div>

              <div className="flex items-end">
                <Button onClick={handleAddSchedule} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Class
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timetable Grid */}
        <Card className="edu-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Weekly Timetable
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="grid grid-cols-6 gap-2 min-w-[800px]">
                {/* Header */}
                <div className="p-3 bg-muted/50 rounded-lg font-semibold text-center">
                  Time
                </div>
                {days.map(day => (
                  <div key={day} className="p-3 bg-muted/50 rounded-lg font-semibold text-center">
                    {day}
                  </div>
                ))}

                {/* Time slots */}
                {timeSlots.map(time => (
                  <div key={time} className="contents">
                    <div className="p-3 bg-muted/30 rounded-lg text-center text-sm font-medium">
                      {time}
                    </div>
                    {days.map(day => {
                      const daySchedules = getTimeSlotSchedules(day, time);
                      return (
                        <div key={`${day}-${time}`} className="min-h-[60px] p-2">
                          {daySchedules.map((schedule, index) => (
                            <motion.div
                              key={schedule.id}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.05 }}
                              className="bg-primary/10 border border-primary/20 rounded-lg p-2 mb-1 group hover:bg-primary/20 transition-colors"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-xs text-primary truncate">
                                    {schedule.subject}
                                  </div>
                                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {schedule.room}
                                  </div>
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="w-6 h-6 p-0"
                                    onClick={() => setIsEditing(schedule.id)}
                                  >
                                    <Edit3 className="w-3 h-3" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="w-6 h-6 p-0 text-destructive hover:text-destructive"
                                    onClick={() => handleDeleteSchedule(schedule.id)}
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schedule Summary */}
        <Card className="edu-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Schedule Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  {schedules.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Classes
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary mb-1">
                  {schedules.reduce((total, schedule) => total + parseInt(schedule.duration), 0)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Minutes/Week
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success mb-1">
                  {new Set(schedules.map(s => s.subject)).size}
                </div>
                <div className="text-sm text-muted-foreground">
                  Unique Subjects
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {Array.from(new Set(schedules.map(s => s.subject))).map(subject => (
                <Badge key={subject} variant="outline">
                  {subject}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default TimetableForm;