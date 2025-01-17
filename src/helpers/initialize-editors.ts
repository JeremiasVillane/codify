import * as monaco from "monaco-editor";
import { INIT_VALUES } from "../constants";
import { Language } from "../types";
import updateLabelBackground from "./update-label-background";

export function initializeEditors(languages: Language[], document: Document) {
  const editors = {} as Record<Language, monaco.editor.IStandaloneCodeEditor>;
  let expandedEditor: Language | null = null;

  languages.forEach((language) => {
    const container = document.getElementById(
      `${language.toLocaleLowerCase()}Editor`
    )!;
    const article = container.closest("article")!;

    article.style.flex = "1 1 0";
    article.style.overflow = "hidden";

    const initialValue =
      localStorage.getItem(language.toLocaleLowerCase()) ||
      INIT_VALUES[language as Language];

    // Create editor
    editors[language] = monaco.editor.create(container, {
      value: initialValue,
      language: language.toLocaleLowerCase(),
      theme: "vs-dark",
      minimap: { enabled: false },
      wordWrap: "on",
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

    // Handle double-click to expand/collapse editor
    label?.addEventListener("dblclick", () => {
      if (expandedEditor === language) {
        article.style.flex = "1 1 0";
        editors[language].layout();
        expandedEditor = null;
        languages.forEach((lang) => {
          if (lang !== language) {
            const otherContainer = document.getElementById(
              `${lang.toLocaleLowerCase()}Editor`
            )!;
            const otherArticle = otherContainer.closest("article")!;
            otherArticle.style.flex = "1 1 0";
            editors[language].layout();
          }
        });
      } else {
        article.style.flex = "1 1 0";
        editors[language].layout();
        expandedEditor = language;
        languages.forEach((lang) => {
          if (lang !== language) {
            const otherContainer = document.getElementById(
              `${lang.toLocaleLowerCase()}Editor`
            )!;
            const otherArticle = otherContainer.closest("article")!;
            otherArticle.style.flex = "0";
            editors[language].layout();
          }
        });
      }
    });
  });

  return editors;
}
