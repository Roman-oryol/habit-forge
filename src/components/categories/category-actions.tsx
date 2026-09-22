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
import CategoryRenameDialog from "./category-rename-dialog";
import CategoryDeleteDialog from "./category-delete-dialog";

interface CategoryActionsProps {
  categoryId: string;
  categoryName: string;
}

const CategoryActions = ({
  categoryId,
  categoryName,
}: CategoryActionsProps) => {
  const [renameOpen, setRenameOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

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
            <DropdownMenuItem onClick={() => setRenameOpen(true)}>
              <Edit2Icon />
              Rename
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              variant="destructive"
              onClick={() => setDeleteOpen(true)}
            >
              <Trash2Icon /> Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <CategoryRenameDialog
        open={renameOpen}
        onOpenChange={setRenameOpen}
        categoryId={categoryId}
        currentName={categoryName}
      />
      <CategoryDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        categoryId={categoryId}
        categoryName={categoryName}
      />
    </>
  );
};
export default CategoryActions;
