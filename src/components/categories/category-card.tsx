import { Card, CardAction, CardHeader, CardTitle } from "../ui/card";
import type { Category } from "@/types/category";
import CategoryActions from "./category-actions";

type CategoryCardProps = {
  category: Category;
};

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>{category.name}</CardTitle>
        <CardAction className="">
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
