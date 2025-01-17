import * as monaco from "monaco-editor";
import { Language } from "../types";
import updateLabelBackground from "./update-label-background";

export default function handleFocus(
  editor: monaco.editor.IStandaloneCodeEditor,
  language: Language
) {
  // Update label background on focus
  editor.onDidFocusEditorWidget(() => {
    updateLabelBackground(language, true);
  });

  editor.onDidBlurEditorWidget(() => {
    updateLabelBackground(language, false);
  });

  // Focus editor on label click
  const label = document.getElementById(`${language.toLowerCase()}Label`);
  label?.addEventListener("click", () => {
    editor.focus();
  });
}
