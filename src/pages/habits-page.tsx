import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useHabits } from "@/hooks/use-habits";
import PageHeader from "@/components/page-header";
import NewHabitButton from "@/components/new-habit-button";

const HabitsPage = () => {
  const { data: habits, isPending, isError, error } = useHabits();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Habits" actions={<NewHabitButton />} />

      {isPending && (
        <p className="text-muted-foreground text-sm">Loading habits…</p>
      )}

      {isError && (
        <p className="text-destructive text-sm">
          Failed to load habits: {error.message}
        </p>
      )}

      {habits && habits.length === 0 && (
        <p className="text-muted-foreground text-sm">
          No habits yet. Create your first one.
        </p>
      )}

      {habits && habits.length > 0 && (
        <div className="grid gap-3 md:grid-cols-2">
          {habits.map((habit) => (
            <Card key={habit.id}>
              <CardHeader>
                <CardTitle>{habit.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                {habit.category}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
export default HabitsPage;
