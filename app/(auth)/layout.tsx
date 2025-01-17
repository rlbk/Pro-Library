import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import React from "react";

type TProps = {
  children: React.ReactNode;
};

const Layout = async ({ children }: TProps) => {
  const session = await auth();
  if (session) return redirect("/");
  return (
    <main className="auth-container">
      <section className="auth-form">
        <div className="auth-box">
          <div className="flex flex-row gap-2">
            <Image src="/icons/logo.svg" alt="logo" width={37} height={37} />
            <h1 className="text-2xl font-semibold text-white">Pro Library</h1>
          </div>
          <div>{children}</div>
        </div>
      </section>
      <section className="auth-illustration">
        <Image
          src="/images/auth-illustration.png"
          alt="illustration"
          height={1000}
          width={1000}
          className="size-full object-cover"
        />
      </section>
    </main>
  );
};

export default Layout;
