import { CategoryCreateDialog } from "@/components/categories/category-create-dialog";
import CategoryForm from "@/components/categories/category-form";
import CategoryList from "@/components/categories/category-list";
import PageHeader from "@/components/page-header";

const CategoriesPage = () => {
  return (
    <div className="grid items-start gap-6 lg:grid-cols-2 xl:grid-cols-[auto_400px]">
      <div className="grid gap-6">
        <PageHeader
          title="Categories"
          description="Organize your habits with categories. Create new categories and keep
            your habits well structured."
          actions={<CategoryCreateDialog />}
        />
        <CategoryList />
      </div>

      <aside className="hidden lg:block">
        <CategoryForm />
      </aside>
    </div>
  );
};
export default CategoriesPage;
