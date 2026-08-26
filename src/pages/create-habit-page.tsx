import HabitForm from "../components/habit-form/habit-form";

const CreateHabitPage = () => {
  return (
    <div className="grid gap-6">
      <header>
        <h1 className="text-2xl">Create a new habit</h1>
        <p className="text-muted-foreground text-sm">
          Build a new routine and track your progress
        </p>
      </header>
      <HabitForm />
    </div>
  );
};
export default CreateHabitPage;
