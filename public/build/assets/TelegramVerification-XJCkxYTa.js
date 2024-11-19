import{r as x,j as e,a as h,_ as a,d as _}from"./app-DwP5ZHId.js";import{B as v}from"./Button-BpoD-rJ0.js";import{I as f}from"./Input-Dzzg8gL9.js";import{T as D,t as L,m as R}from"./index-CCIOAwHP.js";import{o as N}from"./index.esm-Fpnt5HbA.js";import{I as d}from"./InputErrorMessage-DdT67cw8.js";import{u as E}from"./index.esm-D4UpaK7B.js";import{M as V}from"./Modal-DrcLZs_P.js";import{R as B}from"./layout-CewywblZ.js";import{s as u}from"./index-C4JomMCi.js";import{F as P}from"./XMarkIcon-Gwr9CVtF.js";import"./use-is-mounted-CbmBaDZK.js";import"./Footer-DDdj6NxM.js";import"./transition-DZBZdYZo.js";import"./floating-ui.dom-BHs9XJpa.js";import"./twitter-C2_HC0eX.js";import"./use-inert-others-CBOQb_9F.js";const ie=()=>{const[F,g]=x.useState(!1),[w,j]=x.useState(!0),[U,I]=x.useState({id:"",username:""}),M=()=>j(!0),p=()=>j(!1),{register:S,handleSubmit:A,formState:{errors:b}}=E({resolver:N(L)}),{register:y,handleSubmit:k,setError:W,formState:{errors:i}}=E({resolver:N(R)}),O=async s=>{var t,l,n;g(!0);try{const{status:o,data:r}=await h.post(u("client.telegram-verify.post"),s);o===200&&r.success==!0?(a.success(r.message,{position:"bottom-center",duration:4e3}),setTimeout(()=>{_.Inertia.visit(u("client.dashboard"))},2e3)):o===200&&r.success==!1&&a.error(r.errors.code,{position:"bottom-center",duration:4e3})}catch(o){const r=o,c=((l=(t=r.response)==null?void 0:t.data.error.details)==null?void 0:l.message)||((n=r.response)==null?void 0:n.data.message);a.error(`Login failed: ${c}`,{position:"bottom-center",duration:1500})}finally{g(!1)}},T=async s=>{var t,l,n,o;try{const r=await h.post(u("client.telegram-send"),s);(r.status===200||r.status===201)&&r.data.success?(a.success(r.data.message,{position:"bottom-center",duration:2e3}),p()):r.data.success===!1?r.data.errors?Object.keys(r.data.errors).forEach(c=>{r.data.errors[c].forEach(m=>{a.error(m,{position:"bottom-center",duration:2e3})})}):a.error(r.data.message||"An error occurred",{position:"bottom-center",duration:2e3}):a.error(r.data.message||"An error occurred",{position:"bottom-center",duration:2e3})}catch(r){console.error("Error during Telegram verification:",r);const c=r,m=((n=(l=(t=c.response)==null?void 0:t.data.error)==null?void 0:l.details)==null?void 0:n.message)||((o=c.response)==null?void 0:o.data.message)||"An error occurred during verification";a.error(`Verification failed: ${m}`,{position:"bottom-center",duration:3e3})}I(s)},C=D.map(({name:s,placeholder:t,type:l,forl:n,placel:o,validation:r},c)=>{var m;return e.jsxs("div",{children:[e.jsxs("div",{className:"space-y-2 pb-1",children:[e.jsx("label",{htmlFor:n,className:"text-black text-xl",children:o}),e.jsx(f,{id:n,type:l,placeholder:t,...S(s,r)})]}),b[s]&&e.jsx(d,{msg:(m=b[s])==null?void 0:m.message})]},c)});return e.jsx(B,{children:e.jsxs("section",{className:"w-[800px] my-20 mx-auto",children:[e.jsxs("h2",{className:"text-black text-2xl pb-6",children:["Verify Telegram Account with ",e.jsx("span",{className:"text-primary",children:"EFM"}),"hub.com"]}),e.jsx("div",{className:"w-full flex flex-row items-center justify-center",children:e.jsx("div",{className:"w-full",children:e.jsxs("div",{className:"alert h4 text-left",role:"alert",children:["Please make sure you have started a conversation with our"," ",e.jsx("a",{target:"_blank",rel:"noopener noreferrer",href:"https://t.me/EFMhub_OFFICIAL_bot",className:"text-primary hover:underline",children:"Telegram bot"})," ","before registering.",e.jsx("br",{})]})})}),e.jsxs("form",{className:"w-[800px] space-y-3 mx-auto",onSubmit:A(O),children:[C,e.jsx(v,{fullWidth:!0,isLoading:F,children:"Verify & Login"}),e.jsxs("div",{className:"flex flex-col space-y-1",children:[e.jsxs("div",{className:"text-black cursor-pointer",onClick:M,children:["Edit Username?",e.jsx("span",{className:"underline ml-1 text-primary",children:"Click Here!"})]}),e.jsxs("div",{className:"text-black cursor-pointer",onClick:async()=>{try{const s=await h.post(u("client.telegram-resend"));s.data.success?a.success(s.data.message):a.error(s.data.message)}catch{a.error("An error occurred while resending the verification code.")}},children:["Didn't receive a code?",e.jsx("span",{className:"underline ml-1 text-primary",children:"RESEND VERIFICATION CODE!"})]})]})]}),e.jsxs(V,{isOpen:w,closeModal:p,children:[e.jsx("div",{className:"absolute top-[-20px] right-0",children:e.jsx("div",{className:"bg-[#E8F0F7] rounded-full p-1",children:e.jsx(P,{className:"w-6 h-6 cursor-pointer text-red-600",onClick:p})})}),e.jsx("h2",{className:"text-black text-2xl font-medium mb-2",children:"Edit Telegram Username"}),e.jsxs("form",{className:"flex flex-col items-center justify-center space-y-5 pt-10 px-5",onSubmit:k(T),children:[e.jsxs("p",{className:"text-center mt-4",children:["Please confirm access to your telegram username by entering the code provided by ",e.jsxs("a",{href:"https://t.me/EFMhub_OFFICIAL_bot",target:"_blank",rel:"noopener noreferrer",className:"text-primary hover:underline",children:[e.jsx("span",{className:"text-primary",children:"EFM"}),"hub.com ADMIN BOT"]}),"."]}),e.jsxs("div",{className:"w-full flex flex-row items-center gap-2 p-2 rounded-lg",children:[e.jsx(f,{placeholder:"Enter your ID",...y("id"),type:"number"}),i.id&&e.jsx("div",{children:Array.isArray(i.id.message)?i.id.message.map((s,t)=>e.jsx(d,{msg:s},t)):e.jsx(d,{msg:i.id.message})}),e.jsx(f,{placeholder:"Enter your new username",...y("username")}),i.username&&e.jsx("div",{children:Array.isArray(i.username.message)?i.username.message.map((s,t)=>e.jsx(d,{msg:s},t)):e.jsx(d,{msg:i.username.message})})]}),e.jsx("div",{className:"w-full",children:e.jsx(v,{fullWidth:!0,children:"Save Changes"})})]})]})]})})};export{ie as default};
