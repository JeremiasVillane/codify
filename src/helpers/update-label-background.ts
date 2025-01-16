import { Language } from "../types";

export default function updateLabelBackground(
  language: Language,
  isFocused: boolean
) {
  const label = document.getElementById(`${language.toLowerCase()}Label`);
  if (label) {
    label.classList.toggle("bg-zinc-950", isFocused);
    label.classList.toggle("bg-zinc-900", !isFocused);
  }
}
