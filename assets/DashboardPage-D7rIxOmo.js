import{c as j,j as e,u as p,a as u,B as r,G as s,P as g,b as a,T as x}from"./index-DV4fTmL7.js";import{P as f}from"./PageHeader-DPYOy-K9.js";import{S as l,E as y}from"./EmployeesTable-kEWRIoby.js";import{B as v,H as b}from"./HeatmapChart-BfpDAbzt.js";const S=j(e.jsx("path",{d:"M8.65 5.82C9.36 4.72 10.6 4 12 4c2.21 0 4 1.79 4 4 0 1.4-.72 2.64-1.82 3.35zM20 17.17c-.02-1.1-.63-2.11-1.61-2.62-.54-.28-1.13-.54-1.77-.76zm1.19 4.02L2.81 2.81 1.39 4.22l8.89 8.89c-1.81.23-3.39.79-4.67 1.45-1 .51-1.61 1.54-1.61 2.66V20h13.17l2.61 2.61z"}),"PersonOff"),C=j(e.jsx("path",{d:"M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4m0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4"}),"PersonOutline"),h=({title:t,value:i,icon:n})=>e.jsx(a,{sx:{p:2},children:e.jsxs(r,{display:"flex",alignItems:"center",justifyContent:"space-between",children:[e.jsxs(r,{children:[e.jsx(x,{variant:"subtitle2",color:"textSecondary",children:t}),e.jsx(x,{variant:"h4",children:i})]}),e.jsx(r,{sx:{color:"primary.main"},children:n})]})}),d=()=>e.jsx(a,{sx:{p:2},children:e.jsxs(r,{display:"flex",alignItems:"center",justifyContent:"space-between",children:[e.jsxs(r,{children:[e.jsx(l,{width:100,height:20}),e.jsx(l,{width:60,height:40})]}),e.jsx(l,{variant:"circular",width:40,height:40})]})}),m=({height:t})=>e.jsxs(a,{sx:{p:2,height:`${t}px`},children:[e.jsx(l,{width:200,height:32,sx:{mb:2}}),e.jsx(l,{variant:"rectangular",height:t-80})]}),B=()=>{const t=p(),{data:i=[],isLoading:n}=u({}),o={total:i.length,active:i.filter(c=>c.status==="Active").length,onLeave:i.filter(c=>c.status==="On Leave").length};return e.jsxs(r,{component:"main",display:"flex",flexDirection:"column",bgcolor:t.palette.background.default,color:t.palette.text.primary,padding:t.spacing(2),overflow:"hidden",children:[e.jsx(f,{title:"Dashboard",breadcrumbs:[{label:"Home",href:"/"},{label:"Dashboard"}]}),e.jsxs(s,{container:!0,spacing:3,children:[n?e.jsxs(e.Fragment,{children:[e.jsx(s,{item:!0,xs:12,sm:6,md:4,children:e.jsx(d,{})}),e.jsx(s,{item:!0,xs:12,sm:6,md:4,children:e.jsx(d,{})}),e.jsx(s,{item:!0,xs:12,sm:6,md:4,children:e.jsx(d,{})})]}):e.jsxs(e.Fragment,{children:[e.jsx(s,{item:!0,xs:12,sm:6,md:4,children:e.jsx(h,{title:"Total Employees",value:o.total,icon:e.jsx(g,{fontSize:"large"})})}),e.jsx(s,{item:!0,xs:12,sm:6,md:4,children:e.jsx(h,{title:"Active Employees",value:o.active,icon:e.jsx(C,{fontSize:"large"})})}),e.jsx(s,{item:!0,xs:12,sm:6,md:4,children:e.jsx(h,{title:"Employees on Leave",value:o.onLeave,icon:e.jsx(S,{fontSize:"large"})})})]}),e.jsx(s,{item:!0,xs:12,children:n?e.jsx(m,{height:450}):e.jsxs(a,{sx:{p:2,height:"450px",display:"flex",flexDirection:"column"},children:[e.jsx(x,{variant:"h6",gutterBottom:!0,children:"Employees by Department"}),e.jsx(r,{sx:{flex:1,minHeight:0},children:e.jsx(v,{employees:i})})]})}),e.jsx(s,{item:!0,xs:12,children:n?e.jsx(m,{height:350}):e.jsxs(a,{sx:{p:2,height:"350px",display:"flex",flexDirection:"column"},children:[e.jsx(x,{variant:"h6",gutterBottom:!0,children:"Employee Distribution by Country"}),e.jsx(r,{sx:{flex:1,minHeight:0},children:e.jsx(b,{employees:i})})]})}),e.jsx(s,{item:!0,xs:12,children:n?e.jsxs(a,{sx:{p:2},children:[e.jsx(l,{width:200,height:32,sx:{mb:2}}),e.jsx(l,{variant:"rectangular",height:200})]}):e.jsxs(a,{sx:{p:2},children:[e.jsx(x,{variant:"h6",gutterBottom:!0,children:"Recent Employees"}),e.jsx(y,{employees:i.slice(0,5),isLoading:n})]})})]})]})};export{B as DashboardPage,B as default};
