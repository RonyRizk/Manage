import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { a as axios } from './axios.js';
import { i as interceptor_requests } from './ir-interceptor.store.js';
import { d as defineCustomElement$1 } from './ir-loading-screen2.js';

const irInterceptorCss = ".sc-ir-interceptor-h{--viewport-padding:25px;position:fixed;top:0;right:0;display:flex;flex-direction:column;padding:var(--viewport-padding);gap:10px;max-width:60vw;margin:0;list-style:none;z-index:2147483647;outline:none;pointer-events:none}.toast-container.sc-ir-interceptor{background-color:white;border-radius:6px;box-shadow:hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;padding:15px 30px;display:grid;grid-template-areas:'title action';grid-template-columns:auto max-content;column-gap:15px;align-items:center;overflow:hidden}.toast-container[data-state='open'].sc-ir-interceptor{animation:slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards}.toast-container[data-state='closed'].sc-ir-interceptor{pointer-events:none;animation:fadeOut 150ms ease-in forwards}p.sc-ir-interceptor{margin:0;padding:0;grid-area:title;font-weight:500;color:#1c2024;font-size:15px}.x-mark-container.sc-ir-interceptor,.check-mark-container.sc-ir-interceptor{display:flex;align-items:center;justify-content:center;height:1.5rem;width:1.5rem;border-radius:50%}.x-mark-container.sc-ir-interceptor{background:red}.check-mark-container.sc-ir-interceptor{background:rgb(9, 153, 9)}.loadingScreenContainer.sc-ir-interceptor{position:fixed;top:0;left:0;height:100vh;width:100vw;z-index:100000;background:rgba(0, 0, 0, 0.2);pointer-events:all}@keyframes fadeOut{0%{opacity:1}100%{opacity:0}}@keyframes slideIn{0%{transform:translateX(calc(100% + var(--viewport-padding)));opacity:0}100%{transform:translateX(0);opacity:1}}";

const IrInterceptor = /*@__PURE__*/ proxyCustomElement(class IrInterceptor extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.toast = createEvent(this, "toast", 7);
    this.isShown = false;
    this.isLoading = false;
    this.isUnassignedUnit = false;
    this.defaultMessage = {
      loadingMessage: 'Fetching Data',
      errorMessage: 'Something Went Wrong',
    };
    this.handledEndpoints = ['/ReAllocate_Exposed_Room'];
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
    interceptor_requests.status = 'pending';
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
    }
    return config;
  }
  handleResponse(response) {
    var _a;
    if (this.isHandledEndpoint(response.config.url)) {
      this.isLoading = false;
    }
    interceptor_requests.status = 'done';
    if ((_a = response.data.ExceptionMsg) === null || _a === void 0 ? void 0 : _a.trim()) {
      this.handleError(response.data.ExceptionMsg);
      throw new Error(response.data.ExceptionMsg);
    }
    return response;
  }
  handleError(error) {
    if (this.isUnassignedUnit) {
      this.isUnassignedUnit = false;
    }
    this.toast.emit({
      type: 'error',
      title: error,
      description: '',
      position: 'top-right',
    });
    return Promise.reject(error);
  }
  renderMessage() {
    return this.defaultMessage.errorMessage;
  }
  render() {
    return (h(Host, null, this.isLoading && (h("div", { class: "loadingScreenContainer" }, h("div", { class: "loadingContainer" }, h("ir-loading-screen", null))))));
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