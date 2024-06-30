<!--vue 파일 자체가 하나의 Vue 컴포넌트의 역할-->

<!--Vue 컴포넌트에서의 template에 해당하는 부분-->
<template>
  <!--최상위 태그는 하나만 존재해야 함-->
  <div>
    <!--<div id="computer" :style="{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${{imgCoord}} 0`}"></div>-->
    <div id="computer" :style="computedStyleObject"></div><!--data를 가공해서 쓸 때는 computed에 정의해서 사용(Caching)-->
    <div>
      <!--같은 method에 인자만 다르게 줘서 구분 가능-->
      <button @click="onClickButton('바위')">바위</button>
      <button @click="onClickButton('가위')">가위</button>
      <button @click="onClickButton('보')">보</button>
    </div>
    <div>{{result}}</div>
    <div>현재 {{score}}점</div>
  </div>
</template>

<script>
  const rspCoords = {//'가위','바위','보'일 때의 이미지 좌표 -> 의미가 불분명한 데이터에는 이름을 붙여주는 것이 좋음
    바위: '0',
    가위: '-142px',
    보: '-284px',
  }
  const scores = {//'가위','바위','보'일 때의 점수 -> 의미가 불분명한 데이터에는 이름을 붙여주는 것이 좋음
    바위: 1,
    가위: 0,
    보: -1,
  }
  const computerChoice = (imgCoord) => { //imgCoord(0/-142px/-284px) 값에 해당하는 가위/바위/보 찾아 반환하기
     return Object.entries(rspCoords).find(function (v) {
       //Object.entries(rspCoords) : rspCoords 객체를 배열 형태로 반환 -> [['바위', '0'],['가위', '-142px'],['보', '-284px']]
       //find() : callback 함수를 통해, 배열에서 조건을 만족하는 첫번째 element 반환
       return v[1] === imgCoord;
     })[0];
  };
  let interval = null;

  export default { //예전 방식에서의 Vue.component('xxxx', {});와 같은 역할 -> export한 다음, main.js에서 import해서 가져옴
    data() {
      return {
        imgCoord: rspCoords.바위,
        result: '',
        score: 0,
      }
    },

    computed: { //data를 가공해서 쓸 때는 computed에 정의해서 사용 (caching이 되기 때문에 매번 연산이 실행될 필요 없어짐)
      computedStyleObject(){
        return {
          background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imgCoord} 0`,
        }
      }
    },

    methods: {
      changeHand(){
        interval = setInterval(()=>{ //interval, timeout 등은 set할 때 변수에 담아줘야, 나중에 clear로 멈춰줄 수 있음
          if (this.imgCoord === rspCoords.바위) {
            this.imgCoord = rspCoords.가위;
          } else if (this.imgCoord === rspCoords.가위) {
            this.imgCoord = rspCoords.보;
          } else if (this.imgCoord === rspCoords.보) {
            this.imgCoord = rspCoords.바위;
          }
        }, 100);
      },

      onClickButton(choice) {
        clearInterval(interval);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(this.imgCoord)];
        const diff = cpuScore - myScore;
        if (diff === 0) {
          this.result = '비겼습니다.';
        } else if ([-1, 2].includes(diff)) {
          this.result = '이겼습니다.';
          this.score += 1;
        } else {
          this.result = '졌습니다.';
          this.score -= 1;
        }
        setTimeout(() => {
          this.changeHand();
        }, 1000);
      }
    },

    //LifeCycle
    beforeCreate() { //create되기 전에 실행됨

    },
    created() { //데이터들이 다 준비되었을 때 (아직 화면에는 출력 X)

    },
    beforeMount() { //mount되기 전에 실행됨

    },
    mounted() { //화면에 출력되었을 때 (화면 관련된 작업을 하려면 mounted에서 하는 것을 권장 -> created는 안되는 경우도 있음)
      this.changeHand();
    },
    beforeUpdate() { //update되기 전에 실행됨

    },
    updated() { //화면 상의 data가 update되었을 때 (화면이 바뀔 때)

    },
    beforeDestroy() { //destroy되기 전에 실행됨 -> 화면에서 사라지기 전에 처리해야 될 작업들은 여기서 수행
      clearInterval(interval); //interval 멈추기
    },
    destroyed() { //컴포넌트가 화면에서 사라질 때

    }
  }
</script>

<style scoped>
  /*scoped 키워드를 사용하면 css 내용이 해당 컴포넌트에만 적용됨 (전역으로 쓸 거 아니면 왠만하면 붙이기를 권장)*/
  #computer {
    width: 142px;
    height: 200px;
    background-position: 0 0;
  }
</style>