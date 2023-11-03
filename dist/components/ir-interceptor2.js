import { proxyCustomElement, HTMLElement, h, Host, Fragment } from '@stencil/core/internal/client';
import { a as axios } from './axios.js';

const irInterceptorCss = ".sc-ir-interceptor-h{--viewport-padding:25px;position:fixed;top:0;right:0;display:flex;flex-direction:column;padding:var(--viewport-padding);gap:10px;max-width:60vw;margin:0;list-style:none;z-index:2147483647;outline:none;pointer-events:none}.toast-container.sc-ir-interceptor{background-color:white;border-radius:6px;box-shadow:hsl(206 22% 7% / 35%) 0px 10px 38px -10px,\r\n    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;padding:15px 30px;display:grid;grid-template-areas:\"title action\";grid-template-columns:auto max-content;column-gap:15px;align-items:center;overflow:hidden}.toast-container[data-state=\"open\"].sc-ir-interceptor{animation:slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards}.toast-container[data-state=\"closed\"].sc-ir-interceptor{pointer-events:none;animation:fadeOut 150ms ease-in forwards}p.sc-ir-interceptor{margin:0;padding:0;grid-area:title;font-weight:500;color:#1c2024;font-size:15px}.x-mark-container.sc-ir-interceptor,.check-mark-container.sc-ir-interceptor{display:flex;align-items:center;justify-content:center;height:1.5rem;width:1.5rem;border-radius:50%}.x-mark-container.sc-ir-interceptor{background:red}.check-mark-container.sc-ir-interceptor{background:rgb(9, 153, 9)}.loader.sc-ir-interceptor{width:1.25rem;height:1.25rem;border:2.5px solid #3f3f3f;border-bottom-color:transparent;border-radius:50%;display:inline-block;box-sizing:border-box;animation:rotation 1s linear infinite}@keyframes rotation{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes fadeOut{0%{opacity:1}100%{opacity:0}}@keyframes slideIn{0%{transform:translateX(calc(100% + var(--viewport-padding)));opacity:0}100%{transform:translateX(0);opacity:1}}";

const IrInterceptor = /*@__PURE__*/ proxyCustomElement(class IrInterceptor extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.isShown = false;
    this.isLoading = false;
    this.isSuccess = false;
    this.defaultMessage = {
      loadingMessage: "Fetching Data",
      successMessage: "Success",
      errorMessage: "Something Went Wrong",
    };
    this.handledEndpoints = [
      "/Get_Exposed_Booking_Availability",
      "/Get_Aggregated_UnAssigned_Rooms",
    ];
  }
  componentWillLoad() {
    this.setupAxiosInterceptors();
  }
  setupAxiosInterceptors() {
    axios.interceptors.request.use(this.handleRequest.bind(this), this.handleError.bind(this));
    axios.interceptors.response.use(this.handleResponse.bind(this), this.handleError.bind(this));
  }
  extractEndpoint(url) {
    return url.split("?")[0];
  }
  isHandledEndpoint(url) {
    return this.handledEndpoints.includes(this.extractEndpoint(url));
  }
  handleRequest(config) {
    if (this.isHandledEndpoint(config.url)) {
      this.isLoading = true;
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
    if (this.isHandledEndpoint(response.config.url)) {
      this.handleCompletion("Success", true);
    }
    return response;
  }
  handleError(error) {
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
    const delay = isSuccess ? 2000 : 5000;
    setTimeout(() => {
      this.isShown = false;
    }, delay);
  }
  handleCompletion(message, success) {
    this.isSuccess = success;
    this.defaultMessage = Object.assign(Object.assign({}, this.defaultMessage), { [success ? "successMessage" : "errorMessage"]: message });
    this.hideToastAfterDelay(success);
  }
  renderMessage() {
    if (this.isLoading)
      return this.defaultMessage.loadingMessage;
    return this.isSuccess
      ? this.defaultMessage.successMessage
      : this.defaultMessage.errorMessage;
  }
  render() {
    return (h(Host, null, h("div", { class: "toast-container", "data-state": this.isShown ? "open" : "closed" }, this.isShown && (h(Fragment, null, this.isLoading ? (h("span", { class: "loader" })) : !this.isSuccess ? (h("div", { class: "x-mark-container" }, h("svg", { width: "15", height: "15", viewBox: "0 0 15 15", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, h("path", { d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z", fill: "white", "fill-rule": "evenodd", "clip-rule": "evenodd" })))) : (h("div", { class: "check-mark-container" }, h("svg", { width: "15", height: "15", viewBox: "0 0 15 15", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, h("path", { d: "M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z", fill: "white", "fill-rule": "evenodd", "clip-rule": "evenodd" })))), h("p", null, this.renderMessage()))))));
  }
  static get style() { return irInterceptorCss; }
}, [2, "ir-interceptor", {
    "defaultMessage": [1040],
    "handledEndpoints": [16],
    "isShown": [32],
    "isLoading": [32],
    "isSuccess": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ir-interceptor"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-interceptor":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IrInterceptor);
      }
      break;
  } });
}

export { IrInterceptor as I, defineCustomElement as d };

//# sourceMappingURL=ir-interceptor2.js.map