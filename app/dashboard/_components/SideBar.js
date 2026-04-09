"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Layout } from "lucide-react";
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
      <div className="flex gap-2 items-center mb-6">
        <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">AI</div>
        <div className="flex flex-col">
          <span className="font-bold text-lg">AI PDF</span>
          <span className="font-bold text-lg">Note Taker</span>
        </div>
      </div>
        <UploadPdfDialog isMaxFile={fileList?.length>=5?true:false}>
          <Button className="w-full">+ Upload PDF</Button>
        </UploadPdfDialog>
        <div className="flex gap-2 p-3 mt-5 hover:bg-slate-300 rounded-lg cursor-pointer">
          <Layout />
          <h2>Workspace</h2>
        </div>
      <div className="absolute bottom-24 w-[80%]">
        <Progress value={(fileList?.length/5)*100} />
        <p className="text-sm mt-2">{fileList?.length} out of 5 PDF Uploaded</p>
      </div>
    </div>
  );
}

export default SideBar;
