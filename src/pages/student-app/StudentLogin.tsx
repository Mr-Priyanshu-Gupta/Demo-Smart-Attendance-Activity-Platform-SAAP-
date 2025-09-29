import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Lock, QrCode, Camera, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StudentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Mock login - in real app would authenticate
    navigate("/student-app/dashboard");
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Card className="edu-card bg-white/95 backdrop-blur-sm border-0">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 mx-auto mb-4 gradient-primary rounded-2xl flex items-center justify-center shadow-glow">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Student Portal</CardTitle>
            <p className="text-muted-foreground">
              Access your educational dashboard
            </p>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="email" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="email" className="text-xs">Email</TabsTrigger>
                <TabsTrigger value="qr" className="text-xs">QR Code</TabsTrigger>
                <TabsTrigger value="face" className="text-xs">Face ID</TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="student@school.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleLogin}
                  className="w-full mt-6 hover:scale-90 transition-transform duration-2000 ease-in-out gradient-primary border-0"
                  size="lg"
                >
                  Sign In
                </Button>
              </TabsContent>

              <TabsContent value="qr" className="space-y-4">
                <div className="text-center py-8">
                  <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-xl flex items-center justify-center">
                    <QrCode className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Scan your student ID QR code to login
                  </p>
                  <Button onClick={handleLogin} variant="outline" className="w-full">
                    Simulate QR Scan
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="face" className="space-y-4">
                <div className="text-center py-8">
                  <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-xl flex items-center justify-center">
                    <Camera className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Look at the camera to authenticate with Face ID
                  </p>
                  <Button onClick={handleLogin} variant="outline" className="w-full">
                    Simulate Face Auth
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default StudentLogin;