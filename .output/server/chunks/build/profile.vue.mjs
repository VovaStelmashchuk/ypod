import { computed, unref, createVNode, resolveDynamicComponent, mergeProps, withCtx, createBlock, openBlock, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderVNode, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { a } from './auth2.mjs';
import { p, g, c } from './server.mjs';
import { b, s as s$1 } from './MainButton.vue.mjs';
import './fetch.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:crypto';
import 'events';
import 'http';
import 'stream';
import 'crypto';
import 'buffer';
import 'zlib';
import 'https';
import 'net';
import 'tls';
import 'url';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'mongodb';
import 'podcast';
import 'node:url';
import 'vue-router';

const m$1={m:"m",s:"s"},s=m$1.m;

const y={__name:"Avatar",__ssrInlineRender:true,props:{size:{type:String,default:s}},setup(m){const c=p(),y=computed((()=>{const e=unref(m.size);return `rounded-full ${"s"===e?"w-10 h-10":"m"===e?"w-35 h-35":"w-10 h-10"}`})),$=computed((()=>"/profile"===c.path)),_=computed((()=>unref($)?"div":g)),b=computed((()=>unref($)?{}:{to:"/profile"})),{getters:h}=a,j=computed((()=>h.user)),w=()=>{var e;return ((null==(e=j.value)?void 0:e.name)||"U").charAt(0).toUpperCase()};return (e,a,m,c)=>{ssrRenderVNode(a,createVNode(resolveDynamicComponent(_.value),mergeProps(b.value,c),{default:withCtx(((e,a,r,s)=>{if(!a)return [j.value.avatar?(openBlock(),createBlock("img",{key:0,class:y.value,src:j.value.avatar,alt:j.value.name||"User avatar"},null,10,["src","alt"])):(openBlock(),createBlock("div",{key:1,class:[y.value,"bg-gray-300 flex items-center justify-center"]},[createVNode("span",{class:"text-gray-600 font-bold text-sm"},toDisplayString(w()),1)],2))];j.value.avatar?a(`<img class="${ssrRenderClass(y.value)}"${ssrRenderAttr("src",j.value.avatar)}${ssrRenderAttr("alt",j.value.name||"User avatar")}${s}>`):a(`<div class="${ssrRenderClass([y.value,"bg-gray-300 flex items-center justify-center"])}"${s}><span class="text-gray-600 font-bold text-sm"${s}>${ssrInterpolate(w())}</span></div>`);})),_:1}),m);}}},$=y.setup;y.setup=(e,a)=>{const t=useSSRContext();return (t.modules||(t.modules=new Set)).add("components/Avatar.vue"),$?$(e,a):void 0};

const d={__name:"MeProfile",__ssrInlineRender:true,setup(m){const d=c(),{getters:f,actions:v}=a,{logout:x}=v,h=computed((()=>f.user)),j=async()=>{await x(),d.push({path:"/"});};return (e,m,p,c)=>{const d=y,f=b;m(`<div${ssrRenderAttrs(mergeProps({class:"flex flex-row"},c))}>`),m(ssrRenderComponent(d,{size:unref(m$1).m,class:"mr-4"},null,p)),m(`<div class="flex flex-col"><h2 class="text-3xl font-semibold text-gray-900">${ssrInterpolate(unref(h).name)}</h2>`),m(ssrRenderComponent(f,{theme:unref(s$1).primary,onClick:j,label:"Logout"},null,p)),m("</div></div>");}}},f=d.setup;d.setup=(t,o)=>{const e=useSSRContext();return (e.modules||(e.modules=new Set)).add("components/MeProfile.vue"),f?f(t,o):void 0};

const n={__name:"profile",__ssrInlineRender:true,setup:s=>(s,n,m,u)=>{const d$1=d;n(`<div${ssrRenderAttrs(mergeProps({class:"main"},u))}>`),n(ssrRenderComponent(d$1,null,null,m)),n("</div>");}},m=n.setup;n.setup=(e,o)=>{const r=useSSRContext();return (r.modules||(r.modules=new Set)).add("pages/profile.vue"),m?m(e,o):void 0};

export { n as default };
//# sourceMappingURL=profile.vue.mjs.map
