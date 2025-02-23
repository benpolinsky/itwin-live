import { Tool } from "@itwin/core-extension";

export default function main(){
    class FineZoomTool extends Tool {
      async run() {
        console.log("Fine Zoom Tool activated. Adjusting zoom sensitivity for touchpad users.");
    
        // Adjust the zoom sensitivity by setting a finer scale factor.
        const scaleFactor = 0.1; // Lower value means finer zoom.
    
        document.addEventListener('wheel', (event) => {
            console.log("We're are a workin'")
          if (event.ctrlKey || event.metaKey) { // Only modify zoom when Ctrl or Cmd is pressed.
            event.preventDefault();
            let delta = event.deltaY;
    
            if (delta > 0) {
              const currentScale = parseFloat(document.body.style.transform.match(/scale$(.*?)$/)[1]);
              document.body.style.transform = `scale(${currentScale * scaleFactor})`;
            } else {
              const currentScale = parseFloat(document.body.style.transform.match(/scale$(.*?)$/)[1]);
              document.body.style.transform = `scale(${currentScale / scaleFactor})`;
            }
          }
        });
        
        alert("Fine Zoom Tool activated. Adjust zoom by holding Ctrl/Cmd and using the mouse wheel.");
      }
    }
    FineZoomTool.toolId = "FineZoomTool";
      
    // Register the tool via the extension API.
    FineZoomTool.register("AI Generated");
    console.log("Dynamic tool registered");
}
