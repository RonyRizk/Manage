import{r as t,c as i,h as s}from"./p-05195efb.js";const e=".backdropModal.sc-ir-modal{background-color:rgba(0, 0, 0, 0.5);z-index:1000;position:fixed;top:0;left:0;height:100vh;width:100%;opacity:0;transition:opacity 0.3s ease-in-out;pointer-events:none}.backdropModal.active.sc-ir-modal{cursor:pointer;opacity:1 !important;pointer-events:all}.ir-modal[data-state='opened'].sc-ir-modal{opacity:1;visibility:visible;pointer-events:all;transition:all 0.3s ease-in-out}.ir-alert-content.sc-ir-modal{padding:10px;background:white;border-radius:5px}.modal.sc-ir-modal{z-index:1001 !important}.modal-dialog.sc-ir-modal{height:100vh;display:flex;align-items:center}.ir-alert-footer.sc-ir-modal{gap:10px}.ir-modal.sc-ir-modal{position:fixed;top:50%;left:50%;transform:translate(-50%, -50%);z-index:1050;width:90%;max-width:32rem;overflow:hidden;outline:0;opacity:0;transition:transform 0.3s ease-in-out, opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;visibility:hidden;pointer-events:none}.ir-modal.active.sc-ir-modal{opacity:1;transform:translate(-50%, 0);visibility:visible;pointer-events:all;transition:all 0.3s ease-in-out}";const o=class{constructor(s){t(this,s);this.confirmModal=i(this,"confirmModal",7);this.cancelModal=i(this,"cancelModal",7);this.modalTitle="Modal Title";this.modalBody="Modal Body";this.rightBtnActive=true;this.leftBtnActive=true;this.rightBtnText="Confirm";this.leftBtnText="Close";this.rightBtnColor="primary";this.leftBtnColor="secondary";this.btnPosition="right";this.iconAvailable=false;this.icon="";this.isOpen=false;this.item={}}async closeModal(){this.isOpen=false}async openModal(){this.isOpen=true}btnClickHandler(t){let i=t.target;let s=i.name;if(s===this.leftBtnText){this.cancelModal.emit();this.item={};this.closeModal()}else if(s===this.rightBtnText){this.confirmModal.emit(this.item);this.item={};this.closeModal()}}render(){return[s("div",{class:`backdropModal ${this.isOpen?"active":""}`,onClick:()=>{this.closeModal()}}),s("div",{"data-state":this.isOpen?"opened":"closed",class:`ir-modal`,tabindex:"-1"},s("div",{class:`ir-alert-content p-2`},s("div",{class:`ir-alert-header align-items-center border-0 py-0 m-0 `},s("p",{class:"font-weight-bold p-0 my-0 mb-1"},this.modalTitle)),s("div",{class:"modal-body text-left p-0 mb-2"},s("div",null,this.modalBody)),s("div",{class:`ir-alert-footer border-0  d-flex justify-content-${this.btnPosition==="center"?"center":this.btnPosition==="left"?"start":"end"}`},this.leftBtnActive&&s("ir-button",{icon:"",btn_color:this.leftBtnColor,btn_block:true,text:this.leftBtnText,name:this.leftBtnText}),this.rightBtnActive&&s("ir-button",{icon:"",btn_color:this.rightBtnColor,btn_block:true,text:this.rightBtnText,name:this.rightBtnText}))))]}};o.style=e;export{o as ir_modal};
//# sourceMappingURL=p-7d6150c3.entry.js.map