import{r as t,u as h,j as e,a as r,_ as l,d as N}from"./app-DnwVPCvX.js";import{c as T}from"./character-B_L2WyuU.js";import{D as G}from"./DashboardLayout-B4xzSw_q.js";import{s as i}from"./index-C4JomMCi.js";import{U as Q}from"./index-BpbVKZgd.js";const Z="/build/assets/qr-irUB1BB-.svg",$=()=>{const[v,c]=t.useState(!1),[y,m]=t.useState(!1),[d,P]=t.useState(null),[S,k]=t.useState(""),[u,B]=t.useState(""),[x,I]=t.useState(""),[g,j]=t.useState(null),L=h().props.app_url,f=h().props.auth.client,[o,p]=t.useState(f.is_2a),[w,M]=t.useState(""),[U,z]=t.useState(""),_=()=>{c(!0)},E=()=>{m(!0)},F=s=>{const n=s.target.files[0];if(n){const H=URL.createObjectURL(n);P(H),j(n)}},q=async()=>{try{if(g){const s=new FormData;s.append("profile_image",g);const n=await r.post(i("client.dashboard.update-profile-image"),s,{headers:{"Content-Type":"multipart/form-data"}});n.data.success?(l.success("Profile image updated successfully"),setTimeout(()=>{C(),j(null),N.Inertia.reload()},2e3)):l.error(n.data.message)}else l.error("Please select an image")}catch(s){l.error("Failed to update profile image"),console.error(s)}},O=async()=>{if(u===x){const s=await r.post(i("client.dashboard.change-password"),{current_password:S,new_password:u,new_password_confirmation:x});s.data.success?(l.success("Password changed successfully"),setTimeout(()=>{N.Inertia.reload(),setShowPasswordModal(!1)},2e3)):l.error(s.data.message)}else l.error("Passwords do not match")},C=()=>{c(!1)},b=()=>{m(!1)},R=()=>{p(!o),o?p(!1):r.get(i("client.dashboard.2fa-qr-url")).then(s=>{M(s.data.qrCodeUrl)})},V=()=>{r.post(i("client.dashboard.enable-2fa.post"),{code:U}).then(s=>{s.data.success?(setIs2faEnabled(!0),c(!1),l.success(s.data.message)):l.error(s.data.message)})},{auth:A}=h().props,a=A.client,D=a.profile_image?L+"/storage/"+a.profile_image:T;return e.jsx(G,{children:e.jsxs("div",{className:"personalstteing-container",children:[e.jsx("h2",{className:"personalstteing-title",children:"Personal Settings"}),e.jsxs("div",{className:"personalstteing-profileSection",children:[e.jsx("img",{src:D,alt:"Profile",className:"personalstteing-profileImage"}),e.jsxs("div",{className:"personalstteing-profileInfo",children:[e.jsx("h3",{style:{fontSize:"18px",marginBottom:"5px"},children:a.name}),e.jsx("p",{style:{fontSize:"18px"},children:a.email})]}),e.jsxs("div",{className:"personalstteing-buttons",children:[e.jsxs("button",{className:"personalstteing-editButton",alt:"Edit Photo",onClick:_,children:[e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"26",height:"26",viewBox:"0 0 26 26",fill:"none",className:"personalstteing-icon",children:e.jsx("path",{d:"M11.9181 3.16443H5.09428C2.83307 3.16443 1 4.99744 1 7.25857V20.9059C1 23.167 2.83307 25 5.09428 25H18.7419C21.0031 25 22.8361 23.167 22.8361 20.9059L22.8361 14.0822M7.82379 18.1763L12.7892 17.1758C13.0528 17.1227 13.2949 16.9929 13.4849 16.8027L24.6005 5.6814C25.1335 5.14819 25.1331 4.28388 24.5997 3.75112L22.245 1.39917C21.7119 0.866627 20.848 0.86699 20.3153 1.39998L9.19852 12.5225C9.0088 12.7123 8.87926 12.9538 8.8261 13.2169L7.82379 18.1763Z",stroke:"white",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),"Edit"]}),e.jsxs("button",{className:"personalstteing-passwordButton",alt:"Change Password",onClick:E,children:[e.jsxs("svg",{style:{marginRight:"8px"},width:"25",height:"32",viewBox:"0 0 25 32",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("path",{d:"M12.3636 1C8.10732 4.5825 5.43939 4.75 1 4.75V19.1687C1 24.9225 5.04419 26.4237 12.3636 31C19.6831 26.4237 23.7273 24.9225 23.7273 19.1687C23.7273 13.415 23.7273 4.75 23.7273 4.75C19.2879 4.75 16.6199 4.5825 12.3636 1Z",stroke:"white","stroke-width":"2","stroke-linejoin":"round"}),e.jsx("path",{d:"M7.5 13.3333V12.5714C7.5 10.039 9.50714 8 12 8C14.4929 8 16.5 10.039 16.5 12.5714V13.3333M7.5 13.3333C6.675 13.3333 6 14.019 6 14.8571V22.4762C6 23.3143 6.675 24 7.5 24H16.5C17.325 24 18 23.3143 18 22.4762V14.8571C18 14.019 17.325 13.3333 16.5 13.3333M7.5 13.3333H16.5M12 17.1429C12.825 17.1429 13.5 17.8286 13.5 18.6667C13.5 19.5048 12.825 20.1905 12 20.1905C11.175 20.1905 10.5 19.5048 10.5 18.6667C10.5 17.8286 11.175 17.1429 12 17.1429Z",stroke:"white"})]}),"Change Password"]})]})]}),e.jsxs("div",{className:"personalstteing-switchSection",children:[e.jsx("span",{className:"personalstteing-label",children:"Two Factor Authentication"}),e.jsxs("label",{className:"personalstteing-switch",children:[e.jsx("input",{type:"checkbox",checked:o,onChange:R}),e.jsx("span",{className:"personalstteing-slider"})]})]}),e.jsx("div",{className:"personalstteing-formContainer",children:e.jsxs("form",{children:[e.jsxs("div",{className:"personalstteing-inputGroup",children:[e.jsxs("div",{children:[e.jsx("label",{className:"personalstteing-labelPersonals",children:"Full Name"}),e.jsx("input",{type:"text",disabled:!0,value:a.name.split(" ")[0],style:{fontSize:"16px",color:"#DFBC8A"}})]}),e.jsxs("div",{children:[e.jsx("label",{className:"personalstteing-labelPersonals",children:"Last Name"}),e.jsx("input",{type:"text",disabled:!0,value:a.name.split(" ")[1],style:{fontSize:"16px"}})]})]}),e.jsxs("div",{className:"personalstteing-inputGroup",children:[e.jsxs("div",{children:[e.jsx("label",{className:"personalstteing-labelPersonals",children:"Telegram Username"}),e.jsx("input",{type:"text",disabled:!0,value:a.telegram_username,style:{fontSize:"16px"}})]}),e.jsxs("div",{children:[e.jsx("label",{className:"personalstteing-labelPersonals",children:"Username"}),e.jsx("input",{type:"text",disabled:!0,value:a.username,style:{fontSize:"16px"}})]})]}),e.jsxs("div",{className:"personalstteing-inputGroup",children:[e.jsxs("div",{children:[e.jsx("label",{className:"personalstteing-labelPersonals",children:"Email"}),e.jsx("input",{type:"email",disabled:!0,value:a.email,style:{fontSize:"16px"}})]}),e.jsxs("div",{children:[e.jsx("label",{className:"personalstteing-labelPersonals",children:"Phone Number"}),e.jsx(Q,{value:f.phone,disabled:!0,disableCountrySelector:!0,style:{fontSize:"16px"}})]})]})]})}),v&&e.jsx("div",{className:"fixed inset-0 flex items-center justify-center bg-black bg-opacity-50",children:e.jsxs("div",{className:"bg-white p-6 rounded-2xl shadow-md flex flex-col items-center space-y-5",children:[d&&e.jsx(e.Fragment,{children:e.jsx("img",{src:d,alt:"Profile Preview",className:"w-20 h-20 rounded-full shadow-sm"})}),e.jsx("div",{className:"flex justify-center",children:e.jsx("input",{type:"file",accept:"image/*",onChange:F,className:"text-sm"})}),d&&e.jsx("button",{onClick:q,className:"bg-primary text-white p-2 rounded",children:"Update Image"}),e.jsx("button",{onClick:C,className:"text-white bg-black border border-black p-2 rounded",children:"Close"})]})}),y&&e.jsx("div",{className:"personalstteing-modalOverlay",children:e.jsxs("div",{className:"personalstteing-modalContent",children:[e.jsxs("div",{className:"personalstteing-modalHeader",style:{display:"flex",justifyContent:"space-between"},children:[e.jsx("h3",{children:"Change Password"}),e.jsx("button",{onClick:b,className:"personalstteing-closeButton",children:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"personalstteing-closeButton1",children:[e.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),e.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]}),e.jsxs("div",{className:"personalstteing-passwordForm",children:[e.jsx("label",{className:"personalstteing-label",children:"Current Password"}),e.jsx("input",{className:"personalstteing-input",onChange:s=>k(s.target.value),type:"password",placeholder:"Current Password",style:{fontSize:"14px"}}),e.jsx("label",{className:"personalstteing-label",children:"New Password"}),e.jsx("input",{className:"personalstteing-input",onChange:s=>B(s.target.value),type:"password",placeholder:"New Password",style:{fontSize:"14px"}}),e.jsx("label",{className:"personalstteing-label",children:"Confirm New Password"}),e.jsx("input",{className:"personalstteing-input",onChange:s=>I(s.target.value),type:"password",placeholder:"Confirm New Password",style:{fontSize:"14px"}}),e.jsxs("div",{className:"personalstteing-buttons",children:[e.jsx("button",{className:"personalstteing-saveButton1",onClick:O,children:"Save"}),e.jsx("button",{className:"personalstteing-saveButton2",onClick:b,children:"Cancel"})]})]})]})}),o&&w?e.jsx("div",{className:"personalstteing-modalOverlay",children:e.jsxs("div",{className:"personalstteing-modalContent",children:[e.jsx("h3",{style:{fontSize:"18px"},children:"Scan this QR Code to Enable 2FA"}),e.jsx("p",{style:{fontSize:"18px"},children:"Use your authenticator app to scan the QR code below. Please enter the code from your authenticator app to enable 2FA."}),e.jsx("div",{className:"personalstteing-qrCode",children:e.jsx("img",{src:w,alt:"QR Code",className:"personalstteing-qrCodeImage"})}),e.jsxs("div",{className:"personalstteing-inputGroup",style:{position:"relative",width:"100%",textAlign:"center"},children:[e.jsx("img",{src:Z,alt:"Icon",className:"personalstteing-icon22"}),e.jsx("input",{type:"text",placeholder:"Enter Code",className:"personalstteing-input223",onChange:s=>z(s.target.value)})]}),e.jsxs("div",{className:"personalstteing-modalButtonContainer",children:[e.jsx("button",{onClick:V,className:"personalstteing-enableButton",style:{},children:"Enable"}),e.jsx("button",{className:"personalstteing-cancelButton",onClick:()=>p(!1),children:"Cancel"})]})]})}):null]})})};export{$ as default};