import { Edit2Icon, MoreVerticalIcon, Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteHabit } from "@/hooks/use-delete-habit";

interface HabitActionsProps {
  habitId: string;
  habitName: string;
}

const HabitActions = ({ habitId, habitName }: HabitActionsProps) => {
  const deleteMutation = useDeleteHabit();

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Delete "${habitName}"? This can't be undone.`,
    );
    if (confirmed) {
      deleteMutation.mutate(habitId);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon" aria-label="More Options">
            <MoreVerticalIcon />
          </Button>
        }
      />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem disabled>
            <Edit2Icon />
            Edit
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive" onClick={handleDelete}>
            <Trash2Icon /> Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default HabitActions;
