import{r,u as b,t as a,j as s,a as _,_ as m,d as y}from"./app-DBCCDQMY.js";import{R as E}from"./layout-CvebaakR.js";import{a as F,b as I}from"./index-t3_SzIQC.js";import{I as L}from"./Input-DyzN45q8.js";import{o as W}from"./index.esm-QbiE-ylw.js";import{u as k}from"./index.esm-DMPKn3RE.js";import{B}from"./Button-DWC0nW-F.js";import{s as n}from"./index-C4JomMCi.js";import"./Footer-CILszrvk.js";import"./use-is-mounted-DILLO-RB.js";import"./transition-ynvOaUZk.js";import"./twitter-C2_HC0eX.js";const V=()=>{const[l,c]=r.useState(""),[d,p]=r.useState(""),[u,C]=r.useState(!1),{token:x,email:f}=b().props,h=async t=>{t.preventDefault();const e=await _.post(n("password.reset.post"),{token:x,email:f,password:l,password_confirmation:d});e.data.success?(m.success(e.data.message),setTimeout(()=>{y.Inertia.visit(n("client.login"))},1e3)):m.error(e.data.message)},{register:w,formState:{errors:D}}=k({resolver:W(I)}),j=F.map(({name:t,placeholder:e,type:P,forl:o,placel:g,validation:R},S)=>{const v=a(g.replace("..","").trim()),N=a(e.replace("..","").trim());return s.jsx("div",{children:s.jsxs("div",{className:"space-y-2 pb-1",children:[s.jsx("label",{htmlFor:o,className:"text-black text-xl",children:v}),s.jsx(L,{id:o,type:P,placeholder:N,...w(t,R),onChange:i=>{t==="password"?c(i.target.value):p(i.target.value)}})]})},S)});return s.jsx(E,{children:s.jsx("section",{className:"w-[800px] my-24 mx-auto max-sm:w-full max-sm:px-3 pt-20",children:s.jsxs("div",{className:"space-y-2 pb-1",children:[s.jsx("h2",{children:a("Reset New Password")}),s.jsxs("form",{onSubmit:h,children:[j,s.jsx(B,{fullWidth:!0,isLoading:u,children:a("Reset Password")})]})]})})})};export{V as default};
