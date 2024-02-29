import { Host, h } from "@stencil/core";
import axios from "axios";
import interceptor_requests from "../../../../src/stores/ir-interceptor.store";
export class IrInterceptor {
  constructor() {
    this.isShown = false;
    this.isLoading = false;
    this.isUnassignedUnit = false;
    this.handledEndpoints = ['/ReAllocate_Exposed_Room', '/Do_Payment', '/Get_Exposed_Bookings'];
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
    return this.handledEndpoints.includes(url);
  }
  handleRequest(config) {
    const extractedUrl = this.extractEndpoint(config.url);
    interceptor_requests[extractedUrl] = 'pending';
    if (this.isHandledEndpoint(extractedUrl)) {
      this.isLoading = true;
    }
    return config;
  }
  handleResponse(response) {
    var _a;
    const extractedUrl = this.extractEndpoint(response.config.url);
    if (this.isHandledEndpoint(extractedUrl)) {
      this.isLoading = false;
    }
    interceptor_requests[extractedUrl] = 'done';
    if ((_a = response.data.ExceptionMsg) === null || _a === void 0 ? void 0 : _a.trim()) {
      this.handleError(response.data.ExceptionMsg);
      throw new Error(response.data.ExceptionMsg);
    }
    return response;
  }
  handleError(error) {
    this.toast.emit({
      type: 'error',
      title: error,
      description: '',
      position: 'top-right',
    });
    return Promise.reject(error);
  }
  render() {
    return (h(Host, null, this.isLoading && (h("div", { class: "loadingScreenContainer" }, h("div", { class: "loadingContainer" }, h("ir-loading-screen", null))))));
  }
  static get is() { return "ir-interceptor"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["ir-interceptor.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["ir-interceptor.css"]
    };
  }
  static get properties() {
    return {
      "handledEndpoints": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "string[]",
          "resolved": "string[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "defaultValue": "['/ReAllocate_Exposed_Room', '/Do_Payment', '/Get_Exposed_Bookings']"
      }
    };
  }
  static get states() {
    return {
      "isShown": {},
      "isLoading": {},
      "isUnassignedUnit": {}
    };
  }
  static get events() {
    return [{
        "method": "toast",
        "name": "toast",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "IToast",
          "resolved": "ICustomToast & Partial<IToastWithButton> | IDefaultToast & Partial<IToastWithButton>",
          "references": {
            "IToast": {
              "location": "import",
              "path": "../ir-toast/toast",
              "id": "src/components/ir-toast/toast.ts::IToast"
            }
          }
        }
      }];
  }
}
//# sourceMappingURL=ir-interceptor.js.map
