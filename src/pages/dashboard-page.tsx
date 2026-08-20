import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Today</h1>
          <p className="text-muted-foreground text-sm">
            <span>Saturday</span>,<span> August 15</span>
          </p>
        </div>
        <Button>
          <Plus />
          New habit
        </Button>
      </header>
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
