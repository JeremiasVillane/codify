import * as monaco from "monaco-editor";
import { ACTIONS } from "../constants";
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

      if (action) {
        const editor = editors[language];
        const content = editor.getValue();

        ACTIONS[action].fn(content, language);
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
