import{r as l,j as e,a as f,_ as o}from"./app-DnwVPCvX.js";import{s as b}from"./index-C4JomMCi.js";function S({taskId:p,description:h,instructions:x,fields:c}){const[i,d]=l.useState(null),[r,m]=l.useState({}),[u,j]=l.useState({}),g=s=>{const a=s.target.files[0];if(a){const t=URL.createObjectURL(a);d(t),m(n=>({...n,[s.target.name]:t}))}},k=()=>{d(null)},v=s=>{const{name:a,value:t}=s.target;m(n=>({...n,[a]:t}))},y=()=>{const s={};return c.forEach(a=>{a.required===1&&!r[a.name.en]&&(s[a.name.en]=`${a.name.en} is required`)}),j(s),Object.keys(s).length===0},M=async s=>{if(s.preventDefault(),y()){const a=new FormData;a.append("task_id",p);for(const t in r)a.append(t,r[t]);c.forEach(t=>{if(t.type==="image"&&r[t.name.en]){const n=document.querySelector(`input[name="${t.name.en}"]`);n&&n.files[0]&&a.append(t.name.en,n.files[0])}});try{const t=await f.post(b("client.dashboard.tasks.update.manual"),a,{headers:{"Content-Type":"multipart/form-data"}});t.data.success?(o.success(t.data.message),setTimeout(()=>{window.location.reload()},2e3)):o.error(t.data.message)}catch{o.error("An error occurred while submitting the form.")}}else for(const a in u)o.error(u[a])};return e.jsxs("form",{onSubmit:M,encType:"multipart/form-data",children:[e.jsxs("div",{className:"Modeltesk2-cardes1-containeres",children:[e.jsx("div",{className:"Modeltesk2-cardes1-headeres",children:"Description of the Task (what needs to be done)"}),e.jsx("div",{className:"Modeltesk2-cardes1-body",children:e.jsx("p",{dangerouslySetInnerHTML:{__html:h}})})]}),e.jsxs("div",{className:"Modeltesk2-container",children:[e.jsxs("div",{className:"Modeltesk2-cardes2",children:[e.jsx("div",{className:"Modeltesk2-header",children:"instructions"}),e.jsx("div",{className:"Modeltesk2-cardes1-body",children:e.jsx("p",{dangerouslySetInnerHTML:{__html:x}})})]}),c.map((s,a)=>e.jsxs("div",{children:[e.jsx("div",{className:"Modeltesk2-headerform",children:s.name.en}),e.jsx("div",{className:"Modeltesk2-section",children:s.type==="text"?e.jsx("input",{type:"text",className:"Modeltesk2-text-input",placeholder:s.name.en,name:s.name.en,value:r[s.name.en]||"",onChange:v,required:s.required===1}):s.type==="image"?e.jsxs("div",{className:"Modeltesk2-upload-box",children:[e.jsx("input",{type:"file",id:"file"}),e.jsxs("label",{children:[e.jsx("input",{type:"file",accept:"image/*",name:s.name.en,onChange:g}),"Attach The File"]})]}):null}),i&&s.type==="image"&&e.jsxs("div",{className:"Modeltesk2-image-preview",children:[e.jsx("img",{src:i,alt:"Modeltesk2-Uploaded preview"}),e.jsx("button",{className:"Modeltesk2-remove-button",onClick:k,children:"Remove"})]})]},a)),e.jsx("button",{className:"Modeltesk2-button ",children:"Send"})]})]})}export{S as default};