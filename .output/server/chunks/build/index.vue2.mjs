import { g } from './server.mjs';
import { withAsyncContext, mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
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

const x={__name:"index",__ssrInlineRender:true,async setup(n){let x,c;const{data:h}=([x,c]=withAsyncContext((()=>i("/api/dashboard/shows","$IZzfDE6a5j"))),x=await x,c(),x);return (s,n,l,x)=>{const c=g;n(`<div${ssrRenderAttrs(mergeProps({class:"grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8"},x))}>\x3c!--[--\x3e`),ssrRenderList(unref(h).shows,(e=>{n(ssrRenderComponent(c,{to:`/dashboard/${e.slug}`},{default:withCtx(((s,t,o,d)=>{if(!t)return [createVNode("h2",{class:"text-3xl font-semibold text-gray-900"},toDisplayString(e.name),1)];t(`<h2 class="text-3xl font-semibold text-gray-900"${d}>${ssrInterpolate(e.name)}</h2>`);})),_:2},l));})),n("\x3c!--]--\x3e</div>");}}},c=x.setup;x.setup=(e,s)=>{const t=useSSRContext();return (t.modules||(t.modules=new Set)).add("pages/dashboard/index.vue"),c?c(e,s):void 0};

export { x as default };
//# sourceMappingURL=index.vue2.mjs.map
