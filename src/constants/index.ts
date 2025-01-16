import { Language } from "../types";

export const LANGUAGES = ["HTML", "CSS", "JavaScript"] as const;

export const INIT_VALUES: Record<Language, string> = {
  HTML: `<div class="main">
  <h2>Codify: Live Code Editor</h2>
  <button id="clickme">Click me: 0</button>
</div>`,
  CSS: `body {
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
}`,
  JavaScript: `const button = document.getElementById("clickme");
count = 0;
button.onclick = function() {
  count += 1;
  button.innerHTML = "Click me: " + count;
};`,
};

export const ICONS: Record<Language, string> = {
  HTML: "<span class='ph--file-html' style='color: orangered'></span>",
  CSS: "<span class='ph--file-css' style='color: aqua'></span>",
  JavaScript: "<span class='ph--file-js' style='color: yellow'></span>",
};
