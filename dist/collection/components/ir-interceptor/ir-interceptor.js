import { Host, h } from "@stencil/core";
import axios from "axios";
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
  /* HTML: <div class="loader"></div> */
  // .loader {
  //   width: 60px;
  //   aspect-ratio: 2;
  //   --_g: no-repeat radial-gradient(circle closest-side,#000 90%,#0000);
  //   background:
  //     var(--_g) 0%   50%,
  //     var(--_g) 50%  50%,
  //     var(--_g) 100% 50%;
  //   background-size: calc(100%/3) 50%;
  //   animation: l3 1s infinite linear;
  // }
  // @keyframes l3 {
  //     20%{background-position:0%   0%, 50%  50%,100%  50%}
  //     40%{background-position:0% 100%, 50%   0%,100%  50%}
  //     60%{background-position:0%  50%, 50% 100%,100%   0%}
  //     80%{background-position:0%  50%, 50%  50%,100% 100%}
  // }
  handleRequest(config) {
    this.fetchingIrInterceptorDataStatus.emit('pending');
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
    this.fetchingIrInterceptorDataStatus.emit('done');
    if ((_a = response.data.ExceptionMsg) === null || _a === void 0 ? void 0 : _a.trim()) {
      this.handleError(response.data.ExceptionMsg);
      throw new Error(response.data.ExceptionMsg);
    }
    else {
      this.hideToastAfterDelay(true);
    }
    return response;
  }
  handleError(error) {
    if (this.isUnassignedUnit) {
      this.isUnassignedUnit = false;
    }
    this.hideToastAfterDelay(true);
    this.toast.emit({
      type: 'error',
      title: error,
      description: '',
      position: 'top-right',
    });
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
  renderMessage() {
    return this.defaultMessage.errorMessage;
  }
  render() {
    return (h(Host, null, this.isLoading && this.isShown && (h("div", { class: "loadingScreenContainer" }, h("div", { class: "loadingContainer" }, h("ir-loading-screen", null))))));
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
      }, {
        "method": "fetchingIrInterceptorDataStatus",
        "name": "fetchingIrInterceptorDataStatus",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "'pending' | 'done'",
          "resolved": "\"done\" | \"pending\"",
          "references": {}
        }
      }];
  }
}
//# sourceMappingURL=ir-interceptor.js.map
