import { p, g } from './server.mjs';
import { b, s } from './MainButton.vue.mjs';
import { d } from './MainLoader.vue.mjs';
import { withAsyncContext, ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
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

const h={__name:"[episodeSlug]",__ssrInlineRender:true,async setup(n){let h,y;const w=p(),$=w.params.show,k=w.params.episodeSlug,{data:A}=([h,y]=withAsyncContext((()=>i(`/api/dashboard/${$}/${k}`,"$BVnoTZ8TRU"))),h=await h,y(),h),_=ref(null);ref(null);const S=ref(false),U=ref(""),j=ref(false),D=async()=>{if(_.value){S.value=true,U.value="";try{const e=new FormData;e.append("audio",_.value);await $fetch(`/api/dashboard/${$}/${k}/upload`,{method:"POST",body:e});U.value="Audio uploaded successfully!",j.value=!0,setTimeout((()=>{(void 0).location.reload();}),1e3);}catch(e){U.value="Failed to upload audio. Please try again.",j.value=false;}finally{S.value=false;}}};return (t,o,n,v)=>{const f=g,h=b,y=d;o(`<div${ssrRenderAttrs(mergeProps({class:"max-w-6xl mx-auto p-5"},v))}><div class="mb-8">`),o(ssrRenderComponent(f,{to:`/dashboard/${unref(A).showSlug}`,class:"inline-block mb-4 text-blue-500 no-underline text-sm hover:underline"},{default:withCtx(((e,s,a,t)=>{if(!s)return [createTextVNode(" ← Back to "+toDisplayString(unref(A).showName),1)];s(` ← Back to ${ssrInterpolate(unref(A).showName)}`);})),_:1},n)),o(`<h1 class="text-4xl font-bold m-0 text-gray-900">${ssrInterpolate(unref(A).episode.title)}</h1></div><div class="flex flex-col gap-8"><div class="bg-gray-100/50 p-6 rounded-xl"><h2 class="mt-0 mb-4 text-xl font-semibold text-gray-900">Episode Information</h2><div class="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4"><div class="flex flex-col gap-1"><span class="text-xs uppercase opacity-70 font-semibold text-gray-900">Slug:</span><span class="text-base text-gray-900">${ssrInterpolate(unref(A).episode.slug)}</span></div><div class="flex flex-col gap-1"><span class="text-xs uppercase opacity-70 font-semibold text-gray-900">Position:</span><span class="text-base text-gray-900">${ssrInterpolate(unref(A).episode.position)}</span></div><div class="flex flex-col gap-1"><span class="text-xs uppercase opacity-70 font-semibold text-gray-900">Audio Status:</span><span class="${ssrRenderClass([{"text-green-500":unref(A).episode.hasAudio,"text-yellow-500":!unref(A).episode.hasAudio},"text-base"])}">${ssrInterpolate(unref(A).episode.hasAudio?"✓ Uploaded":"⚠ Not Uploaded")}</span></div>`),unref(A).episode.createdAt?o(`<div class="flex flex-col gap-1"><span class="text-xs uppercase opacity-70 font-semibold text-gray-900">Created:</span><span class="text-base text-gray-900">${ssrInterpolate(new Date(unref(A).episode.createdAt).toLocaleString())}</span></div>`):o("\x3c!----\x3e"),o(`</div></div><div class="bg-gray-100/50 p-6 rounded-xl"><h2 class="mt-0 mb-4 text-xl font-semibold text-gray-900">Thumbnail</h2><img${ssrRenderAttr("src",unref(A).episode.image)}${ssrRenderAttr("alt",unref(A).episode.title)} class="w-full max-w-md h-auto rounded-lg"></div>`),unref(A).episode.youtubeVideoId?o(`<div class="bg-gray-100/50 p-6 rounded-xl"><h2 class="mt-0 mb-4 text-xl font-semibold text-gray-900">YouTube Video</h2><div class="relative pb-[56.25%] pt-6 h-0 max-w-4xl"><iframe${ssrRenderAttr("src",`https://www.youtube.com/embed/${unref(A).episode.youtubeVideoId}`)}${ssrRenderAttr("title",unref(A).episode.title)} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen class="absolute top-0 left-0 w-full h-full"></iframe></div></div>`):o("\x3c!----\x3e"),o(`<div class="bg-gray-100/50 p-6 rounded-xl"><h2 class="mt-0 mb-4 text-xl font-semibold text-gray-900">Short Description</h2><p class="leading-relaxed whitespace-pre-wrap text-gray-900">${ssrInterpolate(unref(A).episode.shortDescription||"No short description available")}</p></div><div class="bg-gray-100/50 p-6 rounded-xl"><h2 class="mt-0 mb-4 text-xl font-semibold text-gray-900">Full Description</h2><p class="leading-relaxed whitespace-pre-wrap text-gray-900">${ssrInterpolate(unref(A).episode.description||"No description available")}</p></div>`),unref(A).episode.hasAudio?o(`<div class="bg-gray-100/50 p-6 rounded-xl"><h2 class="mt-0 mb-4 text-xl font-semibold text-gray-900">Audio Player</h2><audio controls${ssrRenderAttr("src",unref(A).episode.audioUrl)} class="w-full max-w-2xl"></audio></div>`):o("\x3c!----\x3e"),o('<div class="bg-gray-100/50 p-6 rounded-xl"><h2 class="mt-0 mb-4 text-xl font-semibold text-gray-900">Upload Audio</h2><div class="flex flex-col gap-3 items-start"><input type="file" accept="audio/mp3,audio/mpeg" class="p-2 border border-gray-300 rounded bg-gray-50 text-gray-900">'),o(ssrRenderComponent(h,{theme:unref(s).primary,label:unref(S)?"Uploading...":"Upload Audio",onClick:D,disabled:!unref(_)||unref(S),class:"min-w-[150px]"},null,n)),unref(S)?(o('<div class="w-4 h-4">'),o(ssrRenderComponent(y,null,null,n)),o("</div>")):o("\x3c!----\x3e"),unref(U)?o(`<p class="${ssrRenderClass({"text-green-500":unref(j),"text-red-500":!unref(j)})}">${ssrInterpolate(unref(U))}</p>`):o("\x3c!----\x3e"),o("</div></div></div></div>");}}},y=h.setup;h.setup=(e,s)=>{const a=useSSRContext();return (a.modules||(a.modules=new Set)).add("pages/dashboard/[show]/[episodeSlug].vue"),y?y(e,s):void 0};

export { h as default };
//# sourceMappingURL=_episodeSlug_.vue.mjs.map
