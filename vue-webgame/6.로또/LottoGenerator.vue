<!--vue 파일 자체가 하나의 Vue 컴포넌트의 역할-->

<!--Vue 컴포넌트에서의 template에 해당하는 부분-->
<template>
  <!--최상위 태그는 하나만 존재해야 함-->
  <div>
    <div>당첨 숫자</div>
    <div id="결과창">
      <lotto-ball v-for="ball in winBalls" v-bind:number="ball" :key="ball"></lotto-ball>
      <!--v-for를 쓸 때는 같은 태그가 여러 개 생기기 때문에, 서로를 구분하기 위해서 key 값을 주는 것을 권장-->
      <!--v-bind:number="ball" : number에 ball의 '값'을 넣음 (그냥 number="ball"라고 하면 "ball"라는 문자열이 들어가버림)-->
      <!--v-bind는 생략하고 그냥 :(콜론)만 써도 됨-->
    </div>
    <div>보너스</div>
    <lotto-ball v-if="bonus" v-bind:number="bonus"></lotto-ball>
    <button v-if="redo" @click="onClickRedo">한 번 더!</button>
  </div>
</template>

<script>
  import LottoBall from "./LottoBall.vue"; //LottoBall.vue를 import

  function getWinNumbers() {
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v, i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
      shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
  }

  const timeouts = [];

  export default { //예전 방식에서의 Vue.component('xxxx', {});와 같은 역할 -> export한 다음, main.js에서 import해서 가져옴

    components: { //자식 컴포넌트를 부모 컴포넌트에게 등록
      'lotto-ball': LottoBall
      // 그냥 LottoBall이라고만 써도 자동으로 kebab case로 변경해줌 (대신 vue 파일명과 컴포넌트명은 case 종료만 다르고 일치해야 함)
    },

    data() {
      return {
        winNumbers: getWinNumbers(),
        winBalls: [],
        bonus: null,
        redo: false,
      }
    },

    computed: { //data를 가공해서 쓸 때는 computed에 정의해서 사용 (caching이 되기 때문에 매번 연산이 실행될 필요 없어짐)

    },

    methods: {
      onClickRedo() {
        this.winNumbers = getWinNumbers();
        this.winBalls = [];
        this.bonus = null;
        this.redo = false;
        //this.showBalls();
      },

      showBalls() {
        for(let i = 0; i < this.winNumbers.length - 1; i++){
          timeouts[i] = setTimeout(() => {
            this.winBalls.push(this.winNumbers[i]);
          }, (i + 1) * 1000); // i를 var 대신 let으로 선언하면, 스코프 블록을 형성하기 때문에 i의 값이 분리됨
        }
        timeouts[6] = setTimeout(() => {
          this.bonus = this.winNumbers[6];
          this.redo = true;
        }, 7000);
      }
    },

    mounted() { //화면에 출력되었을 때 (화면 관련된 작업을 하려면 mounted에서 하는 것을 권장 -> created는 안되는 경우도 있음)
      this.showBalls();
    },

    beforeDestroy() { //destroy되기 전에 실행됨 -> 화면에서 사라지기 전에 처리해야 될 작업들은 여기서 수행
      timeouts.forEach((t) => {
        clearTimeout(t);
      });
    },

    watch: { //특정 값이 바뀌는 것을 모니터링 하고 있음 -> watch는 남용하지 않는 것이 좋음(되도록이면 쓰지 말자, 최후의 수단)
      winBalls(val, oldVal) { //winBalls의 값이 바뀔 때마다 호출되는 함수 (val: 현재 값, oldVal: 이전 값)
        if (val.length === 0) {
          this.showBalls();
        }
      }
    },
  }
</script>

<style scoped>
  /*scoped 키워드를 사용하면 css 내용이 해당 컴포넌트에만 적용됨 (전역으로 쓸 거 아니면 왠만하면 붙이기를 권장)*/

</style>