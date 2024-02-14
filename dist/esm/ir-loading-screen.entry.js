import { r as registerInstance, h, H as Host } from './index-795d2df3.js';

const irLoadingScreenCss = ".sc-ir-loading-screen-h{display:fix;height:100vh;width:100vw;z-index:1000;top:0;left:0}.loader.sc-ir-loading-screen{width:1.25rem;height:1.25rem;border:2.5px solid #3f3f3f;border-bottom-color:transparent;border-radius:50%;display:inline-block;box-sizing:border-box;animation:rotation 1s linear infinite}.backdrop.sc-ir-loading-screen{height:100vh;width:100vw;background:rgba(0, 0, 0, 0.4);position:absolute;top:0;left:0}.loaderContainer.sc-ir-loading-screen{position:absolute;z-index:100001;padding:20px;top:50%;left:50%;transform:translate(-50%, -50%);background:white;display:flex;align-items:center;justify-content:center;gap:20px;border-radius:5px}@keyframes rotation{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}";

const IrLoadingScreen = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.message = '';
  }
  render() {
    return (h(Host, null, h("div", { class: "loaderContainer" }, h("span", { class: "loader" }))));
  }
};
IrLoadingScreen.style = irLoadingScreenCss;

export { IrLoadingScreen as ir_loading_screen };

//# sourceMappingURL=ir-loading-screen.entry.js.map