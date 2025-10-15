import { I as executeAsync } from '../nitro/nitro.mjs';
import { a as a$1 } from './auth2.mjs';
import { unref, toRefs } from 'vue';
import { h, m } from './server.mjs';
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
import './fetch.mjs';
import 'vue-router';
import 'vue/server-renderer';

const {getters:a,actions:d}=a$1,{setUser:i}=d,{userIsSet:n}=toRefs(a),u=h((async s=>{let t,m$1;return [t,m$1]=executeAsync((()=>i())),await t,m$1(),unref(n)&&"index"===s.name?m("/dashboard"):unref(n)||"index"===s.name?void 0:m("/")}));

export { u as default };
//# sourceMappingURL=auth.mjs.map
