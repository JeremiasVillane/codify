function main() {
  const htmlCode = document.getElementById("html-code") as HTMLTextAreaElement;
  const cssCode = document.getElementById("css-code") as HTMLTextAreaElement;
  const jsCode = document.getElementById("js-code") as HTMLTextAreaElement;
  const preview = document.getElementById("preview") as HTMLIFrameElement;

  preview!.contentDocument!.body.innerHTML = `${htmlCode.value} <style>${cssCode.value}</style>`;

  (preview!.contentWindow as Window & typeof globalThis).eval(jsCode.value);
}
