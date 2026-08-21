import { Card, CardContent, CardHeader } from "@/components/ui/card";
import PageHeader from "@/components/page-header";
import NewHabitButton from "@/components/new-habit-button";

const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Today"
        description={<time dateTime="">Saturday, August 15</time>}
        actions={<NewHabitButton />}
      />
      <section className="grid gap-3 md:grid-cols-3">
        <Card className="gap-2">
          <CardHeader className="text-muted-foreground text-sm">
            Completed today
          </CardHeader>
          <CardContent className="mt-auto text-2xl">4/6</CardContent>
        </Card>
        <Card className="gap-2">
          <CardHeader className="text-muted-foreground text-sm">
            Current streak
          </CardHeader>
          <CardContent className="mt-auto text-2xl">12 days</CardContent>
        </Card>
        <Card className="gap-2">
          <CardHeader className="text-muted-foreground text-sm">
            Weekly consistency
          </CardHeader>
          <CardContent className="mt-auto text-2xl">78%</CardContent>
        </Card>
      </section>
    </div>
  );
};
export default DashboardPage;
