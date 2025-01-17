import { ACTIONS } from "../constants";

export default function createMenuActions() {
  return Object.entries(ACTIONS)
    .map(([action, cfg]) => {
      return `<li class="context-menu-item p-2 cursor-pointer hover:bg-zinc-800 font-normal text-sm" data-action="${action}">${cfg.description}</li>`;
    })
    .join("");
}
