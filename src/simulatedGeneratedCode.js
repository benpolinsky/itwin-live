import { Tool } from "@itwin/core-extension";

export default function main(){
    class FineZoomTool extends Tool {
      async run() {
        console.log("Fine Zoom Tool activated. Adjusting zoom sensitivity for touchpad users.");
    
        // Here's where the extension is written.
        // any api exported by @itwin/core-extension can be used here.

        console.log("Fine Zoom Tool activated. Adjust zoom by holding Ctrl/Cmd and using the mouse wheel.");
      }
    }
    FineZoomTool.toolId = "FineZoomTool";
      
    // Register the tool via the extension API.
    FineZoomTool.register("AI Generated");
    console.log("Dynamic tool registered");
}
