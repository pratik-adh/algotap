import styled from "styled-components";

export const Wrapper = styled.div`
  max-width: 100%;
  .label-container {
    display: flex;
    margin-bottom: 10px;
    color: black;
    .label {
      opacity: 1;
      margin-right: 5px;
      font-weight: 500;
    }
  }
  .ProseMirror p.is-editor-empty:first-child::before {
    color: #adb5bd;
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
  }
  .ProseMirror {
    padding: 10px;
    border: 1px solid lightgray;
    border-radius: 0 0 10px 10px;
    min-height: 250px;
    outline: none !important;
    color: #000;
    font-size: 14px;

    & > * + * {
      margin-top: 0.75em;
    }

    ul,
    ol {
      padding: 0 1rem;
    }

    h1 {
      line-height: 1.1;
      font-weight: bolder;
      font-size: 2em;
    }
    h2 {
      line-height: 1.1;
      font-weight: bolder;
      font-size: 1.5em;
    }
    h3 {
      line-height: 1.1;
      font-weight: bolder;
      font-size: 1.3em;
    }
    h4,
    h5,
    h6 {
      line-height: 1.1;
    }
    .editor-link {
      color: lightskyblue;
    }
    a {
      color: blue;
    }

    pre {
      background: #dedede;
      color: #000000;
      font-family: "JetBrainsMono", monospace;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;

      code {
        color: inherit;
        padding: 0;
        background: none;
        font-size: 0.8rem;
      }
    }

    img {
      max-width: 100%;
      height: auto;
      margin: 0.3rem 0;
      &.ProseMirror-selectednode {
        outline: 3px solid lightskyblue;
      }
    }

    blockquote {
      padding-left: 1rem;
      border-left: 2px solid lightgray;
    }

    hr {
      border: none;
      border-top: 2px solid rgba(#0d0d0d, 0.1);
      margin: 2rem 0;
    }
  }
  .image-resizer {
    display: inline-flex;
    position: relative;
    flex-grow: 0;
  }
  .image-resizer .resize-trigger-fourth,
  .image-resizer .resize-trigger-first {
    position: absolute;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s ease;
    color: #3259a5;
  }
  .image-resizer .resize-trigger-fourth {
    right: -7px;
    bottom: -5px;
  }
  .image-resizer .resize-trigger-first {
    right: -7px;
    top: -5px;
  }

  .image-resizer:hover {
    .resize-trigger-first,
    .resize-trigger-fourth {
      opacity: 1;
    }
  }
`;

export const MenuBarContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 0.3rem;
  padding: 0.2em;
  border-radius: 10px 10px 0 0;
  border: 1px solid lightgray;
  border-bottom: none !important;
  background: white;

  .single-content-style {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      border: none !important;
      background-color: transparent;
      padding: 0.5rem 0.7rem;

      span {
        color: black;
        img {
          height: 15px;
          pointer-events: none;
        }
      }
    }
    [type="color"] {
      border-radius: 3px;
      cursor: pointer;
      width: 30px;
      background: transparent;
    }
    #color::-webkit-color-swatch {
      border-radius: 3px;
      border: none;
    }
    button:hover {
      cursor: pointer;
      background-color: lightblue;
    }
    button.is-active {
      background-color: lightgray;
    }
  }
  .styled-border {
    border-right: 1px solid lightgray !important;
  }
`;
