import { Host, h } from "@stencil/core";
import axios from "axios";
import interceptor_requests from "../../../../src/stores/ir-interceptor.store";
export class IrInterceptor {
  constructor() {
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
      "defaultMessage": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "{ loadingMessage: string; errorMessage: string; }",
          "resolved": "{ loadingMessage: string; errorMessage: string; }",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "defaultValue": "{\r\n    loadingMessage: 'Fetching Data',\r\n    errorMessage: 'Something Went Wrong',\r\n  }"
      },
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
        "defaultValue": "['/ReAllocate_Exposed_Room']"
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
