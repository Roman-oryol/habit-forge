import { useState } from "react";
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
import HabitDeleteDialog from "./habit-delete-dialog";
import { useDeleteHabit } from "@/hooks/use-delete-habit";
import { useNavigate } from "react-router";

interface HabitActionsProps {
  habitId: string;
  habitName: string;
}

const HabitActions = ({ habitId, habitName }: HabitActionsProps) => {
  const deleteMutation = useDeleteHabit();
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleEdit = () => {
    navigate(`/habits/${habitId}/edit`);
  };

  return (
    <>
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
            <DropdownMenuItem onClick={handleEdit}>
              <Edit2Icon />
              Edit
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              variant="destructive"
              onClick={() => setDeleteDialogOpen(true)}
            >
              <Trash2Icon /> Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <HabitDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onDelete={() => deleteMutation.mutate(habitId)}
        habitName={habitName}
      />
    </>
  );
};
export default HabitActions;
