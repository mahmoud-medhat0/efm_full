import{r as l,u as f,j as e,a as j,n,d as y}from"./app-DgXNYMZa.js";import v from"./Layout-CBCN1yop.js";import{s as c}from"./index-C4JomMCi.js";import"./Footer-Cgu-F_25.js";import"./use-is-mounted--4L4TJ-5.js";import"./transition-D_71pHip.js";import"./twitter-C2_HC0eX.js";import"./Navbar-CHWRe2Nx.js";import"./character-B_L2WyuU.js";import"./logo-D1jq1p5V.js";import"./ShoppingCartIcon-AyV1LdbY.js";import"./DocumentCheckIcon-BkhPwaZl.js";import"./use-text-value-BiNMJwaO.js";import"./use-inert-others-B0Vxxcvr.js";import"./Modal-CGmvU2_W.js";import"./Button-CkQoCE_F.js";import"./XMarkIcon-Bcp_2t9n.js";const P=()=>{const[a,d]=l.useState(""),[r,m]=l.useState(""),[i,g]=l.useState(""),[s,p]=l.useState(null),{ticketCategories:x,lang:u}=f().props,h=async t=>{t.preventDefault(),console.log(a,r,i,s);const o=await j.post(c("client.dashboard.create-ticket.post"),{title:a,ticket_category_id:r,description:i,image:s});o.data.success?(n.success(o.data.message),y.Inertia.visit(c("client.dashboard"))):n.error(o.data.message)},b=t=>{const o=t.target.files[0];o&&p(o)};return e.jsx(v,{children:e.jsx("div",{className:"pt-10 max-w-md mx-auto bg-black shadow-2xl rounded-xl p-10 border border-gray-200",children:e.jsxs("form",{onSubmit:h,className:"space-y-8",children:[e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"mb-3 text-lg font-semibold text-gold",children:"Ticket Title"}),e.jsx("input",{type:"text",value:a,onChange:t=>d(t.target.value),className:"border border-gold rounded-lg p-3 text-gold focus:outline-none focus:ring-2 focus:ring-gold",placeholder:"اكتب عنوان التذكرة"})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"mb-3 text-lg font-semibold text-gold",children:"Category"}),e.jsxs("select",{value:r,onChange:t=>m(t.target.value),className:"border border-gold rounded-lg p-3 text-gold focus:outline-none focus:ring-2 focus:ring-black",children:[e.jsx("option",{value:"",children:"Select Category"}),x.map(t=>e.jsx("option",{value:t.id,children:t.name[u]}))]})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"mb-3 text-lg font-semibold text-gold",children:"DescriptionTicker"}),e.jsx("textarea",{value:i,onChange:t=>g(t.target.value),className:"border border-gold rounded-lg p-3 text-gold focus:outline-none focus:ring-2 focus:ring-gold",placeholder:"وصف المشكلة أو الطلب"})]}),e.jsxs("div",{style:{marginBottom:"15px",border:"1px dashed #666",padding:"20px",textAlign:"center"},children:[e.jsxs("label",{htmlFor:"file-upload",style:{cursor:"pointer"},children:[e.jsx("input",{id:"file-upload",type:"file",onChange:b,style:{display:"none"}}),e.jsx("span",{style:{color:"#be9e88"},children:"Attach Image"})]}),s&&e.jsxs("div",{style:{marginTop:"10px"},children:[e.jsxs("p",{children:["Selected file: ",s.name]}),e.jsx("img",{src:URL.createObjectURL(s),alt:"Selected",style:{marginTop:"10px",width:"100%",maxWidth:"200px",borderBottom:"10px solid #800000"}})]})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("button",{type:"submit",className:"bg-gradient-to-r from-gold to-gold text-white py-2 px-5 rounded-lg shadow-md hover:from-black hover:to-black focus:outline-none focus:ring-2 focus:ring-indigo-500",children:"Create Ticket"}),e.jsx("button",{type:"button",className:"bg-black text-white py-2 px-5 rounded-lg shadow-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-black",children:"Cancel"})]})]})})})};export{P as default};
