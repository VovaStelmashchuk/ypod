import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
import { t } from './server.mjs';

const n={};const s=n.setup;n.setup=(e,o)=>{const t=useSSRContext();return (t.modules||(t.modules=new Set)).add("components/MainLoader.vue"),s?s(e,o):void 0};const d=t(n,[["ssrRender",function(r,t,n,s){t(`<div${ssrRenderAttrs(mergeProps({class:"w-[120px] h-[120px] rounded-full border-[24px] border-gray-200 border-t-gray-900 animate-spin"},s))}></div>`);}]]);

export { d };
//# sourceMappingURL=MainLoader.vue.mjs.map
