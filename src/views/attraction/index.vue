<template>
    <div class="user-management">
      <div class="header">
        <h2>景点管理</h2>
      </div>
      
      
      <!-- User Table -->
      <!-- 订单号 目的地、客服电话、人数、时间、付款金额、订单状态等 -->
      <el-table 
        :data="tableData" 
        style="width: 100%" 
        class="user-table"
        :header-cell-style="{ backgroundColor: '#f5f7fa', color: '#606266' }"
      >
        <el-table-column prop="id" label="景点编号" :min-width="80" align="center" />
        <el-table-column prop="city" label="城市" :min-width="80" align="center"></el-table-column>       
        <el-table-column prop="sightName" label="景点的中文名称" :min-width="80" align="center"></el-table-column>
        <el-table-column prop="sightEnglishName" label="景点的英文名称" :min-width="80" align="center"></el-table-column>
        <el-table-column prop="sightIntroduction" label="景点的简要介绍" :min-width="80" align="center" />
        <el-table-column prop="sightImage" label="景点图片" :min-width="80" align="center" />
        <el-table-column prop="location" label="景点的地理位置" :min-width="80" align="center" />
        <el-table-column prop="visitWay" label="游览该景点的方式" :min-width="80" align="center" />
        <el-table-column prop="suggestTime" label="游览该景点的建议时长" :min-width="80" align="center" />
        <el-table-column prop="openingTime" label="景点的开放时间" :min-width="80" align="center" />
        <el-table-column prop="tip" label="游览该景点的小贴士" :min-width="80" align="center" />
        <el-table-column label="操作" :min-width="80" align="center">
          <template #default="scope">
            <el-button 
              type="primary" 
              size="small" 
              @click="handleEdit(scope.row)"
            >
              编辑
            </el-button>
            <el-button 
              type="success" 
              size="small" 
              @click="handleView(scope.row)"
            >
              去看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <!-- Pagination -->
      <div class="pagination-wrapper">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { ElMessage } from 'element-plus'

  import { getAttractionList } from '../../api/attraction'
  //获取数据
  const TableData = ref([])
  const loadAttractionData = async (data: any) => { 
    const res = await getAttractionList(data);
    TableData.value = res.data.data;
    console.log(res.data);
    

  }
  onMounted(() => {
    loadAttractionData()
  })
  
  // Reactive data
  const activeTab = ref('all')
  const currentPage = ref(1)
  const pageSize = ref(10)
  const total = ref(17)
  
  // Table data
  const tableData = ref([
    {
      id: 1,
      openId: 'oqdo1TSqgZhv...',
      avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-znUvJcS8noRpeKcj7uIOpfzhQPRYe6.png',
      username: '微信用户',
      phone: '',
      age: '',
      role: '学员',
      gender: '男',
      createTime: '2023年03月30日22:50:29',
      status: true
    },
    {
      "id": 100,
      "sightName": "贰燕",
      "destinationId": 67,
      "sightEnglishName": "田梓诚",
      "sightIntroduction": "non minim enim",
      "sightImage": "https://loremflickr.com/400/400?lock=361952308714645",
      "location": "exercitation",
      "visitWay": "dolore",
      "suggestTime": "2025-01-28 07:10:31",
      "openingTime": "2024-12-12 05:29:36",
      "city": "贵宁市",
      "tip": "142.202.3.115",
      "isDeleted": 28
    },])
  
  
  const handleStatusChange = (row) => {
    ElMessage.success(`用户 ${row.username} 状态已${row.status ? '启用' : '禁用'}`)
  }
  
  const handleEdit = (row) => {
    ElMessage.info(`编辑用户: ${row.username}`)
    // Implement edit logic here
  }
  
  const handleView = (row) => {
    ElMessage.info(`查看用户: ${row.username}`)
    // Implement view logic here
  }
  
  const handleSizeChange = (val) => {
    pageSize.value = val
    console.log(`Page size changed to: ${val}`)
    // Implement page size change logic
  }
  
  const handleCurrentChange = (val) => {
    currentPage.value = val
    console.log(`Current page changed to: ${val}`)
    // Implement page change logic
  }
  
  // Lifecycle
  onMounted(() => {
    // Load initial data
    console.log('User management component mounted')
  })
  </script>
  
  <style scoped>
  .user-management {
    padding: 20px;
    background-color: #f5f7fa;
    min-height: 100vh;
  }
  
  .header {
    margin-bottom: 20px;
  }
  
  .header h2 {
    color: #303133;
    font-size: 20px;
    font-weight: 500;
    margin: 0;
  }
  
  .filter-tabs {
    margin-bottom: 20px;
  }
  
  .user-table {
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  }
  
  .open-id {
    font-family: monospace;
    font-size: 12px;
    color: #606266;
  }
  
  .pagination-wrapper {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
  
  :deep(.el-table th) {
    background-color: #f5f7fa !important;
  }
  
  :deep(.el-table td) {
    border-bottom: 1px solid #ebeef5;
  }
  
  :deep(.el-table tr:hover > td) {
    background-color: #f5f7fa;
  }
  
  :deep(.el-radio-button__inner) {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    margin-right: 10px;
  }
  
  :deep(.el-radio-button:first-child .el-radio-button__inner) {
    border-radius: 4px;
  }
  
  :deep(.el-radio-button:last-child .el-radio-button__inner) {
    border-radius: 4px;
  }
  </style>