import{r as w,t as r,j as s,L as R,a as N,_ as m}from"./app-C0mDOv4d.js";import{B as S}from"./Button-CZHVfxUi.js";import{c as L,b as E}from"./index-kO0ytsXM.js";import{I}from"./Input-CK7ancxG.js";import{I as v}from"./InputErrorMessage-D4NPorAW.js";import{u as F}from"./index.esm-FO3ghh-R.js";import{o as P}from"./index.esm-c8LnlNUc.js";import{R as k}from"./layout-BdBwS4TB.js";import{s as n}from"./index-C4JomMCi.js";import"./Footer-B9aIO0-z.js";import"./use-is-mounted-DUrlfBjw.js";import"./transition-DVDqFyph.js";import"./twitter-C2_HC0eX.js";const H=()=>{const[p,i]=w.useState(!1),{register:d,handleSubmit:x,formState:{errors:l}}=F({resolver:P(E)}),u=async t=>{var a;i(!0);try{const e=await N.post(n("client.reset-password.post"),t);e.data.success?m.success(e.data.message,{position:"bottom-center",duration:4e3}):m.error(e.data.message,{position:"bottom-center",duration:4e3})}catch(e){const o=((a=e.response)==null?void 0:a.data.message)||"An error occurred";m.error(o,{position:"bottom-center",duration:4e3})}finally{i(!1)}},f=L.map(({name:t,placeholder:a,type:e,forl:o,placel:h,validation:j},b)=>{var c;const g=r(h),y=r(a.replace("..","").trim());return s.jsxs("div",{children:[s.jsxs("div",{className:"space-y-2 pb-1",children:[s.jsx("label",{htmlFor:o,className:"text-black text-xl",children:g}),s.jsx(I,{id:o,type:e,placeholder:y,...d(t,j)})]}),l[t]&&s.jsx(v,{msg:(c=l[t])==null?void 0:c.message})]},b)});return s.jsx(k,{children:s.jsxs("section",{className:"w-[800px] my-20 mx-auto max-sm:w-full max-sm:px-3 pt-32",children:[s.jsx("h2",{className:"text-primary text-2xl pb-6",children:r("Reset Your Password :")}),s.jsxs("form",{className:"w-[800px] space-y-3 mx-auto max-sm:w-full",onSubmit:x(u),children:[f,s.jsx(S,{fullWidth:!0,isLoading:p,children:r("Submit")}),s.jsx("div",{className:"flex flex-col space-y-1",children:s.jsxs(R,{href:n("client.login"),className:"text-black",children:[r("Remember your password?"),s.jsx("span",{className:"underline ml-1 text-primary",children:r("Login here!")})]})})]})]})})};export{H as default};