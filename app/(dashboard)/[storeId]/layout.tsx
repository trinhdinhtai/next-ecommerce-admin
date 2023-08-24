import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import Sidebar from "@/components/layout/sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
  params: {
    storeId: string;
  };
}

export default async function DashboardLayout({
  children,
  params,
}: DashboardLayoutProps) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}
