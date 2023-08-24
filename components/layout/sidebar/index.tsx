import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs";
import { prisma } from "@/lib/prismadb";
import StoreSwitcher from "@/components/StoreSwitcher";
import Links from "@/components/layout/sidebar/Links";
import UserButton from "@/components/UserButton";
import { User } from "@/types";

const Sidebar = async () => {
  const user = await currentUser();
  const { userId } = auth();

  if (!user || !userId) {
    redirect("/sign-in");
  }

  const stores = await prisma.store.findMany({
    where: {
      userId,
    },
  });

  const formattedUser: User = {
    firstName: user.firstName,
    lastName: user.lastName,
    imageUrl: user.imageUrl,
    emailAddress: user.emailAddresses[0].emailAddress,
  };

  return (
    <nav className="sticky top-0 left-0 h-screen w-fit flex flex-col bg-[#F7F8FB] dark:bg-background border-r justify-between overflow-auto px-3 py-5">
      <div className="flex flex-col">
        <StoreSwitcher stores={stores} />
        <Links />
      </div>

      <div className="px-5">
        <div className="flex justify-between items-center mt-4"></div>
      </div>

      <UserButton user={formattedUser} />
    </nav>
  );
};

export default Sidebar;
