import React, { useEffect } from "react";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Wrapper } from "./TextEditor.styles";
import { EditorMenubar, Error } from "./EditorMenuBar";
import ImageResize from "./ImageResize";

interface IEditorProps {
  data?: any;
  handleData?: any;
  defaultContent?: any;
  error?: any;
  disableEditor?: boolean;
  label?: string;
}

const TextEditor: React.FC<IEditorProps> = ({
  handleData,
  data,
  defaultContent,
  error,
  disableEditor = false,
  label,
}) => {
  const editor = useEditor({
    extensions: [
      Underline,
      Image.configure({
        inline: false,
        allowBase64: false,
      }),
      ImageResize,
      Link.configure({
        HTMLAttributes: {
          class: "editor-link",
        },
      }),

      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      // @ts-ignore
      TextStyle.configure({ types: [ListItem.name] }),
      TextAlign.configure({
        types: ["heading", "paragraph", "image"],
      }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
    ],
    content: data,
    onUpdate: ({ editor }) => {
      const html = editor?.getHTML();
      handleData(html);
    },
  });

  useEffect(() => {
    if (defaultContent) {
      editor?.commands?.setContent(defaultContent);
    }
  }, [defaultContent, editor]);

  return (
    <Wrapper style={{ pointerEvents: disableEditor ? "none" : "auto" }}>
      {label && (
        <div className={"label-container"}>
          <span className={"label"}>{label}</span>
        </div>
      )}
      <EditorMenubar editor={editor} />
      <EditorContent editor={editor} />
      {error && <Error>{error}</Error>}
    </Wrapper>
  );
};

export { TextEditor };
