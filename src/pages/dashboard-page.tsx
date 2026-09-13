import PageHeader from "@/components/page-header";
import NewHabitButton from "@/components/new-habit-button";
import DashboardStats from "@/components/dashboard/dashboard-stats";
import TodayHabits from "@/components/dashboard/today-habits";

const DashboardPage = () => {
  const todayLabel = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <div className="flex h-full flex-col gap-6">
      <PageHeader
        title="Today"
        description={
          <time dateTime={new Date().toISOString().slice(0, 10)}>
            {todayLabel}
          </time>
        }
        actions={<NewHabitButton />}
      />
      <div className="grid h-full min-h-0 gap-6 overflow-y-auto">
        <DashboardStats />
        <TodayHabits />
      </div>
    </div>
  );
};
export default DashboardPage;
