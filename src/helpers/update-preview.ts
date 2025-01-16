import * as monaco from "monaco-editor";
import { Language } from "../types";

export function updatePreview(
  editors: Record<Language, monaco.editor.IStandaloneCodeEditor>
) {
  const { HTML, CSS, JavaScript } = editors;

  const html = HTML.getValue();
  const css = CSS.getValue();
  const js = JavaScript.getValue();

  const content = `
    <html>
      <head><style>${css}</style></head>
      <body>
        ${html}
        <script>${js}<\/script>
      </body>
    </html>
  `;

  (document.getElementById("preview") as HTMLIFrameElement).srcdoc = content;
}
