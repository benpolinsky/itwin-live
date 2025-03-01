This is how the screen viewport and viewState are accessed:

```ts
const vp = ExtensionHost.viewManager.selectedView;
if (vp){
    const viewState = vp.view;
    // ...
}
```

Always check if the viewport is present.



