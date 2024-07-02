//EventBus: Event의 중앙 매개체 -> Event를 중앙에 모아서 관리하자는 아이디어
// -> 하나의 컴포넌트(보통은 Root 컴포넌트)에서 모든 data 관련 작업을 처리할 수 있게 됨
// -> But, 중심 역할을 할 컴포넌트의 코드가 너무 비대해질 수 있음

// -> vue2에서 사용하던 방법, vue3에서는 사용하지 말자


import Vue from 'vue';

export default new Vue(); //비어있는 깡통 컴포넌트를 생성 -> EventBus라고 부름 -> Vue에서 기본 제공하는 메서드를 사용하기 위해