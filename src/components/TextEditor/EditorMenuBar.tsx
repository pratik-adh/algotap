/* eslint-disable @next/next/no-img-element */
import { useCallback, useState } from "react";
import { Popover } from "antd";
import { MenuBarContainer } from "./TextEditor.styles";
import styled from "styled-components";
import { StatusImageUpload } from "../StatusImageUpload";

export const Error = styled.div<any>`
  margin-top: 5px;
  font-size: 12px;
`;

const LinkComponent = ({ editor }: any) => {
  const [link, setNewLink] = useState("");
  const [open, setOpen] = useState(false);

  const setLink = useCallback(
    (url: string) => {
      if (url === null) {
        return;
      }
      if (url === "") {
        editor.chain().focus().unsetLink().run();
        return;
      }
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
      setOpen(false);
    },
    [editor]
  );

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (newOpen) {
      const previousUrl = editor.getAttributes("link")?.href;
      const url = previousUrl || link;
      setNewLink(url || "");
    } else {
      setNewLink("");
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div>
      <Popover
        open={open}
        onOpenChange={handleOpenChange}
        placement={"bottom"}
        content={
          <div className={"link-pop-up-style"}>
            <input
              name={"link"}
              style={{ padding: "2px", fontSize: ".9em" }}
              onChange={({ target: { value } }) => setNewLink(value)}
              value={link}
              onKeyDown={(event) => {
                if (event?.key === "Enter") {
                  setLink(link);
                }
              }}
            />
            <a onClick={() => setLink(link)}>{"Add" as string}</a>
          </div>
        }
        title={
          <span style={{ fontSize: "0.8rem" }}>{"Insert link" as string}</span>
        }
        trigger={"click"}
      >
        <button type={"button"}>
          <span title={"insert link" as string}>
            <img src={"/assets/MenuBarIcons/link-solid.svg"} alt="" />
          </span>
        </button>
      </Popover>
    </div>
  );
};

export const EditorMenubar = ({ editor }: any) => {
  if (!editor) {
    return null;
  }

  return (
    <MenuBarContainer>
      <div className={"single-content-style"}>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can()?.chain().focus().undo().run()}
          type={"button"}
        >
          <span title={"Undo" as string}>
            <img src={"/assets/MenuBarIcons/undo.svg"} alt="" />
          </span>
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can()?.chain().focus().redo().run()}
          type={"button"}
        >
          <span title={"Redo" as string}>
            <img src={"/assets/MenuBarIcons/redo.svg"} alt="" />
          </span>
        </button>
      </div>
      <div className={"styled-border"} />
      <div className={"single-content-style"}>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }
          type={"button"}
        >
          <span
            title={"h1" as string}
            style={{ display: "flex", gap: "0.2rem", alignItems: "baseline" }}
          >
            <img src={"/assets/MenuBarIcons/heading-solid.svg"} alt="" />
            <strong>{"1"}</strong>
          </span>
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }
          type={"button"}
        >
          <span
            title={"h2" as string}
            style={{ display: "flex", gap: "0.2rem", alignItems: "baseline" }}
          >
            <img src={"/assets/MenuBarIcons/heading-solid.svg"} alt="" />
            <strong>{"2"}</strong>
          </span>
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is-active" : ""
          }
          type={"button"}
        >
          <span
            title={"h3" as string}
            style={{ display: "flex", gap: "0.2rem", alignItems: "baseline" }}
          >
            <img src={"/assets/MenuBarIcons/heading-solid.svg"} alt="" />
            <strong>{"3"}</strong>
          </span>
        </button>
      </div>
      <div className={"styled-border"} />

      <div className={"single-content-style"}>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can()?.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
          type={"button"}
        >
          <span title={"bold" as string}>
            <img src={"/assets/MenuBarIcons/bold-solid.svg"} alt="" />
          </span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can()?.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
          type={"button"}
        >
          <span title={"italic" as string}>
            <img src={"/assets/MenuBarIcons/italic-solid.svg"} alt="" />
          </span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "is-active" : ""}
          type={"button"}
        >
          <span title={"underline" as string}>
            <img src={"/assets/MenuBarIcons/underline-solid.svg"} alt="" />
          </span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can()?.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
          type={"button"}
        >
          <span title={"strikethrough" as string}>
            <img src={"/assets/MenuBarIcons/strikethrough-solid.svg"} alt="" />
          </span>
        </button>
        <button
          onClick={() =>
            editor.chain().focus().clearNodes().unsetAllMarks().run()
          }
          disabled={
            !editor.can().chain().focus().clearNodes().unsetAllMarks().run()
          }
          className={editor.isActive("remove-formatting") ? "is-active" : ""}
          type={"button"}
        >
          <span title={"Remove Formatting" as string}>
            <img src={"/assets/MenuBarIcons/remove-formatting.svg"} alt="" />
          </span>
        </button>
        <input
          title={"color" as string}
          type={"color"}
          id={"color"}
          onInput={(event: any) =>
            editor.chain().focus().setColor(event.target.value).run()
          }
          value={editor.getAttributes("textStyle").color}
        />
      </div>
      <div className={"styled-border"} />
      <div className={"single-content-style"}>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
          type={"button"}
          title={"order list" as string}
        >
          <span>
            <img src={"/assets/MenuBarIcons/list-ol-solid.svg"} alt="" />
          </span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
          type={"button"}
          title={"bullet list" as string}
        >
          <span>
            <img src={"/assets/MenuBarIcons/list-solid.svg"} alt="" />
          </span>
        </button>
      </div>

      <div className={"styled-border"} />

      <div className={"single-content-style"}>
        <button
          title={"align left" as string}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
          type={"button"}
        >
          <span>
            <img src={"/assets/MenuBarIcons/align-left-solid.svg"} alt="" />
          </span>
        </button>
        <button
          title={"align center" as string}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={
            editor.isActive({ textAlign: "center" }) ? "is-active" : ""
          }
          type={"button"}
        >
          <span>
            <img src={"/assets/MenuBarIcons/align-center-solid.svg"} alt="" />
          </span>
        </button>

        <button
          title={"align right" as string}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
          type={"button"}
        >
          <span>
            <img src={"/assets/MenuBarIcons/align-right-solid.svg"} alt="" />
          </span>
        </button>
        <button
          title={"justify" as string}
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={
            editor.isActive({ textAlign: "justify" }) ? "is-active" : ""
          }
          type={"button"}
        >
          <span>
            <img src={"/assets/MenuBarIcons/align-justify-solid.svg"} alt="" />
          </span>
        </button>
      </div>
      <div className={"styled-border"} />
      <div className={"single-content-style"}>
        <LinkComponent editor={editor} />
        <StatusImageUpload
          handleChange={(file) => {
            editor.chain().focus().setImage({ src: file }).run();
          }}
        />
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "is-active" : ""}
          type={"button"}
          title={"code" as string}
        >
          <span>
            <img src={"/assets/MenuBarIcons/code-solid.svg"} alt="" />
          </span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
          type={"button"}
          title={"blockquote" as string}
        >
          <span>
            <img src={"/assets/MenuBarIcons/quote.svg"} alt="" />
          </span>
        </button>
      </div>
    </MenuBarContainer>
  );
};
