import * as monaco from "monaco-editor";
import { INIT_VALUES } from "../constants";
import { Language } from "../types";
import handleExpandCollapse from "./handle-expand-collapse";
import handleFocus from "./handle-focus";

export function initializeEditors(languages: Language[]) {
  const editors = {} as Record<Language, monaco.editor.IStandaloneCodeEditor>;

  languages.forEach((language) => {
    const container = document.getElementById(
      `${language.toLocaleLowerCase()}Editor`
    )!;
    const article = container.closest("article")!;

    article.style.flex = "1 1 0";
    article.style.overflow = "hidden";

    const initialValue =
      localStorage.getItem(language.toLocaleLowerCase()) ||
      INIT_VALUES[language];

    // Create editor
    editors[language] = monaco.editor.create(container, {
      value: initialValue,
      language: language.toLocaleLowerCase(),
      theme: "vs-dark",
      minimap: { enabled: false },
      wordWrap: "on",
      automaticLayout: true,
    });

    // Handle editor focus and blur
    handleFocus(editors[language], language);

    // Handle double-click to expand/collapse editor
    handleExpandCollapse(languages, language, article);
  });

  return editors;
}
