<template>
<el-sub-menu v-if="item.children" :index="item.index">
    <template #title>
      <el-icon v-if="item.icon"><component :is="item.icon" /></el-icon>
      <span>{{ item.title }}</span>
    </template>
    <MenuItem
      v-for="child in item.children"
      :key="child.index"
      :item="child"
    />
  </el-sub-menu>
  <el-menu-item v-else :index="item.index">
    <el-icon v-if="item.icon"><component :is="item.icon" /></el-icon>
    <span>{{ item.title }}</span>
  </el-menu-item>
</template>

<script setup>
import { defineProps } from 'vue'
// 递归引入自身
import MenuItem from './MenuItem.vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>