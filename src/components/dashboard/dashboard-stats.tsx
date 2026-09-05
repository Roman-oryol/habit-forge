import { useDashboardStats } from "@/hooks/use-dashboard-stats";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Spinner } from "../ui/spinner";

const DashboardStats = () => {
  const { completedToday, currentStreak, weeklyConsistency, isPending } =
    useDashboardStats();

  const completedTodayContent = isPending ? (
    <Spinner className="text-muted size-8" />
  ) : !completedToday.total ? (
    <span className="text-muted-foreground text-sm">
      No habits to complete today
    </span>
  ) : (
    `${completedToday.completed}/${completedToday.total}`
  );

  return (
    <section className="grid gap-3 md:grid-cols-3">
      <Card className="gap-2">
        <CardHeader className="text-muted-foreground text-sm">
          Completed today
        </CardHeader>
        <CardContent className="mt-auto text-2xl">
          {completedTodayContent}
        </CardContent>
      </Card>
      <Card className="gap-2">
        <CardHeader className="text-muted-foreground text-sm">
          Current streak
        </CardHeader>
        <CardContent className="mt-auto text-2xl">
          {isPending ? (
            <Spinner className="text-muted size-8" />
          ) : (
            `${currentStreak} ${currentStreak === 1 ? "day" : "days"}`
          )}
        </CardContent>
      </Card>
      <Card className="gap-2">
        <CardHeader className="text-muted-foreground text-sm">
          Weekly consistency
        </CardHeader>
        <CardContent className="mt-auto text-2xl">
          {isPending ? (
            <Spinner className="text-muted size-8" />
          ) : weeklyConsistency === null ? (
            <span className="text-muted-foreground text-sm">
              No habits scheduled this week
            </span>
          ) : (
            `${weeklyConsistency}%`
          )}
        </CardContent>
      </Card>
    </section>
  );
};
export default DashboardStats;
