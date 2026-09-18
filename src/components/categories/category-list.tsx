import { useCategories } from "@/hooks/use-categories";
import { Spinner } from "../ui/spinner";
import CategoryCard from "./category-card";

const CategoryList = () => {
  const { data: categories = [], isPending, isError, error } = useCategories();

  return (
    <section className="flex flex-col gap-3">
      {isPending && <Spinner className="text-muted size-8 self-center" />}

      {isError && (
        <p className="text-destructive text-sm">
          Failed to load categories: {error.message}
        </p>
      )}

      {!isPending && !isError && categories.length === 0 && (
        <p className="text-muted-foreground text-sm">
          No categories yet — create your first one.
        </p>
      )}

      {categories.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </section>
  );
};
export default CategoryList;
