function main() {
  let htmlCode = document.getElementById("html-code") as HTMLTextAreaElement;
  let cssCode = document.getElementById("css-code") as HTMLTextAreaElement;
  let jsCode = document.getElementById("js-code") as HTMLTextAreaElement;
  let preview = document.getElementById("preview") as HTMLIFrameElement;

  preview!.contentDocument!.body.innerHTML = `${htmlCode.value} <style>${cssCode.value}</style>`;

  (preview!.contentWindow as Window & typeof globalThis).eval(jsCode.value);
}
