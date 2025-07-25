<template>
  <div class="filter-bar">
    <el-radio-group v-model="localActiveTab">
      <el-radio-button 
        v-for="tab in tabs || defaultTabs" 
        :key="tab.value" 
        :label="tab.value"
        @click="handleTabClick(tab)"
      >
        {{ tab.label }}
      </el-radio-button>
    </el-radio-group>
    
    <template v-for="(filter, index) in filters" :key="index">
      <el-select 
        v-if="filterOptions[filter.type] && (filterOptions[filter.type].type || filterOptions[filter.type].componentType) === 'select'"
        v-model="filter.model"
        :placeholder="filter.placeholder"
        @change="handleFilterChange(filter.type, $event)"
        style="margin-left: 10px; width: 180px"
      >
        <el-option 
          v-for="item in filterOptions[filter.type]?.options || []"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      
      <el-input
        v-else
        v-model="filter.model"
        :placeholder="filter.placeholder"
        @input="handleFilterInput(filter.type, $event)"
        style="margin-left: 10px; width: 180px"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface FilterOption {
  type?: string
  componentType?: string
  options?: Array<{ label: string; value: string }>
}

interface Filter {
  type: string
  model: string
  placeholder: string
}

interface Tab {
  value: string
  label: string
  handler?: () => void
}

const props = defineProps<{
  activeTab?: string
  filterOptions: Record<string, FilterOption>
  filters?: Filter[]
  tabs?: Tab[]
}>()

const defaultTabs: Tab[] = [
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

const emit = defineEmits(['update:activeTab', 'tab-change', 'sort-change'])

// 本地活动标签，用于双向绑定
const localActiveTab = ref(props.activeTab || 'all')

// 监听props.activeTab的变化
watch(() => props.activeTab, (newVal) => {
  localActiveTab.value = newVal || 'all'
})

// 监听localActiveTab的变化并更新父组件
watch(localActiveTab, (newVal) => {
  emit('update:activeTab', newVal)
})

const handleTabClick = (tab: Tab) => {
  localActiveTab.value = tab.value
  emit('tab-change', tab.value)
  if (tab.handler && typeof tab.handler === 'function') {
    tab.handler()
  }
}

const handleFilterChange = (type: string, value: string) => {
  emit('sort-change', { type, value })
}

const handleFilterInput = (type: string, value: string) => {
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