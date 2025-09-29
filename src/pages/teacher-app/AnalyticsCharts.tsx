import { motion } from "framer-motion";
import AppLayout from "@/shared/ui/AppLayout";
import StatsCard from "@/shared/ui/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  Target,
  Award,
  Clock
} from "lucide-react";
import { useAnalyticsData } from "@/hooks/useApi";

const COLORS = ['#3B82F6', '#F59E0B', '#10B981', '#EF4444', '#8B5CF6'];

const AnalyticsCharts = () => {
  const { data: analytics } = useAnalyticsData();

  const performanceData = [
    { name: 'Excellent', value: 35, color: '#10B981' },
    { name: 'Good', value: 40, color: '#3B82F6' },
    { name: 'Average', value: 20, color: '#F59E0B' },
    { name: 'Needs Improvement', value: 5, color: '#EF4444' }
  ];

  const monthlyTrends = [
    { month: 'Sep', attendance: 92, engagement: 88, performance: 85 },
    { month: 'Oct', attendance: 89, engagement: 91, performance: 87 },
    { month: 'Nov', attendance: 94, engagement: 93, performance: 90 },
    { month: 'Dec', attendance: 91, engagement: 89, performance: 88 },
    { month: 'Jan', attendance: 95, engagement: 94, performance: 92 }
  ];

  const subjectComparison = [
    { subject: 'Math', avgScore: 87, attendance: 94 },
    { subject: 'Physics', avgScore: 91, attendance: 89 },
    { subject: 'Chemistry', avgScore: 84, attendance: 92 },
    { subject: 'Biology', avgScore: 88, attendance: 96 },
    { subject: 'Literature', avgScore: 92, attendance: 91 }
  ];

  return (
    <AppLayout
      title="Analytics Dashboard"
      subtitle="Comprehensive insights into student performance and engagement"
    >
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-4">
          <StatsCard
            title="Average Attendance"
            value="92.3%"
            icon={Users}
            trend={{ value: 3.2, isPositive: true }}
          />
          <StatsCard
            title="Engagement Score"
            value="89.7%"
            icon={Target}
            trend={{ value: 5.1, isPositive: true }}
          />
          <StatsCard
            title="Class Average"
            value="88.5%"
            icon={Award}
            trend={{ value: 2.8, isPositive: true }}
          />
          <StatsCard
            title="Completion Rate"
            value="94.2%"
            icon={TrendingUp}
            trend={{ value: 1.9, isPositive: true }}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Attendance Trends */}
          <Card className="edu-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Attendance Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analytics?.attendanceByWeek || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="week" 
                    stroke="#6b7280"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="attendance" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Performance Distribution */}
          <Card className="edu-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Performance Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={performanceData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {performanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Trends */}
        <Card className="edu-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Monthly Trends Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="month" 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="attendance" fill="#3B82F6" name="Attendance" />
                <Bar dataKey="engagement" fill="#F59E0B" name="Engagement" />
                <Bar dataKey="performance" fill="#10B981" name="Performance" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Subject Performance Comparison */}
        <Card className="edu-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Subject Performance Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subjectComparison.map((subject, index) => (
                <motion.div
                  key={subject.subject}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/30"
                >
                  <div className="flex items-center gap-4">
                    <div className="font-medium min-w-[100px]">
                      {subject.subject}
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Score: </span>
                        <span className="font-medium">{subject.avgScore}%</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Attendance: </span>
                        <span className="font-medium">{subject.attendance}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={subject.avgScore >= 90 ? "default" : subject.avgScore >= 80 ? "secondary" : "destructive"}
                    >
                      {subject.avgScore >= 90 ? "Excellent" : subject.avgScore >= 80 ? "Good" : "Needs Focus"}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Insights Summary */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="edu-card border-l-4 border-l-success">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-success" />
                </div>
                <div className="font-semibold text-success">Positive Trend</div>
              </div>
              <p className="text-sm text-muted-foreground">
                Overall class performance has improved by 3.2% over the last month, 
                with particular strength in Physics and Literature subjects.
              </p>
            </CardContent>
          </Card>

          <Card className="edu-card border-l-4 border-l-secondary">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-secondary" />
                </div>
                <div className="font-semibold text-secondary">Focus Area</div>
              </div>
              <p className="text-sm text-muted-foreground">
                Chemistry shows lower engagement scores. Consider more interactive 
                lab sessions and real-world applications to boost student interest.
              </p>
            </CardContent>
          </Card>

          <Card className="edu-card border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div className="font-semibold text-primary">Recommendation</div>
              </div>
              <p className="text-sm text-muted-foreground">
                Peak engagement occurs during 10-11 AM slots. Consider scheduling 
                challenging topics during these high-energy periods.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default AnalyticsCharts;