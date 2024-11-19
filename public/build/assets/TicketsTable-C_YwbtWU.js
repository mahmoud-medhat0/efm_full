import{u as n,j as o,L as s}from"./app-Dt9pCSfL.js";import{d as e}from"./styled-components.browser.esm-B-zrvGIn.js";import{D as x}from"./DashboardLayout-CKE6ASZv.js";import{s as c}from"./index-C4JomMCi.js";import"./character-B_L2WyuU.js";const l=e.div`
  margin: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 12px;
  overflow-x: auto; /* لجعل الجدول قابلاً للتمرير إذا كان العرض ضيقًا */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);

  @media (max-width: 480px) {
    padding: 5px;
    margin: 5px;
  }
`,p=e.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  min-width: 600px; /* لضمان عرض جيد على الشاشات الصغيرة */

  @media (max-width: 768px) {
    width:auto;
    height:auto;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`,d=e.th`
  padding: 15px;
  background-color: #f1f3f5;
  color: #7a7a7a;
  font-weight: 500;

  @media (max-width: 480px) {
    font-size: 0.7rem;
    padding: 8px;
  }
`,h=e.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`,i=e.td`
  padding: 10px;
  color: #4a4a4a;
  font-size: 20px;
  @media (max-width: 480px) {
    font-size: 0.75rem;
    padding: 4px;
    word-break: break-word; /* لضمان عدم خروج النص عن الشاشة */
  }
`,m=e.button`
  width: 118px;
  padding: 12px 24px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.1rem;
  color: #fff;
  margin-right: 10px;
  background-color: ${({status:t})=>"#6c757d"};
  transition: background-color 0.3s ease;
  

  &:hover {
    background-color: ${({status:t})=>"#5a6268"};
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 10px 16px;
  }
`,g=e.button`
  width: 116px;
  padding: 12px 24px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.1rem;
  background-color: #6c757d;
  color: #fff;
  transition: background-color 0.3s ease;
  overflow-x: auto;
  overflow-y: hidden;

  &:hover {
    background-color: #5a6268;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 10px 16px;
  }
`,T=()=>{const{tickets:t,lang:a}=n().props;return o.jsxs(x,{children:[o.jsx("h2",{style:{marginBottom:"-2px",marginTop:"20px",fontSize:"1.4rem",marginLeft:"20px",fontWeight:"bold",color:"#808892",textAlign:"center"},children:"Tickets"}),o.jsx(l,{children:o.jsxs(p,{children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx(d,{children:"Date"}),o.jsx(d,{children:"Ticket ID"}),o.jsx(d,{children:"Title"}),o.jsx(d,{children:"Category"}),o.jsx(d,{children:"Status"}),o.jsx(d,{children:"Action"})]})}),o.jsx("tbody",{children:t.map((r,f)=>o.jsxs(h,{children:[o.jsx(i,{children:r.created_human_at}),o.jsx(i,{children:r.ticket_id}),o.jsx(i,{children:r.title}),o.jsx(i,{children:r.ticket_category.name[a]}),o.jsx(i,{children:o.jsx(m,{status:r.status,children:r.status})}),o.jsx(i,{children:o.jsx(g,{children:o.jsx(s,{href:c("client.dashboard.show-ticket",{id:r.id}),children:"View"})})})]},r.id))})]})})]})};export{T as default};
