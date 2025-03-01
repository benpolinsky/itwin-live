import { Tool, ExtensionHost } from "@itwin/core-extension";  
  
export default function main() {  
  class ChangeTextureTool extends Tool {  
    async run() {  
      const textureUrl = prompt("Enter the URL of the new texture:");  
      const selectedElements = ExtensionHost.locateManager.selectedElements;  
      selectedElements.forEach(element => {  
        element.setTexture(textureUrl);  
      });  
      console.log("Texture changed for selected elements.");  
    }  
  }  
  ChangeTextureTool.toolId = "ChangeTextureTool";  
  ChangeTextureTool.register("AI Generated");  
}  
