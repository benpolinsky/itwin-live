import { ExtensionHost, Tool } from "@itwin/core-extension";
export default function main() {
  console.log("3DPolygonSelectionTool extension loaded at " + new Date());

  class PolygonSelectionTool extends Tool {
    points = [];
    // Called when the user performs a primary action (e.g. left-click)
    onDataButtonDown(ev) {
      const vp = ExtensionHost.viewManager.selectedView;
      if (!vp) return false;

      // Convert the screen point (ev.point) to a world coordinate.
      // (Assume vp.screenToWorld is available; replace with your actual method.)
      const worldPoint = vp.screenToWorld(ev.point);
      if (worldPoint) {
        this._points.push(worldPoint);
        console.log("Added point:", worldPoint);
        // Optionally, draw a marker for visual feedback.
        this.drawMarker(worldPoint);
      }

      // If we have enough points (e.g., 3), complete the selection.
      if (this._points.length >= 3) {
        // In a real tool you might wait for a confirmation (like a double-click or Enter)
        this.completeSelection();
      }
      return true;
    }

    // Called when the user resets/cancels the tool.
    onResetButtonUp(ev) {
      this._points = [];
      this.clearMarkers();
      console.log("Polygon selection cancelled.");
      return true;
    }

    // Compute a selection volume (this is pseudocode; implement as needed).
    computeVolumeFromPoints(points) {
      // For example, compute a convex hull or bounding box.
      // Here we simply return an object with the points.
      return { points };
    }

    // Finalize the selection process.
    completeSelection() {
      const vp = ExtensionHost.viewManager.selectedView;
      if (!vp) return;

      const volume = this.computeVolumeFromPoints(this._points);
      console.log("Computed selection volume:", volume);

      // Hypothetical API: select elements within a given 3D volume.
      // Replace with the actual iTwin.js API for spatial queries or hit testing.
      const selectedIds = vp.pickElementsWithinVolume ? vp.pickElementsWithinVolume(volume) : [];
      console.log("Selected element IDs:", selectedIds);

      // Optionally, process or highlight the selected elements.
      // Reset the tool state.
      this._points = [];
      this.clearMarkers();
    }

    // (Optional) Visual feedback: draw a marker for each clicked point.
    drawMarker(point) {
      // Implementation to visually mark the clicked point.
      console.log("Drawing marker at", point);
    }

    // (Optional) Clear all drawn markers.
    clearMarkers() {
      console.log("Clearing markers");
    }
  }

  // Set the tool's identifier.
  PolygonSelectionTool.toolId = "PolygonSelectionTool";

  // Register the tool with the iTwin.js extension system.
  ExtensionHost.toolAdmin.register(PolygonSelectionTool);
  console.log("PolygonSelectionTool registered");
}