<template>
  <el-container>
    Operadores
    <br />
    <el-container>
      <OperadorList />
    </el-container>
  </el-container>
</template>

<script>
import OperadorList from "./OperadorList.vue";
export default {
  name: "OperadorView",
  components: {
    OperadorList,
  },
};
</script>
