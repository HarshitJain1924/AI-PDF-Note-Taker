"use client";
import React, { useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2Icon } from "lucide-react";
import uuid4 from "uuid4";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { toast } from "sonner";

function UploadPdfDialog({ children,isMaxFile }) {
  const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
  const addFileEntry = useMutation(api.fileStorage.AddFileEntryToDb);
  const GetFileUrl = useMutation(api.fileStorage.GetFileUrl);
  const embeddDocument = useAction(api.myActions.ingest);
  const { user } = useUser();
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [open, setOpen] = useState(false);

  const OnFileSelect = (event) => {
    setFile(event.target.files[0]);
  };

  const OnUpload = async () => {
    setLoading(true);
    const postUrl = await generateUploadUrl();
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": file?.type },
      body: file,
    });
    const { storageId } = await result.json();
    console.log("StorageId", storageId);
    const fileId = uuid4();
    const fileUrl = await GetFileUrl({ storageId: storageId });

    const response = await addFileEntry({
      fileId: fileId,
      storageId: storageId,
      fileName: fileName,
      fileURL: fileUrl,
      createdBy: user?.primaryEmailAddress?.emailAddress,
    });
    console.log(response);

    //API Call to fetch PDF Processed Data
    const ApiResp = await axios.get("/api/pdf-loader?pdfUrl=" + fileUrl);
    console.log(ApiResp.data.result);
    await embeddDocument({
      slitText: ApiResp.data.result,
      fileId: fileId,
    });
    setLoading(false);
    setOpen(false);
    toast.success("PDF Uploaded Successfully");
  };

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} disabled={isMaxFile} className="w-full">
          + Upload PDF File
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload PDF File</DialogTitle>
          <DialogDescription asChild>
            <div>
              <h2 className="mt-3">Select a file to Upload</h2>
              <div className="flex gap-2 p-3 rounded-md border">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(event) => OnFileSelect(event)}
                />
              </div>
              <div className="mt-2">
                <label>File Name *</label>
                <Input
                  placeholder="File Name"
                  value={fileName} // Ensure this binds to the state
                  onChange={(e) => setFileName(e.target.value)}
                />
              </div>
              <DialogFooter className="sm:justify-end mt-3">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
                <Button onClick={OnUpload} disabled={loading}>
                  {loading ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    "Upload"
                  )}
                </Button>
              </DialogFooter>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default UploadPdfDialog;
