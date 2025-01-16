import * as monaco from "monaco-editor";
import { INIT_VALUES } from "../constants";
import { Language } from "../types";

export function initializeEditors(languages: Language[], document: Document) {
  const editors = {} as Record<Language, monaco.editor.IStandaloneCodeEditor>;

  languages.forEach((language) => {
    const container = document.getElementById(
      `${language.toLocaleLowerCase()}Editor`
    )!;

    const initialValue = localStorage.getItem(language.toLocaleLowerCase()) || INIT_VALUES[language as Language];

    editors[language] = monaco.editor.create(container, {
      value: initialValue,
      language: language.toLocaleLowerCase(),
      theme: "vs-dark",
      minimap: { enabled: false },
    });
  });

  return editors;
}
