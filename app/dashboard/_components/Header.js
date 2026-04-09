import { UserButton } from "@clerk/nextjs";
import React from "react";

function Header() {
  return (
    <div className="flex justify-end p-5 shadow-sm border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <UserButton />
    </div>
  );
}

export default Header;
