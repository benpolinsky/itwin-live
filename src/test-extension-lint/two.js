import { Tool, ExtensionHost, ElementLocateManager } from "@itwin/core-extension";  
  
export default function main() {  
  class HideElementsExceptWallsTool extends Tool {  
    async run() {  
      const locateManager = ExtensionHost.locateManager;  
      const allElements = await locateManager.getAllElements();  
      const walls = allElements.filter(element => element.category === "Walls");  
        
      allElements.forEach(element => {  
        if (!walls.includes(element)) {  
          element.setVisible(false);  
        }  
      });  
  
      console.log("All elements hidden except for walls.");  
    }  
  }  
  
  HideElementsExceptWallsTool.toolId = "HideElementsExceptWallsTool";  
  HideElementsExceptWallsTool.register("AI Generated");  
  console.log("Hide Elements Except Walls Tool registered");  
}  
