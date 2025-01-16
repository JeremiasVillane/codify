function main() {
  const htmlCode = document.getElementById("html-code") as HTMLTextAreaElement;
  const cssCode = document.getElementById("css-code") as HTMLTextAreaElement;
  const jsCode = document.getElementById("js-code") as HTMLTextAreaElement;
  const preview = document.getElementById("preview") as HTMLIFrameElement;

  preview!.contentDocument!.body.innerHTML = `${htmlCode.value} <style>${cssCode.value}</style>`;

  (preview!.contentWindow as Window & typeof globalThis).eval(jsCode.value);
}

document.addEventListener("DOMContentLoaded", () => {
  const resizeHandle = document.getElementById("resizeHandle");
  const editorColumn = document.getElementById("code-editor");
  const previewColumn = document.getElementById("preview");

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
