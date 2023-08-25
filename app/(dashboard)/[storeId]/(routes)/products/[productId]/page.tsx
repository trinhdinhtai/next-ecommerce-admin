import { getCategoriesByStoreId } from "@/actions/categories";
import { getProductById } from "@/actions/products";
import PageHeading from "@/components/PageHeading";
import ProductForm from "@/components/forms/ProductForm";
import { prisma } from "@/lib/prismadb";

interface ProductIdPageProps {
  params: {
    storeId: string;
    productId: string;
  };
}

const ProductIdPage = async ({ params }: ProductIdPageProps) => {
  const response = await Promise.all([
    getProductById(params.productId),
    getCategoriesByStoreId(params.storeId),
  ]);

  const product = response[0];
  const categories = response[1];

  return (
    <>
      <PageHeading
        title={product ? product.name : "Add Product"}
        description={product ? "Edit Product" : "Add a new Product"}
      />
      <ProductForm product={product} categories={categories} />
    </>
  );
};

export default ProductIdPage;
