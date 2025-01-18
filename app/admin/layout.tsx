import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";
import "@/styles/admin.css";
import Sidebar from "@/components/admin/sidebar";
import Header from "@/components/admin/header";

type TProps = {
  children: React.ReactNode;
};

const Layout = async ({ children }: TProps) => {
  const session = await auth();
  if (!session?.user?.id) return redirect("/sign-in");
  return (
    <main className="flex min-h-screen w-full flex-row">
      <Sidebar session={session} />
      <div className="admin-container">
        <Header session={session} />
        {children}
      </div>
    </main>
  );
};

export default Layout;
