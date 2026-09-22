import { useState, type SubmitEventHandler } from "react";
import { useUpdateCategory } from "@/hooks/use-update-category";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

interface CategoryRenameFormProps {
  categoryId: string;
  currentName: string;
  onSuccess: () => void;
}

function CategoryRenameForm({
  categoryId,
  currentName,
  onSuccess,
}: CategoryRenameFormProps) {
  const [name, setName] = useState(currentName);
  const mutation = useUpdateCategory(categoryId);

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    mutation.mutate({ name: trimmed }, { onSuccess });
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <Label className="text-muted-foreground" htmlFor="rename-category">
          Name *
        </Label>
        <Input
          id="rename-category"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? <Spinner /> : "Save"}
      </Button>
    </form>
  );
}

export default CategoryRenameForm;
