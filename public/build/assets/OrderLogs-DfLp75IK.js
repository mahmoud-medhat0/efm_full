import{u as l,j as s}from"./app-Tn1J_Hrl.js";import{W as a}from"./WelcomeTab-sRw-3m7p.js";import i from"./Layout-Y7WeFJDi.js";import"./character-DSGNMOII.js";import"./index-C4JomMCi.js";import"./ArrowUpCircleIcon-1InK2inR.js";import"./LinkIcon-BuyaJzs8.js";import"./Footer-C1UbqoXw.js";import"./use-text-value-BSZS50VD.js";import"./use-is-mounted-FIn5TXzx.js";import"./twitter-C2_HC0eX.js";import"./Navbar-hMqF8TsO.js";import"./ShoppingCartIcon-D8ldAq10.js";import"./DocumentTextIcon-FxSNdsZV.js";import"./DocumentCheckIcon-sECA098d.js";import"./Modal-Cn21OF3B.js";import"./Button-7XT5hYJk.js";import"./XMarkIcon-DZlubdHP.js";const D=()=>{const{props:r}=l(),t=r.orders;return s.jsx(i,{children:s.jsxs("div",{children:[s.jsx(a,{}),s.jsx("div",{className:"w-full px-2 py-12 sm:px-0",children:s.jsxs("div",{className:"mb-8",children:[s.jsx("h3",{className:"text-lg mb-2",children:"Orders History :"}),s.jsxs("table",{className:"w-full shadow-md",children:[s.jsx("thead",{className:"border-b border-black font-normal",children:s.jsxs("tr",{children:[s.jsx("th",{className:"text-left py-3 px-2",children:"Date"}),s.jsx("th",{className:"text-left py-3",children:"Service"}),s.jsx("th",{className:"text-left py-3",children:"Price"}),s.jsx("th",{className:"text-left py-3",children:"Status"})]})}),s.jsx("tbody",{className:"divide-y divide-blue-100",children:t.length===0?s.jsx("tr",{children:s.jsx("td",{colSpan:4,className:"text-center py-4",children:"No orders found"})}):t.map(e=>s.jsxs("tr",{children:[s.jsx("td",{className:"py-3 px-2",children:e.created_at}),s.jsx("td",{className:"py-3",children:e.service_name}),s.jsx("td",{className:"py-3",children:e.price}),s.jsx("td",{className:"pt-3 pb-2 px-2 text-sm text-left",children:s.jsx("span",{className:`px-2 py-1 rounded ${e.status=="success"?"bg-green-100 text-green-800":"bg-yellow-100 text-yellow-800"}`,children:e.status})})]},e.id))})]})]})})]})})};export{D as default};
