import React from "react";
import { NodeViewWrapper } from "@tiptap/react";

const ImageResizeComponent = (props: any) => {
  const mouseDownHandler = (
    mouseDownEvent: React.MouseEvent<HTMLImageElement>
  ) => {
    const parent = (mouseDownEvent.target as HTMLElement).closest(
      ".image-resizer"
    );
    const image = parent?.querySelector("img.postimage") ?? null;
    if (image === null) return;
    const startSize = { x: image.clientWidth, y: image.clientHeight };
    const startPosition = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY };

    function onMouseMove(mouseMoveEvent: MouseEvent) {
      props.updateAttributes({
        width: startSize.x - startPosition.x + mouseMoveEvent.pageX,
        height: startSize.y - startPosition.y + mouseMoveEvent.pageY
      });
    }
    function onMouseUp() {
      document.body.removeEventListener("mousemove", onMouseMove);
    }

    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp, { once: true });
  };

  const getElement = (className: string) => {
    return (
      <div className={className} onMouseDown={mouseDownHandler}>
        {props.extension.options.resizeIcon}
      </div>
    );
  };
  return (
    <NodeViewWrapper className={"image-resizer"}>
      {getElement("resize-trigger-first")}
      <img {...props.node.attrs} className={"postimage"} />
      {getElement("resize-trigger-fourth")}
    </NodeViewWrapper>
  );
};

export default ImageResizeComponent;
