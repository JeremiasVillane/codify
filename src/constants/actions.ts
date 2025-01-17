import { FILE_EXTENSIONS } from ".";
import { ActionConfig, Language } from "../types";

export const ACTIONS: Record<string, ActionConfig> = {
  export: {
    fn: (content: string, language: Language) => {
      const blob = new Blob([content], { type: "text/plain" });
      const link = document.createElement("a");

      link.href = URL.createObjectURL(blob);
      link.download = `codify-${language.toLowerCase()}.${
        FILE_EXTENSIONS[language]
      }`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    },
    description: "Export to file",
  },
};
