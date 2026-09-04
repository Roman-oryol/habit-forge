import { Card, CardContent, CardHeader } from "@/components/ui/card";
import PageHeader from "@/components/page-header";
import NewHabitButton from "@/components/new-habit-button";
import { useDashboardStats } from "@/hooks/use-dashboard-stats";
import { Spinner } from "@/components/ui/spinner";

const DashboardPage = () => {
  const { completedToday, currentStreak, weeklyConsistency, isPending } =
    useDashboardStats();

  const todayLabel = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());

  const completedTodayContent = isPending ? (
    <Spinner className="size-8" />
  ) : !completedToday.total ? (
    <span className="text-muted-foreground text-sm">
      No habits to complete today
    </span>
  ) : (
    `${completedToday.completed}/${completedToday.total}`
  );

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Today"
        description={
          <time dateTime={new Date().toISOString().slice(0, 10)}>
            {todayLabel}
          </time>
        }
        actions={<NewHabitButton />}
      />
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
              <Spinner className="size-8" />
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
              <Spinner className="size-8" />
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
    </div>
  );
};
export default DashboardPage;
