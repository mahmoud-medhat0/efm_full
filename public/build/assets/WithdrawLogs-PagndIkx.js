import{u as a,j as t,k as l}from"./app-DvjYvVmX.js";import{W as i}from"./WelcomeTab-DKik_dcT.js";import m from"./Layout-Juc-R7lY.js";import"./character-DSGNMOII.js";import"./index-C4JomMCi.js";import"./ArrowUpCircleIcon-CWCJIuDj.js";import"./LinkIcon-D8odgiEA.js";import"./Footer-sbI_YyHd.js";import"./use-text-value-D3SBErHr.js";import"./use-is-mounted-E77bZEoK.js";import"./twitter-C2_HC0eX.js";import"./Navbar-C7o0XRwH.js";import"./ShoppingCartIcon-Bvgpg6IO.js";import"./DocumentTextIcon-7ex6XcYG.js";import"./DocumentCheckIcon-x_hHTBgd.js";import"./Modal-CXRk0H3f.js";import"./Button-Cq8jOrsW.js";import"./XMarkIcon-DxIc9hSa.js";const D=()=>{const{props:r}=a(),e=r.withdraws;return t.jsx(m,{children:t.jsxs("div",{children:[t.jsx(i,{}),t.jsx("div",{className:"w-full px-2 py-12 sm:px-0",children:t.jsxs("div",{className:"mb-8",children:[t.jsx("h3",{className:"text-lg mb-2",children:"Withdraw History :"}),t.jsxs("table",{className:"w-full shadow-md",children:[t.jsx("thead",{className:"border-b border-black font-normal",children:t.jsxs("tr",{children:[t.jsx("th",{className:"text-left py-3 px-2",children:"Date"}),t.jsx("th",{className:"text-left py-3",children:"Withdraw"}),t.jsx("th",{className:"text-left py-3",children:"Price"}),t.jsx("th",{className:"text-left py-3",children:"Status"})]})}),t.jsxs("tbody",{className:"divide-y divide-blue-100",children:[e.map(s=>t.jsxs("tr",{children:[t.jsx("td",{className:"text-left py-3 px-2 text-sm",children:l(s.created_at).format("DD MMM YYYY HH:mm:ss A")}),t.jsx("td",{className:"text-left py-3",children:s.amount}),t.jsx("td",{className:"text-left py-3",children:s.total}),t.jsx("td",{className:"text-left py-3",children:t.jsx("span",{className:`px-2 py-1 rounded ${s.status=="success"?"bg-green-100 text-green-800":"bg-yellow-100 text-yellow-800"}`,children:s.status})})]},s.id)),e.length===0&&t.jsx("tr",{children:t.jsx("td",{className:"pt-3 pb-2 px-2 text-sm",children:"You don't have any withdraw."})})]})]})]})})]})})};export{D as default};