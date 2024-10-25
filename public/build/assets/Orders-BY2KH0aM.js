import{u as l,r as p,j as t}from"./app-Dq6YNcy5.js";import{W as x}from"./WelcomeTab-B4VcpFil.js";import n from"./Layout-B7a0TqoK.js";import"./dev-BSoyqUDd.js";import"./index-C4JomMCi.js";import"./ArrowUpCircleIcon-Ctttd5hx.js";import"./LinkIcon-Xf61Svhp.js";import"./Footer-BsPknF0e.js";import"./use-text-value-Ui3F1Q1M.js";import"./use-is-mounted-BTjpilq7.js";import"./twitter-C2_HC0eX.js";import"./Navbar-DGC9LAKM.js";import"./ShoppingCartIcon-BA5E2RyV.js";import"./DocumentTextIcon-p19CLr3I.js";import"./DocumentCheckIcon-BF0yHJpb.js";import"./Modal-CH_O5-Kc.js";import"./Button-Ckhsq7s1.js";import"./XMarkIcon-CcgQp683.js";const c=["All","approved","pending","canceled"],P=()=>{const{orders:a}=l().props,[s,m]=p.useState("All"),i=e=>{m(e)},r=s==="All"?a:a.filter(e=>e.status===s);return t.jsx(n,{children:t.jsxs("div",{className:"w-full h-auto mt-20",children:[t.jsx(x,{}),t.jsxs("div",{className:"w-full px-2 py-12 sm:px-0",children:[t.jsx("h3",{className:"text-2xl mb-4",children:"Orders"}),t.jsx("div",{className:"flex space-x-4 mb-8",children:c.map(e=>t.jsx("button",{onClick:()=>i(e),className:`px-4 py-2 rounded-md ${s===e?"bg-primary text-white":"bg-gray-200 text-primary"}`,children:e},e))}),t.jsx("div",{className:"overflow-x-auto",children:t.jsxs("table",{className:"min-w-full bg-white shadow-md rounded-lg",children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{className:"px-6 py-4 bg-primary text-white text-left text-sm font-medium rounded-tl-xl",children:"ID"}),t.jsx("th",{className:"px-6 py-4 bg-primary text-white text-left text-sm font-medium",children:"Price"}),t.jsx("th",{className:"px-6 py-4 bg-primary text-white text-left text-sm font-medium",children:"Status"}),t.jsx("th",{className:"px-6 py-4 bg-primary text-white text-left text-sm font-medium",children:"Target Amount"}),t.jsx("th",{className:"px-6 py-4 bg-primary text-white text-left text-sm font-medium rounded-tr-xl",children:"Current Amount"})]})}),t.jsx("tbody",{children:r.length===0?t.jsx("tr",{children:t.jsx("td",{colSpan:"5",className:"px-6 py-4 text-center text-gray-500",children:"No orders available for this category."})}):r.map(e=>t.jsxs("tr",{className:"hover:bg-gray-100 cursor-auto",children:[t.jsx("td",{className:"px-6 py-4 whitespace-nowrap text-sm font-medium",children:e.order_id}),t.jsxs("td",{className:"px-6 py-4 whitespace-nowrap text-sm font-medium text-primary",children:["$",e.price]}),t.jsx("td",{className:`px-6 py-4 whitespace-nowrap text-sm font-medium ${e.status==="completed"||e.status==="approved"?"text-green-500":e.status==="pending"?"text-yellow-500":e.status==="in_progress"?"text-blue-500":e.status==="canceled"?"text-red-500":"text-primary"}`,children:t.jsx("p",{className:`text-sm font-medium ${e.status==="completed"||e.status==="approved"?"text-green-500":e.status==="pending"?"text-yellow-500":e.status==="in_progress"?"text-blue-500":e.status==="canceled"?"text-red-500":"text-primary"}`,children:e.status})}),t.jsx("td",{className:"px-6 py-4 whitespace-nowrap text-sm font-medium text-primary",children:e.target_amount}),t.jsx("td",{className:"px-6 py-4 whitespace-nowrap text-sm font-medium text-primary",children:e.current_amount})]},e.id))})]})})]})]})})};export{P as default};
