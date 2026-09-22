import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash2Icon } from "lucide-react";
import { useHabits } from "@/hooks/use-habits";
import { useDeleteCategory } from "@/hooks/use-delete-category";

interface CategoryDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoryId: string;
  categoryName: string;
}

const CategoryDeleteDialog = ({
  open,
  onOpenChange,
  categoryId,
  categoryName,
}: CategoryDeleteDialogProps) => {
  const { data: habits = [] } = useHabits();
  const mutation = useDeleteCategory();

  const affectedCount = habits.filter(
    (h) => h.categoryId === categoryId,
  ).length;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete "{categoryName}"?</AlertDialogTitle>
          <AlertDialogDescription>
            {affectedCount > 0
              ? `${affectedCount} habit${affectedCount === 1 ? "" : "s"} will become uncategorized. This can't be undone.`
              : "This can't be undone."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={() => mutation.mutate(categoryId)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default CategoryDeleteDialog;
