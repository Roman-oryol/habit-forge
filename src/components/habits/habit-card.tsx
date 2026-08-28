import { Circle, CircleCheck, EllipsisVertical, Flame } from "lucide-react";
import type { Habit } from "@/types/habit";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  frequencyTypes,
  getFrequencySubtitle,
  getFrequencyTitle,
  getStreakUnitLabel,
} from "@/lib/frequency";
import { cn } from "@/lib/utils";
// import { useCreateHabit } from "@/hooks/use-create-habit";

interface HabitCardProps {
  habit: Habit;
}

const HabitCard = ({ habit }: HabitCardProps) => {
  // const mutation = useCreateHabit();
  const selectedType = frequencyTypes.find(
    (t) => t.value === habit.frequency.type,
  );
  const isDailyType = selectedType?.value === "daily";
  const subtitle = getFrequencySubtitle(habit.frequency);
  const today = new Date().toISOString().slice(0, 10);
  const isDoneToday = habit.completions.includes(today);

  return (
    <Card>
      <CardHeader className="border-border border-b">
        <CardTitle className="text-base font-semibold">{habit.name}</CardTitle>
        <CardDescription>{habit.category}</CardDescription>
        <CardAction className="-mt-1.25">
          <Button variant="ghost" size="icon">
            <EllipsisVertical />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="text-muted-foreground text-sm">
        <div className="itemc-center flex justify-between">
          <div className="grid grid-cols-[auto_1fr] items-center gap-x-4">
            {selectedType && (
              <selectedType.icon
                className={cn(
                  "text-primary size-7",
                  !isDailyType && "row-span-2",
                )}
              />
            )}
            <p className="text-foreground font-medium">
              {getFrequencyTitle(habit.frequency)}
            </p>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <div className="grid grid-cols-[auto_1fr] items-center gap-x-2">
            <Flame className="text-primary row-span-2" />
            <p className="text-foreground text-lg font-semibold">0</p>
            <p>{getStreakUnitLabel(habit.frequency)}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted-background">
        <Button
          className={cn(
            "text-muted-foreground hover:text-muted-foreground w-full justify-start py-6 text-base",
            isDoneToday &&
              "bg-primary/15 text-primary hover:bg-primary/20 border-primary/50",
          )}
          type="button"
          variant={isDoneToday ? "default" : "outline"}
          aria-pressed={isDoneToday}
          // onClick={() => mutation.mutate({ id: habit.id, date: today })}
        >
          {isDoneToday ? (
            <CircleCheck className="size-7" />
          ) : (
            <Circle className="size-7" />
          )}
          {isDoneToday ? "Done for today" : "Mark done for today"}
        </Button>
      </CardFooter>
    </Card>
  );
};
export default HabitCard;
