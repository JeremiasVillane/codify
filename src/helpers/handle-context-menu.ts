import * as monaco from "monaco-editor";
import { FILE_EXTENSIONS } from "../constants";
import { Language } from "../types";

export function handleContextMenu(
  editors: Record<Language, monaco.editor.IStandaloneCodeEditor>
) {
  // Open context menu on click
  document.querySelectorAll(".menu-icon").forEach((icon) => {
    icon.addEventListener("click", (e) => {
      const contextMenu = (e.target as HTMLElement)
        .nextElementSibling as HTMLElement;
      contextMenu.classList.toggle("hidden");
    });
  });

  // Handle context menu actions
  document.querySelectorAll(".context-menu-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      const action = (e.target as HTMLElement).dataset.action;
      const language = (e.target as HTMLElement)
        .closest("article")!
        .querySelector("label")!.dataset.language as Language;

      if (action === "export") {
        const editor = editors[language];
        const content = editor.getValue();
        const blob = new Blob([content], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `codify-${language.toLowerCase()}.${
          FILE_EXTENSIONS[language]
        }`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
      }
    });
  });

  // Close context menu on outside click
  document.addEventListener("click", (e) => {
    if (!(e.target as HTMLElement).closest(".menu-icon")) {
      document.querySelectorAll(".context-menu").forEach((menu) => {
        menu.classList.add("hidden");
      });
    }
  });
}
