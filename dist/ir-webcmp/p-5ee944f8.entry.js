import{r as t,h as s,H as i}from"./p-1da6dd41.js";import{l as e}from"./p-cda0b50c.js";import{c as a}from"./p-4a6ea091.js";import{h as n}from"./p-fe6c3d31.js";import"./p-58003fb6.js";import"./p-85d94cdd.js";const r=".sc-ir-date-view-h{display:block;font-size:13.65px !important;width:100%}.mx-01.sc-ir-date-view{--m:5px;margin-right:var(--m) !important;margin-left:var(--m) !important}";const h=class{constructor(s){t(this,s);this.from_date=undefined;this.to_date=undefined;this.showDateDifference=true;this.dateOption="YYYY-MM-DD";this.dates=undefined}componentWillLoad(){this.initializeDates()}handleFromDateChange(t,s){if(t!==s){this.initializeDates()}}handleToDateChange(t,s){if(t!==s){this.initializeDates()}}initializeDates(){this.convertDate("from_date",this.from_date);this.convertDate("to_date",this.to_date);const t=n(this.dates.from_date,"MMM DD, YYYY").format("YYYY-MM-DD");const s=n(this.dates.to_date,"MMM DD, YYYY").format("YYYY-MM-DD");this.dates.date_diffrence=a(t,s)}convertDate(t,s){this.dates=this.dates||{from_date:"",to_date:"",date_diffrence:0};if(typeof s==="string"){this.dates[t]=n(s,this.dateOption).format("MMM DD, YYYY")}else if(s instanceof Date){this.dates[t]=n(s).format("MMM DD, YYYY")}else if(n.isMoment(s)){this.dates[t]=s.format("MMM DD, YYYY")}else{console.error("Unsupported date type")}}render(){return s(i,{class:"d-flex align-items-center"},s("span",null,this.dates.from_date)," ",s("svg",{xmlns:"http://www.w3.org/2000/svg",class:"mx-01",height:"14",width:"14",viewBox:"0 0 512 512"},s("path",{fill:"currentColor",d:"M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"})),s("span",null,this.dates.to_date," ",this.showDateDifference&&s("span",{class:"mx-01"},this.dates.date_diffrence,"   ",this.dates.date_diffrence>1?` ${e.entries.Lcz_Nights}`:` ${e.entries.Lcz_Night}`)))}static get watchers(){return{from_date:["handleFromDateChange"],to_date:["handleToDateChange"]}}};h.style=r;export{h as ir_date_view};
//# sourceMappingURL=p-5ee944f8.entry.js.map