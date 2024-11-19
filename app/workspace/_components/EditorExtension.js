import { api } from "@/convex/_generated/api";
import { chatSession, ChatSession } from "@/configs/AIModel";
import { useAction, useMutation } from "convex/react";
import { Bold, Code, Highlighter, Italic, Save, Sparkles, Strikethrough, ToggleLeft, Underline } from "lucide-react";
import { useParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

function EditorExtension({ editor }) {
  const { fileId } = useParams();
  const SearchAI = useAction(api.myActions.search);
  const saveNotes = useMutation(api.notes.AddNotes);
  const {user}=useUser();

  const onAiClick = async () => {
    toast("AI is working on your query, please wait for a moment..");
    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      " "
    );
    console.log("Selected Text", selectedText);
    const result = await SearchAI({
      query: selectedText,
      fileId: fileId,
    });
    console.log("Unformatted Answer", result);
    const UnformattedAns = JSON.parse(result);
    let AllUnformattedAns = "";
    UnformattedAns &&
      UnformattedAns.forEach((item) => {
        AllUnformattedAns = AllUnformattedAns + item.pageContent;
      });

    const PROMPT =
      "For question :" +
      selectedText +
      "and with the given context as answer," +
      "please give appropriate answer in HTML format. The answer content is:" +
      AllUnformattedAns;

    const AiModelResult = await chatSession.sendMessage(PROMPT);
    const FinalAns = AiModelResult.response.text().replace('```html\n', '').replace('```', '');

    const AllText = editor.getHTML();
    editor.commands.setContent(
      AllText + "<p><strong>Answer: </strong>" + FinalAns + "</p>"
    );

    saveNotes({
      notes:editor.getHTML(),
      fileId: fileId,
      createdBy:user?.primaryEmailAddress?.emailAddress,
    })
  };

  const onSave = async () => {
    if (!user || !user.primaryEmailAddress?.emailAddress) {
      toast.error("User information is missing. Please log in.");
      return;
    }

    saveNotes({
      notes: editor.getHTML(),
      fileId: fileId,
      createdBy: user.primaryEmailAddress.emailAddress, // Ensure this is set
    });
    toast.success("Notes saved successfully");
  };


  return (
    editor && (
      <div className="p-5">
        <div className="control-group">
          <div className="button-group flex gap-3">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "text-blue-500" : ""}
            >
              <Bold />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive("italic") ? "text-blue-500" : ""}
            >
              <Italic />
            </button>
            <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive('underline') ? 'is-active' : ''}
          >
            <Underline/>
          </button>
            <button
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              className={editor.isActive("highlight") ? "text-blue-500" : ""}
            >
              <Highlighter />
            </button>
            <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}
          >
            <Strikethrough />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={editor.isActive('code') ? 'is-active' : ''}
          >
            <Code />
          </button>
            <button
              onClick={() => onAiClick()}
              className={"hover:text-blue-500"}
            >
              <Sparkles />
            </button>
            <button
              onClick={() => onSave()}
              className={"hover:text-red-800"}
            >
              <Save />
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default EditorExtension;
