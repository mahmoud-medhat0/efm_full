import{r as t,j as e}from"./app-CRzte3xH.js";import{L as i}from"./index-CrN-Rq_7.js";import{M as r,F as m,a as u}from"./listbox-CIEw22uG.js";import{X as x}from"./transition-Cr4uNon6.js";const l=[{id:1,name:"Paid To Click Ads",link:"/dashboard/advertiser-panel"},{id:2,name:"Text Ads",link:"/dashboard/advertiser-panel/text-ads"},{id:3,name:"Link Ads",link:"/dashboard/advertiser-panel/link-ads"},{id:4,name:"Banner Ads",link:"/dashboard/advertiser-panel/banner-ads"},{id:5,name:"Video Ads",link:"/dashboard/advertiser-panel/video-ads"},{id:6,name:"Fixed PTC Ads",link:"/dashboard/advertiser-panel/fixed-ads"}],v=({index:o})=>{const[n,d]=t.useState(l[o]);return e.jsx("div",{className:"w-full",children:e.jsx(r,{value:n,onChange:d,children:e.jsxs("div",{className:"relative mt-1",children:[e.jsxs(r.Button,{className:"relative w-full cursor-pointer rounded-md bg-background/20 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm",children:[e.jsx("span",{className:"block truncate",children:n.name}),e.jsx("span",{className:"pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2",children:e.jsx(m,{className:"h-5 w-5 text-gray-400","aria-hidden":"true"})})]}),e.jsx(x,{as:t.Fragment,leave:"transition ease-in duration-100",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:e.jsx(r.Options,{className:"absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm",children:l.map((a,c)=>e.jsx(r.Option,{className:({active:s})=>`relative cursor-pointer select-none py-2 pl-10 pr-4 ${s?"bg-amber-100 text-amber-900":"text-gray-900"}`,value:a,children:({selected:s})=>e.jsxs(e.Fragment,{children:[e.jsx(i,{to:a.link,className:`block truncate ${s?"font-medium":"font-normal"}`,children:a.name}),s?e.jsx(i,{to:a.link,className:"absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600",children:e.jsx(u,{className:"h-5 w-5","aria-hidden":"true"})}):null]})},c))})})]})})})};export{v as S};
