import PageHeading from "@/components/PageHeading";
import CategoryForm from "@/components/forms/CategoryForm";
import { prisma } from "@/lib/prismadb";

interface CategoryIdPageProps {
  params: {
    storeId: string;
    categoryId: string;
  };
}

const CategoryIdPage = async ({ params }: CategoryIdPageProps) => {
  const category = await prisma.category.findUnique({
    where: {
      id: params.categoryId,
      storeId: params.storeId,
    },
  });

  return (
    <>
      <PageHeading
        title={category ? category.name : "Add Category"}
        description={category ? "Edit category" : "Add a new category"}
      />
      <CategoryForm category={category} />
    </>
  );
};

export default CategoryIdPage;
