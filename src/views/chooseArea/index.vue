<template>
  <ChooseArea @change="changes"></ChooseArea>
</template>

<script lang="ts" setup>
import ChooseArea from '../../components/chooseArea/index.vue'

interface Data {
  code: string
  name: string
}

interface selectData {
  province: Data
  city: Data
  area: Data
}

const changes = (val: selectData) => {
  console.log(val)
}
</script>

<style lang="scss" scoped></style>
