import { LANGUAGES } from "./constants";
import {
  createEditorSection,
  handleExport,
  // handleResize,
  initializeEditors,
  updatePreview,
} from "./helpers";

document.addEventListener("DOMContentLoaded", () => {
  //************** Create editor sections **************//
  const container = document.querySelector(".editor-container") as HTMLElement;
  container.innerHTML = LANGUAGES.map(createEditorSection).join("");

  //**************** Initialize editors ****************//
  const editors = initializeEditors([...LANGUAGES], document);

  //********* Update preview on editor change *********//
  Object.values(editors).forEach((editor) => {
    editor.onDidChangeModelContent(() => {
      const language = editor!.getModel()!.getLanguageId();
      localStorage.setItem(language, editor.getValue());
      setTimeout(() => updatePreview(editors), 250);
    });
  });

  //*************** Initialize preview ***************//
  updatePreview(editors);

  //*************** Handle export button ***************//
  const exportButton = document.getElementById("exportButton");
  exportButton?.addEventListener("click", () => handleExport(editors));

  //*************** Handling resizing ***************//
  // handleResize(document);
});
