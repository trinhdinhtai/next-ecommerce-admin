import PageHeading from "@/components/PageHeading";
import ColorForm from "@/components/forms/ColorForm";
import { prisma } from "@/lib/prismadb";

interface ColorIdPageProps {
  params: {
    colorId: string;
  };
}

const ColorIdPage = async ({ params }: ColorIdPageProps) => {
  const color = await prisma.color.findUnique({
    where: {
      id: params.colorId,
    },
  });

  return (
    <>
      <PageHeading
        title={color ? color.name : "Add Color"}
        description={color ? "Edit category" : "Add a new color"}
      />
      <ColorForm color={color} />
    </>
  );
};

export default ColorIdPage;
