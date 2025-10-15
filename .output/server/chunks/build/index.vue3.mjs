import { p, g } from './server.mjs';
import { b, s } from './MainButton.vue.mjs';
import { withAsyncContext, withCtx, createVNode, toDisplayString, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
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

const h={__name:"index",__ssrInlineRender:true,async setup(i$1){let h,v;const b$1=p().params.slug,{data:g$1}=([h,v]=withAsyncContext((()=>i(`/api/podcast/--auto-slug--/${b$1}`,"$M8svorQ4_h"))),h=await h,v(),h);return (s$1,i,x,f)=>{const h=g,v=b;i(`<div${ssrRenderAttrs(f)}>`),i(ssrRenderComponent(h,{to:"/"},{default:withCtx(((e,t,s,o)=>{if(!t)return [createVNode("h1",{class:"p-5 text-center text-4xl font-bold text-gray-900"},toDisplayString(unref(g$1).showName),1)];t(`<h1 class="p-5 text-center text-4xl font-bold text-gray-900"${o}>${ssrInterpolate(unref(g$1).showName)}</h1>`);})),_:1},x)),i('<div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">\x3c!--[--\x3e'),ssrRenderList(unref(g$1).links,(e=>{i(ssrRenderComponent(v,{theme:unref(s).primary,label:e.text,href:e.link,tag:"a",target:"_blank",class:"w-full text-center"},null,x));})),i(`\x3c!--]--\x3e</div><h2 class="p-5 text-center text-3xl font-semibold text-gray-900">${ssrInterpolate(unref(g$1).title)}</h2><div class="mt-5"><div class="relative pb-[56.25%] pt-6 h-0"><iframe${ssrRenderAttr("src",`https://www.youtube.com/embed/${unref(g$1).youtubeVideoId}`)}${ssrRenderAttr("title",`${unref(g$1).title}`)} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen class="absolute top-0 left-0 w-full h-full"></iframe></div></div><p class="mt-6 text-base text-gray-900">${ssrInterpolate(unref(g$1).description)}</p><audio class="mt-6 w-full" controls${ssrRenderAttr("src",unref(g$1).audioUrl)}></audio></div>`);}}},v=h.setup;h.setup=(e,t)=>{const s=useSSRContext();return (s.modules||(s.modules=new Set)).add("pages/episode/[slug]/index.vue"),v?v(e,t):void 0};

export { h as default };
//# sourceMappingURL=index.vue3.mjs.map
