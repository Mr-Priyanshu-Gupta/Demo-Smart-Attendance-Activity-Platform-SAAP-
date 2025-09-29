import { useState } from "react";
import { motion } from "framer-motion";
import AppLayout from "@/shared/ui/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  QrCode, 
  CheckCircle2, 
  Clock, 
  MapPin,
  Scan
} from "lucide-react";
import { useMarkAttendance } from "@/hooks/useApi";
import { toast } from "@/hooks/use-toast";

const AttendanceScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanMethod, setScanMethod] = useState<'qr' | 'camera'>('qr');
  const markAttendance = useMarkAttendance();

  const currentClass = {
    subject: "Physics",
    time: "10:00 AM - 11:00 AM",
    room: "Lab 2",
    instructor: "Dr. Sarah Johnson"
  };

  const handleScan = async () => {
    setIsScanning(true);
    
    // Simulate scanning delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      await markAttendance.mutateAsync({
        studentId: "ST2024001",
        classId: "PHYS-12A",
        timestamp: new Date()
      });

      toast({
        title: "Attendance Marked!",
        description: `Successfully checked in to ${currentClass.subject}`,
      });
      
      setIsScanning(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark attendance. Please try again.",
        variant: "destructive"
      });
      setIsScanning(false);
    }
  };

  const recentAttendance = [
    { subject: "Mathematics", time: "09:00 AM", status: "present", date: "Today" },
    { subject: "Chemistry", time: "02:00 PM", status: "present", date: "Yesterday" },
    { subject: "Literature", time: "11:00 AM", status: "present", date: "Yesterday" },
    { subject: "Physics", time: "10:00 AM", status: "absent", date: "2 days ago" },
  ];

  return (
    <AppLayout
      title="Attendance Scanner"
      subtitle="Scan QR code or use camera to mark attendance"
    >
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Current Class Info */}
        <Card className="edu-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Current Class
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-2xl font-bold text-primary">
                  {currentClass.subject}
                </div>
                <div className="text-muted-foreground">
                  {currentClass.time}
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-2 text-sm">
                  <MapPin className="w-4 h-4" />
                  {currentClass.room}
                </div>
                <div className="text-sm text-muted-foreground">
                  {currentClass.instructor}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scanner Interface */}
        <Card className="edu-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scan className="w-5 h-5" />
              Check In
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Scan Method Selection */}
            <div className="flex gap-2 mb-6">
              <Button
                variant={scanMethod === 'qr' ? 'default' : 'outline'}
                onClick={() => setScanMethod('qr')}
                className="flex-1"
              >
                <QrCode className="w-4 h-4 mr-2" />
                QR Code
              </Button>
              <Button
                variant={scanMethod === 'camera' ? 'default' : 'outline'}
                onClick={() => setScanMethod('camera')}
                className="flex-1"
              >
                <Camera className="w-4 h-4 mr-2" />
                Camera
              </Button>
            </div>

            {/* Scanner Area */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className={`aspect-square w-full max-w-sm mx-auto rounded-2xl border-2 border-dashed ${
                isScanning ? 'border-primary bg-primary/5' : 'border-muted-foreground/30'
              } flex flex-col items-center justify-center gap-4 p-8`}>
                {isScanning ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    {scanMethod === 'qr' ? (
                      <QrCode className="w-16 h-16 text-muted-foreground" />
                    ) : (
                      <Camera className="w-16 h-16 text-muted-foreground" />
                    )}
                    <div className="text-center">
                      <p className="font-medium mb-1">
                        {scanMethod === 'qr' ? 'Position QR Code' : 'Position Camera'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {scanMethod === 'qr' 
                          ? 'Align the QR code within the frame'
                          : 'Look at the camera for face recognition'
                        }
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Scan Button */}
              <div className="text-center mt-6">
                <Button
                  onClick={handleScan}
                  disabled={isScanning}
                  size="lg"
                  className="w-full max-w-sm"
                >
                  {isScanning ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 mr-2"
                      >
                        <Scan className="w-4 h-4" />
                      </motion.div>
                      Scanning...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Start Scan
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          </CardContent>
        </Card>

        {/* Recent Attendance */}
        <Card className="edu-card">
          <CardHeader>
            <CardTitle>Recent Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAttendance.map((record, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                >
                  <div>
                    <div className="font-medium">{record.subject}</div>
                    <div className="text-sm text-muted-foreground">
                      {record.date} at {record.time}
                    </div>
                  </div>
                  <Badge variant={record.status === 'present' ? 'default' : 'destructive'}>
                    {record.status}
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

export default AttendanceScanner;