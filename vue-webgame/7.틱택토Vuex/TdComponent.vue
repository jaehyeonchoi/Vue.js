<template>
  <td @click="onClickTd">{{cellData}}</td>
</template>

<script>
//import Vue from 'vue'; //Vue.set을 하기 위해 Vue 객체 import

//mutation명을 변수 형태로 사용하기 위해, store.js에서 변수로 export 해놓았던 것을 import
import {CLICK_CELL, SET_WINNER, RESET_GAME, CHANGE_TURN, NO_WINNER} from "./store";

export default {
  props: {
    //cellData: String,
    rowIndex: Number,
    cellIndex: Number,
  },

  computed: { //computed를 통해 Vuex state 값들을 가져올 수 있음 -> 부모로부터 받아올 필요 없이 바로 store에 접근
    cellData() {
      return this.$store.state.tableData[this.rowIndex][this.cellIndex];
    },
    tableData() {
      return this.$store.state.tableData;
    },
    turn() {
      return this.$store.state.turn;
    }
  },

  methods: {
    onClickTd(){
      if(this.cellData) {
        console.log("dddd");
        return; //이미 선택된 칸인 경우, 바로 return -> 아무 일도 일어나지 않음
      }

      //this.$store.commit("CLICK_CELL"); // this.$store.commit("mutation명")으로 mutation을 호출할 수 있음
      // -> mutation명을 문자열로 받기 때문에 오타가 발생해도 찾기 어려움
      // -> store.js에서 변수로 빼놓은 mutation명을 import해서 변수 형태로 사용하면 훨씬 편리함
      this.$store.commit(CLICK_CELL, {row: this.rowIndex, cell: this.cellIndex});

      //const rootData = this.$root.$data;

      this.tableData[this.rowIndex][this.cellIndex] = this.turn;
      //배열에 인덱스로 값을 삽입하거나 변경하면, 해당 내용이 화면에는 반영되지 않음 (vue2에서는 그랬음, 3부터는 수정됨)

      //해결방법1
      //Vue.set(rootData.tableData[this.rowIndex], this.cellIndex, rootData.turn);
      //rootData.tableData[this.rowIndex]은 바꾸고 싶은 대상, this.cellIndex은 key, rootData.turn는 수정할 값

      //해결방법2
      //this.$set(rootData.tableData[this.rowIndex], this.cellIndex, rootData.turn);
      //Vue.set이랑 같은 기능 -> import Vue from 'vue'; 할 필요 없어짐

      let win = false;
      if (this.tableData[this.rowIndex][0] === this.turn && this.tableData[this.rowIndex][1] === this.turn
          && this.tableData[this.rowIndex][2] === this.turn) {
        win = true;
      }
      if (this.tableData[0][this.cellIndex] === this.turn && this.tableData[1][this.cellIndex] === this.turn
          && this.tableData[2][this.cellIndex] === this.turn) {
        win = true;
      }
      if (this.tableData[0][0] === this.turn && this.tableData[1][1] === this.turn
          && this.tableData[2][2] === this.turn) {
        win = true;
      }
      if (this.tableData[0][2] === this.turn && this.tableData[1][1] === this.turn
          && this.tableData[2][0] === this.turn) {
        win = true;
      }

      if(win) { //승자가 나온 경우
        //this.winner = this.turn;
        this.$store.commit(SET_WINNER, this.turn); // mutation명 다음에 오는 인자로 mutation 함수에 인자 전달 가능

        // this.turn = 'O';
        // this.tableData = [
        //   ['','',''],
        //   ['','',''],
        //   ['','',''],
        // ];
        this.$store.commit(RESET_GAME);

      } else { //아직 게임이 끝나지 않았거나, 무승부로 끝남
        let all = true; //all이 true면 모든 칸이 채워졌다는 뜻 -> 승자 검사를 먼저 하기 때문에, 승자가 없는데 모든 칸이 채워졌으니 '무승부'
        this.tableData.forEach((row) => { //무승부인지 검사
          row.forEach((cell) => {
            if (!cell) {
              all = false;
            }
          })
        })
        if (all) { //무승부인 경우
          //this.winner = '';
          this.$store.commit(NO_WINNER);

          // this.turn = 'O';
          // this.tableData = [
          //   ['','',''],
          //   ['','',''],
          //   ['','',''],
          // ];
          this.$store.commit(RESET_GAME);

        } else { //아직 게임이 끝나지 않은 경우
          //this.turn = (this.turn === 'O') ? 'X' : 'O'; //$root는 최상위 부모
          this.$store.commit(CHANGE_TURN);
        }
      }
    }
  }
};
</script>

<style>

</style>