<template>
  <td @click="onClickTd">{{cellData}}</td>
</template>

<script>
//import Vue from 'vue'; //Vue.set을 하기 위해 Vue 객체 import

import EventBus from "./EventBus";

export default {
  props: {
    cellData: String,
    rowIndex: Number,
    cellIndex: Number,
  },
  methods: {
    onClickTd(){
      // if(this.cellData) return; //이미 선택된 칸인 경우, 바로 return -> 아무 일도 일어나지 않음
      //
      // const rootData = this.$root.$data;
      // rootData.tableData[this.rowIndex][this.cellIndex] = rootData.turn;
      // //배열에 인덱스로 값을 삽입하거나 변경하면, 해당 내용이 화면에는 반영되지 않음 (vue2에서는 그랬음, 3부터는 수정됨)
      //
      // //해결방법1
      // //Vue.set(rootData.tableData[this.rowIndex], this.cellIndex, rootData.turn);
      // //rootData.tableData[this.rowIndex]은 바꾸고 싶은 대상, this.cellIndex은 key, rootData.turn는 수정할 값
      //
      // //해결방법2
      // //this.$set(rootData.tableData[this.rowIndex], this.cellIndex, rootData.turn);
      // //Vue.set이랑 같은 기능 -> import Vue from 'vue'; 할 필요 없어짐
      //
      // let win = false;
      // if (rootData.tableData[this.rowIndex][0] === rootData.turn && rootData.tableData[this.rowIndex][1] === rootData.turn
      //     && rootData.tableData[this.rowIndex][2] === rootData.turn) {
      //   win = true;
      // }
      // if (rootData.tableData[0][this.cellIndex] === rootData.turn && rootData.tableData[1][this.cellIndex] === rootData.turn
      //     && rootData.tableData[2][this.cellIndex] === rootData.turn) {
      //   win = true;
      // }
      // if (rootData.tableData[0][0] === rootData.turn && rootData.tableData[1][1] === rootData.turn
      //     && rootData.tableData[2][2] === rootData.turn) {
      //   win = true;
      // }
      // if (rootData.tableData[0][2] === rootData.turn && rootData.tableData[1][1] === rootData.turn
      //     && rootData.tableData[2][0] === rootData.turn) {
      //   win = true;
      // }
      //
      // if(win) { //승자가 나온 경우
      //   rootData.winner = rootData.turn;
      //   rootData.turn = 'O';
      //   rootData.tableData = [
      //     ['','',''],
      //     ['','',''],
      //     ['','',''],
      //   ];
      // } else { //아직 게임이 끝나지 않았거나, 무승부로 끝남
      //   let all = true; //all이 true면 모든 칸이 채워졌다는 뜻 -> 승자 검사를 먼저 하기 때문에, 승자가 없는데 모든 칸이 채워졌으니 '무승부'
      //   rootData.tableData.forEach((row) => { //무승부인지 검사
      //     row.forEach((cell) => {
      //       if (!cell) {
      //         all = false;
      //       }
      //     })
      //   })
      //   if (all) { //무승부인 경우
      //     rootData.winner = '';
      //     rootData.turn = 'O';
      //     rootData.tableData = [
      //       ['','',''],
      //       ['','',''],
      //       ['','',''],
      //     ];
      //   } else { //아직 게임이 끝나지 않은 경우
      //     rootData.turn = (rootData.turn === 'O') ? 'X' : 'O'; //$root는 최상위 부모
      //   }
      // }

      EventBus.$emit('clickTd', this.rowIndex, this.cellIndex);
      //'clickTd' Event를 발생시킴 -> EventBus에 의해 TicTacToe.vue의 onClickTd()가 호출됨
      //this.rowIndex, this.cellIndex는 onClickTd()에 인자로 전달됨
    }
  }
};
</script>

<style>

</style>