import{T as t,a as e}from"./p-d0086f2b.js";import{c as r,e as o,d as n}from"./p-93f17da5.js";import{g as a}from"./p-59f0be0a.js";class s extends t{async getCalendarData(t,n,s){try{const i=this.getToken();if(i!==null){const{data:c}=await e.post(`/Get_Exposed_Calendar?Ticket=${i}`,{propertyid:t,from_date:n,to_date:s});if(c.ExceptionMsg!==""){throw new Error(c.ExceptionMsg)}const l=c.My_Result.months;const _=[];const d=await a(l);const u=l.map((t=>{_.push({daysCount:t.days.length,monthName:t.description});return t.days.map((e=>({day:r(e.description,t.description),currentDate:o(e.description,t.description),dayDisplayName:e.description,rate:e.room_types,unassigned_units_nbr:e.unassigned_units_nbr,occupancy:e.occupancy})))})).flat();return Promise.resolve({ExceptionCode:null,ExceptionMsg:"",My_Params_Get_Rooming_Data:{AC_ID:t,FROM:c.My_Params_Get_Exposed_Calendar.from_date,TO:c.My_Params_Get_Exposed_Calendar.to_date},days:u,months:_,myBookings:d,defaultMonths:l})}}catch(t){console.error(t)}}async fetchGuest(t){try{const r=this.getToken();if(r!==null){const{data:o}=await e.post(`/Get_Exposed_Guest?Ticket=${r}`,{email:t});if(o.ExceptionMsg!==""){throw new Error(o.ExceptionMsg)}return o.My_Result}}catch(t){console.log(t);throw new Error(t)}}async editExposedGuest(t,r){try{const o=this.getToken();if(o!==null){const{data:n}=await e.post(`/Edit_Exposed_Guest?Ticket=${o}`,Object.assign(Object.assign({},t),{book_nbr:r}));if(n.ExceptionMsg!==""){throw new Error(n.ExceptionMsg)}return n.My_Result}}catch(t){console.log(t);throw new Error(t)}}async getBookingAvailability(t,r,o,n,a,s,i){try{const c=this.getToken();if(c){const{data:l}=await e.post(`/Get_Exposed_Booking_Availability?Ticket=${c}`,{propertyid:o,from_date:t,to_date:r,adult_nbr:n.adult,child_nbr:n.child,language:a,currency_ref:i.code,room_type_ids:s});if(l.ExceptionMsg!==""){throw new Error(l.ExceptionMsg)}return l["My_Result"]}else{throw new Error("Token doesn't exist")}}catch(t){console.error(t);throw new Error(t)}}async getCountries(t){try{const r=this.getToken();if(r){const{data:o}=await e.post(`/Get_Exposed_Countries?Ticket=${r}`,{language:t});if(o.ExceptionMsg!==""){throw new Error(o.ExceptionMsg)}return o.My_Result}}catch(t){console.error(t);throw new Error(t)}}async fetchSetupEntries(){try{const t=this.getToken();if(t){const{data:r}=await e.post(`/Get_Setup_Entries_By_TBL_NAME_MULTI?Ticket=${t}`,{TBL_NAMES:["_ARRIVAL_TIME","_RATE_PRICING_MODE","_BED_PREFERENCE_TYPE"]});if(r.ExceptionMsg!==""){throw new Error(r.ExceptionMsg)}const o=r.My_Result;return{arrivalTime:o.filter((t=>t.TBL_NAME==="_ARRIVAL_TIME")),ratePricingMode:o.filter((t=>t.TBL_NAME==="_RATE_PRICING_MODE")),bedPreferenceType:o.filter((t=>t.TBL_NAME==="_BED_PREFERENCE_TYPE"))}}}catch(t){console.error(t);throw new Error(t)}}async getBlockedInfo(){try{const t=this.getToken();if(t){const{data:r}=await e.post(`/Get_Setup_Entries_By_TBL_NAME_MULTI?Ticket=${t}`,{TBL_NAMES:["_CALENDAR_BLOCKED_TILL"]});if(r.ExceptionMsg!==""){throw new Error(r.ExceptionMsg)}return r.My_Result}}catch(t){console.error(t);throw new Error(t)}}async getUserDefaultCountry(){try{const t=this.getToken();if(t){const{data:r}=await e.post(`/Get_Country_By_IP?Ticket=${t}`,{IP:""});if(r.ExceptionMsg!==""){throw new Error(r.ExceptionMsg)}return r["My_Result"]}}catch(t){console.error(t);throw new Error(t)}}async blockUnit(t){try{const r=this.getToken();if(r){const{data:o}=await e.post(`/Block_Exposed_Unit?Ticket=${r}`,t);if(o.ExceptionMsg!==""){throw new Error(o.ExceptionMsg)}console.log(o);return o["My_Params_Block_Exposed_Unit"]}}catch(t){console.error(t);throw new Error(t)}}async getUserInfo(t){try{const r=this.getToken();if(r){const{data:o}=await e.post(`/GET_EXPOSED_GUEST?Ticket=${r}`,{email:t});if(o.ExceptionMsg!==""){throw new Error(o.ExceptionMsg)}return o.My_Result}else{throw new Error("Invalid Token")}}catch(t){console.error(t);throw new Error(t)}}async getExposedBooking(t,r){try{const o=this.getToken();if(o){const{data:n}=await e.post(`/Get_Exposed_Booking?Ticket=${o}`,{booking_nbr:t,language:r});if(n.ExceptionMsg!==""){throw new Error(n.ExceptionMsg)}return n.My_Result}else{throw new Error("Invalid Token")}}catch(t){console.error(t)}}generateDays(t,e,r){const o=new Date(t);const n=new Date(e);const a=[];while(o<n){a.push({date:o.toISOString().split("T")[0],amount:r});o.setDate(o.getDate()+1)}return a}calculateTotalRate(t,e,r,o){if(r&&o===2){return+t}return+t/+e}async fetchExposedGuest(t,r){try{const o=this.getToken();if(o){const{data:n}=await e.post(`/Fetch_Exposed_Guests?Ticket=${o}`,{email:t,property_id:r});if(n.ExceptionMsg!==""){throw new Error(n.ExceptionMsg)}return n["My_Result"]}else{throw new Error("Token doesn't exist")}}catch(t){console.error(t);throw new Error(t)}}async fetchExposedBookings(t,r,o,n){try{const a=this.getToken();if(a){const{data:s}=await e.post(`/Fetch_Exposed_Bookings?Ticket=${a}`,{booking_nbr:t,property_id:r,from_date:o,to_date:n});if(s.ExceptionMsg!==""){throw new Error(s.ExceptionMsg)}return s["My_Result"]}else{throw new Error("Token doesn't exist")}}catch(t){console.error(t);throw new Error(t)}}async getPCICardInfoURL(t){try{const r=this.getToken();if(r){const{data:o}=await e.post(`/Get_PCI_Card_Info_URL?Ticket=${r}`,{BOOK_NBR:t});if(o.ExceptionMsg!==""){throw new Error(o.ExceptionMsg)}return o["My_Result"]}else{throw new Error("Token doesn't exist")}}catch(t){console.error(t);throw new Error(t)}}async bookUser(t,r,o,a,s,i,c,l,_,d,u,w,h,E,y){console.log(h);try{const f=this.getToken();if(f){const p=n(o);const m=n(a);let T={email:t.email||null,first_name:t.firstName,last_name:t.lastName,country_id:t.countryId===""?null:t.countryId,city:null,mobile:t.contactNumber===null?"":t.contactNumber,address:"",dob:null,subscribe_to_news_letter:t.emailGuest||false,cci:t.cardNumber?{nbr:t.cardNumber,holder_name:t.cardHolderName,expiry_month:t.expiryMonth,expiry_year:t.expiryYear}:null};if(t.id){T=Object.assign(Object.assign({},T),{id:t.id})}const k={assign_units:true,check_in:r,is_pms:true,is_direct:true,booking:{booking_nbr:u||"",from_date:p,to_date:m,remark:t.message||null,property:{id:l},source:c,currency:d,arrival:h?{code:h}:Object.assign({},t.selectedArrivalTime),guest:w||T,rooms:[...s.map((t=>({identifier:y||null,roomtype:{id:t.roomCategoryId,name:t.roomCategoryName,physicalrooms:null,rateplans:null,availabilities:null,inventory:t.inventory,rate:t.rate/i},rateplan:{id:t.ratePlanId,name:t.ratePlanName,rate_restrictions:null,variations:null,cancelation:t.cancelation,guarantee:t.guarantee},unit:typeof E==="undefined"&&t.roomId===""?null:{id:+E||+t.roomId},occupancy:{adult_nbr:t.adultCount,children_nbr:t.childrenCount,infant_nbr:null},bed_preference:t.preference,from_date:p,to_date:m,notes:null,days:this.generateDays(p,m,this.calculateTotalRate(t.rate,i,t.isRateModified,t.rateType)),guest:{email:null,first_name:t.guestName,last_name:null,country_id:null,city:null,mobile:null,address:null,dob:null,subscribe_to_news_letter:null}}))),..._]}};console.log("book user payload",k);const{data:b}=await e.post(`/DoReservation?Ticket=${f}`,k);if(b.ExceptionMsg!==""){throw new Error(b.ExceptionMsg)}console.log(b["My_Result"]);return b["My_Result"]}else{throw new Error("Invalid token")}}catch(t){console.error(t);throw new Error(t)}}}export{s as B};
//# sourceMappingURL=p-de8669ff.js.map