import{u as i,j as e}from"./app-k_JzQJAj.js";import{W as a}from"./WelcomeTab-BaQHTONM.js";import c from"./Layout-DWUdbt7d.js";import"./dev-BSoyqUDd.js";import"./index-C4JomMCi.js";import"./ArrowUpCircleIcon-4H9LmEI7.js";import"./LinkIcon-CTESvv6e.js";import"./Footer-DH9rL7uS.js";import"./use-text-value-DUfPnFzA.js";import"./use-is-mounted-MtqR5Ye4.js";import"./twitter-C2_HC0eX.js";import"./Navbar-BPPFQrWp.js";import"./ShoppingCartIcon-DCcvA3mX.js";import"./DocumentTextIcon-DV7Mb0iV.js";import"./DocumentCheckIcon-93NDUtIJ.js";import"./Modal-D0m5n4LE.js";import"./Button-D7Np_9YZ.js";import"./XMarkIcon-CZfHwl8L.js";const D=()=>{const{props:r}=i(),t=r.loginAttempts;return e.jsx(c,{children:e.jsxs("div",{children:[e.jsx(a,{}),e.jsx("div",{className:"w-full px-2 py-12 sm:px-0",children:e.jsxs("div",{className:"mb-8",children:[e.jsx("h3",{className:"text-lg mb-2",children:"Login History :"}),e.jsxs("table",{className:"w-full shadow-md",children:[e.jsx("thead",{className:"border-b border-black font-normal",children:e.jsxs("tr",{children:[e.jsx("th",{className:"text-left py-3 px-2",children:"Date"}),e.jsx("th",{className:"text-left py-3",children:"Country"}),e.jsx("th",{className:"text-left py-3",children:"IP"}),e.jsx("th",{className:"text-left py-3",children:"Status"})]})}),e.jsx("tbody",{className:"divide-y divide-blue-100",children:t.length===0?e.jsx("tr",{children:e.jsx("td",{colSpan:4,className:"text-center py-4",children:"No login attempts found"})}):t.map((s,l)=>e.jsxs("tr",{children:[e.jsx("td",{className:"text-left py-4 px-2",children:new Date(s.created_at).toLocaleString()}),e.jsx("td",{className:"text-left py-4",children:s.country||"Unknown"}),e.jsx("td",{className:"text-left py-4",children:s.ip_address}),e.jsx("td",{className:"text-left py-4",children:e.jsx("span",{className:`px-2 py-1 rounded ${s.successful?"bg-green-100 text-green-800":"bg-red-100 text-red-800"}`,children:s.successful?"Success":"Failed"})})]},l))})]})]})})]})})};export{D as default};