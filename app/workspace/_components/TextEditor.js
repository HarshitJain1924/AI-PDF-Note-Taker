import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect } from "react";
import EditorExtension from "./EditorExtension";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";

function TextEditor({fileId}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start Taking your notes here...",
      }),
      Highlight.configure({
        multicolor: true,
      }),
      Underline,
    ],
    editorProps: {
      attributes: {
        class: "focus:outline-none h-screen p-4",
      },
    },
  });
  const Notes = useQuery(api.notes.GetNotes, {
    fileId: fileId,
  });
  console.log(Notes);
  useEffect(()=>{
    editor&&editor.commands.setContent(Notes);
  }, [Notes&&editor]);
  return (
    <div>
      <EditorExtension editor={editor} />
      <div className="overflow-scroll h-[88vh]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

export default TextEditor;
