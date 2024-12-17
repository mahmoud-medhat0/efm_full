import{u as j,r as c,j as e,_ as n,a as b,I as g}from"./app-DnwVPCvX.js";import{m as P}from"./mony-DzEy0_kf.js";import{u as B}from"./upgreed-DkaPh9uY.js";import{D as $}from"./DashboardLayout-B4xzSw_q.js";import{S as z}from"./react-select.esm-BcB_0bMC.js";import{u as J}from"./index.esm-BnJY9xE7.js";import"./index-C4JomMCi.js";import"./character-B_L2WyuU.js";import"./emotion-react.browser.esm-D9u8JBcu.js";import"./floating-ui.dom-BHs9XJpa.js";const L="/build/assets/withdraw-DZlnzzmm.svg",ae=()=>{const p=j().props.methods,{lang:N,app_url:f}=j().props,[v,w]=c.useState(!1),S=()=>w(!0),x=()=>w(!1),[r,y]=c.useState(null),[W,O]=c.useState([]),[d,M]=c.useState(0),[E,F]=c.useState(0);c.useState([]);const T=p.map(a=>({value:a.id,label:e.jsxs("div",{className:"WithdrawFunds-serviceOption",children:[e.jsx("img",{src:`${f}/storage/${a.logo}`,alt:`${a.name} Icon`,className:"WithdrawFunds-serviceOptionIcon"}),a.name]})})),A=a=>{const s=p.find(o=>o.id===a.value);y(s),O(a),s&&s.withdrawAccounts.length==0&&s.withdrawFields&&s.withdrawFields.length>0&&(n.error("You don't have any withdraw accounts. Please add one to proceed.",{position:"bottom-center",duration:3e3}),S()),h()},{register:I,handleSubmit:C,setError:G,formState:{errors:K}}=J(),k=async a=>{var s,o,i,m;try{a.selectedMethod=r.id;const t=await b.post(route("client.dashboard.withdraw-account"),a);(t.status===200||t.status===201)&&t.data.success?(n.success(t.data.message,{position:"bottom-center",duration:2e3}),x(),g.visit(route("client.dashboard.withdraw"))):t.data.success===!1?t.data.errors?Object.keys(t.data.errors).forEach(l=>{t.data.errors[l].forEach(u=>{n.error(u,{position:"bottom-center",duration:2e3})})}):n.error(t.data.message||"An error occurred",{position:"bottom-center",duration:2e3}):n.error(t.data.message||"An error occurred",{position:"bottom-center",duration:2e3})}catch(t){console.error("Error during withdraw account creation:",t);const l=t,u=((i=(o=(s=l.response)==null?void 0:s.data.error)==null?void 0:o.details)==null?void 0:i.message)||((m=l.response)==null?void 0:m.data.message)||"An error occurred during withdraw account creation";n.error(`Withdraw account creation failed: ${u}`,{position:"bottom-center",duration:3e3})}},D=a=>{const s=parseFloat(a.target.value);M(s),h()};c.useEffect(()=>{h()},[d]);const h=()=>{if(r)if(d>0){let a=0;r.charge_type_withdraw==="percentage"?a=parseFloat(d)*r.charge_withdraw/100:a=parseFloat(r.charge_withdraw);const s=parseFloat(d)-a;F(s>0?s:0)}else F(0);else n.error("Please select a Withdraw method")},_=async a=>{var s;a.preventDefault();try{const o=(s=document.querySelector('meta[name="csrf-token"]'))==null?void 0:s.getAttribute("content");if(!r){n.error("Please select a withdrawal method");return}if(d<=0){n.error("Please enter an amount");return}const i=new FormData;i.append("selectedMethod",W.value),i.append("amount",d),i.append("account_id",r.withdrawAccounts[0].id);const m={headers:{"X-CSRF-TOKEN":o,"Content-Type":"multipart/form-data"}},t=await b.post(route("client.dashboard.withdraw.post"),i,m);t.data.success?(n.success(t.data.message+" with transaction id: "+t.data.tnx),setTimeout(()=>{g.visit(route("client.dashboard"))},1e3)):Object.keys(t.data.errors).forEach(l=>{t.data.errors[l].forEach(u=>{n.error(u,{position:"bottom-center",duration:2e3})})})}catch(o){console.error("Error submitting form:",o)}finally{}};return e.jsxs($,{children:[e.jsx("h2",{className:"WithdrawFunds-headerText",children:"Withdraw Funds"}),e.jsxs("div",{className:"WithdrawFunds-card",children:[e.jsx("div",{className:"WithdrawFunds-logo",children:e.jsx("img",{className:"WithdrawFunds-logoTitle",src:B,alt:"Logo"})}),r&&r.withdrawAccounts.length>0&&r.withdrawAccounts.map(a=>e.jsxs("div",{className:"WithdrawFunds-inputWrapper",children:[e.jsx("label",{className:"WithdrawFunds-label",children:Object.keys(JSON.parse(a.data))[0].replace(/\b\w/g,s=>s.toUpperCase())}),e.jsx("div",{className:"WithdrawFunds-inputWithIcon",children:e.jsx("input",{disabled:!0,value:JSON.parse(a.data)[Object.keys(JSON.parse(a.data))[0]],placeholder:Object.keys(JSON.parse(a.data))[0],className:"WithdrawFunds-input"})})]})),e.jsxs("form",{className:"WithdrawFunds-form",onSubmit:_,children:[e.jsxs("div",{className:"WithdrawFunds-inputWrapper",children:[e.jsx("label",{className:"WithdrawFunds-label",children:"Method"}),e.jsx("div",{className:"WithdrawFunds-block",children:e.jsx(z,{options:T,className:"WithdrawFunds-orderInput",styles:{control:a=>({...a,fontSize:"15px"})},placeholder:"Select a service",style:{fontSize:"15px"},value:W,onChange:a=>A(a)})})]}),e.jsxs("div",{className:"WithdrawFunds-inputWrapper",children:[e.jsx("label",{className:"WithdrawFunds-label",children:"Amount"}),e.jsxs("div",{className:"WithdrawFunds-inputWithIcon",children:[e.jsx("img",{className:"WithdrawFunds-icon",src:P,alt:"Amount Icon"}),e.jsx("input",{type:"number",placeholder:"0",className:"WithdrawFunds-inputes",value:d,onKeyDown:a=>{a.key==="Enter"&&(a.preventDefault(),h())},onInput:D,min:"0"}),e.jsx("span",{className:"WithdrawFunds-egpText",children:"EGP"})]})]}),e.jsxs("div",{className:"WithdrawFunds-inputWrapper",children:[e.jsx("label",{className:"WithdrawFunds-label",children:"Total"}),e.jsxs("div",{className:"WithdrawFunds-inputWithIcon",children:[e.jsx("img",{className:"WithdrawFunds-icon",src:L,alt:"Total Icon"}),e.jsx("input",{type:"text",placeholder:"0",className:"WithdrawFunds-inputes",value:E,disabled:!0}),e.jsx("span",{className:"WithdrawFunds-egpText",children:"EGP"})]})]}),e.jsxs("div",{className:"WithdrawFunds-buttonContainer",children:[e.jsx("button",{type:"submit",className:"WithdrawFunds-upgradeButton",children:"Send"}),e.jsx("button",{type:"button",className:"WithdrawFunds-cancelButton",children:"Cancel"})]})]})]}),v&&e.jsx("div",{className:"WithdrawFunds-modalOverlay",children:e.jsxs("div",{className:"WithdrawFunds-modal",children:[e.jsx("h2",{className:"WithdrawFunds-modalTitle",children:"Add Withdraw Account"}),e.jsx("p",{className:"WithdrawFunds-modalSubtitle",children:"The Selected Method has the following fields"}),e.jsx("div",{className:"WithdrawFunds-modalInputWrapper",children:r.withdrawFields.map(a=>e.jsxs("div",{children:[e.jsx("label",{className:"WithdrawFunds-modalLabel",children:a.name[N]}),e.jsx("div",{className:"WithdrawFunds-inputWithIcon",children:e.jsx("input",{type:a.type,placeholder:a.name.en,className:"WithdrawFunds-input",...I(a.name.en)})})]},a.id))}),e.jsxs("div",{className:"WithdrawFunds-modalButtonContainer",children:[e.jsx("button",{className:"WithdrawFunds-upgradeButton",onClick:C(k),children:"send"}),e.jsx("button",{className:"WithdrawFunds-cancelButton",onClick:x,children:"Cancel"})]})]})})]})};export{ae as default};