<template>
  <table>
    <tr-component v-for="(rowData, index) in tableData" :key="index" :row-data="rowData" :row-index="index"></tr-component>
  </table>
</template>

<script>
  import TrComponent from "./TrComponent.vue"; //TrComponent.vue를 import

  export default {
    props: {
      tableData: Array,
    },

    components: {
      TrComponent,
    }
  };
</script>

<style>

</style>