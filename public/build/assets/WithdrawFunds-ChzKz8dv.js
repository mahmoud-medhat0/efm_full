import{r,u as I,_ as n,j as e,a as A}from"./app-Dq6YNcy5.js";import{M as R}from"./MethodSelector-BFq2sKDt.js";import{W as P}from"./WelcomeTab-B4VcpFil.js";import{B as j}from"./Button-Ckhsq7s1.js";import{I as x}from"./Input-DQcfDxTS.js";import B from"./Layout-B7a0TqoK.js";import{M as K}from"./Modal-CH_O5-Kc.js";import{u as E}from"./index.esm-tlUfDOVl.js";import{s as y}from"./index-C4JomMCi.js";import"./listbox-BdfeCVl0.js";import"./use-is-mounted-BTjpilq7.js";import"./form-fields-CAOBp-BQ.js";import"./use-text-value-Ui3F1Q1M.js";import"./dev-BSoyqUDd.js";import"./ArrowUpCircleIcon-Ctttd5hx.js";import"./LinkIcon-Xf61Svhp.js";import"./Footer-BsPknF0e.js";import"./twitter-C2_HC0eX.js";import"./Navbar-DGC9LAKM.js";import"./ShoppingCartIcon-BA5E2RyV.js";import"./DocumentTextIcon-p19CLr3I.js";import"./DocumentCheckIcon-BF0yHJpb.js";import"./XMarkIcon-CcgQp683.js";function X({title:l,titleId:c,...t},w){return r.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:w,"aria-labelledby":c},t),l?r.createElement("title",{id:c},l):null,r.createElement("path",{fillRule:"evenodd",d:"M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z",clipRule:"evenodd"}))}const q=r.forwardRef(X),we=()=>{const l=I(),c=l.props.methods,[t,w]=r.useState(c[0]),[i,M]=r.useState(0),[k,v]=r.useState(0),b=()=>{if(i>0){let s=0;t.charge_type_withdraw==="percentage"?s=parseFloat(i)*t.charge_withdraw/100:s=parseFloat(t.charge_withdraw);const o=parseFloat(i)-s;v(o>0?o:0)}else v(0)},N=s=>{const o=parseFloat(s.target.value);M(o||0)};r.useEffect(()=>{b()},[i,t]);const[F,u]=r.useState(!1),[C,S]=r.useState(!1),g=()=>S(!1),{register:T,handleSubmit:_,setError:H,formState:{errors:J}}=E(),O=async s=>{var o,d,m,f;try{s.selectedMethod=t.id;const a=await A.post(y("client.dashboard.withdraw-account"),s);(a.status===200||a.status===201)&&a.data.success?(n.success(a.data.message,{position:"bottom-center",duration:2e3}),g(),u(!1),setTimeout(()=>{window.location.reload()},2e3)):a.data.success===!1?a.data.errors?Object.keys(a.data.errors).forEach(h=>{a.data.errors[h].forEach(p=>{n.error(p,{position:"bottom-center",duration:2e3})})}):n.error(a.data.message||"An error occurred",{position:"bottom-center",duration:2e3}):n.error(a.data.message||"An error occurred",{position:"bottom-center",duration:2e3})}catch(a){console.error("Error during withdraw account creation:",a);const h=a,p=((m=(d=(o=h.response)==null?void 0:o.data.error)==null?void 0:d.details)==null?void 0:m.message)||((f=h.response)==null?void 0:f.data.message)||"An error occurred during withdraw account creation";n.error(`Withdraw account creation failed: ${p}`,{position:"bottom-center",duration:3e3})}};r.useEffect(()=>{(!Array.isArray(l.props.withdrawAccounts)||l.props.withdrawAccounts.length===0)&&n.error("You don't have any withdraw accounts. Please add one to proceed.",{position:"bottom-center",duration:3e3})},[]);const W=s=>{w(s)},{register:Y,handleSubmit:L,formState:{errors:Z}}=E(),D=async s=>{var o;u(!0);try{const d=(o=document.querySelector('meta[name="csrf-token"]'))==null?void 0:o.getAttribute("content");if(!t){u(!1),n.error("Please select a withdrawal method");return}if(i<=0){u(!1),n.error("Please enter an amount");return}const m=new FormData;m.append("selectedMethod",t.id),m.append("amount",i);const f={headers:{"X-CSRF-TOKEN":d,"Content-Type":"multipart/form-data"}},a=await A.post(y("client.dashboard.withdraw.post"),m,f);a.data.success?(n.success(a.data.message+" with transaction id: "+a.data.tnx),setTimeout(()=>{window.location.replace(y("client.dashboard"))},1e3)):Object.keys(a.data.errors).forEach(h=>{a.data.errors[h].forEach(p=>{n.error(p,{position:"bottom-center",duration:2e3})})})}catch(d){console.error("Error submitting form:",d)}finally{u(!1)}};return e.jsx(B,{children:e.jsxs("div",{children:[e.jsx(P,{}),e.jsxs("div",{className:"w-full px-2 py-12 sm:px-0",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("h3",{className:"text-lg mb-5",children:"Withdraw funds"}),e.jsx("div",{className:"flex justify-end mb-4",children:t.withdrawAccounts&&t.withdrawAccounts.length===0&&e.jsx(j,{onClick:()=>S(!0),children:"Add Withdraw Account"})})]}),t&&t.description_withdraw!=null&&t.description_withdraw!=""&&e.jsxs("div",{className:"space-y-2 pb-1",children:[e.jsx("label",{htmlFor:"description",className:"text-black text-base",children:"Description"}),e.jsx("div",{id:"description",style:{border:"3px solid black",backgroundColor:"white"},dangerouslySetInnerHTML:{__html:t.description_withdraw}})]}),e.jsxs("div",{className:"pb-3",children:[e.jsxs("form",{className:"space-y-3",onSubmit:L(D),children:[t.withdrawAccounts&&e.jsxs("div",{className:"space-y-2 pb-1",children:[e.jsx("label",{htmlFor:"total",className:"text-black text-base",children:t.fields.name}),e.jsx(x,{id:"total",value:JSON.parse(t.withdrawAccounts.data)[t.fields.name],readOnly:!0})]}),e.jsxs("div",{className:"space-y-2 pb-1",children:[e.jsx("label",{htmlFor:"plan",className:"text-black text-base",children:"Method"}),c.length>0&&e.jsx(R,{methods:c,onChange:W})]}),e.jsxs("div",{className:"space-y-2 pb-1",children:[e.jsx("label",{htmlFor:"amount",className:"text-black text-base",children:"Amount"}),e.jsx(x,{id:"amount",type:"number",placeholder:"0.00",onChange:N,onInput:N,onKeyDown:s=>{s.key==="Enter"&&s.preventDefault(),b()}})]}),e.jsxs("div",{className:"space-y-2 pb-1",children:[e.jsx("label",{htmlFor:"total",className:"text-black text-base",children:"Total"}),e.jsx(x,{id:"total",value:k.toFixed(2),readOnly:!0})]}),e.jsx("div",{className:"flex flex-row gap-3",children:e.jsx(j,{fullWidth:!0,isLoading:F,children:"Withdraw"})})]}),t.fields&&e.jsxs(K,{isOpen:C,closeModal:g,children:[e.jsx("div",{className:"absolute top-[-20px] right-0",children:e.jsx("div",{className:"bg-[#E8F0F7] rounded-full p-1",children:e.jsx(q,{className:"w-6 h-6 cursor-pointer text-red-600",onClick:g})})}),e.jsx("h2",{className:"text-black text-2xl font-medium mb-2",children:"Add Withdraw Account"}),e.jsxs("form",{className:"flex flex-col items-center justify-center space-y-5 pt-10 px-5",children:[e.jsx("p",{className:"text-center mt-4",children:"The Selected Method has the following fields:"}),e.jsx("div",{className:"w-full flex-row items-center gap-2 p-2 rounded-lg",children:e.jsx(x,{...T(t.fields.name),placeholder:t.fields.name,type:t.fields.type})}),e.jsx("div",{className:"w-full",children:e.jsx(j,{fullWidth:!0,onClick:_(O),children:"Save Changes"})})]})]})]})]})]})})};export{we as default};
