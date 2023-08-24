import PageHeading from "@/components/PageHeading";
import CategoryForm from "@/components/forms/CategoryForm";

const CategoryIdPage = () => {
  return (
    <>
      <PageHeading
        title="Categories"
        description="Manage categories for your store"
      />
      <CategoryForm />
    </>
  );
};

export default CategoryIdPage;
