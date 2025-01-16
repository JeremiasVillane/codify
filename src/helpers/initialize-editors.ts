import * as monaco from "monaco-editor";
import { INIT_VALUES } from "../constants";
import { Language } from "../types";
import updateLabelBackground from "./update-label-background";

export function initializeEditors(languages: Language[], document: Document) {
  const editors = {} as Record<Language, monaco.editor.IStandaloneCodeEditor>;

  languages.forEach((language) => {
    const container = document.getElementById(
      `${language.toLocaleLowerCase()}Editor`
    )!;

    const initialValue =
      localStorage.getItem(language.toLocaleLowerCase()) ||
      INIT_VALUES[language as Language];

    // Create editor
    editors[language] = monaco.editor.create(container, {
      value: initialValue,
      language: language.toLocaleLowerCase(),
      theme: "vs-dark",
      minimap: { enabled: false },
    });

    // Update label background on focus
    editors[language].onDidFocusEditorWidget(() => {
      updateLabelBackground(language, true);
    });

    editors[language].onDidBlurEditorWidget(() => {
      updateLabelBackground(language, false);
    });

    // Focus editor on label click
    const label = document.getElementById(`${language.toLowerCase()}Label`);
    label?.addEventListener("click", () => {
      editors[language].focus();
    });
  });

  return editors;
}
