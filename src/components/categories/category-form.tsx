import { useState, type SubmitEventHandler } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useCreateCategory } from "@/hooks/use-create-category";
import { Spinner } from "../ui/spinner";

interface CategoryFormProps {
  onSuccess?: () => void;
}

const CategoryForm = ({ onSuccess }: CategoryFormProps) => {
  const [categoryName, setCategoryName] = useState("");
  const mutation = useCreateCategory();

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const name = categoryName.trim();
    if (!name) return;

    mutation.mutate(
      { name },
      {
        onSuccess: () => {
          setCategoryName("");
          onSuccess?.();
        },
      },
    );
  };

  return (
    <Card className="grid gap-6">
      <CardHeader>
        <CardTitle className="text-xl">Create category</CardTitle>
        <CardDescription>
          Add a new category to organize your habits.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-6" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label className="text-muted-foreground" htmlFor="category-name">
              Name *
            </Label>
            <Input
              value={categoryName}
              name="categoryName"
              id="category-name"
              placeholder="e.g. Learning"
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? (
              <Spinner />
            ) : (
              <>
                <Plus />
                Create category
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
export default CategoryForm;
