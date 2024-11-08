import{r as a,u as d,j as e,a as h,_ as p,d as f}from"./app-DgXNYMZa.js";import{B as u}from"./Button-CkQoCE_F.js";import{M as c,F as b,a as g}from"./listbox-PAGxIHKu.js";import{X as j}from"./transition-D_71pHip.js";import{s as w}from"./index-C4JomMCi.js";import{s as i}from"./tabs-Dm8x2MPb.js";import{W as v}from"./WelcomeTab-iV3GGzYx.js";import N from"./Layout-CBCN1yop.js";import"./use-is-mounted--4L4TJ-5.js";import"./form-fields-s1Yckkbz.js";import"./use-text-value-BiNMJwaO.js";import"./use-inert-others-B0Vxxcvr.js";import"./character-B_L2WyuU.js";import"./LinkIcon-CD2Fd5fY.js";import"./Footer-Cgu-F_25.js";import"./twitter-C2_HC0eX.js";import"./Navbar-CHWRe2Nx.js";import"./logo-D1jq1p5V.js";import"./ShoppingCartIcon-AyV1LdbY.js";import"./DocumentCheckIcon-BkhPwaZl.js";import"./Modal-CGmvU2_W.js";import"./XMarkIcon-Bcp_2t9n.js";function y({title:s,titleId:t,...l},n){return a.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:n,"aria-labelledby":t},l),s?a.createElement("title",{id:t},s):null,a.createElement("path",{d:"M1 4.25a3.733 3.733 0 0 1 2.25-.75h13.5c.844 0 1.623.279 2.25.75A2.25 2.25 0 0 0 16.75 2H3.25A2.25 2.25 0 0 0 1 4.25ZM1 7.25a3.733 3.733 0 0 1 2.25-.75h13.5c.844 0 1.623.279 2.25.75A2.25 2.25 0 0 0 16.75 5H3.25A2.25 2.25 0 0 0 1 7.25ZM7 8a1 1 0 0 1 1 1 2 2 0 1 0 4 0 1 1 0 0 1 1-1h3.75A2.25 2.25 0 0 1 19 10.25v5.5A2.25 2.25 0 0 1 16.75 18H3.25A2.25 2.25 0 0 1 1 15.75v-5.5A2.25 2.25 0 0 1 3.25 8H7Z"}))}const P=a.forwardRef(y);function F(){const t=d().props.plans,[l,n]=a.useState(t[0]);return e.jsx("div",{className:"w-full",children:e.jsx(c,{value:l,onChange:n,children:e.jsxs("div",{className:"relative mt-1",children:[e.jsxs(c.Button,{className:"relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm",children:[e.jsx("span",{className:"block truncate",children:l.name}),e.jsx("span",{className:"pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2",children:e.jsx(b,{className:"h-5 w-5 text-gray-400","aria-hidden":"true"})})]}),e.jsx(j,{as:a.Fragment,leave:"transition ease-in duration-100",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:e.jsx(c.Options,{className:"absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm",children:t.map((m,o)=>e.jsx(c.Option,{className:({active:r})=>`relative cursor-default select-none py-2 pl-10 pr-4 ${r?"bg-amber-100 text-amber-900":"text-gray-900"}`,value:m,children:({selected:r})=>e.jsxs(e.Fragment,{children:[e.jsx("span",{className:`block truncate ${r?"font-medium":"font-normal"}`,children:m.name}),r?e.jsx("span",{className:"absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600",children:e.jsx(g,{className:"h-5 w-5","aria-hidden":"true"})}):null]})},o))})})]})})})}function x(...s){return s.filter(Boolean).join(" ")}function S(){const s=d().props,t=s.plans,l=s.methods,[n,m]=a.useState(t[0]);return a.useState(l[0]),e.jsx("div",{className:"w-full px-2 py-6 sm:px",children:e.jsxs(i.Group,{children:[e.jsx(i.List,{className:"w-full mb-6 flex space-x-1 rounded-xl bg-background/20 p-1",children:e.jsxs(i,{className:({selected:o})=>x("w-full rounded-md py-2.5 text-sm font-medium leading-5","ring-white/60 ring-offset-2 focus:outline-none focus:ring-2 duration-150 flex flex-row items-center justify-center gap-3",o?"bg-white text-black font-medium shadow":"text-primary hover:bg-white/[0.12] hover:text-font"),children:[e.jsx(P,{className:"w-5 h-5"})," Upgrade using balance"]})}),e.jsx(i.Panels,{className:"mt-2 rounded-md",children:e.jsx(i.Panel,{className:x("rounded-md bg-white p-3","focus:outline-none"),children:e.jsx("div",{className:"py-3 px-3",children:e.jsxs("form",{className:"space-y-3",onSubmit:async o=>{o.preventDefault();const r=await h.post(w("client.dashboard.membership.upgrade.balance"),{_method:"POST",plan:n.id});r.data.success?(p.success("Membership upgraded successfully",{duration:2e3,position:"top-right"}),setTimeout(()=>{f.Inertia.reload()},2e3)):p.error(r.data.message,{duration:5e3,position:"top-right"})},children:[e.jsxs("div",{className:"space-y-2 pb-1",children:[e.jsx("label",{htmlFor:"plan",className:"text-black text-base",children:"Plan"}),e.jsx(F,{})]}),e.jsxs("div",{className:"space-y-2 pb-1",children:[e.jsx("label",{htmlFor:"balance",className:"text-black text-base",children:"Current balance"}),e.jsx("input",{className:"cursor-pointer border-[1px] border-gray-300 shadow-lg focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary rounded-lg px-3 py-2 text-md w-full bg-transparent duration-200",id:"balance",value:s.auth.client.balance+" EGP",disabled:!0,readOnly:!0})]}),e.jsxs("div",{className:"flex flex-row gap-3",children:[e.jsx(u,{fullWidth:!0,children:"Submit"}),e.jsx(u,{fullWidth:!0,variant:"cancel",children:"Cancel"})]})]})})})})]})})}const J=()=>(d().props.memberships,e.jsx(N,{children:e.jsxs("div",{className:"w-full h-auto mt-20",children:[e.jsx(v,{}),e.jsxs("div",{className:"w-full px-2 py-12 sm:px-0",children:[e.jsx("div",{className:"mb-8"}),e.jsx(S,{})]})]})}));export{J as default};
