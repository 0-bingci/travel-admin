<template>
  <div class="filter-bar">
    <el-radio-group :v-model="activeTab">
      <el-radio-button 
        v-for="tab in tabs" 
        :key="tab.value" 
        :label="tab.value"
        @click="tab.handler"
      >
        {{ tab.label }}
      </el-radio-button>
    </el-radio-group>
    
    <el-select 
      v-for="(filter, index) in filters" 
      :key="index"
      v-model="filter.model"
      :placeholder="filter.placeholder"
      @change="handleFilterChange(filter.type, $event)"
      style="margin-left: 10px; width: 180px"
    >
      <el-option 
        v-for="item in filterOptions[filter.type]"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  activeTab: { type: String, default: 'all' },
  filterOptions: { type: Object, required: true },
  filters: { 
    type: Array,
    default: () => []
  },
  tabs: {
    type: Array,
    default: () => [
      { 
        value: 'add', 
        label: '增加',
        handler: () => console.log('add button clicked')
      },
      { 
        value: 'all', 
        label: '全部',
        handler: () => console.log('all button clicked')
      },
      { 
        value: 'filter', 
        label: '筛选',
        handler: () => console.log('filter button clicked')
      }
    ]
  }
})

const emit = defineEmits(['sort-change'])

const handleFilterChange = (type: string, value: string) => {
  emit('sort-change', { type, value })
}
</script>

<style scoped>
.filter-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}
</style>