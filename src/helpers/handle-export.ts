import * as monaco from "monaco-editor";
import { Language } from "../types";

export async function handleExport(
  editors: Record<Language, monaco.editor.IStandaloneCodeEditor>
) {
  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();

  zip.file("index.html", editors.HTML.getValue());
  zip.file("styles.css", editors.CSS.getValue());
  zip.file("script.js", editors.JavaScript.getValue());

  const content = await zip.generateAsync({ type: "blob" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(content);
  link.download = "codify-export.zip";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}
