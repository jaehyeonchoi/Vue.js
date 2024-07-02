<!--vue 파일 자체가 하나의 Vue 컴포넌트의 역할-->

<!--Vue 컴포넌트에서의 template에 해당하는 부분-->
<template>
  <!--최상위 태그는 하나만 존재해야 함-->
  <div>
    <div>{{turn}}님의 턴입니다.</div>
    <table-component :table-data="tableData"></table-component>
    <div v-if="winner">{{winner}}님의 승리!</div>
  </div>
</template>

<script>
  import TableComponent from "./TableComponent.vue"; //TableComponent.vue를 import
  import EventBus from './EventBus.js'; //EventBus.js를 import

  export default { //예전 방식에서의 Vue.component('xxxx', {});와 같은 역할 -> export한 다음, main.js에서 import해서 가져옴

    components: { //자식 컴포넌트를 부모 컴포넌트에게 등록
      'table-component': TableComponent
    },

    data() {
      return {
        tableData: [
          ['','',''],
          ['','',''],
          ['','',''],
        ],
        turn:'O',
        winner: '',
      };
    },

    computed: { //data를 가공해서 쓸 때는 computed에 정의해서 사용 (caching이 되기 때문에 매번 연산이 실행될 필요 없어짐)

    },

    methods: {
      onClickTd(rowIndex, cellIndex) {
        if(this.cellData) return; //이미 선택된 칸인 경우, 바로 return -> 아무 일도 일어나지 않음

        //const rootData = this.$root.$data;
        //이제 TicTacToe.vue(최상위 컴포넌트)에서 직접 Event를 처리하므로 data에 대한 접근이 간단해짐 -> this.XXX

        this.tableData[rowIndex][cellIndex] = this.turn;
        //배열에 인덱스로 값을 삽입하거나 변경하면, 해당 내용이 화면에는 반영되지 않음 (vue2에서는 그랬음, 3부터는 수정됨)

        //해결방법1
        //Vue.set(rootData.tableData[this.rowIndex], this.cellIndex, rootData.turn);
        //rootData.tableData[this.rowIndex]은 바꾸고 싶은 대상, this.cellIndex은 key, rootData.turn는 수정할 값

        //해결방법2
        //this.$set(rootData.tableData[this.rowIndex], this.cellIndex, rootData.turn);
        //Vue.set이랑 같은 기능 -> import Vue from 'vue'; 할 필요 없어짐

        let win = false;
        if (this.tableData[rowIndex][0] === this.turn && this.tableData[rowIndex][1] === this.turn
            && this.tableData[rowIndex][2] === this.turn) {
          win = true;
        }
        if (this.tableData[0][cellIndex] === this.turn && this.tableData[1][cellIndex] === this.turn
            && this.tableData[2][cellIndex] === this.turn) {
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
          this.winner = this.turn;
          this.turn = 'O';
          this.tableData = [
            ['','',''],
            ['','',''],
            ['','',''],
          ];
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
            this.winner = '';
            this.turn = 'O';
            this.tableData = [
              ['','',''],
              ['','',''],
              ['','',''],
            ];
          } else { //아직 게임이 끝나지 않은 경우
            this.turn = (this.turn === 'O') ? 'X' : 'O'; //$root는 최상위 부모
          }
        }
      }
    },

    created() {
      EventBus.$on('clickTd', this.onClickTd); //EventBus에 사용자 정의 Event(clickTd)와 해당 Event 발생 시 호출할 함수를 등록
    }
  }
</script>

<style>
  /*scoped 키워드를 사용하면 css 내용이 해당 컴포넌트에만 적용됨 (전역으로 쓸 거 아니면 왠만하면 붙이기를 권장)*/
  table {
    border-collapse: collapse;
  }
  td {
    border: 1px solid black;
    width: 40px;
    height: 40px;
    text-align: center;
  }
</style>