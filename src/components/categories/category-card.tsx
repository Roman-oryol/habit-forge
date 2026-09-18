import { Card, CardHeader, CardTitle } from "../ui/card";
import type { Category } from "@/types/category";

type CategoryCardProps = {
  category: Category;
};

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{category.name}</CardTitle>
      </CardHeader>
    </Card>
  );
};
export default CategoryCard;
