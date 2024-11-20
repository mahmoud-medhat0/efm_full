import{u as i,r as s,j as t}from"./app-Dt9pCSfL.js";import{D as a}from"./DashboardLayout-CKE6ASZv.js";import"./index-C4JomMCi.js";import"./character-B_L2WyuU.js";const u=()=>{const{orders:l}=i().props,[r,n]=s.useState("All"),d=l.filter(o=>r==="All"||o.status===r),e={container:{padding:"20px",margin:"auto"},title:{fontSize:"1.4rem",fontWeight:"bold",color:"#808892",textAlign:"center",marginBottom:"20px","@media (max-width: 768px)":{textAlign:"center",fontWeight:"bold",marginBottom:"20px"}},filterButtons:{display:"flex",justifyContent:"center",marginBottom:"20px",gap:"10px"},filterButton:{padding:"8px 16px",fontSize:"14px",fontWeight:"bold",border:"1px solid #ccc",borderRadius:"5px",backgroundColor:"#f7f7f7",color:"#333",cursor:"pointer",transition:"all 0.3s ease"},activeButton:{backgroundColor:"#ddb27d",color:"white",borderColor:"#ddb27d"},tableContainer:{width:"100%",overflowX:"auto"},table:{width:"100%",borderCollapse:"collapse",backgroundColor:"#fff",borderRadius:"5px",overflow:"hidden",boxShadow:"0 4px 6px rgba(0, 0, 0, 0.1)"},th:{padding:"12px 20px",textAlign:"left",backgroundColor:"#f5f5f5",fontWeight:"bold",fontSize:"14px"},td:{padding:"12px 20px",textAlign:"left",borderBottom:"1px solid #ddd",color:"#555",fontSize:"16px"},noOrders:{textAlign:"center",padding:"20px",fontSize:"14px",color:"#999"},statusButton:{padding:"5px 10px",borderRadius:"5px",fontWeight:"bold",border:"none",cursor:"default"},approved:{backgroundColor:"#4CAF50",color:"white"},pending:{backgroundColor:"#FFC107",color:"white"},canceled:{backgroundColor:"#F44336",color:"white"}};return t.jsx(a,{children:t.jsxs("div",{style:e.container,children:[t.jsx("h2",{style:e.title,children:"Orders History"}),t.jsx("div",{style:e.filterButtons,children:["All","Pending","Approved","Canceled"].map(o=>t.jsx("button",{onClick:()=>n(o),style:{...e.filterButton,...r===o?e.activeButton:{}},children:o},o))}),t.jsx("div",{style:{...e.tableContainer,maxHeight:"460px",overflowY:"auto",position:"relative"},children:t.jsxs("table",{style:e.table,children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{style:e.th,children:"Date"}),t.jsx("th",{style:e.th,children:"Service"}),t.jsx("th",{style:e.th,children:"Price"}),t.jsx("th",{style:e.th,children:"Status"})]})}),t.jsx("tbody",{children:d.length===0?t.jsx("tr",{children:t.jsx("td",{colSpan:4,style:e.noOrders,children:"No orders found"})}):d.map(o=>t.jsxs("tr",{children:[t.jsx("td",{style:e.td,children:o.created_at_human}),t.jsx("td",{style:e.td,children:o.service_name}),t.jsx("td",{style:e.td,children:o.price}),t.jsx("td",{style:e.td,children:t.jsx("button",{style:{...e.statusButton,...e[o.status.toLowerCase()]||{}},children:o.status})})]},o.id))})]})})]})})};export{u as default};