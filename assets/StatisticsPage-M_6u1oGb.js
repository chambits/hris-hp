import{R as B,j as x,B as ke,C as De,u as ft,G as mt}from"./index-_dT4gJmn.js";import{P as ht,S as pt}from"./PageHeader-Hme4jvH0.js";import{t as _e,b as yt,s as F,d as E,a as z,c as q,e as le,f as gt,g as fe,h as K,i as me,j as we,k as Le,l as G,m as se,n as je,o as j,u as re,p as We,q as ae,r as A,v as R,w as dt,x as I,y as xt,z as vt,A as Mt,D as St,E as Tt,F as Ye,G as Oe,H as Ne,I as oe,J as He,K as Pe,L as Fe,B as Ct,P as bt,C as Ut}from"./ChartSection-BYQerI-K.js";function kt(e,t){e=e.slice();var n=0,r=e.length-1,i=e[n],u=e[r],l;return u<i&&(l=n,n=r,r=l,l=i,i=u,u=l),e[n]=t.floor(i),e[r]=t.ceil(u),e}const Q=_e(()=>{},(e,t)=>{e.setTime(+e+t)},(e,t)=>t-e);Q.every=e=>(e=Math.floor(e),!isFinite(e)||!(e>0)?null:e>1?_e(t=>{t.setTime(Math.floor(t/e)*e)},(t,n)=>{t.setTime(+t+n*e)},(t,n)=>(n-t)/e):Q);Q.range;function Dt(e,t,n,r,i,u){const l=[[F,1,E],[F,5,5*E],[F,15,15*E],[F,30,30*E],[u,1,z],[u,5,5*z],[u,15,15*z],[u,30,30*z],[i,1,q],[i,3,3*q],[i,6,6*q],[i,12,12*q],[r,1,le],[r,2,2*le],[n,1,gt],[t,1,fe],[t,3,3*fe],[e,1,K]];function g(f,p,S){const M=p<f;M&&([f,p]=[p,f]);const T=S&&typeof S.range=="function"?S:d(f,p,S),D=T?T.range(f,+p+1):[];return M?D.reverse():D}function d(f,p,S){const M=Math.abs(p-f)/S,T=yt(([,,O])=>O).right(l,M);if(T===l.length)return e.every(me(f/K,p/K,S));if(T===0)return Q.every(Math.max(me(f,p,S),1));const[D,Y]=l[M/l[T-1][2]<l[T][2]/M?T-1:T];return D.every(Y)}return[g,d]}const[_t,wt]=Dt(j,je,se,G,Le,we);function ee(e){if(0<=e.y&&e.y<100){var t=new Date(-1,e.m,e.d,e.H,e.M,e.S,e.L);return t.setFullYear(e.y),t}return new Date(e.y,e.m,e.d,e.H,e.M,e.S,e.L)}function te(e){if(0<=e.y&&e.y<100){var t=new Date(Date.UTC(-1,e.m,e.d,e.H,e.M,e.S,e.L));return t.setUTCFullYear(e.y),t}return new Date(Date.UTC(e.y,e.m,e.d,e.H,e.M,e.S,e.L))}function N(e,t,n){return{y:e,m:t,d:n,H:0,M:0,S:0,L:0}}function Lt(e){var t=e.dateTime,n=e.date,r=e.time,i=e.periods,u=e.days,l=e.shortDays,g=e.months,d=e.shortMonths,f=H(i),p=P(i),S=H(u),M=P(u),T=H(l),D=P(l),Y=H(g),O=P(g),X=H(d),$=P(d),_={a:Ke,A:et,b:tt,B:nt,c:null,d:xe,e:xe,f:Kt,g:ln,G:mn,H:Xt,I:$t,j:Jt,L:Ae,m:en,M:tn,p:rt,q:at,Q:Se,s:Te,S:nn,u:rn,U:an,V:on,w:un,W:sn,x:null,X:null,y:cn,Y:fn,Z:hn,"%":Me},w={a:ot,A:it,b:ut,B:st,c:null,d:ve,e:ve,f:dn,g:Dn,G:wn,H:pn,I:yn,j:gn,L:Ie,m:xn,M:vn,p:ct,q:lt,Q:Se,s:Te,S:Mn,u:Sn,U:Tn,V:Cn,w:bn,W:Un,x:null,X:null,y:kn,Y:_n,Z:Ln,"%":Me},J={a:Be,A:Qe,b:Ve,B:Ge,c:Xe,d:ge,e:ge,f:Bt,g:ye,G:pe,H:de,I:de,j:Zt,L:qt,m:It,M:Et,p:qe,q:Rt,Q:Vt,s:Gt,S:zt,u:Nt,U:Ht,V:Pt,w:Ot,W:Ft,x:$e,X:Je,y:ye,Y:pe,Z:At,"%":Qt};_.x=s(n,_),_.X=s(r,_),_.c=s(t,_),w.x=s(n,w),w.X=s(r,w),w.c=s(t,w);function s(o,c){return function(m){var a=[],b=-1,y=0,U=o.length,k,L,ce;for(m instanceof Date||(m=new Date(+m));++b<U;)o.charCodeAt(b)===37&&(a.push(o.slice(y,b)),(L=he[k=o.charAt(++b)])!=null?k=o.charAt(++b):L=k==="e"?" ":"0",(ce=c[k])&&(k=ce(m,L)),a.push(k),y=b+1);return a.push(o.slice(y,b)),a.join("")}}function C(o,c){return function(m){var a=N(1900,void 0,1),b=Z(a,o,m+="",0),y,U;if(b!=m.length)return null;if("Q"in a)return new Date(a.Q);if("s"in a)return new Date(a.s*1e3+("L"in a?a.L:0));if(c&&!("Z"in a)&&(a.Z=0),"p"in a&&(a.H=a.H%12+a.p*12),a.m===void 0&&(a.m="q"in a?a.q:0),"V"in a){if(a.V<1||a.V>53)return null;"w"in a||(a.w=1),"Z"in a?(y=te(N(a.y,0,1)),U=y.getUTCDay(),y=U>4||U===0?re.ceil(y):re(y),y=We.offset(y,(a.V-1)*7),a.y=y.getUTCFullYear(),a.m=y.getUTCMonth(),a.d=y.getUTCDate()+(a.w+6)%7):(y=ee(N(a.y,0,1)),U=y.getDay(),y=U>4||U===0?ae.ceil(y):ae(y),y=G.offset(y,(a.V-1)*7),a.y=y.getFullYear(),a.m=y.getMonth(),a.d=y.getDate()+(a.w+6)%7)}else("W"in a||"U"in a)&&("w"in a||(a.w="u"in a?a.u%7:"W"in a?1:0),U="Z"in a?te(N(a.y,0,1)).getUTCDay():ee(N(a.y,0,1)).getDay(),a.m=0,a.d="W"in a?(a.w+6)%7+a.W*7-(U+5)%7:a.w+a.U*7-(U+6)%7);return"Z"in a?(a.H+=a.Z/100|0,a.M+=a.Z%100,te(a)):ee(a)}}function Z(o,c,m,a){for(var b=0,y=c.length,U=m.length,k,L;b<y;){if(a>=U)return-1;if(k=c.charCodeAt(b++),k===37){if(k=c.charAt(b++),L=J[k in he?c.charAt(b++):k],!L||(a=L(o,m,a))<0)return-1}else if(k!=m.charCodeAt(a++))return-1}return a}function qe(o,c,m){var a=f.exec(c.slice(m));return a?(o.p=p.get(a[0].toLowerCase()),m+a[0].length):-1}function Be(o,c,m){var a=T.exec(c.slice(m));return a?(o.w=D.get(a[0].toLowerCase()),m+a[0].length):-1}function Qe(o,c,m){var a=S.exec(c.slice(m));return a?(o.w=M.get(a[0].toLowerCase()),m+a[0].length):-1}function Ve(o,c,m){var a=X.exec(c.slice(m));return a?(o.m=$.get(a[0].toLowerCase()),m+a[0].length):-1}function Ge(o,c,m){var a=Y.exec(c.slice(m));return a?(o.m=O.get(a[0].toLowerCase()),m+a[0].length):-1}function Xe(o,c,m){return Z(o,t,c,m)}function $e(o,c,m){return Z(o,n,c,m)}function Je(o,c,m){return Z(o,r,c,m)}function Ke(o){return l[o.getDay()]}function et(o){return u[o.getDay()]}function tt(o){return d[o.getMonth()]}function nt(o){return g[o.getMonth()]}function rt(o){return i[+(o.getHours()>=12)]}function at(o){return 1+~~(o.getMonth()/3)}function ot(o){return l[o.getUTCDay()]}function it(o){return u[o.getUTCDay()]}function ut(o){return d[o.getUTCMonth()]}function st(o){return g[o.getUTCMonth()]}function ct(o){return i[+(o.getUTCHours()>=12)]}function lt(o){return 1+~~(o.getUTCMonth()/3)}return{format:function(o){var c=s(o+="",_);return c.toString=function(){return o},c},parse:function(o){var c=C(o+="",!1);return c.toString=function(){return o},c},utcFormat:function(o){var c=s(o+="",w);return c.toString=function(){return o},c},utcParse:function(o){var c=C(o+="",!0);return c.toString=function(){return o},c}}}var he={"-":"",_:" ",0:"0"},v=/^\s*\d+/,jt=/^%/,Wt=/[\\^$*+?|[\]().{}]/g;function h(e,t,n){var r=e<0?"-":"",i=(r?-e:e)+"",u=i.length;return r+(u<n?new Array(n-u+1).join(t)+i:i)}function Yt(e){return e.replace(Wt,"\\$&")}function H(e){return new RegExp("^(?:"+e.map(Yt).join("|")+")","i")}function P(e){return new Map(e.map((t,n)=>[t.toLowerCase(),n]))}function Ot(e,t,n){var r=v.exec(t.slice(n,n+1));return r?(e.w=+r[0],n+r[0].length):-1}function Nt(e,t,n){var r=v.exec(t.slice(n,n+1));return r?(e.u=+r[0],n+r[0].length):-1}function Ht(e,t,n){var r=v.exec(t.slice(n,n+2));return r?(e.U=+r[0],n+r[0].length):-1}function Pt(e,t,n){var r=v.exec(t.slice(n,n+2));return r?(e.V=+r[0],n+r[0].length):-1}function Ft(e,t,n){var r=v.exec(t.slice(n,n+2));return r?(e.W=+r[0],n+r[0].length):-1}function pe(e,t,n){var r=v.exec(t.slice(n,n+4));return r?(e.y=+r[0],n+r[0].length):-1}function ye(e,t,n){var r=v.exec(t.slice(n,n+2));return r?(e.y=+r[0]+(+r[0]>68?1900:2e3),n+r[0].length):-1}function At(e,t,n){var r=/^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(n,n+6));return r?(e.Z=r[1]?0:-(r[2]+(r[3]||"00")),n+r[0].length):-1}function Rt(e,t,n){var r=v.exec(t.slice(n,n+1));return r?(e.q=r[0]*3-3,n+r[0].length):-1}function It(e,t,n){var r=v.exec(t.slice(n,n+2));return r?(e.m=r[0]-1,n+r[0].length):-1}function ge(e,t,n){var r=v.exec(t.slice(n,n+2));return r?(e.d=+r[0],n+r[0].length):-1}function Zt(e,t,n){var r=v.exec(t.slice(n,n+3));return r?(e.m=0,e.d=+r[0],n+r[0].length):-1}function de(e,t,n){var r=v.exec(t.slice(n,n+2));return r?(e.H=+r[0],n+r[0].length):-1}function Et(e,t,n){var r=v.exec(t.slice(n,n+2));return r?(e.M=+r[0],n+r[0].length):-1}function zt(e,t,n){var r=v.exec(t.slice(n,n+2));return r?(e.S=+r[0],n+r[0].length):-1}function qt(e,t,n){var r=v.exec(t.slice(n,n+3));return r?(e.L=+r[0],n+r[0].length):-1}function Bt(e,t,n){var r=v.exec(t.slice(n,n+6));return r?(e.L=Math.floor(r[0]/1e3),n+r[0].length):-1}function Qt(e,t,n){var r=jt.exec(t.slice(n,n+1));return r?n+r[0].length:-1}function Vt(e,t,n){var r=v.exec(t.slice(n));return r?(e.Q=+r[0],n+r[0].length):-1}function Gt(e,t,n){var r=v.exec(t.slice(n));return r?(e.s=+r[0],n+r[0].length):-1}function xe(e,t){return h(e.getDate(),t,2)}function Xt(e,t){return h(e.getHours(),t,2)}function $t(e,t){return h(e.getHours()%12||12,t,2)}function Jt(e,t){return h(1+G.count(j(e),e),t,3)}function Ae(e,t){return h(e.getMilliseconds(),t,3)}function Kt(e,t){return Ae(e,t)+"000"}function en(e,t){return h(e.getMonth()+1,t,2)}function tn(e,t){return h(e.getMinutes(),t,2)}function nn(e,t){return h(e.getSeconds(),t,2)}function rn(e){var t=e.getDay();return t===0?7:t}function an(e,t){return h(se.count(j(e)-1,e),t,2)}function Re(e){var t=e.getDay();return t>=4||t===0?I(e):I.ceil(e)}function on(e,t){return e=Re(e),h(I.count(j(e),e)+(j(e).getDay()===4),t,2)}function un(e){return e.getDay()}function sn(e,t){return h(ae.count(j(e)-1,e),t,2)}function cn(e,t){return h(e.getFullYear()%100,t,2)}function ln(e,t){return e=Re(e),h(e.getFullYear()%100,t,2)}function fn(e,t){return h(e.getFullYear()%1e4,t,4)}function mn(e,t){var n=e.getDay();return e=n>=4||n===0?I(e):I.ceil(e),h(e.getFullYear()%1e4,t,4)}function hn(e){var t=e.getTimezoneOffset();return(t>0?"-":(t*=-1,"+"))+h(t/60|0,"0",2)+h(t%60,"0",2)}function ve(e,t){return h(e.getUTCDate(),t,2)}function pn(e,t){return h(e.getUTCHours(),t,2)}function yn(e,t){return h(e.getUTCHours()%12||12,t,2)}function gn(e,t){return h(1+We.count(A(e),e),t,3)}function Ie(e,t){return h(e.getUTCMilliseconds(),t,3)}function dn(e,t){return Ie(e,t)+"000"}function xn(e,t){return h(e.getUTCMonth()+1,t,2)}function vn(e,t){return h(e.getUTCMinutes(),t,2)}function Mn(e,t){return h(e.getUTCSeconds(),t,2)}function Sn(e){var t=e.getUTCDay();return t===0?7:t}function Tn(e,t){return h(dt.count(A(e)-1,e),t,2)}function Ze(e){var t=e.getUTCDay();return t>=4||t===0?R(e):R.ceil(e)}function Cn(e,t){return e=Ze(e),h(R.count(A(e),e)+(A(e).getUTCDay()===4),t,2)}function bn(e){return e.getUTCDay()}function Un(e,t){return h(re.count(A(e)-1,e),t,2)}function kn(e,t){return h(e.getUTCFullYear()%100,t,2)}function Dn(e,t){return e=Ze(e),h(e.getUTCFullYear()%100,t,2)}function _n(e,t){return h(e.getUTCFullYear()%1e4,t,4)}function wn(e,t){var n=e.getUTCDay();return e=n>=4||n===0?R(e):R.ceil(e),h(e.getUTCFullYear()%1e4,t,4)}function Ln(){return"+0000"}function Me(){return"%"}function Se(e){return+e}function Te(e){return Math.floor(+e/1e3)}var W,Ee;jn({dateTime:"%x, %X",date:"%-m/%-d/%Y",time:"%-I:%M:%S %p",periods:["AM","PM"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]});function jn(e){return W=Lt(e),Ee=W.format,W.parse,W.utcFormat,W.utcParse,W}function Wn(e){return new Date(e)}function Yn(e){return e instanceof Date?+e:+new Date(+e)}function ze(e,t,n,r,i,u,l,g,d,f){var p=vt(),S=p.invert,M=p.domain,T=f(".%L"),D=f(":%S"),Y=f("%I:%M"),O=f("%I %p"),X=f("%a %d"),$=f("%b %d"),_=f("%B"),w=f("%Y");function J(s){return(d(s)<s?T:g(s)<s?D:l(s)<s?Y:u(s)<s?O:r(s)<s?i(s)<s?X:$:n(s)<s?_:w)(s)}return p.invert=function(s){return new Date(S(s))},p.domain=function(s){return arguments.length?M(Array.from(s,Yn)):M().map(Wn)},p.ticks=function(s){var C=M();return e(C[0],C[C.length-1],s??10)},p.tickFormat=function(s,C){return C==null?J:f(C)},p.nice=function(s){var C=M();return(!s||typeof s.range!="function")&&(s=t(C[0],C[C.length-1],s??10)),s?M(kt(C,s)):p},p.copy=function(){return Mt(p,ze(e,t,n,r,i,u,l,g,d,f))},p}function On(){return xt.apply(ze(_t,wt,j,je,se,G,Le,we,F,Ee).domain([new Date(2e3,0,1),new Date(2e3,0,2)]),arguments)}var Nn=St("domain","range","reverse","clamp","interpolate","nice","round");function Hn(e){return Nn(On(),e)}function Ce(e){return e<0?-1:1}function be(e,t,n){var r=e._x1-e._x0,i=t-e._x1,u=(e._y1-e._y0)/(r||i<0&&-0),l=(n-e._y1)/(i||r<0&&-0),g=(u*i+l*r)/(r+i);return(Ce(u)+Ce(l))*Math.min(Math.abs(u),Math.abs(l),.5*Math.abs(g))||0}function Ue(e,t){var n=e._x1-e._x0;return n?(3*(e._y1-e._y0)/n-t)/2:t}function ne(e,t,n){var r=e._x0,i=e._y0,u=e._x1,l=e._y1,g=(u-r)/3;e._context.bezierCurveTo(r+g,i+g*t,u-g,l-g*n,u,l)}function V(e){this._context=e}V.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=this._t0=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x1,this._y1);break;case 3:ne(this,this._t0,Ue(this,this._t0));break}(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(e,t){var n=NaN;if(e=+e,t=+t,!(e===this._x1&&t===this._y1)){switch(this._point){case 0:this._point=1,this._line?this._context.lineTo(e,t):this._context.moveTo(e,t);break;case 1:this._point=2;break;case 2:this._point=3,ne(this,Ue(this,n=be(this,e,t)),n);break;default:ne(this,this._t0,n=be(this,e,t));break}this._x0=this._x1,this._x1=e,this._y0=this._y1,this._y1=t,this._t0=n}}};Object.create(V.prototype).point=function(e,t){V.prototype.point.call(this,t,e)};function Pn(e){return new V(e)}var Fn=["children","data","x","y","fill","className","curve","innerRef","defined"];function ie(){return ie=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},ie.apply(this,arguments)}function An(e,t){if(e==null)return{};var n={},r=Object.keys(e),i,u;for(u=0;u<r.length;u++)i=r[u],!(t.indexOf(i)>=0)&&(n[i]=e[i]);return n}function Rn(e){var t=e.children,n=e.data,r=n===void 0?[]:n,i=e.x,u=e.y,l=e.fill,g=l===void 0?"transparent":l,d=e.className,f=e.curve,p=e.innerRef,S=e.defined,M=S===void 0?function(){return!0}:S,T=An(e,Fn),D=Tt({x:i,y:u,defined:M,curve:f});return t?B.createElement(B.Fragment,null,t({path:D})):B.createElement("path",ie({ref:p,className:Ye("visx-linepath",d),d:D(r)||"",fill:g,strokeLinecap:"round"},T))}var In=["className","innerRef"];function ue(){return ue=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},ue.apply(this,arguments)}function Zn(e,t){if(e==null)return{};var n={},r=Object.keys(e),i,u;for(u=0;u<r.length;u++)i=r[u],!(t.indexOf(i)>=0)&&(n[i]=e[i]);return n}function En(e){var t=e.className,n=e.innerRef,r=Zn(e,In);return B.createElement("circle",ue({ref:n,className:Ye("visx-circle",t)},r))}const zn=({width:e,height:t})=>{const n=De(),{employeesHiresCountByYear:r}=Ne(),i=n.palette.text.primary,u={top:20,right:30,bottom:50,left:40};if(r.length===0)return null;const l=Hn({domain:[new Date(Math.min(...r.map(d=>d.year.getTime()))),new Date(Math.max(...r.map(d=>d.year.getTime())))],range:[u.left,e-u.right]}),g=oe({domain:[0,Math.max(...r.map(d=>d.hires))],range:[t-u.bottom,u.top]});return x.jsx("svg",{width:e,height:t,children:x.jsxs(He,{children:[x.jsx(Pe,{scale:g,left:u.left,stroke:i,tickStroke:i,tickLabelProps:()=>({fill:i,fontSize:11,textAnchor:"end",dy:"0.33em"}),label:"Number of Hires",labelProps:{fill:i,fontSize:12,textAnchor:"middle"}}),x.jsx(Fe,{scale:l,top:t-u.bottom,stroke:i,tickStroke:i,tickLabelProps:()=>({fill:i,textAnchor:"middle",dy:1,fontSize:10}),label:"Year",labelProps:{fill:i,fontSize:12,textAnchor:"middle"}}),x.jsx(Rn,{data:r,x:d=>l(d.year),y:d=>g(d.hires),stroke:n.palette.primary.main,strokeWidth:2,curve:Pn})]})})},qn=({employees:e})=>x.jsx(ke,{width:"100%",height:"300px",children:x.jsx(Oe,{children:({width:t,height:n})=>x.jsx(zn,{width:t,height:n,employees:e})})}),Bn=({width:e,height:t})=>{const n=De(),{yearsOfService:r}=Ne(),i=n.palette.text.primary,u={top:20,right:30,bottom:50,left:50};if(r.length===0)return null;const l=oe({domain:[20,Math.max(...r.map(f=>f.age))],range:[u.left,e-u.right]}),g=oe({domain:[0,Math.max(...r.map(f=>f.yearsOfService))],range:[t-u.bottom,u.top]}),d=f=>{const p={Engineering:n.palette.primary.main,Sales:n.palette.secondary.main,Marketing:n.palette.error.main,HR:n.palette.warning.main,default:n.palette.info.main};return p[f]||p.default};return x.jsx("svg",{width:e,height:t,children:x.jsxs(He,{children:[x.jsx(Pe,{scale:g,left:u.left,stroke:i,tickStroke:i,tickLabelProps:()=>({fill:i,fontSize:11,textAnchor:"end",dy:"0.33em"}),label:"Years of Service",labelProps:{fill:i,fontSize:12,textAnchor:"middle"}}),x.jsx(Fe,{scale:l,top:t-u.bottom,stroke:i,tickStroke:i,tickLabelProps:()=>({fill:i,textAnchor:"middle",dy:"0.33em",fontSize:11}),label:"Age",labelProps:{fill:i,fontSize:12,textAnchor:"middle"}}),r.map((f,p)=>x.jsx(En,{cx:l(f.age),cy:g(f.yearsOfService),r:6,fill:d(f.department),opacity:.6,style:{cursor:"pointer"}},p))]})})},Qn=({employees:e})=>x.jsx(ke,{width:"100%",height:"400px",children:x.jsx(Oe,{children:({width:t,height:n})=>x.jsx(Bn,{width:t,height:n,employees:e})})}),Vn=[{title:"Employees per Department",Component:Ct},{title:"Employee Status Distribution",Component:bt},{title:"Employee Hires Over Years",Component:qn},{title:"Employee Age vs Years of Service",Component:Qn}],Jn=()=>{const{data:e=[],isLoading:t}=ft({q:""});return x.jsxs(x.Fragment,{children:[x.jsx(ht,{title:"Statistics",breadcrumbs:[{label:"Home",href:"/"},{label:"Statistics"}]}),x.jsx(mt,{container:!0,spacing:4,children:Vn.map(({title:n,Component:r})=>x.jsx(Ut,{title:n,children:t?x.jsx(pt,{variant:"rectangular",width:"100%",height:300}):x.jsx(r,{employees:e})},n))})]})};export{Jn as default};
