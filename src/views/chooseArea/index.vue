<template>
  <choose-area @change="changes"></choose-area>
</template>

<script lang="ts" setup>
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
