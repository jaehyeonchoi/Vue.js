//main.js에서 import를 통해 다른 스크립트들을 모두 연결

//import Vue from 'vue'; //vue2 문법
import {createApp} from 'vue';

import ResponseCheck from "./ResponseCheck.vue"; //ResponseCheck.vue에서 export default에 들어간 객체들을 import해서 가져옴

//new Vue().$mount('#root'); //vue2 문법
createApp(ResponseCheck).mount('#root');//Vue 인스턴스