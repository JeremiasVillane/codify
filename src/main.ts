import { LANGUAGES } from "./constants";
import {
  createEditorSection,
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
      setTimeout(() => updatePreview(editors), 250);
    });
  });

  //*************** Initialize preview ***************//
  updatePreview(editors);

  //*************** Handling resizing ***************//
  // handleResize(document);
});
