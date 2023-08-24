import PageHeading from "@/components/PageHeading";
import CategoryForm from "@/components/forms/CategoryForm";

const CategoryIdPage = () => {
  return (
    <>
      <PageHeading tittle="Category" />
      <div className="flex-col pt-6">
        <div className="flex-1 space-y-4">
          <CategoryForm />
        </div>
      </div>
    </>
  );
};

export default CategoryIdPage;
