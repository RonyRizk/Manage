import{r as i,c as t,h as l}from"./p-a4ee474f.js";import{_ as s,b as e}from"./p-30bf9f71.js";import"./p-fe6c3d31.js";const o=class{constructor(l){i(this,l);this.handlePaymentItemChange=t(this,"handlePaymentItemChange",7);this.creditCardPressHandler=t(this,"creditCardPressHandler",7);this.itemToBeAdded={PAYMENT_DATE:"",PAYMENT_AMOUNT:"",DESIGNATION:"",REFERENCE:"",PAYMENT_ID:""};this.item=undefined;this.newTableRow=false;this.collapsedPayment=false;this.collapsedGuarantee=false;this.flag=false;this.confirmModal=false;this.toBeDeletedItem={};this.paymentDetailsUrl="";this.paymentExceptionMessage=""}_handleSave(){var i;if(this.item.My_Payment==null){this.item.My_Payment=[]}this.itemToBeAdded.PAYMENT_ID=((i=this.item.My_Payment[this.item.My_Payment.length-1])===null||i===void 0?void 0:i.PAYMENT_ID)+1||1;this.item.My_Payment=[...this.item.My_Payment,this.itemToBeAdded];console.log(this.item);this.handlePaymentItemChange.emit(this.item.My_Payment);this.itemToBeAdded={PAYMENT_DATE:"",PAYMENT_AMOUNT:"",DESIGNATION:"",REFERENCE:""}}handleConfirmModal(i){const t=this.item.My_Payment.filter((t=>t.PAYMENT_ID!==i.detail.PAYMENT_ID));this.item.My_Payment=t;this.confirmModal=!this.confirmModal;this.handlePaymentItemChange.emit(this.item.My_Payment);this.toBeDeletedItem={}}wandler(){console.log("Changed");this.flag=!this.flag}_renderTableRow(i,t="normal"){return l("div",{class:"row m-0"},l("div",{class:"col-9 p-0"},l("div",{class:"row m-0"},l("div",{class:"col-4  border-right-light p-0 border-bottom-light border-2"},t==="normal"?l("span",{class:"sm-padding-left"},s(i.PAYMENT_DATE)):l("input",{class:"border-0 w-100",onChange:i=>{this.itemToBeAdded.PAYMENT_DATE=i.target.value},type:"date"})),l("div",{class:"col-4 border-right-light d-flex p-0 justify-content-end border-bottom-light border-2 sm-padding-right"},t==="normal"?l("span",{class:"sm-padding-right"},"$",i.PAYMENT_AMOUNT):l("input",{class:"border-0 w-100",onChange:i=>{this.itemToBeAdded.PAYMENT_AMOUNT=i.target.value},type:"number"})),l("div",{class:"col-4 border-right-light p-0 border-bottom-light border-2 sm-padding-left"},t==="normal"?l("span",{class:"sm-padding-left"},i.DESIGNATION):l("input",{class:"border-0 w-100",onChange:i=>{this.itemToBeAdded.DESIGNATION=i.target.value},type:"text"})),l("div",{class:"col-12 border-right-light p-0 border-bottom-light border-2 sm-padding-left"},t==="normal"?l("span",{class:"sm-padding-left"},i.REFERENCE):l("input",{class:"border-0 w-100",onKeyPress:i=>{if(i.key==="Enter"){this.newTableRow=false;this._handleSave()}},onChange:i=>{this.itemToBeAdded.REFERENCE=i.target.value},type:"text"})))),l("div",{class:"col-3 d-flex align-items-center justify-content-between border-right-light border-bottom-light border-2"},l("ir-icon",{icon:"ft-save color-ir-light-blue-hover h5 pointer",onClick:t==="add"?()=>{this.newTableRow=false;this._handleSave()}:()=>{}}),l("ir-icon",{icon:"ft-trash-2 danger h5 pointer",onClick:t==="add"?()=>{this.newTableRow=false;this.itemToBeAdded={PAYMENT_DATE:"",PAYMENT_AMOUNT:"",DESIGNATION:"",REFERENCE:""}}:()=>{this.toBeDeletedItem=i;const t=document.querySelector(".delete-record-modal");t.openModal()}})))}bookingGuarantee(){var i,t,s,e,o,r,d,a,n,h,c,g,v,m,p,u,f,b,E;return l("div",null,l("div",{class:"d-flex align-items-center"},l("strong",{class:"mr-1"},"Booking Guarantee"),l("ir-icon",{id:"drawer-icon",icon:`${this.collapsedGuarantee?"ft-credit-card":"ft-credit-card"} h2 color-ir-light-blue-hover`,"data-toggle":"collapse","data-target":`.guarrantee`,"aria-expanded":"false","aria-controls":"myCollapse",class:"sm-padding-right pointer",onClick:()=>{if(!this.item.IS_DIRECT){this.creditCardPressHandler.emit(this.item.BOOK_NBR)}this.collapsedGuarantee=!this.collapsedGuarantee}})),l("div",{class:"collapse guarrantee"},this.item.IS_DIRECT?[l("div",null,((t=(i=this.item)===null||i===void 0?void 0:i.My_Guest)===null||t===void 0?void 0:t.CCN)&&"Card:"," ",l("span",null,((e=(s=this.item)===null||s===void 0?void 0:s.My_Guest)===null||e===void 0?void 0:e.CCN)||"")," ",((r=(o=this.item)===null||o===void 0?void 0:o.My_Guest)===null||r===void 0?void 0:r.CC_EXP_MONTH)&&"Expiry: ",l("span",null," ",((a=(d=this.item)===null||d===void 0?void 0:d.My_Guest)===null||a===void 0?void 0:a.CC_EXP_MONTH)||""," ",((h=(n=this.item)===null||n===void 0?void 0:n.My_Guest)===null||h===void 0?void 0:h.CC_EXP_YEAR)&&"/"+((g=(c=this.item)===null||c===void 0?void 0:c.My_Guest)===null||g===void 0?void 0:g.CC_EXP_YEAR))),l("div",null,((m=(v=this.item)===null||v===void 0?void 0:v.My_Guest)===null||m===void 0?void 0:m.CHN)&&"Name:"," ",l("span",null,((u=(p=this.item)===null||p===void 0?void 0:p.My_Guest)===null||u===void 0?void 0:u.CHN)||"")," ",((b=(f=this.item)===null||f===void 0?void 0:f.My_Guest)===null||b===void 0?void 0:b.CVC)&&"- CVC:"," ",l("span",null," ",((E=this.item.My_Guest)===null||E===void 0?void 0:E.CVC)||""))]:this.paymentDetailsUrl?l("iframe",{src:this.paymentDetailsUrl,width:"100%",class:"iframeHeight",frameborder:"0"}):l("div",{class:"text-center"},this.paymentExceptionMessage)))}_renderDueDate(i){return l("div",{class:"fluid-container"},l("div",{class:"row mb-1"},l("div",{class:"col-xl-3 col-lg-4 col-md-2 col-sm-3 col-4 pr-0"},s(i.Date)),l("div",{class:"col-1 d-flex px-0 justify-content-end"},e(i.Amount,this.item.My_Currency.REF)),l("div",{class:"col-xl-3 col-lg-4 col-md-3 col-sm-3 col-4"},i.Description),l("span",{class:"ml-1 col-12 font-size-small collapse roomName"},i.Room)))}render(){var i,t;if(!this.item){return l("div",null)}return[l("div",{class:"card"},l("div",{class:"p-1"},l("div",{class:"mb-2 h4"},"Due Balance: ",l("span",{class:"danger font-weight-bold"},e(this.item.DUE_AMOUNT,this.item.My_Currency.REF))),(this.item.My_Ac.AC_PAYMENT_OPTION_CODE=="001"||this.item.My_Ac.AC_PAYMENT_OPTION_CODE=="004"||this.item.IS_CHM_SOURCE||this.item.IS_DIRECT)&&this.bookingGuarantee(),l("div",{class:"mt-2"},l("div",null,l("div",{class:"d-flex align-items-center"},l("strong",{class:"mr-1"},"Payment due dates"),this.item.My_Bsa&&this.item.My_Bsa.length>1&&l("ir-icon",{id:"drawer-icon",icon:`${this.collapsedPayment?"ft-eye-off":"ft-eye"} h2 color-ir-light-blue-hover`,"data-toggle":"collapse","data-target":`.roomName`,"aria-expanded":"false","aria-controls":"myCollapse",class:"sm-padding-right pointer",onClick:()=>{this.collapsedPayment=!this.collapsedPayment}})),((i=this.item)===null||i===void 0?void 0:i.My_DueDates)&&((t=this.item)===null||t===void 0?void 0:t.My_DueDates.map((i=>this._renderDueDate(i)))))),l("div",{class:"mt-2"},l("strong",null,"Payments"),l("div",{class:"fluid-container border-top-light border-2 border-left-light font-size-small"},l("div",{class:"row m-0"},l("div",{class:"col-3 font-weight-bold border-right-light border-bottom-light border-2 p-0"},l("span",{class:"sm-padding-left"},"Date")),l("div",{class:"col-3 font-weight-bold border-right-light border-bottom-light border-2 p-0"},l("span",{class:"sm-padding-left"},"Amount")),l("div",{class:"col-3 font-weight-bold border-right-light border-bottom-light border-2 p-0 sm-padding-left"},l("span",{class:"sm-padding-left"},"Designation")),l("div",{class:"col-3 text-center border-right-light p-0 border-bottom-light border-2"},l("ir-icon",{id:"add-payment",icon:"ft-plus font-weight-bold color-ir-light-blue-hover pointer p-0",onClick:()=>{this.newTableRow=true}}))),this.item.My_Payment&&this.item.My_Payment.map((i=>this._renderTableRow(i))),this.newTableRow?this._renderTableRow(null,"add"):null)))),l("ir-modal",{item:this.toBeDeletedItem,class:"delete-record-modal",modalTitle:"Are you sure you want to delete this payment record?",modalBody:"If deleted it will be permnantly lost!",iconAvailable:true,icon:"ft-alert-triangle danger h1",leftBtnText:"Delete",rightBtnText:"Cancel",leftBtnColor:"danger",rightBtnColor:"primary"})]}static get watchers(){return{paymentDetailsUrl:["wandler"]}}};export{o as ir_payment_details};
//# sourceMappingURL=p-d4692f28.entry.js.map