import { auth } from "@/auth";
import Header from "@/components/header";
import { redirect } from "next/navigation";
import React from "react";

type TProps = {
  children: React.ReactNode;
};

const Layout = async ({ children }: TProps) => {
  const session = await auth();
  if (!session) return redirect("/sign-in");
  return (
    <main className="root-container">
      <div className="mx-auto max-w-7xl">
        <Header session={session} />
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
