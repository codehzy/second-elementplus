<template>
  <div class="header">
    <span @click="toggleMenu">
      <el-icon-expand v-if="collapse"></el-icon-expand>
      <el-icon-fold v-else></el-icon-fold>
    </span>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  collapse: boolean;
}>();

const emits = defineEmits(["update:collapse"]);

const toggleMenu = () => {
  emits("update:collapse", !props.collapse);
};
</script>

<style lang="scss" scoped>
.header {
  height: 60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
}
</style>
