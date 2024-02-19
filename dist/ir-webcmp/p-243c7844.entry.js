import{r as t,c as i,h as s,g as o}from"./p-05195efb.js";import{l as e}from"./p-dda5a727.js";import"./p-7cd9c724.js";const h=".sc-ir-combobox-h{display:block;position:relative;padding:0;margin:0}ul.sc-ir-combobox{position:absolute;margin:0;margin-top:2px;width:100%;max-height:80px;border-radius:0.21rem;z-index:10000;padding:1px;background:white;box-shadow:0px 8px 16px 0px rgba(0, 0, 0, 0.2);padding:5px 0;max-height:250px;overflow-y:auto}.dropdown-item.sc-ir-combobox{cursor:pointer}ul.sc-ir-combobox li.sc-ir-combobox,span.sc-ir-combobox,loader-container.sc-ir-combobox{padding:0px 16px;margin:0px;margin-top:2px;width:100%;border-radius:2px}ul.sc-ir-combobox li.sc-ir-combobox{cursor:pointer}ul.sc-ir-combobox li.sc-ir-combobox:hover{background:#f4f5fa}ul.sc-ir-combobox li[data-selected].sc-ir-combobox,ul.sc-ir-combobox li[data-selected].sc-ir-combobox:hover{color:#fff;text-decoration:none;background-color:#666ee8}";const r=class{constructor(s){t(this,s);this.comboboxValueChange=i(this,"comboboxValueChange",7);this.inputCleared=i(this,"inputCleared",7);this.toast=i(this,"toast",7);this.data=[];this.duration=300;this.placeholder=undefined;this.value=undefined;this.autoFocus=false;this.selectedIndex=-1;this.isComboBoxVisible=false;this.isLoading=true;this.isItemSelected=undefined;this.inputValue="";this.filteredData=[];this.componentShouldAutoFocus=false}componentWillLoad(){this.filteredData=this.data}componentDidLoad(){if(this.autoFocus){this.focusInput()}}watchHandler(t,i){if(t!==i&&t===true){this.focusInput()}}handleKeyDown(t){var i;const s=this.data.length;const o=this.getHeightOfPElement();if(s>0){switch(t.key){case"ArrowUp":t.preventDefault();this.selectedIndex=(this.selectedIndex-1+s)%s;this.adjustScrollPosition(o);break;case"ArrowDown":t.preventDefault();this.selectedIndex=(this.selectedIndex+1)%s;this.adjustScrollPosition(o);break;case"Enter":case" ":case"ArrowRight":t.preventDefault();this.selectItem(this.selectedIndex);break;case"Escape":(i=this.inputRef)===null||i===void 0?void 0:i.blur();this.isComboBoxVisible=false;break}}}getHeightOfPElement(){const t=this.el.querySelector(".combobox");if(t){const i=t.querySelector("p");return i?i.offsetHeight:0}return 0}focusInput(){requestAnimationFrame((()=>{var t;(t=this.inputRef)===null||t===void 0?void 0:t.focus()}))}adjustScrollPosition(t,i=250){const s=this.el.querySelector(".combobox");if(s){const o=2;const e=t+o;const h=e*this.selectedIndex;let r=h-i/2+t/2;r=Math.max(0,Math.min(r,s.scrollHeight-i));s.scrollTo({top:r,behavior:"auto"})}}selectItem(t){if(this.filteredData[t]){this.isItemSelected=true;this.comboboxValueChange.emit({key:"select",data:this.filteredData[t].id});this.inputValue="";this.resetCombobox();if(this.autoFocus){this.focusInput()}}}debounceFetchData(){clearTimeout(this.debounceTimer);this.debounceTimer=setTimeout((()=>{this.fetchData()}),this.duration)}handleFocus(){this.isComboBoxVisible=true}clearInput(){this.inputValue="";this.resetCombobox();this.inputCleared.emit(null)}resetCombobox(t=true){var i;if(t){(i=this.inputRef)===null||i===void 0?void 0:i.blur()}this.selectedIndex=-1;this.isComboBoxVisible=false}async fetchData(){try{this.isLoading=true;this.filteredData=this.data.filter((t=>t.name.toLowerCase().startsWith(this.inputValue)))}catch(t){console.log("error",t)}finally{this.isLoading=false}}handleInputChange(t){this.inputValue=t.target.value;if(this.inputValue){this.debounceFetchData()}else{this.filteredData=this.data}}handleDocumentClick(t){const i=t.target;if(!this.el.contains(i)){this.isComboBoxVisible=false}}handleBlur(){this.blurTimout=setTimeout((()=>{if(!this.isItemSelected){this.inputValue="";this.resetCombobox()}else{this.isItemSelected=false}}),300)}isDropdownItem(t){return t&&t.closest(".combobox")}disconnectedCallback(){var t,i,s,o;clearTimeout(this.debounceTimer);clearTimeout(this.blurTimout);(t=this.inputRef)===null||t===void 0?void 0:t.removeEventListener("blur",this.handleBlur);(i=this.inputRef)===null||i===void 0?void 0:i.removeEventListener("click",this.selectItem);(s=this.inputRef)===null||s===void 0?void 0:s.removeEventListener("keydown",this.handleKeyDown);(o=this.inputRef)===null||o===void 0?void 0:o.removeEventListener("focus",this.handleFocus)}handleItemKeyDown(t,i){var s;if(t.key==="Enter"||t.key===" "||t.key==="ArrowRight"){this.selectItem(i);t.preventDefault()}else if(t.key==="Escape"){this.isComboBoxVisible=false;(s=this.inputRef)===null||s===void 0?void 0:s.blur();t.preventDefault()}else{return}}renderDropdown(){var t;if(!this.isComboBoxVisible){return null}return s("ul",null,(t=this.filteredData)===null||t===void 0?void 0:t.map(((t,i)=>s("li",{role:"button",key:t.id,onKeyDown:t=>this.handleItemKeyDown(t,i),"data-selected":this.selectedIndex===i,tabIndex:0,onClick:()=>this.selectItem(i)},t.name))),this.filteredData.length===0&&!this.isLoading&&s("span",{class:"text-center"},e.entries.Lcz_NoResultsFound))}render(){return s("fieldset",{class:"m-0 p-0"},s("input",{ref:t=>this.inputRef=t,type:"text",value:this.value,placeholder:this.placeholder,class:"form-control",onKeyDown:this.handleKeyDown.bind(this),onBlur:this.handleBlur.bind(this),onInput:this.handleInputChange.bind(this),onFocus:this.handleFocus.bind(this),autoFocus:this.autoFocus}),this.renderDropdown())}get el(){return o(this)}static get watchers(){return{isComboBoxVisible:["watchHandler"]}}};r.style=h;export{r as ir_combobox};
//# sourceMappingURL=p-243c7844.entry.js.map