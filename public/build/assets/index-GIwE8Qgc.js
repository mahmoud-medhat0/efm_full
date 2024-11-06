import{u as x,j as e,L as r}from"./app-zczq3KFM.js";import{I as c}from"./InfoAlert-BOHl-KTx.js";import{F as o}from"./ClockIcon-D5YEDAco.js";import{s as l}from"./tabs-DsMxgAnX.js";import{W as m}from"./WelcomeTab-CgbnlJzI.js";import h from"./Layout-BmrHddgZ.js";import"./use-is-mounted-ByhSk7oV.js";import"./character-B_L2WyuU.js";import"./index-C4JomMCi.js";import"./LinkIcon-mwA1CMlk.js";import"./Footer-D41yK5fV.js";import"./transition-DKTjp9M5.js";import"./twitter-C2_HC0eX.js";import"./Navbar-ItDsGo52.js";import"./ShoppingCartIcon-p7XGaCWA.js";import"./DocumentCheckIcon-hA5uT0_C.js";import"./use-text-value-CNRRzoUJ.js";import"./use-inert-others-D5P8veE4.js";import"./Modal-VUuMZw88.js";import"./Button-DvTWmyKe.js";import"./XMarkIcon-CqDHjVx6.js";function a(...t){return t.filter(Boolean).join(" ")}function f(){const{props:t}=x(),n=t.auth.client,i=t.loginFailures;return e.jsx("div",{className:"w-full px-2 py-12 sm:px-0",children:e.jsxs(l.Group,{children:[e.jsxs(l.List,{className:"w-full mb-6 flex space-x-1 rounded-xl bg-primary p-1",children:[e.jsx(l,{className:({selected:s})=>a("w-full rounded-md py-2.5 text-sm font-medium leading-5","ring-white/60 ring-offset-2 focus:outline-none focus:ring-2 duration-150",s?"bg-white text-primary font-medium shadow":"bg-white text-primary border-primary hover:bg-primary hover:text-white"),children:"General Stats"}),e.jsx(l,{className:({selected:s})=>a("w-full rounded-md py-2.5 text-sm font-medium leading-5","ring-white/60 ring-offset-2 focus:outline-none focus:ring-2 duration-150",s?"bg-white text-primary font-medium shadow":"bg-white text-primary border-primary hover:bg-primary hover:text-white"),children:"Advertiser Stats"}),e.jsx(l,{className:({selected:s})=>a("w-full rounded-md py-2.5 text-sm font-medium leading-5","ring-white/60 ring-offset-2 focus:outline-none focus:ring-2 duration-150",s?"bg-white text-primary font-medium shadow":"bg-white text-primary border-primary hover:bg-primary hover:text-white"),children:"Login Failures"})]}),e.jsxs(l.Panels,{className:"mt-2 rounded-md",children:[e.jsx(l.Panel,{className:a("rounded-md bg-white p-3","focus:outline-none"),children:e.jsxs("div",{className:"py-3 px-3 text-black",children:[e.jsxs("div",{className:"mb-4",children:[e.jsx("h3",{className:"text-black text-2xl mb-3",children:"Earning Balance Stats"}),e.jsx("div",{className:"flex flex-row justify-between border-b-[1px]",children:e.jsxs("div",{className:"w-full flex flex-row justify-between",children:[e.jsx("p",{children:"Balance"}),e.jsxs("span",{className:"text-font",children:[n.balance," EGP"]})]})}),e.jsx("div",{className:"flex flex-row justify-between border-b-[1px] mt-2 pb-3",children:e.jsxs("div",{className:"w-full flex flex-row justify-between",children:[e.jsx("p",{children:"Purchase balance"}),e.jsx("span",{className:"text-font",children:"0 EGP"})]})}),e.jsx("div",{className:"flex flex-row justify-between border-b-[1px] mt-2 pb-3",children:e.jsxs("div",{className:"w-full flex flex-row justify-between",children:[e.jsx("p",{children:"Pending Withdrawls"}),e.jsxs("span",{className:"text-font",children:[t.pending_withdrawls," EGP"]})]})}),e.jsx("div",{className:"flex flex-row justify-between border-b-[1px] mt-2 pb-3",children:e.jsxs("div",{className:"w-full flex flex-row justify-between",children:[e.jsx("p",{children:"Payments Received"}),e.jsx("span",{className:"text-font",children:"0 EGP"})]})})]}),e.jsxs("div",{className:"my-8 text-black",children:[e.jsx("h3",{className:"text-2xl mb-3",children:"Daily Tasks"}),e.jsx(c,{msg:`You can earn\r
                  good money by completing the following tasks.`}),t.services.map((s,d)=>e.jsx("div",{className:"flex flex-row justify-between border-b-[1px] mt-2 pb-3",children:e.jsxs("div",{className:"w-full flex flex-row justify-between",children:[e.jsxs("p",{className:"flex flex-row items-center gap-2",children:[e.jsx(o,{className:"w-5 h-5 text-primary"})," ",s.name]}),e.jsxs("span",{className:"text-font",children:[s.pending,"/",s.completed]})]})})),e.jsxs("h3",{className:"text-primary mt-8 cursor-pointer",children:["Earn points by inviting your friends"," ",e.jsx(r,{to:"/",children:"(Link)"})]})]}),e.jsxs("div",{className:"my-8 text-black",children:[e.jsx("h3",{className:"text-2xl mb-3",children:"Referral Stats"}),e.jsx("div",{className:"flex flex-row justify-between border-b-[1px] mt-2 pb-3",children:e.jsxs("div",{className:"w-full flex flex-row justify-between",children:[e.jsx("p",{children:"Direct Referrals"}),e.jsx("span",{className:"text-font",children:t.direct_referrals})]})}),e.jsx("div",{className:"flex flex-row justify-between border-b-[1px] mt-2 pb-3",children:e.jsxs("div",{className:"w-full flex flex-row justify-between",children:[e.jsx("p",{children:"Earned so far"}),e.jsxs("span",{className:"text-font",children:[t.referrals_earn," EGP"]})]})})]}),e.jsxs("div",{className:"my-8 text-black",children:[e.jsx("h3",{className:"text-2xl mb-3",children:"Your advertisement clicks"}),e.jsx("div",{className:"flex flex-row justify-between border-b-[1px] mt-2 pb-3",children:e.jsxs("div",{className:"w-full flex flex-row justify-between",children:[e.jsx("p",{children:"Your clicks"}),e.jsx("span",{className:"text-font",children:"0"})]})})]}),e.jsxs("div",{className:"my-8 text-black",children:[e.jsx("h3",{className:"text-2xl mb-3",children:"Video Ads Stats"}),e.jsx("div",{className:"flex flex-row justify-between border-b-[1px] mt-2 pb-3",children:e.jsxs("div",{className:"w-full flex flex-row justify-between",children:[e.jsx("p",{children:"Total plays"}),e.jsx("span",{className:"text-font",children:"0"})]})}),e.jsx("div",{className:"flex flex-row justify-between border-b-[1px] mt-2 pb-3",children:e.jsxs("div",{className:"w-full flex flex-row justify-between",children:[e.jsx("p",{children:"Earned"}),e.jsx("span",{className:"text-font",children:"0 EGP"})]})})]})]})}),e.jsx(l.Panel,{className:a("rounded-md bg-white p-3","focus:outline-none"),children:e.jsx("div",{className:"py-3 px-3 text-black",children:e.jsxs("div",{className:"mb-4",children:[e.jsxs("div",{className:"flex flex-row justify-between border-b-[1px] mt-2 pb-3",children:[e.jsxs("div",{className:"w-[352px] flex flex-row justify-between",children:[e.jsx("p",{children:"Ad Credits"}),e.jsx("span",{className:"text-font",children:"0"})]}),e.jsxs("div",{className:"flex flex-row items-center gap-3",children:[e.jsx(r,{to:"/dashboard/withdraw",className:"text-primary",children:"[ Buy credits ]"}),e.jsx(r,{to:"/dashboard/withdraw",className:"text-primary",children:"[ Advertise ]"})]})]}),e.jsxs("div",{className:"flex flex-row justify-between border-b-[1px] mt-2 pb-3",children:[e.jsxs("div",{className:"w-[352px] flex flex-row justify-between",children:[e.jsx("p",{children:"Video Ads Credits"}),e.jsx("span",{className:"text-font",children:"0"})]}),e.jsxs("div",{className:"flex flex-row items-center gap-3",children:[e.jsx(r,{to:"/dashboard/withdraw",className:"text-primary",children:"[ Buy credits ]"}),e.jsx(r,{to:"/dashboard/withdraw",className:"text-primary",children:"[ Advertise ]"})]})]}),e.jsxs("div",{className:"flex flex-row justify-between border-b-[1px] mt-2 pb-3",children:[e.jsxs("div",{className:"w-[352px] flex flex-row justify-between",children:[e.jsx("p",{children:"Banner Credits"}),e.jsx("span",{className:"text-font",children:"0"})]}),e.jsxs("div",{className:"flex flex-row items-center gap-3",children:[e.jsx(r,{to:"/dashboard/withdraw",className:"text-primary",children:"[ Buy credits ]"}),e.jsx(r,{to:"/dashboard/withdraw",className:"text-primary",children:"[ Advertise ]"})]})]}),e.jsxs("div",{className:"flex flex-row justify-between border-b-[1px] mt-2 pb-3",children:[e.jsxs("div",{className:"w-[352px] flex flex-row justify-between",children:[e.jsx("p",{children:"Text Ad Credits"}),e.jsx("span",{className:"text-font",children:"0"})]}),e.jsxs("div",{className:"flex flex-row items-center gap-3",children:[e.jsx(r,{to:"/dashboard/withdraw",className:"text-primary",children:"[ Buy credits ]"}),e.jsx(r,{to:"/dashboard/withdraw",className:"text-primary",children:"[ Advertise ]"})]})]}),e.jsxs("div",{className:"flex flex-row justify-between border-b-[1px] mt-2 pb-3",children:[e.jsxs("div",{className:"w-[352px] flex flex-row justify-between",children:[e.jsx("p",{children:"Link Ad Credits"}),e.jsx("span",{className:"text-font",children:"0"})]}),e.jsxs("div",{className:"flex flex-row items-center gap-3",children:[e.jsx(r,{to:"/dashboard/withdraw",className:"text-primary",children:"[ Buy credits ]"}),e.jsx(r,{to:"/dashboard/withdraw",className:"text-primary",children:"[ Advertise ]"})]})]})]})})}),e.jsx(l.Panel,{className:a("rounded-md bg-white p-3","focus:outline-none"),children:e.jsxs("div",{className:"mb-8 text-black",children:[e.jsx("h3",{className:"text-lg mb-2",children:"Login Failures :"}),e.jsxs("table",{className:"w-full shadow-md",children:[e.jsx("thead",{className:"border-b border-black font-normal",children:e.jsxs("tr",{children:[e.jsx("th",{className:"text-left py-3 px-2",children:"Date"}),e.jsx("th",{className:"text-left py-3",children:"Country"}),e.jsx("th",{className:"text-left py-3",children:"IP"}),e.jsx("th",{className:"text-left py-3",children:"Status"})]})}),e.jsx("tbody",{className:"divide-y divide-blue-100",children:i.length===0?e.jsx("tr",{children:e.jsx("td",{colSpan:4,className:"text-center py-4",children:"No login Failures found"})}):i.map((s,d)=>e.jsxs("tr",{children:[e.jsx("td",{className:"text-left py-4 px-2",children:new Date(s.created_at).toLocaleString()}),e.jsx("td",{className:"text-left py-4",children:s.country||"Unknown"}),e.jsx("td",{className:"text-left py-4",children:s.ip_address}),e.jsx("td",{className:"text-left py-4",children:e.jsx("span",{className:`px-2 py-1 rounded ${s.successful?"bg-green-100 text-green-800":"bg-red-100 text-red-800"}`,children:s.successful?"Success":"Failed"})})]},d))})]})]})})]})]})})}const T=()=>e.jsx(h,{children:e.jsxs("div",{className:"w-full h-auto mt-20",children:[e.jsx(m,{}),e.jsx(f,{})]})});export{T as default};