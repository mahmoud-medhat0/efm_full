import{r as o,n as j,l as v,j as e,a as N,u as k}from"./app-CSyTz6re.js";import{W as E}from"./WelcomeTab-Buxnnwwg.js";import T from"./Layout-Blyq2b_-.js";import{s as _}from"./index-C4JomMCi.js";import{F as P}from"./XMarkIcon-i4ZpC7eP.js";import"./character-DSGNMOII.js";import"./LinkIcon-CFVGrbHB.js";import"./Footer-BdyLlqK_.js";import"./use-text-value-qNYQI5oD.js";import"./use-is-mounted-CZBlOBXL.js";import"./twitter-C2_HC0eX.js";import"./Navbar-CSqiSXuA.js";import"./ShoppingCartIcon-MJIVUIb4.js";import"./DocumentCheckIcon-ecsuS8Iu.js";import"./Modal-DJuPNlUS.js";import"./Button-Crq6BP66.js";const S=({videoId:l,taskId:p,order:r})=>{const d=o.useRef(null),u=(a,i)=>{N.post(_("client.dashboard.tasks.update"),{taskId:a,status:i})};return o.useEffect(()=>{var c;const a=document.createElement("script");a.src="https://www.youtube.com/iframe_api";const i=document.getElementsByTagName("script")[0];(c=i.parentNode)==null||c.insertBefore(a,i),window.onYouTubeIframeAPIReady=()=>{d.current&&new YT.Player(d.current,{videoId:l,playerVars:{start:r.order_type==="custom_time"?r.time_start:0,end:r.order_type==="custom_time"?r.time_end:0,autoplay:0,showinfo:0,modestbranding:1,rel:0,fs:0,iv_load_policy:3,disablekb:1,disableRelatedVideos:1},events:{onReady:x,onError:h,onFinish:n,onStateChange:s=>{s.data===YT.PlayerState.PAUSED&&(s.target.playVideo(),u(p,"in_progress")),s.data===YT.PlayerState.ENDED&&n()}}})};const x=s=>{console.log("Player Ready"),s.target.playVideo(),y()},h=s=>{console.error("Error Occurred:",s.data)},n=()=>{j.success("Task Completed Thanks For Watching",{position:"top-right",duration:5e3}),u(p,"completed"),v.reload()},y=()=>{const s=document.querySelector("#movie_player > a.ytp-watermark.yt-uix-sessionlink");s&&s.remove(),(document?document.querySelectorAll(".ytp-watermark, .yt-uix-sessionlink"):[]).forEach(m=>{m.remove()}),document.querySelectorAll(".ytp-watermark .yt-uix-sessionlink").forEach(m=>{m.remove()})};return()=>{delete window.onYouTubeIframeAPIReady}},[l]),e.jsx("div",{className:"w-full h-[500px] mt-4",ref:d})},z=()=>{const{tasks:l,categories:p}=k().props,[r,d]=o.useState("All"),[u,a]=o.useState(!1),[i,x]=o.useState(""),[h,n]=o.useState(""),[y,c]=o.useState({}),s=t=>{d(t)},g=r==="All"?l:l.filter(t=>t.service_id===r),f=(t,b,w)=>{x(t),n(b),a(!0),c(w)},m=()=>{a(!1),x(""),n(""),c({})};return e.jsxs(T,{children:[e.jsxs("div",{className:"w-full h-auto mt-20",children:[e.jsx(E,{}),e.jsxs("div",{className:"w-full px-2 py-12 sm:px-0",children:[e.jsx("h3",{className:"text-2xl mb-4",children:"Tasks"}),e.jsxs("div",{className:"flex space-x-4 mb-8",children:[e.jsx("button",{onClick:()=>s("All"),className:`px-4 py-2 rounded-md ${r==="All"?"bg-primary text-white":"bg-gray-200 text-primary"}`,children:"All"}),p.map(t=>e.jsx("button",{onClick:()=>s(t.service_id),className:`px-4 py-2 rounded-md ${r===t.service_id?"bg-primary text-white":"bg-gray-200 text-primary"}`,children:t.service_name},t.service_id))]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4",children:g.length>0?g.map(t=>e.jsxs("div",{className:"bg-white shadow-md rounded-lg p-4",children:[e.jsx("img",{src:`${t.data.thumbnail}`,alt:`Task ${t.id}`,className:"w-full h-40 object-cover rounded-md mb-4"}),e.jsx("h4",{className:"text-lg font-semibold mb-2",children:t.data.title}),e.jsxs("p",{className:"text-sm text-gray-600",children:[t.categories.length>0?t.categories.join(", "):"No categories",e.jsx("br",{}),"Points: ",t.reward]}),e.jsx("button",{onClick:()=>f(t.data.videoId,t.id,t.order),className:"mt-2 px-4 py-2 bg-blue-500 text-white rounded-md",children:"Watch Video"})]},t.id)):e.jsx("p",{className:"text-center text-gray-500 col-span-full",children:"No tasks available"})})]})]}),u&&e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center",children:e.jsxs("div",{className:"bg-white p-4 rounded-lg shadow-lg w-11/12 md:w-1/2 relative",children:[e.jsx("div",{className:"absolute top-[0px] right-[1px]",children:e.jsx("div",{className:"bg-[#E8F0F7] rounded-full p-1",children:e.jsx(P,{className:"w-6 h-6 cursor-pointer text-red-600",onClick:m})})}),e.jsx("div",{className:"relative pb-9/16 overflow-hidden mt-1",children:e.jsx(S,{videoId:i,taskId:h,order:y})})]})})]})};export{z as default};
