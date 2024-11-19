import{r as a,u as v,j as e,a as C,n as l,d as k}from"./app-DwP5ZHId.js";import{d as t}from"./styled-components.browser.esm-9M_E61RH.js";import{D as y}from"./DashboardLayout-D1zeXqou.js";import{s as c}from"./index-C4JomMCi.js";const z="/build/assets/upgreed-B3Yr7gP0.svg",F=t.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Cairo', sans-serif;
  text-align: center;

  @media (max-width: 768px) {
    max-width: 90%;
  }

  @media (max-width: 480px) {
    max-width: 95%;
    padding: 15px;
  }
`,S=t.h2`
  font-size: 1.4rem;
  font-weight: bold;
  color: #808892;
  text-align: center;


  @media (max-width: 768px) {
    text-align: center;
    font-weight: bold;
  }
`,T=t.img`
  width: 60px;
  display: block;
  margin-left: 500px;
  margin-bottom: -5px

  @media (max-width: 768px) {
    width: 50px;
  }

  @media (max-width: 480px) {
    width: 40px;
    margin-left: 133px;
    margin-top: 6px;
    margin-bottom: 4px;
  }
`,B=t.form`
  display: flex;
  flex-direction: column;
`,n=t.label`
  text-align: left;
  margin-bottom: 8px;
  color: #DFBC8A;
  font-size: 0.9rem;
  font-weight: bold;
`,D=t.select`
  width: 100%;
  max-width: 560px;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 8px;
  }
`,L=t.textarea`
  width: 100%;
  padding: 12px;
  height: 100px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 8px;
  }
`,R=t.div`
  position: relative;
  border: 1px dashed #d4a259;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  margin-bottom: 20px;
  cursor: pointer;
`,P=t.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`,I=t.label`
  font-size: 0.9rem;
  color: #666;
  font-weight: normal;
`,U=t.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 20px;
`,A=t.img`
  max-width: 100px;
  border-radius: 8px;
`,E=t.button`
  background-color: #d9534f;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
`,_=t.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`,q=t.button`
  background-color: #DFBC8A;
  color: white;
  padding: 8px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 48%;
  font-size: 0.9rem;

  &:hover {
    background-color: #b38a4d;
  }

  @media (max-width: 480px) {
    width: 100%;
    margin-bottom: 10px;
  }
`,O=t.button`
  background-color: #ccc;
  color: white;
  padding: 8px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 48%;
  font-size: 0.9rem;

  &:hover {
    background-color: #999;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`,Y=t.input`
  width: 100%;
  max-width: 560px; /* ضبط الحد الأقصى للعرض */
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #d4a259;
  border-radius: 5px;
  background-color: #f9f9f9;
  outline: none;
  font-size: 0.9rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 10px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    max-width: 100%;
    padding: 8px;
    font-size: 12px;
  }
`,M=()=>{const[r,d]=a.useState(null),[s,m]=a.useState(""),[x,h]=a.useState(""),[p,g]=a.useState(""),{ticketCategories:u,lang:b}=v().props,f=i=>{const o=i.target.files[0];o&&d(URL.createObjectURL(o))},w=()=>{d(null)},j=async i=>{i.preventDefault();const o=await C.post(c("client.dashboard.create-ticket.post"),{title:s,ticket_category_id:x,description:p,image:r});o.data.success?(l.success(o.data.message),k.Inertia.visit(c("client.dashboard.tickets"))):l.error(o.data.message)};return e.jsxs(y,{children:[e.jsx(S,{children:"Create Ticket"}),e.jsxs(F,{children:[e.jsx(T,{src:z,alt:"Logo"}),e.jsxs(B,{children:[e.jsx(n,{children:"Ticket Title"}),e.jsx(Y,{type:"text",placeholder:"Ticket Title",style:{width:"580px"},value:s,onChange:i=>m(i.target.value)}),e.jsx(n,{children:"Category"}),e.jsxs(D,{value:x,onChange:i=>h(i.target.value),children:[e.jsx("option",{children:"Select Category"}),u.map(i=>e.jsx("option",{value:i.id,children:i.name[b]},i.id))]}),e.jsx(n,{children:"Uploading the file"}),e.jsxs(R,{children:[e.jsx(P,{type:"file",id:"file",onChange:f}),e.jsx(I,{htmlFor:"file",children:"Attach The File"})]}),r&&e.jsxs(U,{children:[e.jsx(A,{src:r,alt:"Preview"}),e.jsx(E,{onClick:w,children:"Remove"})]}),e.jsx(n,{children:"Description"}),e.jsx(L,{placeholder:"Description of the problem or request",value:p,onChange:i=>g(i.target.value)}),e.jsxs(_,{children:[e.jsx(q,{onClick:j,children:"Send"}),e.jsx(O,{type:"button",children:"Cancel"})]})]})]})]})};export{M as default};
