import { useState } from "react";
import { motion } from "framer-motion";
import AppLayout from "@/shared/ui/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  Beaker, 
  Palette, 
  Users, 
  Trophy,
  Search,
  Filter,
  Star,
  Clock
} from "lucide-react";
import { useActivities } from "@/hooks/useApi";

const categories = [
  { id: "all", name: "All", icon: BookOpen },
  { id: "STEM", name: "STEM", icon: Beaker },
  { id: "Arts", name: "Arts", icon: Palette },
  { id: "Social", name: "Social", icon: Users },
  { id: "Literature", name: "Literature", icon: BookOpen },
];

const difficultyColors = {
  Easy: "bg-success/10 text-success border-success/20",
  Medium: "bg-secondary/10 text-secondary border-secondary/20", 
  Hard: "bg-destructive/10 text-destructive border-destructive/20"
};

const ActivityList = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { data: activities } = useActivities();

  const filteredActivities = activities?.filter(activity => {
    const matchesCategory = selectedCategory === "all" || activity.category === selectedCategory;
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleJoinActivity = (activityId: string) => {
    // Mock join activity action
    console.log("Joining activity:", activityId);
  };

  return (
    <AppLayout
      title="Activities"
      subtitle="Discover and join educational activities"
    >
      <div className="space-y-6">
        {/* Search and Filters */}
        <Card className="edu-card">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search activities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const isSelected = selectedCategory === category.id;
                  
                  return (
                    <Button
                      key={category.id}
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className="flex items-center gap-2"
                    >
                      <Icon className="w-4 h-4" />
                      {category.name}
                    </Button>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activities Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredActivities?.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Card className="edu-card h-full">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-2">
                    <Badge 
                      variant="outline" 
                      className={difficultyColors[activity.difficulty as keyof typeof difficultyColors]}
                    >
                      {activity.difficulty}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Trophy className="w-4 h-4" />
                      {activity.points} pts
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">
                    {activity.title}
                  </CardTitle>
                  <Badge variant="secondary" className="w-fit text-xs">
                    {activity.category}
                  </Badge>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {/* Activity Details */}
                    <div className="text-sm text-muted-foreground space-y-2">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>Estimated: 2-3 hours</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        <span>4.8 rating (124 reviews)</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground">
                      {activity.category === "STEM" 
                        ? "Hands-on laboratory experiment with data analysis and reporting."
                        : activity.category === "Arts"
                        ? "Creative project showcasing artistic skills and cultural understanding."
                        : activity.category === "Literature" 
                        ? "In-depth discussion and analysis of literary works and themes."
                        : "Collaborative project focusing on teamwork and communication skills."
                      }
                    </p>

                    {/* Action Button */}
                    <Button 
                      onClick={() => handleJoinActivity(activity.id)}
                      className="w-full"
                      variant={activity.difficulty === "Hard" ? "default" : "outline"}
                    >
                      Join Activity
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredActivities?.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No activities found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or category filters.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
            >
              Clear Filters
            </Button>
          </motion.div>
        )}

        {/* Stats Footer */}
        <Card className="edu-card">
          <CardContent className="p-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">
                  {activities?.length || 0}
                </div>
                <div className="text-sm text-muted-foreground">
                  Available Activities
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">
                  28
                </div>
                <div className="text-sm text-muted-foreground">
                  Completed
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-success">
                  1,240
                </div>
                <div className="text-sm text-muted-foreground">
                  Points Earned
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default ActivityList;