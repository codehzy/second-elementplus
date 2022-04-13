<template>
  <div>
    <el-select clearable placeholder="请选择省份" v-model="province">
      <el-option
        v-for="item in areas"
        :key="item.code"
        :value="item.code"
        :label="item.name"
        >{{ item.name }}</el-option
      >
    </el-select>
    <el-select
      clearable
      :disabled="!province"
      style="margin: 0 10px"
      placeholder="请选择城市"
      v-model="city"
    >
      <el-option
        v-for="item in selectCity"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      ></el-option>
    </el-select>
    <el-select
      clearable
      :disabled="!province || !city"
      placeholder="请选择区域"
      v-model="area"
    >
      <el-option
        v-for="item in selectArea"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      ></el-option>
    </el-select>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, defineEmits } from 'vue'
import allAreas from './lib/pca-code.json'

console.log(allAreas)

// 下拉框选择省份的值
let province = ref<string>('')
// 下拉框选择城市的值
let city = ref<string>('')
// 下拉框选择区域的值
let area = ref<string>('')
// 所有的省市区数据
let areas = ref(allAreas)

interface selectCityType {
  code: string
  name: string
  children: { code: string; name: string }[]
}

interface selectAreaType {
  code: string
  name: string
}

type Data = {
  code: string
  name: string
}

const selectCity = ref<selectCityType[]>([])
const selectArea = ref<selectAreaType[]>([])

const emits = defineEmits(['change'])

watch(
  () => province.value,
  (val) => {
    if (val) {
      const cities = areas.value.find(
        (item) => item.code === province.value
      )!.children
      selectCity.value = cities
    }
    city.value = ''
    area.value = ''
  }
)

watch(
  () => city.value,
  (val) => {
    if (val) {
      const Areas = selectCity.value.find(
        (item) => item.code === city.value
      )!.children
      selectArea.value = Areas
    }
    area.value = ''
  }
)

watch(
  () => area.value,
  (val) => {
    if (val) {
      const provinceData: Data = {
        code: province.value,
        name:
          province.value &&
          allAreas.find((item) => item.code === province.value)!.name
      }
      const cityData: Data = {
        code: city.value,
        name:
          city.value &&
          selectCity.value.find((item) => item.code === city.value)!.name
      }
      const areaData: Data = {
        code: area.value,
        name:
          area.value &&
          selectArea.value.find((item) => item.code === area.value)!.name
      }

      emits('change', {
        province: provinceData,
        city: cityData,
        area: areaData
      })
    }
  }
)
</script>

<style lang="scss" scoped></style>
