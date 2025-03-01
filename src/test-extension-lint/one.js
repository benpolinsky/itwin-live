import { Tool, ExtensionHost, Decorations, GraphicBuilder, ColorDef } from "@itwin/core-extension";  
  
export default function main() {  
  class CenterCoordinateDecoratorTool extends Tool {  
    async run() {  
      const viewport = ExtensionHost.viewManager.selectedViewport;  
      const screenCenter = viewport.viewRect.center;  
      const graphicBuilder =GraphicBuilder();
        
      graphicBuilder.setSymbology(ColorDef.green, ColorDef.black, 2);  
      graphicBuilder.addLineString([  
        { x: screenCenter.x - 10, y: screenCenter.y },  
        { x: screenCenter.x + 10, y: screenCenter.y },  
      ]);  
      graphicBuilder.addLineString([  
        { x: screenCenter.x, y: screenCenter.y - 10 },  
        { x: screenCenter.x, y: screenCenter.y + 10 },  
      ]);  
  
      const graphic = graphicBuilder.finish();  
      Decorations.addGraphic(viewport, graphic);  
        
      console.log(`Center coordinates: (${screenCenter.x}, ${screenCenter.y})`);  
    }  
  }  
  
  CenterCoordinateDecoratorTool.toolId = "CenterCoordinateDecoratorTool";  
  CenterCoordinateDecoratorTool.register("AI Generated");  
  console.log("Center Coordinate Decorator Tool registered");  
}  
