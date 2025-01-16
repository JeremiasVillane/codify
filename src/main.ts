function createEditorSection(language: string) {
  const icons: Record<string, string> = {
    HTML: "<span class='ph--file-html' style='color: orangered'></span>",
    CSS: "<span class='ph--file-css' style='color: aqua'></span>",
    JavaScript: "<span class='ph--file-js' style='color: yellow'></span>",
  };

  return `
    <article class="group flex flex-col flex-1">
      <label
        for="${language.toLocaleLowerCase()}Editor"
        title="${language} code editor"
        class="select-none bg-zinc-900 text-gray-300 font-medium cursor-pointer hover:bg-zinc-950 p-2 flex gap-2 group-focus-within:bg-zinc-950"
        >${icons[language]}${language}</label
      >
      <textarea
        id="${language.toLocaleLowerCase()}Editor"
        class="flex-1 bg-zinc-800 text-white p-2 resize-none focus-visible:outline-0 ring-0"
      ></textarea>
    </article>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  // Create the editor sections
  const container = document.querySelector(".editor-container") as HTMLElement;
  container.innerHTML = ["HTML", "CSS", "JavaScript"]
    .map(createEditorSection)
    .join("");

  // Get the editors and preview
  const htmlEditor = document.getElementById(
    "htmlEditor"
  ) as HTMLTextAreaElement;
  const cssEditor = document.getElementById("cssEditor") as HTMLTextAreaElement;
  const jsEditor = document.getElementById(
    "javascriptEditor"
  ) as HTMLTextAreaElement;
  const preview = document.getElementById("preview") as HTMLIFrameElement;
  const resizeHandle = document.getElementById("resizeHandle");
  const editorColumn = document.getElementById("code-editor");
  const previewColumn = document.getElementById("preview");

  // Initialize editors
  htmlEditor.value = `<div class="main">
  <h2>Codify: Live Code Editor</h2>
  <button id="clickme">Click me: 0</button>
</div>`;
  cssEditor.value = `body {
  font-family: "Lato", sans-serif;
  font-size: 20pt;
  color: #333;
}

.main {
  margin: 100px auto;
  text-align: center;
}

button {
  padding: 20px;
  background: lightblue;
  font-family: "Lato", sans-serif;
  font-size: 18pt;
  border: 0;
  color: white;
  cursor: pointer;
}`;
  jsEditor.value = `const button = document.getElementById("clickme");
count = 0;
button.onclick = function() {
  count += 1;
  button.innerHTML = "Click me: " + count;
};`;

  function updatePreview() {
    const html = htmlEditor.value;
    const css = cssEditor.value;
    const js = jsEditor.value;

    const content = `
        <html>
            <head>
                <style>${css}</style>
            </head>
            <body>
                ${html}
                <script>${js}<\/script>
            </body>
        </html>
    `;

    preview.srcdoc = content;
  }

  // Update preview when the user types
  const updateTimeouts = new Map<HTMLTextAreaElement, number>();

  [htmlEditor, cssEditor, jsEditor].forEach((editor) => {
    editor.addEventListener("input", () => {
      clearTimeout(updateTimeouts.get(editor));
      const timeoutId = setTimeout(updatePreview, 250);
      updateTimeouts.set(editor, timeoutId);
    });
  });

  // Initialize preview
  updatePreview();

  // Resizing
  let isResizing = false;
  let startX: number, startWidth: number;

  resizeHandle?.addEventListener("mousedown", startResize);
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", stopResize);

  function startResize(e: MouseEvent): void {
    isResizing = true;
    startX = e.clientX;
    startWidth = editorColumn?.offsetWidth ?? 0;
    document.body.style.userSelect = "none";
  }

  function handleMouseMove(e: MouseEvent): void {
    if (!isResizing) return;
    const diff = e.clientX - startX;
    const newWidth = startWidth + diff;
    const totalWidth = editorColumn?.parentElement?.offsetWidth ?? 0;

    if (newWidth > 200 && newWidth < totalWidth - 200) {
      const editorPercentage = (newWidth / totalWidth) * 100;
      if (editorColumn && previewColumn) {
        editorColumn.style.flex = `0 0 ${editorPercentage}%`;
        previewColumn.style.flex = `0 0 ${100 - editorPercentage}%`;
      }
    }
  }

  function stopResize() {
    isResizing = false;
    document.body.style.userSelect = "";
  }
});
