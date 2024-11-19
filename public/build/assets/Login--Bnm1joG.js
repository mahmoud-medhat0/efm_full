import{r as S,t as r,j as e,L as p,a as x,_ as u,d as k}from"./app-DwP5ZHId.js";import{B as I}from"./Button-BpoD-rJ0.js";import{I as E}from"./Input-Dzzg8gL9.js";import{L as R,l as v}from"./index-CCIOAwHP.js";import{o as F}from"./index.esm-Fpnt5HbA.js";import{I as A}from"./InputErrorMessage-DdT67cw8.js";import{u as M}from"./index.esm-D4UpaK7B.js";import{R as O}from"./layout-CewywblZ.js";import{s as n}from"./index-C4JomMCi.js";import"./Footer-DDdj6NxM.js";import"./use-is-mounted-CbmBaDZK.js";import"./transition-DZBZdYZo.js";import"./floating-ui.dom-BHs9XJpa.js";import"./twitter-C2_HC0eX.js";const z=()=>{const[g,i]=S.useState(!1),{register:f,handleSubmit:h,formState:{errors:l}}=M({resolver:F(v)}),w=async a=>{var o;i(!0);try{const s=(o=document.querySelector('meta[name="csrf-token"]'))==null?void 0:o.getAttribute("content"),{status:t,data:c}=await x.post(n("client.login.post"),a,{headers:{"X-CSRF-TOKEN":s}});if(t===200||t===201)u.success("Login successful! Redirecting in 2 seconds...",{position:"bottom-center",duration:4e3}),setTimeout(()=>{k.Inertia.get(n("client.dashboard"))},2e3);else throw new Error("Unexpected response status")}catch(s){console.error(s);let t="An unexpected error occurred";x.isAxiosError(s)&&s.response&&(t=s.response.data.message||s.message),u.error(`Login failed: ${t}`,{position:"bottom-center",duration:3e3})}finally{i(!1)}},j=R.map(({name:a,placeholder:o,type:s,forl:t,placel:c,validation:b},N)=>{var d;const m=r(a),y=r(o),L=r(c);return e.jsxs("div",{children:[e.jsxs("div",{className:"space-y-2 pb-1",children:[e.jsx("label",{htmlFor:t,className:"text-black text-xl",children:L}),e.jsx(E,{id:t,type:s,placeholder:y,...f(a,b)})]}),l[m]&&e.jsx(A,{msg:(d=l[m])==null?void 0:d.message})]},N)});return e.jsx(O,{children:e.jsxs("section",{className:"w-full my-20 mx-auto max-sm:w-full max-sm:px-3 pt-20",children:[e.jsxs("h2",{className:"text-black text-2xl pb-6 text-center",children:[window.translate("login.title")," ",e.jsx("span",{className:"text-primary",children:window.translate("login.efm")}),window.translate("login.hub")]}),e.jsxs("form",{className:"w-[800px] space-y-3 mx-auto max-sm:w-full",onSubmit:h(w),children:[j,e.jsx(I,{fullWidth:!0,isLoading:g,children:window.translate("login.login")}),e.jsxs("div",{className:"flex flex-col space-y-1",children:[e.jsxs(p,{href:n("client.reset-password"),className:"text-black",children:[window.translate("login.forgot"),e.jsx("span",{className:"underline ml-1 text-primary",children:window.translate("login.reset")})]}),e.jsxs(p,{href:n("client.register"),className:"text-black",children:[r("login.dontHave"),e.jsx("span",{className:"underline ml-1 text-primary",children:r("login.register")})]})]})]})]})})};export{z as default};
