export function createConfigModal() {
  const modal = `
<div id="configModal" class="fixed inset-0 z-50 select-none" style="display: none">
  <div id="overlay" class="absolute inset-0 bg-black/50 flex items-center justify-center">
    <div class="bg-white rounded-xl shadow-xl w-full max-w-4xl h-[60vh] flex overflow-hidden">
      <nav class="w-64 bg-gray-50 border-r border-gray-200 p-4 hidden sm:block">
        <h2 class="text-lg font-semibold text-gray-900 mb-6 px-2">Settings</h2>
        <div class="space-y-1">
          <button
            data-section="currentEditorConfig"
            class="menu-button flex items-center space-x-3 w-full px-2 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <span id="currentEditorConfigMenuItem"></span>
          </button>
          <button
            data-section="globalConfig"
            class="menu-button flex items-center space-x-3 w-full px-2 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <span>Global</span>
          </button>
        </div>
      </nav>
  
      <main class="flex-1 overflow-y-auto flex flex-col justify-between">
        <div id="currentEditorConfig" class="config-section p-6 space-y-8">
          <header>
            <h1 id="currentEditorConfigTitle" class="text-2xl font-semibold text-gray-900"></h1>
            <p class="text-gray-500 mt-1">Manage the current editor preferences and settings</p>
          </header>

          <section class="space-y-6">
            <div class="space-y-4">
              <div class="grid gap-4 sm:grid-cols-2"">
                <div class="space-y-2">
                  <label for="fontSizeInput" class="text-sm font-medium text-gray-700">Font Size:</label>
                  <input 
                    id="fontSizeInput" 
                    type="number" 
                    value="14" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent outline-none transition-shadow"
                  />
                </div>

                <div class="space-y-2">
                  <label for="lineHeightInput" class="text-sm font-medium text-gray-700">Line height:</label>
                  <input 
                    id="lineHeightInput" 
                    type="number" 
                    value="1.5"
                    step="0.5"
                    min="0"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent outline-none transition-shadow"
                  />
                </div>
              </div>

              <div class="flex items-center justify-between space-y-2">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Word Wrap:</h4>
                  <p class="text-sm text-gray-500">Break words adapting to the editor width</p>
                </div>
                <label for="wordWrapInput" class="relative inline-flex items-center cursor-pointer">
                  <input id="wordWrapInput" type="checkbox" class="sr-only peer" checked="true" />
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600"></div>
                </label>
              </div>
            </div>
          </section>
        </div>

        <div id="globalConfig" class="config-section hidden p-6 space-y-8">
          <header>
            <h1 class="text-2xl font-semibold text-gray-900">Global Settings</h1>
            <p class="text-gray-500 mt-1">Customize Codify appereance and behavior</p>
          </header>

          <section class="space-y-6">
            <div class="space-y-4">
              <h3 class="text-lg font-medium text-gray-900">Appereance</h3>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <div>
                    <h4 class="text-sm font-medium text-gray-900">Editor Theme</h4>
                    <p class="text-sm text-gray-500">Change the theme for all editors</p>
                  </div>
                  <select 
                    id="themeSelect"
                    class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent outline-none transition-shadow"
                  >
                    <option value="vs-dark">Dark</option>
                    <option value="vs">Light</option>
                    <option value="hc-black">High contrast (Black)</option>
                    <option value="hc-light">High contrast (Light)</option>
                  </select>
                </div>
            </div>
          </section>
        </div>

        <div class="flex justify-end space-x-4 p-6 border-t">
          <button id="cancelBtn" class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button id="applySettingsBtn" class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
            Save Changes
          </button>
        </div>
      </main>
    </div>
  </div>
</div>
  `;

  document.body.insertAdjacentHTML("beforeend", modal);
  document.getElementById("overlay")!.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
      document.getElementById("configModal")!.style.display = "none";
    }
  });
}
