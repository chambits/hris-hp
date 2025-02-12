import{x as I,af as J,c as G,j as o,_ as w,s as h,b as i,ag as Q,o as _,g as U,f as q,h as u,i as N,V as Y,k as T,n as D,T as B,ah as P,ai as F,a8 as Z,a9 as ee,aa as te,X as re,aj as se,C as ae}from"./index-GLYMsma4.js";function oe(e,t=0,s=1){return J(e,t,s)}function ne(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let s=e.match(t);return s&&s[0].length===1&&(s=s.map(r=>r+r)),s?`rgb${s.length===4?"a":""}(${s.map((r,a)=>a<3?parseInt(r,16):Math.round(parseInt(r,16)/255*1e3)/1e3).join(", ")})`:""}function L(e){if(e.type)return e;if(e.charAt(0)==="#")return L(ne(e));const t=e.indexOf("("),s=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(s)===-1)throw new Error(I(9,e));let r=e.substring(t+1,e.length-1),a;if(s==="color"){if(r=r.split(" "),a=r.shift(),r.length===4&&r[3].charAt(0)==="/"&&(r[3]=r[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(a)===-1)throw new Error(I(10,a))}else r=r.split(",");return r=r.map(n=>parseFloat(n)),{type:s,values:r,colorSpace:a}}function ie(e){const{type:t,colorSpace:s}=e;let{values:r}=e;return t.indexOf("rgb")!==-1?r=r.map((a,n)=>n<3?parseInt(a,10):a):t.indexOf("hsl")!==-1&&(r[1]=`${r[1]}%`,r[2]=`${r[2]}%`),t.indexOf("color")!==-1?r=`${s} ${r.join(" ")}`:r=`${r.join(", ")}`,`${t}(${r})`}function le(e,t){return e=L(e),t=oe(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,ie(e)}function ce(e){return String(e).match(/[\d.\-+]*\s*(.*)/)[1]||""}function pe(e){return parseFloat(e)}const de=G(o.jsx("path",{d:"M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"}),"MoreHoriz"),ue=["slots","slotProps"],he=h(Q)(({theme:e})=>i({display:"flex",marginLeft:`calc(${e.spacing(1)} * 0.5)`,marginRight:`calc(${e.spacing(1)} * 0.5)`},e.palette.mode==="light"?{backgroundColor:e.palette.grey[100],color:e.palette.grey[700]}:{backgroundColor:e.palette.grey[700],color:e.palette.grey[100]},{borderRadius:2,"&:hover, &:focus":i({},e.palette.mode==="light"?{backgroundColor:e.palette.grey[200]}:{backgroundColor:e.palette.grey[600]}),"&:active":i({boxShadow:e.shadows[0]},e.palette.mode==="light"?{backgroundColor:_.emphasize(e.palette.grey[200],.12)}:{backgroundColor:_.emphasize(e.palette.grey[600],.12)})})),ge=h(de)({width:24,height:16});function fe(e){const{slots:t={},slotProps:s={}}=e,r=w(e,ue),a=e;return o.jsx("li",{children:o.jsx(he,i({focusRipple:!0},r,{ownerState:a,children:o.jsx(ge,i({as:t.CollapsedIcon,ownerState:a},s.collapsedIcon))}))})}function me(e){return q("MuiBreadcrumbs",e)}const xe=U("MuiBreadcrumbs",["root","ol","li","separator"]),be=["children","className","component","slots","slotProps","expandText","itemsAfterCollapse","itemsBeforeCollapse","maxItems","separator"],ve=e=>{const{classes:t}=e;return D({root:["root"],li:["li"],ol:["ol"],separator:["separator"]},me,t)},Ce=h(B,{name:"MuiBreadcrumbs",slot:"Root",overridesResolver:(e,t)=>[{[`& .${xe.li}`]:t.li},t.root]})({}),ye=h("ol",{name:"MuiBreadcrumbs",slot:"Ol",overridesResolver:(e,t)=>t.ol})({display:"flex",flexWrap:"wrap",alignItems:"center",padding:0,margin:0,listStyle:"none"}),Re=h("li",{name:"MuiBreadcrumbs",slot:"Separator",overridesResolver:(e,t)=>t.separator})({display:"flex",userSelect:"none",marginLeft:8,marginRight:8});function ke(e,t,s,r){return e.reduce((a,n,l)=>(l<e.length-1?a=a.concat(n,o.jsx(Re,{"aria-hidden":!0,className:t,ownerState:r,children:s},`separator-${l}`)):a.push(n),a),[])}const je=u.forwardRef(function(t,s){const r=N({props:t,name:"MuiBreadcrumbs"}),{children:a,className:n,component:l="nav",slots:g={},slotProps:R={},expandText:b="Show path",itemsAfterCollapse:f=1,itemsBeforeCollapse:p=1,maxItems:d=8,separator:v="/"}=r,X=w(r,be),[S,W]=u.useState(!1),m=i({},r,{component:l,expanded:S,expandText:b,itemsAfterCollapse:f,itemsBeforeCollapse:p,maxItems:d,separator:v}),C=ve(m),V=Y({elementType:g.CollapsedIcon,externalSlotProps:R.collapsedIcon,ownerState:m}),$=u.useRef(null),K=c=>{const j=()=>{W(!0);const M=$.current.querySelector("a[href],button,[tabindex]");M&&M.focus()};return p+f>=c.length?c:[...c.slice(0,p),o.jsx(fe,{"aria-label":b,slots:{CollapsedIcon:g.CollapsedIcon},slotProps:{collapsedIcon:V},onClick:j},"ellipsis"),...c.slice(c.length-f,c.length)]},k=u.Children.toArray(a).filter(c=>u.isValidElement(c)).map((c,j)=>o.jsx("li",{className:C.li,children:c},`child-${j}`));return o.jsx(Ce,i({ref:s,component:l,color:"text.secondary",className:T(C.root,n),ownerState:m},X,{children:o.jsx(ye,{className:C.ol,ref:$,ownerState:m,children:ke(S||d&&k.length<=d?k:K(k),C.separator,v,m)})}))});function we(e){return q("MuiSkeleton",e)}U("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const Be=["animation","className","component","height","style","variant","width"];let y=e=>e,E,A,O,z;const Se=e=>{const{classes:t,variant:s,animation:r,hasChildren:a,width:n,height:l}=e;return D({root:["root",s,r,a&&"withChildren",a&&!n&&"fitContent",a&&!l&&"heightAuto"]},we,t)},$e=F(E||(E=y`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`)),Me=F(A||(A=y`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`)),Ie=h("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:s}=e;return[t.root,t[s.variant],s.animation!==!1&&t[s.animation],s.hasChildren&&t.withChildren,s.hasChildren&&!s.width&&t.fitContent,s.hasChildren&&!s.height&&t.heightAuto]}})(({theme:e,ownerState:t})=>{const s=ce(e.shape.borderRadius)||"px",r=pe(e.shape.borderRadius);return i({display:"block",backgroundColor:e.vars?e.vars.palette.Skeleton.bg:le(e.palette.text.primary,e.palette.mode==="light"?.11:.13),height:"1.2em"},t.variant==="text"&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${r}${s}/${Math.round(r/.6*10)/10}${s}`,"&:empty:before":{content:'"\\00a0"'}},t.variant==="circular"&&{borderRadius:"50%"},t.variant==="rounded"&&{borderRadius:(e.vars||e).shape.borderRadius},t.hasChildren&&{"& > *":{visibility:"hidden"}},t.hasChildren&&!t.width&&{maxWidth:"fit-content"},t.hasChildren&&!t.height&&{height:"auto"})},({ownerState:e})=>e.animation==="pulse"&&P(O||(O=y`
      animation: ${0} 2s ease-in-out 0.5s infinite;
    `),$e),({ownerState:e,theme:t})=>e.animation==="wave"&&P(z||(z=y`
      position: relative;
      overflow: hidden;

      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
      -webkit-mask-image: -webkit-radial-gradient(white, black);

      &::after {
        animation: ${0} 2s linear 0.5s infinite;
        background: linear-gradient(
          90deg,
          transparent,
          ${0},
          transparent
        );
        content: '';
        position: absolute;
        transform: translateX(-100%); /* Avoid flash during server-side hydration */
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
      }
    `),Me,(t.vars||t).palette.action.hover)),ze=u.forwardRef(function(t,s){const r=N({props:t,name:"MuiSkeleton"}),{animation:a="pulse",className:n,component:l="span",height:g,style:R,variant:b="text",width:f}=r,p=w(r,Be),d=i({},r,{animation:a,component:l,variant:b,hasChildren:!!p.children}),v=Se(d);return o.jsx(Ie,i({as:l,ref:s,className:T(v.root,n),ownerState:d},p,{style:i({width:f,height:g},R)}))});var x={},H;function _e(){if(H)return x;H=1;var e=Z();Object.defineProperty(x,"__esModule",{value:!0}),x.default=void 0;var t=e(ee()),s=te();return x.default=(0,t.default)((0,s.jsx)("path",{d:"M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"}),"Home"),x}var Pe=_e();const Ee=re(Pe),Ae=({breadcrumbs:e})=>o.jsx(je,{"aria-label":"breadcrumb",sx:{marginBottom:2},children:e.map((t,s)=>t.href?o.jsxs(se,{to:t.href,style:{display:"flex",alignItems:"center",textDecoration:"none",color:"inherit"},children:[s===0&&o.jsx(Ee,{sx:{mr:.5},fontSize:"inherit"}),t.label]},s):o.jsx(B,{color:"text.primary",children:t.label},s))}),He=({title:e,breadcrumbs:t})=>{const s=ae();return o.jsxs(o.Fragment,{children:[o.jsx(Ae,{breadcrumbs:t}),o.jsx(B,{variant:"h4",component:"h1",gutterBottom:!0,color:"text.primary",marginBottom:s.spacing(5),children:e})]})};export{He as P,ze as S};
