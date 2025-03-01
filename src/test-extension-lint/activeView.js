import { Tool, ExtensionHost } from "@itwin/core-extension";  
  
export default function main() {  
  class ResetViewportTool extends Tool {  
    async run() {  
      const viewport = ExtensionHost.viewManager.selectedView;

      if (viewport) {  
        viewport.view.setStandardView("Top");  
        viewport.synchWithView();  
        console.log("Viewport has been reset to the default view.");  
      } else {  
        console.log("No active viewport found.");  
      }  
    }  
  }  
  
  ResetViewportTool.toolId = "ResetViewportTool";  
  ResetViewportTool.register("Reset Viewport Tool");  
  
  ExtensionHost.toolAdmin.registerTool(ResetViewportTool.toolId);  
  console.log("Reset Viewport Tool has been registered.");  
}  