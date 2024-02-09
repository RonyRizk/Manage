import { Host, h, } from "@stencil/core";
export class IglTbaCategoryView {
  constructor() {
    this.calendarData = undefined;
    this.selectedDate = undefined;
    this.categoriesData = {};
    this.categoryId = undefined;
    this.eventDatas = undefined;
    this.categoryIndex = undefined;
    this.renderAgain = false;
  }
  // private localEventDatas;
  componentWillLoad() {
    // this.localEventDatas = this.eventDatas;
  }
  handleAssignRoomEvent(event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    const opt = event.detail;
    this.eventDatas = this.eventDatas.filter((eventData) => eventData.ID != opt.data.ID);
    this.calendarData.bookingEvents.push(opt.data);
    this.assignUnitEvent.emit({
      key: "assignUnit",
      data: {
        RT_ID: this.categoryId,
        selectedDate: this.selectedDate,
        assignEvent: opt.data,
        calendarData: this.calendarData,
      },
    });
    // if(this.localEventDatas.length){
    this.renderView();
    // }
  }
  getEventView(categoryId, eventDatas) {
    return eventDatas.map((eventData, ind) => (h("igl-tba-booking-view", { calendarData: this.calendarData, selectedDate: this.selectedDate, eventData: eventData, categoriesData: this.categoriesData, categoryId: categoryId, categoryIndex: this.categoryIndex, eventIndex: ind, onAssignRoomEvent: (evt) => this.handleAssignRoomEvent(evt) })));
  }
  renderView() {
    this.renderAgain = !this.renderAgain;
  }
  render() {
    return (h(Host, null, h("div", { class: "sectionContainer" }, h("div", { class: "font-weight-bold mt-1 font-small-3" }, this.categoriesData[this.categoryId].name), this.getEventView(this.categoryId, this.eventDatas))));
  }
  static get is() { return "igl-tba-category-view"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["igl-tba-category-view.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["igl-tba-category-view.css"]
    };
  }
  static get properties() {
    return {
      "calendarData": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "{ [key: string]: any }",
          "resolved": "{ [key: string]: any; }",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      },
      "selectedDate": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "selected-date",
        "reflect": false
      },
      "categoriesData": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "{ [key: string]: any }",
          "resolved": "{ [key: string]: any; }",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "defaultValue": "{}"
      },
      "categoryId": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "category-id",
        "reflect": false
      },
      "eventDatas": {
        "type": "any",
        "mutable": true,
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "event-datas",
        "reflect": false
      },
      "categoryIndex": {
        "type": "any",
        "mutable": false,
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "category-index",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "renderAgain": {}
    };
  }
  static get events() {
    return [{
        "method": "assignUnitEvent",
        "name": "assignUnitEvent",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "{ [key: string]: any }",
          "resolved": "{ [key: string]: any; }",
          "references": {}
        }
      }];
  }
}
//# sourceMappingURL=igl-tba-category-view.js.map
