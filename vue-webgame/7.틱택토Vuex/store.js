//store.js에서 data를 중앙적으로 통제 -> store를 여러 개 만들 수도 있음

import {createStore} from 'vuex'

//mutations의 함수명은 변수로 뺄 수 있음 -> 앞에 export를 붙여서 모듈로 만듦 (다른 파일 에서 쓸 수 있도록)
export const SET_WINNER = 'SET_WINNER'; //import { SET_WINNER } from './store'
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';
export const NO_WINNER = 'NO_WINNER';

//export const SET_WINNER = 'SET_WINNER';와 같이 export const로 export 하는 경우, 
//import { SET_WINNER } from './store' 형태로, 중괄호 안에 export한 이름 그대로만 가져올 수 있음 (중괄호 안에 여러 개 넣을 수 있음)

//export default new Vuex.Store();와 같이 export default로 export 하는 경우, 
//import store from './store' 형태로, 중괄호 없이 원하는 이름을 붙여서 가져올 수 있음
// -> 보통 해당 파일에서 가장 중요한 요소만 export default를 사용, 나머지 요소들을 export const

export default createStore({

    //Vuex의 주요 4가지 Concept

    state: { //Vue의 data와 유사
        tableData: [
            ['','',''],
            ['','',''],
            ['','',''],
        ],
        turn:'O',
        winner: '',
    },

    getters: { //Vue의 computed와 유사 -> 기존 state에 추가적인 작업을 수행 -> Caching하다가 state의 값이 바뀔 때만 연산 수행
        turnMessage(state) {
            return state.turn + '님이 승리하셨습니다.';
        }
    },

    mutations: { //state를 동기적으로 수정할 때 사용 -> state를 수정할 때는 반드시 mutations를 통해 수정할 것을 권장

        //mutations의 함수명은 대문자로 짓는 것이 원칙
        // SET_WINNER(state, winner) {
        //     state.winner = winner;
        // },
        // CLICK_CELL(state, {row, cell}) {
        //     state.tableData[row][cell] = state.turn;
        // },
        // CHANGE_TURN(state) {
        //     state.turn = state.turn === 'O' ? 'X' : "O";
        // },
        // RESET_GAME(state) {
        //     state.turn = '0';
        //     state.tableData = [
        //         ['','',''],
        //         ['','',''],
        //         ['','',''],
        //     ];
        // },
        // NO_WINNER(state) {
        //     state.winner = '';
        // }
        [SET_WINNER](state, winner) {
            state.winner = winner;
        },
        [CLICK_CELL](state, {row, cell}) {
            state.tableData[row][cell] = state.turn;
        },
        [CHANGE_TURN](state) {
            state.turn = state.turn === 'O' ? 'X' : "O";
        },
        [RESET_GAME](state) {
            state.turn = 'O';
            state.tableData = [
                ['','',''],
                ['','',''],
                ['','',''],
            ];
        },
        [NO_WINNER](state) {
            state.winner = '';
        }
    },

    actions: { //비동기적으로 state를 수정할 때, 또는 여러 mutations를 연달아 수행할 때,

    },
})