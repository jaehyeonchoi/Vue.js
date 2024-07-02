<template>
  <tr>
    <td-component v-for="(cellData, index) in rowData" :key="index" :cell-index="index" :row-index="rowIndex"></td-component>
  </tr>
</template>

<script>
import TdComponent from "./TdComponent.vue"; //TdComponent.vue를 import

export default {
  components: {
    TdComponent
  },

  computed: {
    rowData() {
      return this.$store.state.tableData[this.rowIndex]
    }
  },

  props: {
    //rowData: Array, //이제 부모로부터 받아올 필요 없이, computed를 통해 store에 바로 접근하여 값을 받아옴
    rowIndex: Number,
  },
};
</script>

<style>

</style>