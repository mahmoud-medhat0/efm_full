import{u as i,r as s,j as e,L as p}from"./app-DgXNYMZa.js";import n from"./Layout-CBCN1yop.js";import{W as x}from"./WelcomeTab-iV3GGzYx.js";import{s as a}from"./index-C4JomMCi.js";import"./Footer-Cgu-F_25.js";import"./use-is-mounted--4L4TJ-5.js";import"./transition-D_71pHip.js";import"./twitter-C2_HC0eX.js";import"./Navbar-CHWRe2Nx.js";import"./character-B_L2WyuU.js";import"./logo-D1jq1p5V.js";import"./ShoppingCartIcon-AyV1LdbY.js";import"./DocumentCheckIcon-BkhPwaZl.js";import"./use-text-value-BiNMJwaO.js";import"./use-inert-others-B0Vxxcvr.js";import"./Modal-CGmvU2_W.js";import"./Button-CkQoCE_F.js";import"./XMarkIcon-Bcp_2t9n.js";import"./LinkIcon-CD2Fd5fY.js";const D=()=>{const{tickets:r,lang:l}=i().props,[t,d]=s.useState("All");return e.jsx(n,{children:e.jsxs("div",{className:"w-full h-auto mt-20",children:[e.jsx(x,{}),e.jsx("div",{className:"w-full px-2 py-10 sm:px-0",children:e.jsxs("div",{style:{backgroundColor:"#2d3a4a",color:"#be9e88",width:"100%",border:"1px solid #be9e88",boxSizing:"border-box"},children:[e.jsx("h1",{style:{borderBottom:"3px solid #be9e88",display:"inline-block",paddingBottom:"5px",color:"#be9e88",fontWeight:"bold",marginLeft:"10px"},children:"Support Tickets"}),e.jsxs("div",{style:{marginTop:"15px",marginLeft:"10px"},children:[e.jsx("label",{children:"Filter by Status"}),e.jsxs("select",{value:t,onChange:o=>d(o.target.value),style:{width:"100%",padding:"10px",marginTop:"10px"},children:[e.jsx("option",{value:"*",children:"All"}),e.jsx("option",{value:"open",children:"Open"}),e.jsx("option",{value:"pending",children:"Pending"}),e.jsx("option",{value:"closed",children:"Closed"}),e.jsx("option",{value:"completed",children:"Completed"})]})]}),e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",backgroundColor:"#2d3a4a"},children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{style:{padding:"10px",borderBottom:"1px solid #be9e88",color:"#be9e88"},children:"Date"}),e.jsx("th",{style:{padding:"10px",borderBottom:"1px solid #be9e88",color:"#be9e88"},children:"Ticket ID"}),e.jsx("th",{style:{padding:"10px",borderBottom:"1px solid #be9e88",color:"#be9e88"},children:"Title"}),e.jsx("th",{style:{padding:"10px",borderBottom:"1px solid #be9e88",color:"#be9e88"},children:"Category"}),e.jsx("th",{style:{padding:"10px",borderBottom:"1px solid #be9e88",color:"#be9e88"},children:"Status"}),e.jsx("th",{style:{padding:"10px",borderBottom:"1px solid #be9e88",color:"#be9e88",textAlign:"center"},children:"Action"})]})}),e.jsx("tbody",{children:r.filter(o=>t==="All"||o.status===t).map(o=>e.jsxs("tr",{style:{textAlign:"center"},children:[e.jsx("td",{style:{padding:"10px",borderBottom:"1px solid #be9e88",color:"#fff"},children:o.created_human_at}),e.jsx("td",{style:{padding:"10px",borderBottom:"1px solid #be9e88",color:"#fff"},children:o.ticket_id}),e.jsx("td",{style:{padding:"10px",borderBottom:"1px solid #be9e88",color:"#fff"},children:o.title}),e.jsx("td",{style:{padding:"10px",borderBottom:"1px solid #be9e88",color:"#ccc"},children:o.ticket_category.name[l]}),e.jsx("td",{style:{padding:"10px",borderBottom:"1px solid #be9e88"},children:e.jsx("span",{style:{backgroundColor:"#be9e88",padding:"5px 10px",borderRadius:"5px",color:"#fff"},children:o.status})}),e.jsx("td",{style:{padding:"10px",borderBottom:"1px solid #be9e88",color:"#fff",textAlign:"center"},children:e.jsx(p,{href:a("client.dashboard.show-ticket",{id:o.id}),className:"bg-gold hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",children:"View"})})]},o.id))})]})]})})]})})};export{D as default};
