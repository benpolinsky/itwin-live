import { IModelApp, RemoteExtensionProvider } from "@itwin/core-frontend";

// Simulate generating extension code that registers a tool.
async function getGeneratedToolExtensionCode(): Promise<string> {
  return `
    import { ExtensionHost, Tool } from "@itwin/core-extension";
    export default function main() {
      console.log("Dynamic tool extension loaded at " + new Date());

      // Define a basic tool.
      class DynamicTool extends Tool {
        run(){
          alert("Dynamic tool activated using core-extension API!");
          return true;
        }
      }

      DynamicTool.toolId = "DynamicTool";
      
      // Register the tool via the extension API.
      DynamicTool.register("AI Generated);
      console.log("Dynamic tool registered");
    }
  `;
}

export async function loadDynamicToolExtension() {
  // Fetch the local file as a string.
  const response = await fetch("/simulatedGeneratedCode.js");
  const extensionCodeText = await response.text();

  // Create a Blob URL for the generated code.
  const codeBlob = new Blob([extensionCodeText], { type: "application/javascript" });
  const codeUrl = URL.createObjectURL(codeBlob);

  // Dynamically create the manifest (enhanced package.json).
  const manifest = {
    name: "dynamic-tool-extension",
    version: "0.0.1",
    main: codeUrl,
    type: "module",
    activationEvents: ["onStartup"]
  };
  const manifestBlob = new Blob([JSON.stringify(manifest)], { type: "application/json" });
  const manifestUrl = URL.createObjectURL(manifestBlob);

  // Create the RemoteExtensionProvider using the dynamic URLs.
  const extensionProvider = new RemoteExtensionProvider({
    jsUrl: codeUrl,
    manifestUrl: manifestUrl,
  });

  // Register a host for remote extensions.
  IModelApp.extensionAdmin.registerHost("dynamic-tool-extension-host");

  // Load the extension.
  IModelApp.extensionAdmin.addExtension(extensionProvider)
    .then(() => {
      console.log("Dynamic tool extension loaded successfully.");
    })
    .catch((err) => {
      console.error("Error loading dynamic tool extension:", err);
    });
}

