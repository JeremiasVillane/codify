import { Language } from "../types";

export * from "./actions";

export const LANGUAGES = ["HTML", "CSS", "JavaScript"] as const;

export const INIT_VALUES: Record<Language, string> = {
  HTML: `<div class="main">
  <img src="https://i.imgur.com/sqM42EY.png" draggable="false" />
  <button id="clickme">Click me: 0</button>
  <a href="https://github.com/JeremiasVillane/codify" target="_blank" rel="noreferrer noopener" class="author">By: Jeremias Villane</a>
</div>`,
  CSS: `body {
  font-family: "Lato", sans-serif;
  font-size: 20pt;
  color: #333;
}
  
.main {
  display: grid;
  justify-content: center;
  margin: 100px auto;
  text-align: center;
  gap: 2rem;
}

.author {
  font-size: 1rem;
  font-style: italic;
  color: gray;
}

button {
  padding: 20px;
  background: lightblue;
  font-family: "Lato", sans-serif;
  font-size: 18pt;
  border: 0;
  color: white;
  cursor: pointer;
  width: 12rem;
  margin: auto;
}

@media only screen and (max-width: 600px) {
  img {
    width: 300px;
  }
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

export const FILE_EXTENSIONS: Record<Language, string> = {
  HTML: "html",
  CSS: "css",
  JavaScript: "js",
};
