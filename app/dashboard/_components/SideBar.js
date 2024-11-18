"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Layout, Shield } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import UploadPdfDialog from "./UploadPdfDialog";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

function SideBar() {
  const { user } = useUser();
  const fileList = useQuery(api.fileStorage.GetUserFiles, {
    userEmail: user?.primaryEmailAddress?.emailAddress,
  });
  return (
    <div className="shadow-md h-screen p-7">
      <Image src={"/logo.svg"} alt="logo" width="120" height="120" />
      <div className="mt-10 ">
        <UploadPdfDialog isMaxFile={fileList?.length>=5?true:false}>
          <Button className="w-full">+ Upload PDF</Button>
        </UploadPdfDialog>
        <div className="flex gap-2 p-3 mt-5 hover:bg-slate-300 rounded-lg cursor-pointer">
          <Layout />
          <h2>Workspace</h2>
        </div>
        <div className="flex gap-2 p-3 mt-1 hover:bg-slate-300 rounded-lg cursor-pointer">
          <Shield />
          <h2>Upgrade</h2>
        </div>
      </div>
      <div className="absolute bottom-24 w-[80%]">
        <Progress value={(fileList?.length/5)*100} />
        <p className="text-sm mt-2">{fileList?.length} out of 5 PDF Uploaded</p>
        <p className="text-sm text-gray-400 mt-2">Upgrade to Upload more PDF</p>
      </div>
    </div>
  );
}

export default SideBar;
