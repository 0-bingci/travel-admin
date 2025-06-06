<template>
  <div class="filter-bar">
    <el-radio-group :v-model="activeTab" @change="handleTabChange">
      <el-radio-button v-for="tab in tabs" :key="tab.value" :label="tab.value">
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
    default: () => [
    ]
  }
})

const emit = defineEmits(['tab-change', 'sort-change'])

const tabs = ref([
  { value: 'add', label: '增加' },
  { value: 'all', label: '全部' },
  { value: 'filter', label: '筛选' }
])



const handleTabChange = (value: string) => {
  emit('tab-change', value)
}

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