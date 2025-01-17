import { Language } from "../types";

export default function handleExpandCollapse(
  languages: Language[],
  language: Language,
  article: HTMLElement
) {
  let expandedEditor: Language | null = null;
  const label = document.getElementById(`${language.toLowerCase()}Label`);

  label?.addEventListener("dblclick", () => {
    if (expandedEditor === language) {
      article.style.flex = "1 1 0";
      // editors[language].layout();
      expandedEditor = null;
      languages.forEach((lang) => {
        if (lang !== language) {
          const otherContainer = document.getElementById(
            `${lang.toLocaleLowerCase()}Editor`
          )!;
          const otherArticle = otherContainer.closest("article")!;
          otherArticle.style.flex = "1 1 0";
          // editors[language].layout();
        }
      });
    } else {
      article.style.flex = "1 1 0";
      // editors[language].layout();
      expandedEditor = language;
      languages.forEach((lang) => {
        if (lang !== language) {
          const otherContainer = document.getElementById(
            `${lang.toLocaleLowerCase()}Editor`
          )!;
          const otherArticle = otherContainer.closest("article")!;
          otherArticle.style.flex = "0";
          // editors[language].layout();
        }
      });
    }
  });
}
