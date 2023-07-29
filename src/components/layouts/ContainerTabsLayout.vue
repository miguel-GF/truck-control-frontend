<template>
  <el-container>
    <el-space fill wrap class="fill-width">
      <el-tabs
        v-model="activeName"
        type="border-card"
        class="demo-tabs"
        @tab-click="handleClick"
      >
        <slot name="body"></slot>
      </el-tabs>
    </el-space>
  </el-container>
</template>

<script setup>
import { ref } from "@/importsVue";
const activeName = ref("datos-principales");
const handleClick = () => console.log("click tab");
</script>
