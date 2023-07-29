<template>
  <el-form :label-position="labelPosition">
    <el-form-item
      :label-width="labelWidth"
      :size="size"
      class="fill-width item-label"
      :class="`bg-${!darkMode ? 'white' : 'dark'}`"
    >
      <template #label>
        <div class="fw-600 --el-color-info-light-8">
          {{ label }}
        </div>
      </template>
      <div>
        <slot name="value"> Valor :P </slot>
      </div>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { defineProps } from "@/importsVue";
const props = defineProps({
  label: {
    type: String,
    default: "Label",
  },
  labelWidth: {
    type: String,
    default: "30%",
  },
  labelPosition: {
    type: String,
    default: "right",
  },
  size: {
    type: String,
    default: "default",
  },
  darkMode: {
    type: Boolean,
    default: false,
  },
});
const prop = { ...props };
const { label, labelWidth, labelPosition, size } = prop;
</script>

<style scoped>
.item-label {
  margin-bottom: 0px;
  border-bottom: lightgray 1px solid;
}
.bg-dark {
  background-color: #fafafa;
}
</style>
