import { ICONS } from "../constants";
import { Language } from "../types";
import createMenuActions from "./create-menu-actions";

export function createEditorSection(language: Language) {
  return `
  <article class="flex flex-col relative">
    <label 
      id="${language.toLowerCase()}Label"
      data-language="${language}"
      title="${language} code editor"
      class="select-none bg-zinc-900 text-gray-300 font-medium cursor-pointer hover:bg-zinc-950 p-2 flex gap-2 justify-between items-center"
    >
      <span class="flex items-center gap-1.5">${
        ICONS[language]
      }${language}</span>
      <span class="menu-icon cursor-pointer" title="Options">⋮</span>
      <div class="context-menu hidden absolute right-2 -inset-1 top-8 bg-zinc-900 shadow-md rounded-sm overflow-hidden z-50">
        <ul>
          ${createMenuActions()}
        </ul>
      </div>
    </label>
    <div id="${language.toLocaleLowerCase()}Editor" class="editor flex-1"></div>
  </article>
  `;
}
