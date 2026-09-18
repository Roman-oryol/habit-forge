import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import type { ComponentProps } from "react";

const NewCategoryButton = (props: ComponentProps<typeof Button>) => {
  return (
    <Button type="button" {...props}>
      <Plus />
      Create category
    </Button>
  );
};
export default NewCategoryButton;
