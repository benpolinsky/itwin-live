import { Tool, ExtensionHost } from "@itwin/core-extension";  
  
export default function main() {  
  class Bookmark {  
    constructor(name, viewState) {  
      this.name = name;  
      this.viewState = viewState;  
    }  
  }  
  
  class BookmarkManager {  
    constructor() {  
      this.bookmarks = [];  
    }  
  
    addBookmark(name, viewState) {  
      const bookmark = new Bookmark(name, viewState);  
      this.bookmarks.push(bookmark);  
      console.log(`Bookmark "${name}" added.`);  
    }  
  
    removeBookmark(name) {  
      this.bookmarks = this.bookmarks.filter(b => b.name !== name);  
      console.log(`Bookmark "${name}" removed.`);  
    }  
  
    listBookmarks() {  
      console.log("Current Bookmarks:");  
      this.bookmarks.forEach(b => {  
        console.log(`- ${b.name}`);  
      });  
    }  
  
    loadBookmark(name) {  
      const bookmark = this.bookmarks.find(b => b.name === name);  
      if (bookmark) {  
        ExtensionHost.viewManager.loadViewState(bookmark.viewState);  
        console.log(`Loaded bookmark "${name}".`);  
      } else {  
        console.log(`Bookmark "${name}" not found.`);  
      }  
    }  
  }  
  
  class BookmarkTool extends Tool {  
    constructor() {  
      super();  
      this.manager = new BookmarkManager();  
    }  
  
    async run() {  
      const viewState = ExtensionHost.viewManager.getActiveViewState();  
      const bookmarkName = prompt("Enter bookmark name:");  
      if (bookmarkName) {  
        this.manager.addBookmark(bookmarkName, viewState);  
      }  
    }  
  }  
  
  class ListBookmarksTool extends Tool {  
    async run() {  
      this.manager.listBookmarks();  
    }  
  }  
  
  class LoadBookmarkTool extends Tool {  
    async run() {  
      const bookmarkName = prompt("Enter bookmark name to load:");  
      if (bookmarkName) {  
        this.manager.loadBookmark(bookmarkName);  
      }  
    }  
  }  
  
  BookmarkTool.toolId = "BookmarkTool";  
  BookmarkTool.register("Bookmark Tool");  
  ListBookmarksTool.toolId = "ListBookmarksTool";  
  ListBookmarksTool.register("List Bookmarks Tool");  
  LoadBookmarkTool.toolId = "LoadBookmarkTool";  
  LoadBookmarkTool.register("Load Bookmark Tool");  
  
  console.log("Bookmark tools registered.");  
}  
