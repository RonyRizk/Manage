import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const irLoadingScreenCss = ".sc-ir-loading-screen-h{display:fix;height:100vh;width:100vw;z-index:1000;top:0;left:0}.loader.sc-ir-loading-screen{width:2.25rem;height:2.25rem;border:3.5px solid #3f3f3f;border-bottom-color:transparent;border-radius:50%;display:inline-block;box-sizing:border-box;animation:rotation 1s linear infinite}.backdrop.sc-ir-loading-screen{height:100vh;width:100vw;background:rgba(0, 0, 0, 0.4);position:absolute;top:0;left:0}.loaderContainer.sc-ir-loading-screen{position:absolute;z-index:100001;padding:20px;top:50%;left:50%;transform:translate(-50%, -50%);background:white;display:flex;align-items:center;justify-content:center;gap:20px;border-radius:5px;box-shadow:hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px}@keyframes rotation{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}";

const IrLoadingScreen = /*@__PURE__*/ proxyCustomElement(class IrLoadingScreen extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.message = '';
  }
  render() {
    return (h(Host, null, h("div", { class: "loaderContainer" }, h("span", { class: "loader" }), this.message && h("p", { class: 'm-0' }, this.message))));
  }
  static get style() { return irLoadingScreenCss; }
}, [2, "ir-loading-screen", {
    "message": [1]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ir-loading-screen"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-loading-screen":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IrLoadingScreen);
      }
      break;
  } });
}

export { IrLoadingScreen as I, defineCustomElement as d };

//# sourceMappingURL=ir-loading-screen2.js.map