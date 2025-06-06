<template>
  <div class="user-management">
    <div class="header">
      <h2>行程管理</h2>
    </div>
    
    
    <!-- User Table -->
    <!-- 订单号 目的地、客服电话、人数、时间、付款金额、订单状态等 -->
    <el-table 
      :data="tableData" 
      style="width: 100%" 
      class="user-table"
      :header-cell-style="{ backgroundColor: '#f5f7fa', color: '#606266' }"
    >
      <el-table-column prop="id" label="订单号" :min-width="80" align="center" />
      
      <el-table-column prop="目的地" label="OpenID" :min-width="80" align="center">
        <template #default="scope">
          <span class="open-id">{{ scope.row.openId }}</span>
        </template>
      </el-table-column>
      
      <el-table-column label="客服电话" :min-width="80" align="center">
        <template #default="scope">
          <el-avatar :size="40" :src="scope.row.avatar" />
        </template>
      </el-table-column>
      
      <el-table-column prop="人数" label="用户名" :min-width="80" align="center" />
      <el-table-column prop="付款金额" label="年龄" :min-width="80" align="center" />
      
      
      <el-table-column prop="createTime" label="创建时间" :min-width="80" align="center" />
      
      <el-table-column label="订单状态" :min-width="80" align="center">
        <template #default="scope">
          <el-switch 
            v-model="scope.row.status" 
            @change="handleStatusChange(scope.row)"
          />
        </template>
      </el-table-column>
      
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

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

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
    id: 2,
    openId: 'oqdo1TuQWn...',
    avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-znUvJcS8noRpeKcj7uIOpfzhQPRYe6.png',
    username: '微信用户',
    phone: '',
    age: '',
    role: '学员',
    gender: '男',
    createTime: '2023年04月07日23:48:38',
    status: true
  },
  {
    id: 3,
    openId: 'oqdo1TQqXg...',
    avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-znUvJcS8noRpeKcj7uIOpfzhQPRYe6.png',
    username: '微信用户',
    phone: '',
    age: '',
    role: '学员',
    gender: '男',
    createTime: '2023年04月12日23:09:00',
    status: true
  },
  {
    id: 4,
    openId: 'oqdo1X71auE...',
    avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-znUvJcS8noRpeKcj7uIOpfzhQPRYe6.png',
    username: '定贤贤',
    phone: '',
    age: 28,
    role: '学员',
    gender: '女',
    createTime: '2023年04月10日22:57:07',
    status: true
  },
  {
    id: 5,
    openId: 'oqdo1X7-PuoQ...',
    avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-znUvJcS8noRpeKcj7uIOpfzhQPRYe6.png',
    username: 'Angela',
    phone: '',
    age: 29,
    role: '学员',
    gender: '女',
    createTime: '2023年05月01日16:59:43',
    status: true
  },
  {
    id: 6,
    openId: 'oqdo1TTuW55...',
    avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-znUvJcS8noRpeKcj7uIOpfzhQPRYe6.png',
    username: '微信用户',
    phone: '',
    age: '',
    role: '学员',
    gender: '男',
    createTime: '2023年05月01日23:11:34',
    status: true
  },
  {
    id: 7,
    openId: 'oqdo1X8e7N...',
    avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-znUvJcS8noRpeKcj7uIOpfzhQPRYe6.png',
    username: '微信用户',
    phone: '',
    age: '',
    role: '学员',
    gender: '男',
    createTime: '2023年05月07日19:09:54',
    status: true
  },
  {
    id: 8,
    openId: 'oqdo1X8e7N...',
    avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-znUvJcS8noRpeKcj7uIOpfzhQPRYe6.png',
    username: '微信用户',
    phone: '',
    age: '',
    role: '学员',
    gender: '男',
    createTime: '2023年05月07日19:09:54',
    status: true
  },
  {
    id: 9,
    openId: 'oqdo1X8e7N...',
    avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-znUvJcS8noRpeKcj7uIOpfzhQPRYe6.png',
    username: '微信用户',
    phone: '',
    age: '',
    role: '学员',
    gender: '男',
    createTime: '2023年05月07日19:09:54',
    status: true
  },
  {
    id: 10,
    openId: 'oqdo1X8e7N...',
    avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-znUvJcS8noRpeKcj7uIOpfzhQPRYe6.png',
    username: '微信用户',
    phone: '',
    age: '',
    role: '学员',
    gender: '男',
    createTime: '2023年05月07日19:09:54',
    status: true
  },
  {
    id: 11,
    openId: 'oqdo1X8e7N...',
    avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-znUvJcS8noRpeKcj7uIOpfzhQPRYe6.png',
    username: '微信用户',
    phone: '',
    age: '',
    role: '学员',
    gender: '男',
    createTime: '2023年05月07日19:09:54',
    status: true
  },
  {
    id: 12,
    openId: 'oqdo1X8e7N...',
    avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-znUvJcS8noRpeKcj7uIOpfzhQPRYe6.png',
    username: '微信用户',
    phone: '',
    age: '',
    role: '学员',
    gender: '男',
    createTime: '2023年05月07日19:09:54',
    status: true
  },
  {
    id: 13,
    openId: 'oqdo1X8e7N...',
    avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-znUvJcS8noRpeKcj7uIOpfzhQPRYe6.png',
    username: '微信用户',
    phone: '',
    age: '',
    role: '学员',
    gender: '男',
    createTime: '2023年05月07日19:09:54',
    status: true
  }
])


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