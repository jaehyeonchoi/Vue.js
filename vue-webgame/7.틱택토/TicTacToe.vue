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

    },
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