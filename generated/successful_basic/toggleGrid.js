import { Tool, ExtensionHost } from "@itwin/core-extension";  
  
export default function main() {  
  class ToggleGridLinesTool extends Tool {  
    async run() {  
      const vp = ExtensionHost.viewManager.selectedView;  
  
      if (vp) {  
        const viewstate = vp.view;
        const currentState = viewstate.viewFlags.grid
        const newViewFlags = viewstate.viewFlags.copy({grid: !currentState});
        viewstate.viewFlags = newViewFlags;
        console.log("Grid lines toggled.");
      } else {  
        console.error("No active viewport found.");  
        return false
      }
      
      return true
    }  
  }  
  
  ToggleGridLinesTool.toolId = "ToggleGridLinesTool";  
  ToggleGridLinesTool.register("Toggle Grid Lines Tool");  
  
  console.log("Toggle Grid Lines Tool registered");
}