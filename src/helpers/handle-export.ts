import * as monaco from "monaco-editor";
import { Language } from "../types";

export async function handleExport(
  editors: Record<Language, monaco.editor.IStandaloneCodeEditor>
) {
  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Codify</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
${editors.HTML.getValue()}
  <script src="script.js"></script>
</body>
</html>`;

  zip.file("index.html", html);
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
