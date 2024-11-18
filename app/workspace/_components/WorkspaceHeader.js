import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import Router from "next/router";

function WorkspaceHeader({ fileName }) {
  const handleBackClick = () => {
    Router.push('/dashboard');
  };

  return (
    <div className="p-4 flex justify-between items-center shadow-md">
      <Image src={"/logo.svg"} alt="Logo" width={140} height={100} />
      <h2 className="font-bold text-xl">{fileName}</h2>
      <div className="flex gap-2 items-center">
        <Button onClick={handleBackClick}>Back</Button>
        <UserButton />
      </div>
    </div>
  );
}

export default WorkspaceHeader;
