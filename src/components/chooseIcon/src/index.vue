<template>
  <el-button @click="handleClick"> <slot> </slot> </el-button>
  <div class="m-choose-icon-dialog-body-height">
    <el-dialog v-model="dialogVisible" title="title">
      <div class="container">
        <div
          class="item"
          v-for="(item, index) in Object.keys(ElIcons)"
          :key="index"
          @click="clickItem(item)"
        >
          <div class="text">
            <component :is="`el-icon${toLine(item)}`"></component>
          </div>
          <div class="icon">{{ item }}</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import * as ElIcons from "@element-plus/icons-vue";
import toLine from "../../../utils";
import { useCopy } from "../../../hooks/useCopy";

const props = defineProps<{
  // 弹出框的标题
  title: string;
  // 控制弹出框的显示与隐藏
  visible: boolean;
}>();
const emits = defineEmits(["update:visible"]);

// 拷贝一份父组件传递过来visible
const dialogVisible = ref<boolean>(props.visible);

const handleClick = () => {
  // 需要修改父组件数据
  emits("update:visible", !props.visible);
};

// 点击图标
const clickItem = (item: string) => {
  let text = `<el-icon-${toLine(item)} />`;
  // 复制文本
  useCopy(text);
  // 关闭弹框
  dialogVisible.value = false;
};

// 监听visible变化，只能监听第一次的变化
watch(
  () => props.visible,
  (val) => {
    dialogVisible.value = val;
  }
);

// 监听组件内部的dialogVisible的变化
watch(
  () => dialogVisible.value,
  (val) => {
    emits("update:visible", val);
  }
);
</script>

<style lang="scss" scoped>
.container {
  height: 400px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.item {
  width: 25%;
  margin-bottom: 20px;
  height: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.text {
  font-size: 12px;
}

.icon {
  flex: 1;
}

svg {
  width: 2em;
  height: 2em;
}

.el-dialog__body {
  height: 500px;
  overflow: scroll;
}

:deep(.el-dialog__body) {
  height: 500px;
  overflow: scroll;
}
</style>
