import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation"

function WorkspaceHeader({ fileName }) {
  const router = useRouter()
  const handleBackClick = () => {
    router.push('/dashboard');
  };

  return (
    <div className="p-4 flex justify-between items-center shadow-md">
      <div className="flex gap-2 items-center">
        <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">AI</div>
        <span className="font-bold text-lg">AI PDF Note Taker</span>
      </div>
      <h2 className="font-bold text-xl">{fileName}</h2>
      <div className="flex gap-2 items-center">
        <Button onClick={handleBackClick}>Back</Button>
        <UserButton />
      </div>
    </div>
  );
}

export default WorkspaceHeader;
