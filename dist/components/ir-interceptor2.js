import { proxyCustomElement, HTMLElement, h, Host, Fragment } from '@stencil/core/internal/client';
import { a as axios } from './axios.js';
import { d as defineCustomElement$1 } from './ir-loading-screen2.js';

const irInterceptorCss = ".sc-ir-interceptor-h{--viewport-padding:25px;position:fixed;top:0;right:0;display:flex;flex-direction:column;padding:var(--viewport-padding);gap:10px;max-width:60vw;margin:0;list-style:none;z-index:2147483647;outline:none;pointer-events:none}.toast-container.sc-ir-interceptor{background-color:white;border-radius:6px;box-shadow:hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;padding:15px 30px;display:grid;grid-template-areas:'title action';grid-template-columns:auto max-content;column-gap:15px;align-items:center;overflow:hidden}.toast-container[data-state='open'].sc-ir-interceptor{animation:slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards}.toast-container[data-state='closed'].sc-ir-interceptor{pointer-events:none;animation:fadeOut 150ms ease-in forwards}p.sc-ir-interceptor{margin:0;padding:0;grid-area:title;font-weight:500;color:#1c2024;font-size:15px}.x-mark-container.sc-ir-interceptor,.check-mark-container.sc-ir-interceptor{display:flex;align-items:center;justify-content:center;height:1.5rem;width:1.5rem;border-radius:50%}.x-mark-container.sc-ir-interceptor{background:red}.check-mark-container.sc-ir-interceptor{background:rgb(9, 153, 9)}.loadingScreenContainer.sc-ir-interceptor{position:fixed;top:0;left:0;height:100vh;width:100vw;z-index:100000;background:rgba(0, 0, 0, 0.2);pointer-events:all}@keyframes fadeOut{0%{opacity:1}100%{opacity:0}}@keyframes slideIn{0%{transform:translateX(calc(100% + var(--viewport-padding)));opacity:0}100%{transform:translateX(0);opacity:1}}";

const IrInterceptor = /*@__PURE__*/ proxyCustomElement(class IrInterceptor extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.isShown = false;
    this.isLoading = false;
    this.isUnassignedUnit = false;
    this.defaultMessage = {
      loadingMessage: 'Fetching Data',
      errorMessage: 'Something Went Wrong',
    };
    this.handledEndpoints = ['/Get_Exposed_Booking_Availability', '/ReAllocate_Exposed_Room'];
  }
  componentWillLoad() {
    this.setupAxiosInterceptors();
  }
  setupAxiosInterceptors() {
    axios.interceptors.request.use(this.handleRequest.bind(this), this.handleError.bind(this));
    axios.interceptors.response.use(this.handleResponse.bind(this), this.handleError.bind(this));
  }
  extractEndpoint(url) {
    return url.split('?')[0];
  }
  isHandledEndpoint(url) {
    return this.handledEndpoints.includes(this.extractEndpoint(url));
  }
  handleRequest(config) {
    if (this.isHandledEndpoint(config.url)) {
      this.isLoading = true;
      if (this.extractEndpoint(config.url) === '/ReAllocate_Exposed_Room') {
        this.defaultMessage.loadingMessage = 'Updating Event';
      }
      else if (this.extractEndpoint(config.url) === '/Get_Aggregated_UnAssigned_Rooms') {
        this.isUnassignedUnit = true;
      }
      else {
        this.defaultMessage.loadingMessage = 'Fetching Data';
      }
      this.showToast();
    }
    return config;
  }
  handleResponse(response) {
    var _a;
    this.isLoading = false;
    if ((_a = response.data.ExceptionMsg) === null || _a === void 0 ? void 0 : _a.trim()) {
      this.handleError(response.data.ExceptionMsg);
      throw new Error(response.data.ExceptionMsg);
    }
    else {
      this.handleCompletion('', true);
    }
    return response;
  }
  handleError(error) {
    if (this.isUnassignedUnit) {
      this.isUnassignedUnit = false;
    }
    if (!this.isShown) {
      this.showToast();
    }
    this.handleCompletion(error, false);
    return Promise.reject(error);
  }
  showToast() {
    this.isShown = true;
  }
  hideToastAfterDelay(isSuccess) {
    if (this.isUnassignedUnit) {
      this.isShown = false;
      this.isUnassignedUnit = false;
    }
    else {
      const delay = isSuccess ? 0 : 5000;
      setTimeout(() => {
        this.isShown = false;
      }, delay);
    }
  }
  handleCompletion(message, success) {
    if (!success) {
      this.defaultMessage = Object.assign(Object.assign({}, this.defaultMessage), { errorMessage: message });
    }
    this.hideToastAfterDelay(success);
  }
  renderMessage() {
    return this.defaultMessage.errorMessage;
  }
  render() {
    const show = !this.isLoading && this.isShown;
    return (h(Host, null, this.isLoading && this.isShown && (h("div", { class: "loadingScreenContainer" }, h("div", { class: "loadingContainer" }, h("ir-loading-screen", null)))), h("div", { class: "toast-container", "data-state": show ? 'open' : 'closed' }, show && (h(Fragment, null, h("div", { class: "x-mark-container" }, h("svg", { width: "15", height: "15", viewBox: "0 0 15 15", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, h("path", { d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z", fill: "white", "fill-rule": "evenodd", "clip-rule": "evenodd" }))), h("p", null, this.renderMessage()))))));
  }
  static get style() { return irInterceptorCss; }
}, [2, "ir-interceptor", {
    "defaultMessage": [1040],
    "handledEndpoints": [16],
    "isShown": [32],
    "isLoading": [32],
    "isUnassignedUnit": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ir-interceptor", "ir-loading-screen"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-interceptor":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IrInterceptor);
      }
      break;
    case "ir-loading-screen":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { IrInterceptor as I, defineCustomElement as d };

//# sourceMappingURL=ir-interceptor2.js.map