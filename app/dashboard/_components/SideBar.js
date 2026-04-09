"use client";
import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Layout } from "lucide-react";
import UploadPdfDialog from "./UploadPdfDialog";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Input } from "@/components/ui/input";
import Link from "next/link";

function SideBar() {
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const fileList = useQuery(api.fileStorage.GetUserFiles, {
    userEmail: user?.primaryEmailAddress?.emailAddress,
  });

  const filteredAndSortedFiles = useMemo(() => {
    const safeList = Array.isArray(fileList) ? [...fileList] : [];
    const term = searchTerm.trim().toLowerCase();
    const filtered = term
      ? safeList.filter((file) => file?.fileName?.toLowerCase().includes(term))
      : safeList;

    filtered.sort((a, b) => {
      if (sortBy === "name") {
        return (a?.fileName || "").localeCompare(b?.fileName || "");
      }
      const aTime = a?._creationTime || 0;
      const bTime = b?._creationTime || 0;
      return sortBy === "oldest" ? aTime - bTime : bTime - aTime;
    });

    return filtered;
  }, [fileList, searchTerm, sortBy]);

  const recentFiles = filteredAndSortedFiles.slice(0, 5);

  return (
    <div className="shadow-md h-screen p-7 flex flex-col bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800">
      <div className="flex gap-2 items-center mb-6">
        <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">AI</div>
        <div className="flex flex-col">
          <span className="font-bold text-lg">AI PDF</span>
          <span className="font-bold text-lg">Note Taker</span>
        </div>
      </div>

      <UploadPdfDialog>
        <Button className="w-full">+ Upload PDF</Button>
      </UploadPdfDialog>

      <div className="flex gap-2 p-3 mt-5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer text-slate-700 dark:text-slate-200">
        <Layout />
        <h2>Workspace</h2>
      </div>

      <div className="mt-4 space-y-3">
        <Input
          placeholder="Search PDFs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 p-2 text-sm"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="newest">Sort: Newest first</option>
          <option value="oldest">Sort: Oldest first</option>
          <option value="name">Sort: Name (A-Z)</option>
        </select>
      </div>

      <div className="mt-5">
        <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">Recent PDFs</h3>
        <div className="space-y-2 max-h-44 overflow-auto pr-1">
          {recentFiles.length > 0 ? (
            recentFiles.map((file) => (
              <Link
                key={file.fileId}
                href={`/workspace/${file.fileId}`}
                className="block rounded-md border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                title={file.fileName}
              >
                <p className="truncate font-medium">{file.fileName}</p>
              </Link>
            ))
          ) : (
            <p className="text-xs text-slate-500 dark:text-slate-400">No files match your search.</p>
          )}
        </div>
      </div>

      <div className="mt-auto pt-6">
        <p className="text-sm mt-2 font-medium text-slate-700 dark:text-slate-300">Total PDFs Uploaded: {fileList?.length || 0}</p>
      </div>
    </div>
  );
}

export default SideBar;
