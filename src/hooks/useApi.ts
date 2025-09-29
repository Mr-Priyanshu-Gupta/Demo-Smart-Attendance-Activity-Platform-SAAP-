import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Mock API functions for demonstration
const mockApiCall = <T>(data: T, delay = 1000): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

// Student API hooks
export const useStudentProfile = () => {
  return useQuery({
    queryKey: ["student-profile"],
    queryFn: () => mockApiCall({
      id: "1",
      name: "Vivek Kumar",
      email: "vivek.kumar@school.edu",
      studentId: "ST2024001",
      grade: "12th Grade",
      avatar: "/placeholder-avatar.jpg",
      attendanceRate: 94.2,
      currentGoals: 3,
      completedActivities: 28
    })
  });
};

export const useAttendanceData = () => {
  return useQuery({
    queryKey: ["attendance"],
    queryFn: () => mockApiCall([
      { date: "2024-01-15", present: true, class: "Data Analytics" },
      { date: "2024-01-15", present: true, class: "D.S.A" },
      { date: "2024-01-15", present: false, class: "Chemistry" },
      { date: "2024-01-14", present: true, class: "Mathematics" },
      { date: "2024-01-14", present: true, class: "Physics" },
      { date: "2024-01-14", present: true, class: "Compiler design" },
    ])
  });
};

export const useGoalsData = () => {
  return useQuery({
    queryKey: ["goals"],
    queryFn: () => mockApiCall([
      {
        id: "1",
        title: "Improve Math Grade",
        progress: 75,
        target: "A Grade",
        deadline: "2024-03-15",
        milestones: ["Complete homework", "Attend extra classes", "Take practice tests"]
      },
      {
        id: "2", 
        title: "Perfect Attendance",
        progress: 94.2,
        target: "100% Attendance",
        deadline: "2024-06-15",
        milestones: ["No unexcused absences", "Arrive on time", "Attend all classes"]
      }
    ])
  });
};

export const useActivities = () => {
  return useQuery({
    queryKey: ["activities"],
    queryFn: () => mockApiCall([
      { id: "1", title: "Science Fair Project", category: "STEM", difficulty: "Medium", points: 50 },
      { id: "2", title: "Book Club Discussion", category: "Literature", difficulty: "Easy", points: 25 },
      { id: "3", title: "Math Olympiad Prep", category: "STEM", difficulty: "Hard", points: 100 },
      { id: "4", title: "Art Exhibition", category: "Arts", difficulty: "Medium", points: 40 },
      { id: "5", title: "Debate Tournament", category: "Social", difficulty: "Hard", points: 75 }
    ])
  });
};

// Teacher API hooks
export const useClassData = () => {
  return useQuery({
    queryKey: ["class-data"],
    queryFn: () => mockApiCall({
      className: "Physics - Grade 12A",
      totalStudents: 28,
      presentToday: 25,
      averageAttendance: 89.3,
      students: [
        { id: "1", name: "Priyanshu Kumar", status: "present", lastSeen: "09:15 AM" },
        { id: "2", name: "Dev Kumar", status: "present", lastSeen: "09:12 AM" },
        { id: "3", name: "Rahul Sharma", status: "absent", lastSeen: "Yesterday" },
        { id: "4", name: "Priyanjal Varshney", status: "present", lastSeen: "09:18 AM" },
        { id: "5", name: "Mahak Kumari", status: "late", lastSeen: "09:25 AM" }
      ]
    })
  });
};

export const useAnalyticsData = () => {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: () => mockApiCall({
      attendanceByWeek: [
        { week: "Week 1", attendance: 92 },
        { week: "Week 2", attendance: 88 },
        { week: "Week 3", attendance: 95 },
        { week: "Week 4", attendance: 89 },
        { week: "Week 5", attendance: 94 }
      ],
      engagementBySubject: [
        { subject: "Math", engagement: 85 },
        { subject: "Physics", engagement: 92 },
        { subject: "Chemistry", engagement: 78 },
        { subject: "Data Analytics", engagement: 89 }
      ]
    })
  });
};

// Classroom Display API hooks
export const useLiveAttendance = () => {
  return useQuery({
    queryKey: ["live-attendance"],
    queryFn: () => mockApiCall({
      currentClass: "Mathematics - Grade 12A",
      startTime: "09:00 AM",
      studentsPresent: 24,
      totalStudents: 28,
      recentCheck: [
        { name: "Dev Kumar", time: "09:15 AM", status: "present" },
        { name: "Priyanshu Kumar", time: "09:14 AM", status: "present" },
        { name: "Ritika Kumari", time: "09:13 AM", status: "present" }
      ]
    }),
    refetchInterval: 5000 // Refetch every 5 seconds for live updates
  });
};

// Mutations for data updates
export const useMarkAttendance = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (attendanceData: { studentId: string; classId: string; timestamp: Date }) =>
      mockApiCall({ success: true, ...attendanceData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendance"] });
      queryClient.invalidateQueries({ queryKey: ["live-attendance"] });
    }
  });
};

export const useSendNotification = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (notification: { title: string; message: string; recipients: string[] }) =>
      mockApiCall({ success: true, id: Date.now().toString(), ...notification }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    }
  });
};