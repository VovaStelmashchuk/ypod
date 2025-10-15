import { readonly, computed, reactive, unref } from 'vue';
import { i } from './fetch.mjs';

const u=reactive({userIsSet:false,user:{}});const a=readonly({getters:{user:computed((()=>u.user)),userIsSet:computed((()=>u.userIsSet))},actions:{setUser:async function(){try{const{data:e}=await i("/api/user","$r1ecUCCiqB"),s=unref(e);s&&Boolean(s.id)?(u.user=s,u.userIsSet=!0):(u.user={},u.userIsSet=!1);}catch(e){console.error("Failed to set user:",e),u.user={},u.userIsSet=false;}},logout:async function(){try{await $fetch("/api/auth/logout",{method:"POST",credentials:"include"}),u.user={},u.userIsSet=!1;}catch(e){console.error("Logout failed:",e);}}}});

export { a };
//# sourceMappingURL=auth2.mjs.map
