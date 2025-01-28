import * as monaco from "monaco-editor";
import { FILE_EXTENSIONS } from ".";
import { ActionConfig, Language } from "../types";

export const ACTIONS: Record<string, ActionConfig> = {
  export: {
    fn: (editor: monaco.editor.IStandaloneCodeEditor, language: Language) => {
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
    },
    description: "Export to file",
  },
  settings: {
    // prettier-ignore
    fn: (editor: monaco.editor.IStandaloneCodeEditor, language: Language) => {
      //** MODAL ELEMENTS ***/
      const configModal = document.getElementById("configModal") as HTMLElement;
      const currentEditorConfigMenuItem = document.getElementById("currentEditorConfigMenuItem") as HTMLElement;
      const currentEditorConfigTitle = document.getElementById("currentEditorConfigTitle") as HTMLElement;

      //*** BUTTONS ELEMENTS ***/
      const cancelBtn = document.getElementById("cancelBtn") as HTMLElement;
      const applySettingsBtn = document.getElementById("applySettingsBtn") as HTMLElement;

      //*** INPUTS ***/
      const fontSizeInput = document.getElementById("fontSizeInput") as HTMLInputElement;
      const lineHeightInput = document.getElementById("lineHeightInput") as HTMLInputElement;
      const wordWrapInput = document.getElementById("wordWrapInput") as HTMLInputElement;
      const themeSelect = document.getElementById("themeSelect") as HTMLInputElement;

      //*** SHOW MODAL ***/
      configModal.style.display = "block";

      //*** CURRENT EDITOR OPTION TITLE ***/
      currentEditorConfigMenuItem.innerHTML = `${language} Editor`;
      currentEditorConfigTitle.innerHTML = `${language} Editor Settings`;

      //*** MENU SELECT LOGIC ***/
      document.querySelectorAll(".menu-button").forEach((button) => {
        button.addEventListener("click", () => {
          document.querySelectorAll(".config-section").forEach(section => {
            section.classList.add("hidden");
          });
          const targetId = (button as HTMLElement).dataset.section!; 
          document.getElementById(targetId)!.classList.remove("hidden");
        });
      });
    
      //*** BUTTONS LOGIC ***/
      cancelBtn.addEventListener("click", () => configModal.style.display = "none");

      applySettingsBtn.addEventListener("click", () => {
        const fontSize = parseInt(fontSizeInput.value, 10);
        const lineHeight = parseFloat(lineHeightInput.value);
        const wordWrap = wordWrapInput.checked;
        const theme = themeSelect?.value || "vs-dark" as "vs-dark" | "vs" | "hc-black" | "hc-light";

        editor.updateOptions({
          fontSize,
          lineHeight,
          wordWrap: wordWrap ? "on" : "off",
          theme,
        });

        // Hide modal after save
        configModal.style.display = "none";
      });
    },
    description: "Configure editor...",
  },
};
