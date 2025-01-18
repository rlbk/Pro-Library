import React from "react";
import { Session } from "next-auth";

type TProps = {
  session: Session;
};

const Header = ({ session }: TProps) => {
  return (
    <header className="admin-header">
      <div>
        <h2 className="text-dark-400 font-semibold text-2x">
          {session?.user?.name}
        </h2>
        <p className="text-slate-500 text-base">
          Monitor all of your users and books here
        </p>
      </div>
      {/* TODO: add search bar */}
    </header>
  );
};

export default Header;
