<template>
  <table>
    <tr-component v-for="(rowData, index) in tableData" :key="index" :row-index="index"></tr-component>
  </table>
</template>

<script>
  import TrComponent from "./TrComponent.vue"; //TrComponent.vue를 import

  export default {
    // props: {
    //   tableData: Array,
    // },
    //이제 부모로부터 받아올 필요 없이, computed를 통해 store에 바로 접근하여 값을 받아옴

    components: {
      TrComponent,
    },

    computed: {
      tableData () {
        return this.$store.state.tableData;
      }
    }
  };
</script>

<style>

</style>