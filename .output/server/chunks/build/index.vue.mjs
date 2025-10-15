import { m, _, g as g$1 } from './server.mjs';
import { b, r as r$2, s as s$1 } from './MainButton.vue.mjs';
import { unref, useSSRContext, withCtx, createVNode, toRef, isRef, withAsyncContext, toDisplayString, mergeProps } from 'vue';
import { ssrRenderTeleport, ssrRenderComponent, ssrRenderSlot, ssrRenderAttr, ssrRenderAttrs, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { i } from './fetch.mjs';
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
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';

const o={close:"close"};

const r$1={__name:"DialogWrapper",__ssrInlineRender:true,props:{isModalOpen:{type:Boolean,default:false}},emits:["update:isModalOpen"],setup(o$1,{emit:r}){const d=r,p=()=>{d("update:isModalOpen",false);};return (r,d,m,u)=>{const c=b;ssrRenderTeleport(d,(e=>{o$1.isModalOpen?(e('<div class="text-xs leading-tight flex items-center justify-center fixed top-0 right-0 bottom-0 left-0 z-20"><div class="absolute top-0 right-0 bottom-0 left-0 bg-gray-500/30"></div><div class="relative z-10 bg-white rounded-2xl max-h-[94vh] max-w-[94vw]">'),e(ssrRenderComponent(c,{label:"close modal",isLabelShow:false,size:unref(r$2).s,icon:unref(o).close,onClick:p,class:"absolute top-2 right-2"},null,m)),ssrRenderSlot(r.$slots,"default",{},null,e,m),e("</div></div>")):e("\x3c!----\x3e");}),"body",false,m);}}},d$1=r$1.setup;r$1.setup=(e,t)=>{const s=useSSRContext();return (s.modules||(s.modules=new Set)).add("components/DialogWrapper.vue"),d$1?d$1(e,t):void 0};

const t=publicAssetsURL("/google-logo.svg");

const u$2={__name:"LoginView",__ssrInlineRender:true,setup(n){const u=async e=>{const o=await $fetch(`/api/auth/${e}/redirect`,{method:"GET",headers:{"Content-Type":"application/json"}});m(o.url,{external:true});};return (n,m,d,p)=>{const g=b;m(ssrRenderComponent(r$1,p,{default:withCtx(((e,o,t$1,n)=>{if(!o)return [createVNode("div",{class:"flex flex-col items-center py-12 px-6"},[createVNode("h1",{class:"text-4xl font-bold text-gray-900"},"Login to your account"),createVNode("div",{class:"flex items-center mt-3.5"},[createVNode("img",{src:t,loading:"lazy",alt:"google logo",class:"mr-2.5 w-6 h-auto"}),createVNode(g,{theme:unref(s$1).secondary,onClick:e=>u("google"),label:"Login with Google"},null,8,["theme","onClick"])])])];o(`<div class="flex flex-col items-center py-12 px-6"${n}><h1 class="text-4xl font-bold text-gray-900"${n}>Login to your account</h1><div class="flex items-center mt-3.5"${n}><img${ssrRenderAttr("src",t)} loading="lazy" alt="google logo" class="mr-2.5 w-6 h-auto"${n}>`),o(ssrRenderComponent(g,{theme:unref(s$1).secondary,onClick:e=>u("google"),label:"Login with Google"},null,t$1,n)),o("</div></div>");})),_:1},d));}}},d=u$2.setup;u$2.setup=(e,o)=>{const t=useSSRContext();return (t.modules||(t.modules=new Set)).add("components/LoginView.vue"),d?d(e,o):void 0};

function e(...e){const r="string"==typeof e[e.length-1]?e.pop():void 0;"string"!=typeof e[0]&&e.unshift(r);const[i,s]=e;if(!i||"string"!=typeof i)throw new TypeError("[nuxt] [useState] key must be a string: "+i);if(void 0!==s&&"function"!=typeof s)throw new Error("[nuxt] [useState] init must be a function: "+s);const u="$s"+i,f=_(),a=toRef(f.payload.state,u);if(void 0===a.value&&s){const t=s();if(isRef(t))return f.payload.state[u]=t,t;a.value=t;}return a}

const s=()=>e("loginDialog",(()=>false));

const u$1={__name:"MainLending",__ssrInlineRender:true,setup(n){const u=s();return (n,m,x,y)=>{const f=g$1,g=b,b$1=u$2;m(`<div${ssrRenderAttrs(y)}><header class="flex justify-between items-center pt-5">`),m(ssrRenderComponent(f,{to:"/",class:"no-underline"},{default:withCtx(((t,e,s,o)=>{if(!e)return [createVNode("h1",{class:"text-4xl font-black text-gray-900"},"Ypod")];e(`<h1 class="text-4xl font-black text-gray-900"${o}>Ypod</h1>`);})),_:1},x)),m(ssrRenderComponent(g,{theme:unref(s$1).primary,size:unref(r$2).l,label:"Login / Sign Up",onClick:t=>u.value=true},null,x)),m(ssrRenderComponent(b$1,{isModalOpen:unref(u),"onUpdate:isModalOpen":t=>isRef(u)?u.value=t:null},null,x)),m('</header><section class="p-8"><h1 class="text-4xl font-bold text-center my-6 text-gray-900">Ypod - make podcast from youtube playlist</h1><p class="text-base text-center my-4 text-gray-900"> Just mirror audio tracks from youtube playlist to simple webpage and rss </p></section><section id="features" class="p-8"><h2 class="text-3xl font-semibold text-center my-4 text-gray-900">Setup podcast in a minute</h2><p class="text-base text-center my-4 text-gray-900"> Provide a link to youtube playlist and we setup podcast for you </p><div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8"><div class="border border-gray-300 rounded-lg p-4"><h5 class="text-xl font-bold text-left m-0 text-gray-900">Simple webpage</h5><p class="text-base text-left my-4 text-gray-900"> Simple webpage with list of episode </p></div><div class="border border-gray-300 rounded-lg p-4"><h5 class="text-xl font-bold text-left m-0 text-gray-900">RSS</h5><p class="text-base text-left my-4 text-gray-900"> RSS feed for your podcast, which works with any podcast application </p></div></div></section><section id="get-started" class="p-8"><h3 class="text-2xl font-bold text-center my-4 text-gray-900">Get Started</h3><p class="text-base text-center my-4 text-gray-900">Ready to dive in? Login I will contact you via email</p>'),m(ssrRenderComponent(g,{theme:unref(s$1).primary,size:unref(r$2).l,label:"Get started",onClick:t=>u.value=true,class:"mx-auto"},null,x)),m("</section></div>");}}},x=u$1.setup;u$1.setup=(t,e)=>{const s=useSSRContext();return (s.modules||(s.modules=new Set)).add("components/MainLending.vue"),x?x(t,e):void 0};

const g={__name:"PodcastPage",__ssrInlineRender:true,props:{slug:{type:String,default:""}},async setup(n){let g,f;const{data:v}=([g,f]=withAsyncContext((()=>i(`/api/podcast/${n.slug}`,"$pePQ9FvXbh"))),g=await g,f(),g);return (s,n,x,g)=>{const f=b,h=g$1;n(`<div${ssrRenderAttrs(g)}><h1 class="p-5 text-center text-4xl font-bold text-gray-900">${ssrInterpolate(unref(v).showName)}</h1><div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">\x3c!--[--\x3e`),ssrRenderList(unref(v).links,(t=>{n(ssrRenderComponent(f,{theme:unref(s$1).primary,label:t.text,href:t.link,tag:"a",target:"_blank",class:"w-full text-center"},null,x));})),n('\x3c!--]--\x3e</div><div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 mt-5">\x3c!--[--\x3e'),ssrRenderList(unref(v).episodes,(t=>{n('<div class="bg-gray-200 rounded-2xl">'),n(ssrRenderComponent(h,{to:`/episode/${t.slug}`},{default:withCtx(((e,s,o,a)=>{if(!s)return [createVNode("img",{src:t.image,alt:"Podcast logo",class:"w-full h-auto m-0 rounded-2xl"},null,8,["src"]),createVNode("h5",{class:"p-5 text-left text-xl font-bold text-gray-900"},toDisplayString(t.title),1)];s(`<img${ssrRenderAttr("src",t.image)} alt="Podcast logo" class="w-full h-auto m-0 rounded-2xl"${a}><h5 class="p-5 text-left text-xl font-bold text-gray-900"${a}>${ssrInterpolate(t.title)}</h5>`);})),_:2},x)),n("</div>");})),n("\x3c!--]--\x3e</div></div>");}}},f=g.setup;g.setup=(t,e)=>{const s=useSSRContext();return (s.modules||(s.modules=new Set)).add("components/PodcastPage.vue"),f?f(t,e):void 0};

const r={__name:"index",__ssrInlineRender:true,async setup(m){let r,u;const{data:a}=([r,u]=withAsyncContext((()=>i("/api/type",{method:"GET"},"$RcJmAH4yb5"))),r=await r,u(),r);return (t,m,p,r)=>{const u=u$1,i=g;"lending"===unref(a).type?m(ssrRenderComponent(u,r,null,p)):"podcast"===unref(a).type?m(ssrRenderComponent(i,mergeProps({slug:unref(a).podcastSlug},r),null,p)):m("\x3c!----\x3e");}}},u=r.setup;r.setup=(e,o)=>{const t=useSSRContext();return (t.modules||(t.modules=new Set)).add("pages/index.vue"),u?u(e,o):void 0};

export { r as default };
//# sourceMappingURL=index.vue.mjs.map
