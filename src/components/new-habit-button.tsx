import { Plus } from "lucide-react";
import { Link } from "react-router";
import { buttonVariants } from "@/components/ui/button";

function NewHabitButton() {
  return (
    <Link to="/habits/new" className={buttonVariants({ variant: "default" })}>
      <Plus />
      New habit
    </Link>
  );
}
export default NewHabitButton;
