import{T as t,a as o}from"./p-54928856.js";import{B as r}from"./p-f2fdd834.js";import{j as e}from"./p-8da2cdd0.js";class n extends t{constructor(){super(...arguments);this.bookingService=new r}async reallocateEvent(t,r,e,n){try{const s=this.getToken();if(s){console.log(t,r,e,n);const{data:a}=await o.post(`/ReAllocate_Exposed_Room?Ticket=${s}`,{pool:t,destination_pr_id:r,from_date:e,to_date:n});if(a.ExceptionMsg!==""){throw new Error(a.ExceptionMsg)}console.log(a);return a}else{throw new Error("Invalid Token")}}catch(t){console.error(t);throw new Error(t)}}async deleteEvent(t){try{const r=this.getToken();if(r){const{data:e}=await o.post(`/UnBlock_Exposed_Unit?Ticket=${r}`,{POOL:t});if(e.ExceptionMsg!==""){throw new Error(e.ExceptionMsg)}return e.My_Result}else{throw new Error("Invalid Token")}}catch(t){console.log(t);throw new Error(t)}}async updateBlockedEvent(t){try{const o=this.getToken();if(o){const r=e(+t.RELEASE_AFTER_HOURS);await this.deleteEvent(t.POOL);this.bookingService.setToken(o);const n=await this.bookingService.blockUnit(Object.assign({from_date:this.formatDate(t.FROM_DATE),to_date:this.formatDate(t.TO_DATE),pr_id:t.PR_ID,STAY_STATUS_CODE:t.OUT_OF_SERVICE?"004":t.RELEASE_AFTER_HOURS===0?"002":"003",DESCRIPTION:t.RELEASE_AFTER_HOURS||"",NOTES:t.OPTIONAL_REASON||""},r));return n}else{throw new Error("Invalid Token")}}catch(t){console.error(t);throw new Error(t)}}formatDate(t){return t.split("/").join("-")}}export{n as E};
//# sourceMappingURL=p-80ecfe25.js.map