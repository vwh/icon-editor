function M(t,e){if(t.match(/^[a-z]+:\/\//i))return t;if(t.match(/^\/\//))return window.location.protocol+t;if(t.match(/^[a-z]+:/i))return t;const r=document.implementation.createHTMLDocument(),n=r.createElement("base"),s=r.createElement("a");return r.head.appendChild(n),r.body.appendChild(s),e&&(n.href=e),s.href=t,s.href}const O=(()=>{let t=0;const e=()=>`0000${(Math.random()*36**4<<0).toString(36)}`.slice(-4);return()=>(t+=1,`u${e()}${t}`)})();function f(t){const e=[];for(let r=0,n=t.length;r<n;r++)e.push(t[r]);return e}function d(t,e){const n=(t.ownerDocument.defaultView||window).getComputedStyle(t).getPropertyValue(e);return n?parseFloat(n.replace("px","")):0}function _(t){const e=d(t,"border-left-width"),r=d(t,"border-right-width");return t.clientWidth+e+r}function W(t){const e=d(t,"border-top-width"),r=d(t,"border-bottom-width");return t.clientHeight+e+r}function A(t,e={}){const r=e.width||_(t),n=e.height||W(t);return{width:r,height:n}}function j(){let t,e;try{e=process}catch{}const r=e&&e.env?e.env.devicePixelRatio:null;return r&&(t=parseInt(r,10),Number.isNaN(t)&&(t=1)),t||window.devicePixelRatio||1}const u=16384;function q(t){(t.width>u||t.height>u)&&(t.width>u&&t.height>u?t.width>t.height?(t.height*=u/t.width,t.width=u):(t.width*=u/t.height,t.height=u):t.width>u?(t.height*=u/t.width,t.width=u):(t.width*=u/t.height,t.height=u))}function w(t){return new Promise((e,r)=>{const n=new Image;n.decode=()=>e(n),n.onload=()=>e(n),n.onerror=r,n.crossOrigin="anonymous",n.decoding="async",n.src=t})}async function B(t){return Promise.resolve().then(()=>new XMLSerializer().serializeToString(t)).then(encodeURIComponent).then(e=>`data:image/svg+xml;charset=utf-8,${e}`)}async function z(t,e,r){const n="http://www.w3.org/2000/svg",s=document.createElementNS(n,"svg"),i=document.createElementNS(n,"foreignObject");return s.setAttribute("width",`${e}`),s.setAttribute("height",`${r}`),s.setAttribute("viewBox",`0 0 ${e} ${r}`),i.setAttribute("width","100%"),i.setAttribute("height","100%"),i.setAttribute("x","0"),i.setAttribute("y","0"),i.setAttribute("externalResourcesRequired","true"),s.appendChild(i),i.appendChild(t),B(s)}const l=(t,e)=>{if(t instanceof e)return!0;const r=Object.getPrototypeOf(t);return r===null?!1:r.constructor.name===e.name||l(r,e)};function G(t){const e=t.getPropertyValue("content");return`${t.cssText} content: '${e.replace(/'|"/g,"")}';`}function X(t){return f(t).map(e=>{const r=t.getPropertyValue(e),n=t.getPropertyPriority(e);return`${e}: ${r}${n?" !important":""};`}).join(" ")}function J(t,e,r){const n=`.${t}:${e}`,s=r.cssText?G(r):X(r);return document.createTextNode(`${n}{${s}}`)}function R(t,e,r){const n=window.getComputedStyle(t,r),s=n.getPropertyValue("content");if(s===""||s==="none")return;const i=O();try{e.className=`${e.className} ${i}`}catch{return}const c=document.createElement("style");c.appendChild(J(i,r,n)),e.appendChild(c)}function K(t,e){R(t,e,":before"),R(t,e,":after")}const C="application/font-woff",P="image/jpeg",Q={woff:C,woff2:C,ttf:"application/font-truetype",eot:"application/vnd.ms-fontobject",png:"image/png",jpg:P,jpeg:P,gif:"image/gif",tiff:"image/tiff",svg:"image/svg+xml",webp:"image/webp"};function Y(t){const e=/\.([^./]*?)$/g.exec(t);return e?e[1]:""}function E(t){const e=Y(t).toLowerCase();return Q[e]||""}function Z(t){return t.split(/,/)[1]}function b(t){return t.search(/^(data:)/)!==-1}function N(t,e){return`data:${e};base64,${t}`}async function F(t,e,r){const n=await fetch(t,e);if(n.status===404)throw new Error(`Resource "${n.url}" not found`);const s=await n.blob();return new Promise((i,c)=>{const a=new FileReader;a.onerror=c,a.onloadend=()=>{try{i(r({res:n,result:a.result}))}catch(o){c(o)}},a.readAsDataURL(s)})}const S={};function tt(t,e,r){let n=t.replace(/\?.*/,"");return r&&(n=t),/ttf|otf|eot|woff2?/i.test(n)&&(n=n.replace(/.*\//,"")),e?`[${e}]${n}`:n}async function x(t,e,r){const n=tt(t,e,r.includeQueryParams);if(S[n]!=null)return S[n];r.cacheBust&&(t+=(/\?/.test(t)?"&":"?")+new Date().getTime());let s;try{const i=await F(t,r.fetchRequestInit,({res:c,result:a})=>(e||(e=c.headers.get("Content-Type")||""),Z(a)));s=N(i,e)}catch(i){s=r.imagePlaceholder||"";let c=`Failed to fetch resource: ${t}`;i&&(c=typeof i=="string"?i:i.message),c&&console.warn(c)}return S[n]=s,s}async function et(t){const e=t.toDataURL();return e==="data:,"?t.cloneNode(!1):w(e)}async function nt(t,e){if(t.currentSrc){const i=document.createElement("canvas"),c=i.getContext("2d");i.width=t.clientWidth,i.height=t.clientHeight,c==null||c.drawImage(t,0,0,i.width,i.height);const a=i.toDataURL();return w(a)}const r=t.poster,n=E(r),s=await x(r,n,e);return w(s)}async function rt(t){var e;try{if(!((e=t==null?void 0:t.contentDocument)===null||e===void 0)&&e.body)return await y(t.contentDocument.body,{},!0)}catch{}return t.cloneNode(!1)}async function st(t,e){return l(t,HTMLCanvasElement)?et(t):l(t,HTMLVideoElement)?nt(t,e):l(t,HTMLIFrameElement)?rt(t):t.cloneNode(!1)}const it=t=>t.tagName!=null&&t.tagName.toUpperCase()==="SLOT";async function ct(t,e,r){var n,s;let i=[];return it(t)&&t.assignedNodes?i=f(t.assignedNodes()):l(t,HTMLIFrameElement)&&(!((n=t.contentDocument)===null||n===void 0)&&n.body)?i=f(t.contentDocument.body.childNodes):i=f(((s=t.shadowRoot)!==null&&s!==void 0?s:t).childNodes),i.length===0||l(t,HTMLVideoElement)||await i.reduce((c,a)=>c.then(()=>y(a,r)).then(o=>{o&&e.appendChild(o)}),Promise.resolve()),e}function at(t,e){const r=e.style;if(!r)return;const n=window.getComputedStyle(t);n.cssText?(r.cssText=n.cssText,r.transformOrigin=n.transformOrigin):f(n).forEach(s=>{let i=n.getPropertyValue(s);s==="font-size"&&i.endsWith("px")&&(i=`${Math.floor(parseFloat(i.substring(0,i.length-2)))-.1}px`),l(t,HTMLIFrameElement)&&s==="display"&&i==="inline"&&(i="block"),s==="d"&&e.getAttribute("d")&&(i=`path(${e.getAttribute("d")})`),r.setProperty(s,i,n.getPropertyPriority(s))})}function ot(t,e){l(t,HTMLTextAreaElement)&&(e.innerHTML=t.value),l(t,HTMLInputElement)&&e.setAttribute("value",t.value)}function lt(t,e){if(l(t,HTMLSelectElement)){const r=e,n=Array.from(r.children).find(s=>t.value===s.getAttribute("value"));n&&n.setAttribute("selected","")}}function ut(t,e){return l(e,Element)&&(at(t,e),K(t,e),ot(t,e),lt(t,e)),e}async function ft(t,e){const r=t.querySelectorAll?t.querySelectorAll("use"):[];if(r.length===0)return t;const n={};for(let i=0;i<r.length;i++){const a=r[i].getAttribute("xlink:href");if(a){const o=t.querySelector(a),g=document.querySelector(a);!o&&g&&!n[a]&&(n[a]=await y(g,e,!0))}}const s=Object.values(n);if(s.length){const i="http://www.w3.org/1999/xhtml",c=document.createElementNS(i,"svg");c.setAttribute("xmlns",i),c.style.position="absolute",c.style.width="0",c.style.height="0",c.style.overflow="hidden",c.style.display="none";const a=document.createElementNS(i,"defs");c.appendChild(a);for(let o=0;o<s.length;o++)a.appendChild(s[o]);t.appendChild(c)}return t}async function y(t,e,r){return!r&&e.filter&&!e.filter(t)?null:Promise.resolve(t).then(n=>st(n,e)).then(n=>ct(t,n,e)).then(n=>ut(t,n)).then(n=>ft(n,e))}const D=/url\((['"]?)([^'"]+?)\1\)/g,ht=/url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g,gt=/src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;function mt(t){const e=t.replace(/([.*+?^${}()|\[\]\/\\])/g,"\\$1");return new RegExp(`(url\\(['"]?)(${e})(['"]?\\))`,"g")}function dt(t){const e=[];return t.replace(D,(r,n,s)=>(e.push(s),r)),e.filter(r=>!b(r))}async function wt(t,e,r,n,s){try{const i=r?M(e,r):e,c=E(e);let a;return s||(a=await x(i,c,n)),t.replace(mt(e),`$1${a}$3`)}catch{}return t}function yt(t,{preferredFontFormat:e}){return e?t.replace(gt,r=>{for(;;){const[n,,s]=ht.exec(r)||[];if(!s)return"";if(s===e)return`src: ${n};`}}):t}function v(t){return t.search(D)!==-1}async function U(t,e,r){if(!v(t))return t;const n=yt(t,r);return dt(n).reduce((i,c)=>i.then(a=>wt(a,c,e,r)),Promise.resolve(n))}async function m(t,e,r){var n;const s=(n=e.style)===null||n===void 0?void 0:n.getPropertyValue(t);if(s){const i=await U(s,null,r);return e.style.setProperty(t,i,e.style.getPropertyPriority(t)),!0}return!1}async function pt(t,e){await m("background",t,e)||await m("background-image",t,e),await m("mask",t,e)||await m("mask-image",t,e)}async function St(t,e){const r=l(t,HTMLImageElement);if(!(r&&!b(t.src))&&!(l(t,SVGImageElement)&&!b(t.href.baseVal)))return;const n=r?t.src:t.href.baseVal,s=await x(n,E(n),e);await new Promise((i,c)=>{t.onload=i,t.onerror=c;const a=t;a.decode&&(a.decode=i),a.loading==="lazy"&&(a.loading="eager"),r?(t.srcset="",t.src=s):t.href.baseVal=s})}async function bt(t,e){const n=f(t.childNodes).map(s=>k(s,e));await Promise.all(n).then(()=>t)}async function k(t,e){l(t,Element)&&(await pt(t,e),await St(t,e),await bt(t,e))}function Et(t,e){const{style:r}=t;e.backgroundColor&&(r.backgroundColor=e.backgroundColor),e.width&&(r.width=`${e.width}px`),e.height&&(r.height=`${e.height}px`);const n=e.style;return n!=null&&Object.keys(n).forEach(s=>{r[s]=n[s]}),t}const $={};async function T(t){let e=$[t];if(e!=null)return e;const n=await(await fetch(t)).text();return e={url:t,cssText:n},$[t]=e,e}async function L(t,e){let r=t.cssText;const n=/url\(["']?([^"')]+)["']?\)/g,i=(r.match(/url\([^)]+\)/g)||[]).map(async c=>{let a=c.replace(n,"$1");return a.startsWith("https://")||(a=new URL(a,t.url).href),F(a,e.fetchRequestInit,({result:o})=>(r=r.replace(c,`url(${o})`),[c,o]))});return Promise.all(i).then(()=>r)}function I(t){if(t==null)return[];const e=[],r=/(\/\*[\s\S]*?\*\/)/gi;let n=t.replace(r,"");const s=new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})","gi");for(;;){const o=s.exec(n);if(o===null)break;e.push(o[0])}n=n.replace(s,"");const i=/@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi,c="((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})",a=new RegExp(c,"gi");for(;;){let o=i.exec(n);if(o===null){if(o=a.exec(n),o===null)break;i.lastIndex=a.lastIndex}else a.lastIndex=i.lastIndex;e.push(o[0])}return e}async function xt(t,e){const r=[],n=[];return t.forEach(s=>{if("cssRules"in s)try{f(s.cssRules||[]).forEach((i,c)=>{if(i.type===CSSRule.IMPORT_RULE){let a=c+1;const o=i.href,g=T(o).then(h=>L(h,e)).then(h=>I(h).forEach(p=>{try{s.insertRule(p,p.startsWith("@import")?a+=1:s.cssRules.length)}catch(H){console.error("Error inserting rule from remote css",{rule:p,error:H})}})).catch(h=>{console.error("Error loading remote css",h.toString())});n.push(g)}})}catch(i){const c=t.find(a=>a.href==null)||document.styleSheets[0];s.href!=null&&n.push(T(s.href).then(a=>L(a,e)).then(a=>I(a).forEach(o=>{c.insertRule(o,s.cssRules.length)})).catch(a=>{console.error("Error loading remote stylesheet",a)})),console.error("Error inlining remote css file",i)}}),Promise.all(n).then(()=>(t.forEach(s=>{if("cssRules"in s)try{f(s.cssRules||[]).forEach(i=>{r.push(i)})}catch(i){console.error(`Error while reading CSS rules from ${s.href}`,i)}}),r))}function Rt(t){return t.filter(e=>e.type===CSSRule.FONT_FACE_RULE).filter(e=>v(e.style.getPropertyValue("src")))}async function Ct(t,e){if(t.ownerDocument==null)throw new Error("Provided element is not within a Document");const r=f(t.ownerDocument.styleSheets),n=await xt(r,e);return Rt(n)}async function Pt(t,e){const r=await Ct(t,e);return(await Promise.all(r.map(s=>{const i=s.parentStyleSheet?s.parentStyleSheet.href:null;return U(s.cssText,i,e)}))).join(`
`)}async function $t(t,e){const r=e.fontEmbedCSS!=null?e.fontEmbedCSS:e.skipFonts?null:await Pt(t,e);if(r){const n=document.createElement("style"),s=document.createTextNode(r);n.appendChild(s),t.firstChild?t.insertBefore(n,t.firstChild):t.appendChild(n)}}async function Tt(t,e={}){const{width:r,height:n}=A(t,e),s=await y(t,e,!0);return await $t(s,e),await k(s,e),Et(s,e),await z(s,r,n)}async function V(t,e={}){const{width:r,height:n}=A(t,e),s=await Tt(t,e),i=await w(s),c=document.createElement("canvas"),a=c.getContext("2d"),o=e.pixelRatio||j(),g=e.canvasWidth||r,h=e.canvasHeight||n;return c.width=g*o,c.height=h*o,e.skipAutoScale||q(c),c.style.width=`${g}`,c.style.height=`${h}`,e.backgroundColor&&(a.fillStyle=e.backgroundColor,a.fillRect(0,0,c.width,c.height)),a.drawImage(i,0,0,c.width,c.height),c}async function Lt(t,e={}){return(await V(t,e)).toDataURL()}async function It(t,e={}){return(await V(t,e)).toDataURL("image/jpeg",e.quality||1)}export{It as a,Lt as t};
