import { useCreateHabit } from "@/hooks/use-create-habit";
import HabitForm from "../components/habit-form/habit-form";
import { useNavigate } from "react-router";
import type { CreateHabitInput } from "@/types/habit";

const CreateHabitPage = () => {
  const mutation = useCreateHabit();
  const navigate = useNavigate();

  const handleFormSubmit = (input: CreateHabitInput) => {
    mutation.mutate(input, {
      onSuccess: () => {
        navigate("/habits");
      },
    });
  };

  return (
    <div className="grid gap-6">
      <header>
        <h1 className="text-2xl">Create a new habit</h1>
        <p className="text-muted-foreground text-sm">
          Build a new routine and track your progress
        </p>
      </header>
      <HabitForm
        onFormSubmit={handleFormSubmit}
        onCancel={() => navigate("/habits")}
      />
    </div>
  );
};
export default CreateHabitPage;
