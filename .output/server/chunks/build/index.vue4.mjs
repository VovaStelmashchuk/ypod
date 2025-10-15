import { d } from './MainLoader.vue.mjs';
import { b as b$1, s } from './MainButton.vue.mjs';
import { p, g } from './server.mjs';
import { withAsyncContext, ref, unref, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
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

const h={__name:"index",__ssrInlineRender:true,async setup(n){let h,b;const g$1=p().params.show,{data:y}=([h,b]=withAsyncContext((()=>i(`/api/dashboard/${g$1}/episodes`,"$MIFOtQuBvS"))),h=await h,b(),h),w=ref(false),k=ref(false),$=ref(false);ref(null);const _=async()=>{w.value=true,await i(`/api/dashboard/${g$1}/sync`,{method:"POST"},"$DDcv21LZCy"),w.value=false;},j=async()=>{$.value=true;try{await $fetch(`/api/dashboard/${g$1}/rss-update`,{method:"POST"});}catch(e){console.error("Error updating RSS:",e);}finally{$.value=false;}};return (s$1,a,n,f)=>{const v=d,h=b$1,b=g;a(`\x3c!--[--\x3e<div><h1 class="p-5 text-center text-4xl font-bold text-gray-900">${ssrInterpolate(unref(y).showName)}</h1></div><div class="my-4 p-4 border border-gray-300 rounded-lg bg-gray-50"><label for="logo-upload" class="block mb-2 font-semibold text-sm text-gray-900">Upload Podcast Logo</label><div class="flex items-center gap-3"><input id="logo-upload" type="file" accept="image/*" class="p-2 border border-gray-300 rounded bg-white cursor-pointer text-sm text-gray-900 file:py-1.5 file:px-3 file:border-0 file:rounded file:bg-blue-500 file:text-white file:cursor-pointer file:mr-2 hover:file:bg-blue-600">`),unref(k)?(a('<div class="w-4 h-4">'),a(ssrRenderComponent(v,null,null,n)),a("</div>")):a("\x3c!----\x3e"),a('</div></div><div class="flex flex-row items-center gap-2">'),a(ssrRenderComponent(h,{theme:unref(s).primary,label:"Sync with youtube playlist",class:"my-2",onClick:_},null,n)),unref(w)?(a('<div class="w-4 h-4">'),a(ssrRenderComponent(v,null,null,n)),a("</div>")):a("\x3c!----\x3e"),a(ssrRenderComponent(h,{theme:unref(s).primary,label:"Update RSS",class:"my-2",onClick:j},null,n)),unref($)?(a('<div class="w-4 h-4">'),a(ssrRenderComponent(v,null,null,n)),a("</div>")):a("\x3c!----\x3e"),a('</div><div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">\x3c!--[--\x3e'),ssrRenderList(unref(y).episodes,(e=>{a(ssrRenderComponent(b,{to:`/dashboard/${unref(g$1)}/${e.slug}`,class:"block no-underline text-inherit transition-all duration-200 ease-in-out cursor-pointer hover:-translate-y-1 hover:opacity-90"},{default:withCtx(((t,o,s,a)=>{if(!o)return [createVNode("img",{src:e.image,alt:"Podcast logo",class:"w-full h-auto m-0 rounded-2xl"},null,8,["src"]),createVNode("p",{class:"mt-2 font-medium text-gray-900"},toDisplayString(e.title),1)];o(`<img${ssrRenderAttr("src",e.image)} alt="Podcast logo" class="w-full h-auto m-0 rounded-2xl"${a}><p class="mt-2 font-medium text-gray-900"${a}>${ssrInterpolate(e.title)}</p>`);})),_:2},n));})),a("\x3c!--]--\x3e</div>\x3c!--]--\x3e");}}},b=h.setup;h.setup=(e,t)=>{const o=useSSRContext();return (o.modules||(o.modules=new Set)).add("pages/dashboard/[show]/index.vue"),b?b(e,t):void 0};

export { h as default };
//# sourceMappingURL=index.vue4.mjs.map
