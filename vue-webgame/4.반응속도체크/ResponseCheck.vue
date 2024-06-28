<!--vue 파일 자체가 하나의 Vue 컴포넌트의 역할-->

<!--Vue 컴포넌트에서의 template에 해당하는 부분-->
<template>
  <!--최상위 태그는 하나만 존재해야 함-->
  <div>
    <div id="screen" v-bind:class="state" @click="onClickScreen">{{message}}</div>
    <!--v-bind:class="state" : class에 state의 '값'을 넣음 (그냥 class="state"라고 하면 "state"라는 문자열이 들어가버림)-->
    <!--v-bind는 생략하고 그냥 :(콜론)만 써도 됨-->


    <template v-if="result.length">
      <!--별다른 용도 없이 감싸기만 할 때는 div 대신 template를 사용할 수 있음-->
      <!--template을 쓰면, template은 없는 셈 치고, 안에 들어 있는 태그들이 template과 같은 level로 인식됨-->
      <!--v-show vs. v-if : v-show는 태그를 보이지만 않게, v-if는 태그 생성 자체를 안함-->
      <!--v-if는 v-else, v-else-if 등과 함께 쓸 수 있기 때문에, 활용도가 더 높음-->

      <!--<div>평균 시간: {{result.reduce((a, c) => a + c, 0) / result.length || 0}}ms</div>-->
      <!--reduce()는 배열의 각 요소를 순회하며 callback 함수의 실행 값을 누적하여 하나의 결과값을 반환-->
      <!-- || : 기본값 연산자 -> 기본적으로 주어질 값 설정-->
      <!--계산해야 하는 요소는 아래처럼 computed로 따로 빼주는 것이 좋음-->
      <div>평균 시간: {{average}}ms</div>

      <button @click="onReset">리셋</button>
    </template>

  </div>
</template>

<script>
  let startTime = 0;
  let endTime = 0;
  let timeout = null;
  export default { //예전 방식에서의 Vue.component('xxxx', {});와 같은 역할 -> export한 다음, main.js에서 import해서 가져옴
    data() {
      return {
        result: [], //기록을 배열에 쌓아둠
        state: 'waiting',
        message: '클릭해서 시작하세요.',
      }
    },
    computed: { //data를 가공해서 쓸 때는 computed에 정의해서 사용 (caching이 되기 때문에 매번 연산이 실행될 필요 없어짐)
      average(){
        return this.result.reduce((a, c) => a + c, 0) / this.result.length || 0;
      }
    },
    methods: {
      onReset(){
        this.result = [];
      },
      onClickScreen(){
        if (this.state === 'waiting') {
          this.state = 'ready';
          this.message = '초록색이 되면 클릭하세요.';
          timeout = setTimeout(()=>{
            this.state = 'now';
            this.message = '지금 클릭하세요.';
            startTime = new Date();
          }, Math.floor(Math.random() * 1000) + 2000); //2~3초 사이 랜덤한 시간 후에 state 변경
        } else if (this.state === 'ready') {
          this.state = 'waiting';
          clearTimeout(timeout);
          this.message = '너무 성급하시군요! 초록색이 된 후에 클릭하세요.';
        } else if (this.state === 'now') {
          endTime = new Date();
          this.state = 'waiting';
          this.message = '클릭해서 시작하세요.';
          this.result.push(endTime - startTime);
        }
      }
    }
  }
</script>

<style scoped>
  /*scoped 키워드를 사용하면 css 내용이 해당 컴포넌트에만 적용됨 (전역으로 쓸 거 아니면 왠만하면 붙이기를 권장)*/
  #screen{
    width: 200px;
    height: 200px;
    text-align: center;
    user-select: none;
  }
  #screen.waiting{ /*screen의 class에 따라 색상 변경*/
    background-color: aqua;
  }
  #screen.ready{
    background-color: red;
    color: white;
  }
  #screen.now{
    background-color: greenyellow;
  }
</style>