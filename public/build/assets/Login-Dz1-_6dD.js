import{r as y,t as o,j as e,L,a as x,_ as p,d as S}from"./app-DhjE0Fqk.js";import{B as I}from"./Button-C5oEC9WM.js";import{I as k}from"./Input-CKW5jpm-.js";import{L as E,I as R,o as v,l as F}from"./index-CBzQAip5.js";import{u as A}from"./index.esm-Dq5SgkwO.js";import{R as M}from"./layout-BMr0OFwB.js";import{s as n}from"./index-C4JomMCi.js";import"./Footer-ZL7qsFAX.js";import"./use-is-mounted-Jrwj4a06.js";import"./transition-CoRYRpbI.js";import"./twitter-C2_HC0eX.js";const U=()=>{const[u,i]=y.useState(!1),{register:g,handleSubmit:f,formState:{errors:l}}=A({resolver:v(F)}),h=async r=>{var a;i(!0);try{const s=(a=document.querySelector('meta[name="csrf-token"]'))==null?void 0:a.getAttribute("content"),{status:t,data:c}=await x.post(n("client.login.post"),r,{headers:{"X-CSRF-TOKEN":s}});if(t===200||t===201)p.success("Login successful! Redirecting in 2 seconds...",{position:"bottom-center",duration:4e3}),setTimeout(()=>{S.Inertia.get(n("client.dashboard"))},2e3);else throw new Error("Unexpected response status")}catch(s){console.error(s);let t="An unexpected error occurred";x.isAxiosError(s)&&s.response&&(t=s.response.data.message||s.message),p.error(`Login failed: ${t}`,{position:"bottom-center",duration:3e3})}finally{i(!1)}},j=E.map(({name:r,placeholder:a,type:s,forl:t,placel:c,validation:w},b)=>{var d;const m=o(r),N=o(a);return e.jsxs("div",{children:[e.jsxs("div",{className:"space-y-2 pb-1",children:[e.jsx("label",{htmlFor:t,className:"text-black text-xl",children:c}),e.jsx(k,{id:t,type:s,placeholder:N,...g(r,w)})]}),l[m]&&e.jsx(R,{msg:(d=l[m])==null?void 0:d.message})]},b)});return e.jsx(M,{children:e.jsxs("section",{className:"w-full my-20 mx-auto max-sm:w-full max-sm:px-3 pt-20",children:[e.jsxs("h2",{className:"text-black text-2xl pb-6 text-center",children:[window.translate("login.title")," ",e.jsx("span",{className:"text-primary",children:window.translate("login.efm")}),window.translate("login.hub")]}),e.jsxs("form",{className:"w-[800px] space-y-3 mx-auto max-sm:w-full",onSubmit:f(h),children:[j,e.jsx(I,{fullWidth:!0,isLoading:u,children:window.translate("login.login")}),e.jsx("div",{className:"flex flex-col space-y-1",children:e.jsxs(L,{href:n("client.register"),className:"text-black",children:[o("login.dontHave"),e.jsx("span",{className:"underline ml-1 text-primary",children:o("login.register")})]})})]})]})})};export{U as default};