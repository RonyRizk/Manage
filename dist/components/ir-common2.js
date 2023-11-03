import { proxyCustomElement, HTMLElement, h, Host } from '@stencil/core/internal/client';

const onlineResources = [
  // {
  //   isJS: true,
  //   link: "https://x.igloorooms.com/manage/micro/app-assets/required/assets/scripts/jquery.min.js",
  // },
  {
    isCSS: true,
    link: "https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i%7CQuicksand:300,400,500,700",
  },
  {
    isCSS: true,
    link: "https://x.igloorooms.com/app-assets/vendors/css/forms/icheck/icheck.css",
  },
  {
    isCSS: true,
    link: "https://x.igloorooms.com/app-assets/vendors/css/forms/icheck/custom.css",
  },
  { isCSS: true, link: "https://x.igloorooms.com/app-assets/css/colors.css" },
  { isCSS: true, link: "https://x.igloorooms.com/app-assets/css/colors.css" },
  {
    isCSS: true,
    link: "https://x.igloorooms.com/app-assets/css/components.css",
  },
  {
    isCSS: true,
    link: "https://x.igloorooms.com/app-assets/css/core/menu/menu-types/horizontal-menu.css",
  },
  {
    isCSS: true,
    link: "https://x.igloorooms.com/app-assets/css/core/colors/palette-gradient.css",
  },
  {
    isCSS: true,
    link: "https://x.igloorooms.com/app-assets/css/pages/login-register.css",
  },
  {
    isCSS: true,
    link: "https://x.igloorooms.com/manage/micro/app-assets/required/assets/scripts/daterangepicker/daterangepicker.css",
  },
  { isCSS: true, link: "https://x.igloorooms.com/assets/css/style.css" },
  {
    isCSS: true,
    link: "https://x.igloorooms.com/app-assets/css/bootstrap.css",
  },
  {
    isCSS: true,
    link: "https://x.igloorooms.com/app-assets/css/bootstrap-extended.css",
  },
  // {
  //   isJS: true,
  //   link: "https://x.igloorooms.com/manage/micro/app-assets/required/assets/scripts/daterangepicker/moment.min.js",
  // },
  // {
  //   isJS: true,
  //   link: "https://x.igloorooms.com/manage/micro/app-assets/required/assets/scripts/daterangepicker/daterangepicker.js",
  // },
];

const IrCommon = /*@__PURE__*/ proxyCustomElement(class IrCommon extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.extraResources = '';
    this.resources = onlineResources;
  }
  componentWillLoad() {
    this.parseRefs();
  }
  componentDidLoad() {
    this.initializeStyles();
  }
  hrefsChanged() {
    this.parseRefs();
    this.initializeStyles();
  }
  parseRefs() {
    if (this.extraResources !== '')
      this.resources.push(JSON.parse(this.extraResources));
  }
  appendTag(tagName, attributes) {
    const tag = document.createElement(tagName);
    const selectorParts = [];
    Object.keys(attributes).forEach(attr => {
      tag.setAttribute(attr, attributes[attr]);
      selectorParts.push(`[${attr}="${attributes[attr]}"]`);
    });
    const selector = `${tagName}${selectorParts.join('')}`;
    const existingTag = document.querySelector(selector);
    if (!existingTag) {
      document.head.appendChild(tag);
    }
  }
  initializeStyles() {
    this.resources.forEach(res => {
      if (res.isCSS) {
        this.appendTag('link', {
          href: res.link,
          rel: 'stylesheet',
          type: 'text/css',
        });
      }
      if (res.isJS) {
        this.appendTag('script', {
          src: res.link,
        });
      }
    });
  }
  render() {
    return (h(Host, null, h("slot", null)));
  }
  static get watchers() { return {
    "extraResources": ["hrefsChanged"]
  }; }
}, [4, "ir-common", {
    "extraResources": [513, "extra-resources"],
    "resources": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ir-common"];
  components.forEach(tagName => { switch (tagName) {
    case "ir-common":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, IrCommon);
      }
      break;
  } });
}

export { IrCommon as I, defineCustomElement as d };

//# sourceMappingURL=ir-common2.js.map