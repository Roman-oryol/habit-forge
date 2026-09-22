import { Card, CardAction, CardHeader, CardTitle } from "../ui/card";
import type { Category } from "@/types/category";
import CategoryActions from "./category-actions";

type CategoryCardProps = {
  category: Category;
};

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{category.name}</CardTitle>
        <CardAction className="-mt-1">
          <CategoryActions
            categoryId={category.id}
            categoryName={category.name}
          />
        </CardAction>
      </CardHeader>
    </Card>
  );
};
export default CategoryCard;
