import { Navigate, useNavigate, useParams } from "react-router";
import HabitForm from "@/components/habit-form/habit-form";
import { Spinner } from "@/components/ui/spinner";
import { useHabit } from "@/hooks/use-habit";
import { useUpdateHabit } from "@/hooks/use-update-habit";
import type { CreateHabitInput } from "@/types/habit";

const EditHabitPage = () => {
  const { id } = useParams();
  const { data: habit, isPending, isError, error } = useHabit(id);
  const mutation = useUpdateHabit(id);
  const navigate = useNavigate();

  const handleFormSubmit = (patch: CreateHabitInput) => {
    mutation.mutate(patch, {
      onSuccess: () => {
        navigate("/habits");
      },
    });
  };

  if (!id) {
    return <Navigate to="/habits" replace />;
  }

  if (isPending) {
    return <Spinner className="text-muted size-8" />;
  }

  if (isError) {
    return (
      <p className="text-destructive text-sm">
        Failed to load habit: {error.message}
      </p>
    );
  }

  return (
    <HabitForm
      onFormSubmit={handleFormSubmit}
      submitLabel="Save changes"
      defaultValues={habit}
    />
  );
};
export default EditHabitPage;
