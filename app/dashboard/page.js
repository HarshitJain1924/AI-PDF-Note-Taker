"use client";
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { useMutation, useQuery } from 'convex/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

function Dashboard() {
  const { user } = useUser();
  const renameFile = useMutation(api.fileStorage.RenameFile);
  const deleteFile = useMutation(api.fileStorage.DeleteFile);
  const fileList = useQuery(api.fileStorage.GetUserFiles, {
    userEmail: user?.primaryEmailAddress?.emailAddress,
  });
  console.log(fileList);

  const onRename = async (fileId, currentName) => {
    const updatedName = window.prompt('Enter new file name', currentName || '');
    if (!updatedName) {
      return;
    }

    const trimmedName = updatedName.trim();
    if (!trimmedName) {
      toast.error('File name cannot be empty');
      return;
    }

    try {
      await renameFile({
        fileId,
        newFileName: trimmedName,
        userEmail: user?.primaryEmailAddress?.emailAddress,
      });
      toast.success('File renamed successfully');
    } catch (error) {
      toast.error('Failed to rename file');
    }
  };

  const onDelete = async (fileId, fileName) => {
    const confirmed = window.confirm(`Delete \"${fileName}\"? This will remove notes and vectors too.`);
    if (!confirmed) {
      return;
    }

    try {
      await deleteFile({
        fileId,
        userEmail: user?.primaryEmailAddress?.emailAddress,
      });
      toast.success('File deleted successfully');
    } catch (error) {
      toast.error('Failed to delete file');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="font-semibold text-3xl text-slate-900 dark:text-slate-100">Workspace</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Manage your PDFs and open any file in one click.</p>
        </div>
        <p className="text-sm font-medium text-slate-600 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
          {fileList?.length || 0} Files
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {fileList?.length > 0
          ? fileList.map((file) => (
              <div
                key={file.fileId}
                className="group relative min-h-[190px] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
              >
                <Link
                  href={'/workspace/' + file.fileId}
                  className="flex h-full flex-col items-center justify-center text-center cursor-pointer transition-transform duration-200 group-hover:-translate-y-5"
                >
                  <Image src={'/pdf.png'} alt="file" width={52} height={52} />
                  <h2 className="mt-3 font-semibold text-lg text-slate-800 dark:text-slate-100 max-w-[200px] break-words leading-snug">
                    {file?.fileName}
                  </h2>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Open workspace
                  </p>
                </Link>
                <div className="absolute inset-x-3 bottom-3 flex gap-2 rounded-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-1 border border-slate-200 dark:border-slate-700 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full h-8 text-xs"
                    onClick={() => onRename(file.fileId, file.fileName)}
                  >
                    <Pencil className="h-4 w-4 mr-1" /> Rename
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-full h-8 text-xs"
                    onClick={() => onDelete(file.fileId, file.fileName)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                  </Button>
                </div>
              </div>
            ))
          : [1, 2, 3, 4, 5, 6, 7].map((item) => (
              <div
                key={item} // Use the unique number as the key
                className="bg-slate-500 rounded-md h-[150px] animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default Dashboard;
