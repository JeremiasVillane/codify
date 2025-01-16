import { ICONS } from "../constants";
import { Language } from "../types";

export function createEditorSection(language: Language) {
  return `
  <article class="flex flex-col flex-1">
    <label 
      id="${language.toLowerCase()}Label"
      title="${language} code editor"
      class="select-none bg-zinc-900 text-gray-300 font-medium cursor-pointer hover:bg-zinc-950 p-2 flex gap-2"
      >${ICONS[language]}${language}</label>
    <div id="${language.toLocaleLowerCase()}Editor" class="editor flex-1"></div>
  </article>
  `;
}
