<template>
  <div class="ball" :style="styleObject">{{number}}</div>
</template>

<script>
  export default {
    name: 'LottoBall', //굳이 설정 안해도 파일명이 LottoBall이기 때문에 자동으로 설정되긴 함

    //props: ['number'], //이렇게도 쓸 수 있음 -> But, 아래처럼 자료형을 명시해주는 것을 권장
    props: {
      //해당 컴포넌트를 사용하는 (부모)컴포넌트로부터 데이터를 받아올 수 있도록 함 -> 본인은 그 값을 변경 불가
      //값을 바꾸려면 데이터를 바꾸는 부모의 메서드를 자식에게 props로 전달하는 것이 좋음
      number: Number, //Number는 javascript 자료형 -> 자료형 명시
    },

    computed: {
      styleObject() {
        let background;
        if (this.number <= 10) {
          background = 'red';
        } else if (this.number <= 20) {
          background = 'orange';
        } else if (this.number <= 30) {
          background = 'yellow';
        } else if (this.number <= 40) {
          background = 'green';
        } else {
          background = 'blue';
        }
        return {
          background,
        };
      }
    },
  }
</script>

<style>
  .ball {
    display: inline-block;
    border: 1px solid black;
    border-radius: 20px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    text-align: center;
    margin-right: 20px;
  }
</style>