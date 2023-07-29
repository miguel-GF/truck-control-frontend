<template>
  <el-skeleton :rows="props.rows" animated />
</template>

<script setup>
import { defineProps } from "@/importsVue";
const props = defineProps({
  rows: {
    type: Number,
    default: 5,
  },
});
</script>
