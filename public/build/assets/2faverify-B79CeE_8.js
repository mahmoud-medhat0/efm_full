import{r as a,j as e,a as p,_ as n,d as x}from"./app-DwP5ZHId.js";import{R as f}from"./layout-CewywblZ.js";import{s as d}from"./index-C4JomMCi.js";import{B as h}from"./Button-BpoD-rJ0.js";import{F as b}from"./LockClosedIcon-DW-g6hcx.js";import"./Footer-DDdj6NxM.js";import"./use-is-mounted-CbmBaDZK.js";import"./transition-DZBZdYZo.js";import"./floating-ui.dom-BHs9XJpa.js";import"./twitter-C2_HC0eX.js";const A=()=>{const[o,l]=a.useState(""),[i,c]=a.useState(""),[m,t]=a.useState(!1),u=async s=>{s.preventDefault(),t(!0);const r=await p.post(d("client.2fa.post"),{code:o});r.data.success?(t(!1),n.success("2FA successful! Redirecting in 2 seconds...",{duration:4e3,position:"top-center"}),setTimeout(()=>{x.Inertia.visit(d("client.dashboard.dashboard"))},2e3)):(c(r.data.message),n.error(r.data.message,{duration:4e3,position:"top-center"})),t(!1)};return e.jsx(f,{children:e.jsx("div",{className:"container mx-auto mt-10",children:e.jsxs("div",{className:"max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg",children:[e.jsx("h1",{className:"text-3xl font-bold mb-6 text-center text-gray-800",children:"Two-Factor Authentication"}),e.jsxs("form",{onSubmit:u,children:[e.jsxs("div",{className:"mb-6",children:[e.jsx("label",{htmlFor:"2fa_code",className:"block text-gray-700 font-medium",children:"2FA Code"}),e.jsxs("div",{className:"relative mt-2",children:[e.jsx("input",{type:"text",id:"2fa_code",name:"2fa_code",className:"block w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none pl-10 pr-4 py-2",value:o,onChange:s=>l(s.target.value),required:!0}),e.jsx(b,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"})]})]}),i&&e.jsx("div",{className:"bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4",role:"alert",children:e.jsx("span",{className:"block sm:inline",children:i})}),e.jsx("div",{className:"flex justify-center",children:e.jsx(h,{type:"submit",fullWidth:!0,isLoading:m,children:"Verify"})})]})]})})})};export{A as default};
