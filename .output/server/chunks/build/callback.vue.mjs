import { d } from './MainLoader.vue.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { t as t$1 } from './server.mjs';
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

const i={};const u$1=i.setup;i.setup=(e,t)=>{const r=useSSRContext();return (r.modules||(r.modules=new Set)).add("components/AuthProgress.vue"),u$1?u$1(e,t):void 0};const a=t$1(i,[["ssrRender",function(s,n,i,u){const a=d;n(`<div${ssrRenderAttrs(mergeProps({class:"text-center flex items-center justify-center flex-col"},u))}><h2 class="text-3xl font-semibold text-gray-900">Authenticating...</h2>`),n(ssrRenderComponent(a,{class:"mt-5 mb-10 w-30 h-30"},null,i)),n('<p class="text-base text-gray-900">Please wait a moment while we process your authentication.</p></div>');}]]);

const t={__name:"callback",__ssrInlineRender:true,setup:s=>(s,t,u,m)=>{t(ssrRenderComponent(a,m,null,u));}},u=t.setup;t.setup=(e,o)=>{const t=useSSRContext();return (t.modules||(t.modules=new Set)).add("pages/auth/google/callback.vue"),u?u(e,o):void 0};

export { t as default };
//# sourceMappingURL=callback.vue.mjs.map
