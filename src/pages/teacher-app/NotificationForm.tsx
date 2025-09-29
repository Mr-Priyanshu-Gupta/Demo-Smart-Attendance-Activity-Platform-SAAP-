import { useState } from "react";
import { motion } from "framer-motion";
import AppLayout from "@/shared/ui/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Send, 
  Users, 
  AlertTriangle, 
  Info, 
  CheckCircle2,
  Calendar,
  Clock
} from "lucide-react";
import { useSendNotification } from "@/hooks/useApi";
import { toast } from "@/hooks/use-toast";

const NotificationForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "info",
    priority: "normal",
    recipients: [] as string[],
    scheduleTime: "",
    includeParents: false
  });

  const sendNotification = useSendNotification();

  const notificationTypes = [
    { value: "info", label: "Information", icon: Info, color: "text-blue-600" },
    { value: "warning", label: "Warning", icon: AlertTriangle, color: "text-yellow-600" },
    { value: "success", label: "Success", icon: CheckCircle2, color: "text-green-600" },
    { value: "urgent", label: "Urgent", icon: Bell, color: "text-red-600" }
  ];

  const recipientOptions = [
    { id: "all", name: "All Students" },
    { id: "present", name: "Present Students Only" },
    { id: "absent", name: "Absent Students Only" },
    { id: "specific", name: "Specific Students" },
  ];

  const recentNotifications = [
    {
      title: "Class Rescheduled",
      message: "Tomorrow's Physics class moved to 2 PM",
      type: "warning",
      sent: "2 hours ago",
      recipients: 28
    },
    {
      title: "Assignment Due Reminder",
      message: "Math homework due tomorrow at midnight",
      type: "info",
      sent: "1 day ago",
      recipients: 28
    },
    {
      title: "Excellent Test Results",
      message: "Congratulations on your Chemistry test performance!",
      type: "success",
      sent: "3 days ago",
      recipients: 25
    }
  ];

  const handleRecipientChange = (recipientId: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        recipients: [...formData.recipients, recipientId]
      });
    } else {
      setFormData({
        ...formData,
        recipients: formData.recipients.filter(id => id !== recipientId)
      });
    }
  };

  const handleSendNotification = async () => {
    if (!formData.title || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    try {
      await sendNotification.mutateAsync({
        title: formData.title,
        message: formData.message,
        recipients: formData.recipients
      });

      toast({
        title: "Notification Sent",
        description: `Message sent to ${formData.recipients.length || 28} recipients.`,
      });

      // Reset form
      setFormData({
        title: "",
        message: "",
        type: "info",
        priority: "normal",
        recipients: [],
        scheduleTime: "",
        includeParents: false
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send notification. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getTypeIcon = (type: string) => {
    const typeObj = notificationTypes.find(t => t.value === type);
    const Icon = typeObj?.icon || Info;
    return <Icon className={`w-4 h-4 ${typeObj?.color}`} />;
  };

  return (
    <AppLayout
      title="Send Notifications"
      subtitle="Create and send announcements to students and parents"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Notification Form */}
        <Card className="edu-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="w-5 h-5" />
              Create New Notification
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Title and Type */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Notification Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Class Schedule Change"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Notification Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {notificationTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <type.icon className={`w-4 h-4 ${type.color}`} />
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                placeholder="Enter your message here..."
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="min-h-[120px]"
              />
            </div>

            {/* Recipients */}
            <div className="space-y-3">
              <Label>Recipients</Label>
              <div className="grid gap-3 md:grid-cols-2">
                {recipientOptions.map(option => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.id}
                      checked={formData.recipients.includes(option.id)}
                      onCheckedChange={(checked) => handleRecipientChange(option.id, checked as boolean)}
                    />
                    <Label htmlFor={option.id} className="cursor-pointer">
                      {option.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Options */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Priority Level</Label>
                <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Priority</SelectItem>
                    <SelectItem value="normal">Normal Priority</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="scheduleTime">Schedule Time (Optional)</Label>
                <Input
                  id="scheduleTime"
                  type="datetime-local"
                  value={formData.scheduleTime}
                  onChange={(e) => setFormData({...formData, scheduleTime: e.target.value})}
                />
              </div>
            </div>

            {/* Include Parents Option */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="includeParents"
                checked={formData.includeParents}
                onCheckedChange={(checked) => setFormData({...formData, includeParents: checked as boolean})}
              />
              <Label htmlFor="includeParents" className="cursor-pointer">
                Also send to parents/guardians
              </Label>
            </div>

            {/* Send Button */}
            <div className="flex justify-end pt-4">
              <Button 
                onClick={handleSendNotification}
                disabled={sendNotification.isPending}
                size="lg"
              >
                {sendNotification.isPending ? (
                  <>
                    <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Notification
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        <Card className="edu-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentNotifications.map((notification, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start justify-between p-4 rounded-lg bg-muted/30 border border-border/50"
                >
                  <div className="flex items-start gap-3">
                    {getTypeIcon(notification.type)}
                    <div className="space-y-1">
                      <h4 className="font-medium">{notification.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {notification.recipients} recipients
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {notification.sent}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline">
                    {notification.type}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Templates */}
        <Card className="edu-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Quick Templates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-3">
              {[
                { title: "Class Cancelled", message: "Today's class has been cancelled due to...", type: "warning" },
                { title: "Assignment Reminder", message: "Don't forget your assignment is due...", type: "info" },
                { title: "Great Work!", message: "Congratulations on your excellent performance in...", type: "success" },
              ].map((template, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-lg bg-muted/30 border border-border/50 cursor-pointer"
                  onClick={() => setFormData({
                    ...formData,
                    title: template.title,
                    message: template.message,
                    type: template.type
                  })}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {getTypeIcon(template.type)}
                    <h4 className="font-medium text-sm">{template.title}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {template.message}
                  </p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default NotificationForm;