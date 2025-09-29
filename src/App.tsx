import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Student App Pages
import StudentLogin from "./pages/student-app/StudentLogin";
import StudentDashboard from "./pages/student-app/StudentDashboard";
import AttendanceScanner from "./pages/student-app/AttendanceScanner";
import ActivityList from "./pages/student-app/ActivityList";
import GoalTracker from "./pages/student-app/GoalTracker";
import StudentProfile from "./pages/student-app/StudentProfile";

// Teacher App Pages
import TeacherLogin from "./pages/teacher-app/TeacherLogin";
import ClassDashboard from "./pages/teacher-app/ClassDashboard";
import TimetableForm from "./pages/teacher-app/TimetableForm";
import AnalyticsCharts from "./pages/teacher-app/AnalyticsCharts";
import NotificationForm from "./pages/teacher-app/NotificationForm";

// Classroom Display Pages
import LiveAttendanceBoard from "./pages/classroom-display/LiveAttendanceBoard";
import FreePeriodSuggestions from "./pages/classroom-display/FreePeriodSuggestions";
import TimerWidget from "./pages/classroom-display/TimerWidget";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Student App Routes */}
          <Route path="/student-app/login" element={<StudentLogin />} />
          <Route path="/student-app/dashboard" element={<StudentDashboard />} />
          <Route path="/student-app/attendance" element={<AttendanceScanner />} />
          <Route path="/student-app/activities" element={<ActivityList />} />
          <Route path="/student-app/goals" element={<GoalTracker />} />
          <Route path="/student-app/profile" element={<StudentProfile />} />
          
          {/* Teacher App Routes */}
          <Route path="/teacher-app/login" element={<TeacherLogin />} />
          <Route path="/teacher-app/dashboard" element={<ClassDashboard />} />
          <Route path="/teacher-app/timetable" element={<TimetableForm />} />
          <Route path="/teacher-app/analytics" element={<AnalyticsCharts />} />
          <Route path="/teacher-app/notifications" element={<NotificationForm />} />
          
          {/* Classroom Display Routes */}
          <Route path="/classroom-display/attendance" element={<LiveAttendanceBoard />} />
          <Route path="/classroom-display/activities" element={<FreePeriodSuggestions />} />
          <Route path="/classroom-display/timer" element={<TimerWidget />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;