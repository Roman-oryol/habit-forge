import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import NewCategoryButton from "../new-category-button";
import CategoryForm from "./category-form";
import { useState } from "react";

export function CategoryCreateDialog() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger render={<NewCategoryButton />} />
        <DialogContent className="p-0">
          <CategoryForm onSuccess={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CategoryCreateDialog;
