import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import CategoryRenameForm from "./category-rename-form";

interface CategoryRenameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoryId: string;
  currentName: string;
}

const CategoryRenameDialog = ({
  open,
  onOpenChange,
  categoryId,
  currentName,
}: CategoryRenameDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Rename category</DialogTitle>
          <DialogDescription>Update the category name.</DialogDescription>
        </DialogHeader>
        <CategoryRenameForm
          key={String(open)}
          categoryId={categoryId}
          currentName={currentName}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CategoryRenameDialog;
