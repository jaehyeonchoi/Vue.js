<!--vue 파일 자체가 하나의 Vue 컴포넌트의 역할-->

<!--Vue 컴포넌트에서의 template에 해당하는 부분-->
<template>
  <!--최상위 태그는 하나만 존재해야 함-->
  <div>
    <h1>{{result}}</h1>
    <form v-on:submit="onSubmitForm">
    <!--v-on:submit 대신 @submit으로 표현 가능 / @submit.prevent로 하면 form으로 인한 자동 새로고침 방지(e.preventDefault();와 같은 역할이므로 생략 가능) -->
      <input ref="answer" minlength="4" maxlength="4" v-model="value" />
      <button type=":submit">입력</button>
    </form>
    <div>시도: {{tries.length}}</div>
    <ul>
      <li v-for="t in tries">
        <div>{{t.try}}</div>
        <div>{{t.result}}</div>
      </li><!--v-for로 반복문을 사용하여 list 생성-->
    </ul>
  </div>
</template>

<script>
const getNumbers = () => { //random한 숫자 4개 뽑기 -> methods에 만들어줄 수도 있으나, 일반적으로 컴포넌트와 관련 없는 함수는 밖에 따로 빼서 만듦
  const candidates = [1,2,3,4,5,6,7,8,9];
  const array = [];
    for(let i = 0; i < 4; i += 1){
      const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
      array.push(chosen);
    }
    return array;
  }

  export default { //예전 방식에서의 Vue.component('xxxx', {});와 같은 역할 -> export한 다음, main.js에서 import해서 가져옴
    data() {
      return {
        answer: getNumbers(), //정답 숫자배열 -> ex)[1,2,3,4]
        tries: [], //시도 내역
        value: '', //입력
        result: '', //입력에 대한 결과
      }
    },
    methods: {
      onSubmitForm(e) {
        e.preventDefault();
        //this.tries.push(this.value);//value에 들어온 값을 tries에 추가

        if(this.value === this.answer.join('')){ //정답 맞춘 경우
          //join()는 배열의 모든 원소를 지정된 구분 문자열로 구분하여 하나의 문자열로 연결해줌

          this.tries.push({
            try: this.value,
            result: '홈런',
          });
          this.result = '홈런!';
          alert('게임을 다시 시작합니다.');
          this.value = '';
          this.answer = getNumbers();
          this.tries = [];
          this.$refs.answer,focus();
        } else { //정답 틀린 경우
          if(this.tries.length >= 9) { //10번째 시도했는데 틀린 경우
            this.result = `10번 넘게 틀려서 실패! 정답은 ${this.answer.join(',')}였습니다!`;
            alert('게임을 다시 시작합니다.');
            this.value = '';
            this.answer = getNumbers();
            this.tries = [];
            this.$refs.answer,focus();
          }
          let strike =  0;
          let ball = 0; //화면에 보여지는 요소는 data, 그렇지 않은 요소는 일반 변수로 선언
          const answerArray = this.value.split('').map(v => parseInt(v)); //value(문자열)을 answerArray(숫자 배열)로 변환
          for(let i = 0; i < 4; i += 1){
            if(answerArray[i] === this.answer[i]){ //숫자와 자릿수가 모두 맞은 경우
              strike++;
            } else if(this.answer.includes(answerArray[i])) { //숫자만 맞은 경우
              ball++;
            }
          }
          this.tries.push({
            try: this.value,
            result: `${strike} 스트라이크, ${ball} 볼입니다.`,
          });
        }
      }
    }
  }
</script>

<style>

</style>