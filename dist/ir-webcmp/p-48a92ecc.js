import{c as n}from"./p-7cd9c724.js";const s={channels:[],selectedChannel:null,mappedChannel:[],connected_channels:[]};const{state:c,onChange:a,dispose:e}=n(s);function t(n){if(n===""){c.selectedChannel=null;return}const s=c.channels.find((s=>s.id.toString()===n));c.selectedChannel=s;o()}function o(){let n=c.connected_channels.find((n=>n.channel.id===c.selectedChannel.id));c.mappedChannel=[...n.map]}function l(){c.selectedChannel=null;c.mappedChannel=[]}function i(n,s){c.mappedChannel.push({channel_id:s,ir_id:n})}function u(n){c.mappedChannel=c.mappedChannel.filter((s=>s.ir_id!==n))}export{u as a,i as b,c,o as d,a as o,l as r,t as s};
//# sourceMappingURL=p-48a92ecc.js.map