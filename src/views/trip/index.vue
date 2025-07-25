<template>
  <div class="user-management">
    <div class="header">
      <h2>行程管理</h2>
    </div>
    <FilterBar
      v-model:activeTab="activeTab"
      :filters="filters"
      :filter-options="filterOptions"
      @tab-change="handleTabChange"
      @sort-change="handleSortChange"
      :tabs="[
        {
          value: 'add',
          label: '新增',
          handler: handleAdd,
        },
        {
          value: 'all',
          label: '重置',
          handler: handleAll,
        },
        {
          value: 'filter',
          label: '筛选',
          handler: handleFilter,
        },
      ]"
    />

    <!-- User Table -->
    <!-- 订单号 目的地、客服电话、人数、时间、付款金额、订单状态等 -->
    <el-table
      :data="TableData"
      style="width: 100%"
      class="user-table"
      :header-cell-style="{ backgroundColor: '#f5f7fa', color: '#606266' }"
    >
      <el-table-column
        prop="id"
        label="ID"
        :min-width="80"
        align="center"
      />

      <el-table-column
        prop="tripTitle"
        label="行程标题"
        :min-width="120"
        align="center"
      />

      <el-table-column label="行程图片" :min-width="100" align="center">
        <template #default="scope">
          <el-image 
            :src="scope.row.tripImage" 
            :style="{ width: '60px', height: '60px' }"
            fit="cover"
          />
        </template>
      </el-table-column>

      <el-table-column
        prop="startDay"
        label="出发日期"
        :min-width="100"
        align="center"
      />
      
      <el-table-column
        prop="tripDays"
        label="行程天数"
        :min-width="80"
        align="center"
      />

      <el-table-column
        prop="price"
        label="价格"
        :min-width="80"
        align="center"
      />

      <el-table-column
        prop="city"
        label="城市"
        :min-width="80"
        align="center"
      />

      <el-table-column
        prop="peopleNumber"
        label="人数"
        :min-width="80"
        align="center"
      />

      <el-table-column
        prop="isLuxury"
        label="豪华套餐"
        :min-width="80"
        align="center"
      >
        <template #default="scope">
          <el-tag :type="scope.row.isLuxury ? 'success' : 'info'">
            {{ scope.row.isLuxury ? '是' : '否' }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" :min-width="120" align="center">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <el-button type="success" size="small" @click="handleDelete(scope.row)">
            删除
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

    <!-- Add Trip Dialog -->
    <el-dialog v-model="addDialogVisible" title="添加行程" width="500px">
      <el-form :model="addForm" label-width="100px" ref="addFormRef">
        <el-form-item label="行程标题" prop="tripTitle">
          <el-input v-model="addForm.tripTitle" />
        </el-form-item>
        <el-form-item label="行程图片" prop="tripImage">
          <el-input v-model="addForm.tripImage" />
        </el-form-item>
        <el-form-item label="出发日期" prop="startDay">
          <el-date-picker
            v-model="addForm.startDay"
            type="date"
            placeholder="选择日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="行程天数" prop="tripDays">
          <el-input-number v-model="addForm.tripDays" :min="1" />
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input-number v-model="addForm.price" :min="0" />
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-input v-model="addForm.city" />
        </el-form-item>
        <el-form-item label="人数" prop="peopleNumber">
          <el-input-number v-model="addForm.peopleNumber" :min="1" />
        </el-form-item>
        <el-form-item label="豪华套餐" prop="isLuxury">
          <el-switch v-model="addForm.isLuxury" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitAdd">确认</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- Edit Trip Dialog -->
    <el-dialog v-model="editDialogVisible" title="编辑行程" width="500px">
      <el-form :model="editForm" label-width="100px" ref="editFormRef">
        <el-form-item label="行程标题" prop="tripTitle">
          <el-input v-model="editForm.tripTitle" />
        </el-form-item>
        <el-form-item label="行程图片" prop="tripImage">
          <el-input v-model="editForm.tripImage" />
        </el-form-item>
        <el-form-item label="出发日期" prop="startDay">
          <el-date-picker
            v-model="editForm.startDay"
            type="date"
            placeholder="选择日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="行程天数" prop="tripDays">
          <el-input-number v-model="editForm.tripDays" :min="1" />
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input-number v-model="editForm.price" :min="0" />
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-input v-model="editForm.city" />
        </el-form-item>
        <el-form-item label="人数" prop="peopleNumber">
          <el-input-number v-model="editForm.peopleNumber" :min="1" />
        </el-form-item>
        <el-form-item label="豪华套餐" prop="isLuxury">
          <el-switch v-model="editForm.isLuxury" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitEdit">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { getTripList, createTrip, updateTrip, deleteTrip } from "../../api/trip";
// 1. 导入dashboard store
import { useDashboardStore } from '@/store/modules/dashboard';
import FilterBar from "@/components/FilterBar/index.vue";

// 2. 初始化store
const dashboardStore = useDashboardStore();

// 表单数据
const addForm = ref({
  tripTitle: '',
  tripImage: '',
  startDay: '',
  tripDays: 1,
  price: 0,
  city: '',
  peopleNumber: 1,
  isLuxury: false
});

const editForm = ref({
  id: '',
  tripTitle: '',
  tripImage: '',
  startDay: '',
  tripDays: 1,
  price: 0,
  city: '',
  peopleNumber: 1,
  isLuxury: false
});

// 对话框可见性
const addDialogVisible = ref(false);
const editDialogVisible = ref(false);

// 表单引用
const addFormRef = ref(null);
const editFormRef = ref(null);

//获取数据
const TableData = ref([]);
const loadTripData = async (data) => {
  try {
    const res = await getTripList(data);
    console.log(res);
    dashboardStore.tripCount = res.data.length;
    TableData.value = res.data;
    total.value = res.data.total;
    console.log(TableData.value);
  } catch (error) {
    console.error("加载订单数据失败:", error);
  }
};
onMounted(() => {
  // Load initial data
  loadTripData({ pageNum: 1 });
  console.log("User management component mounted");
});

// 筛选配置
const filterOptions = {
  destinationId: {
    type: "input",
    label: "目的地ID",
    placeholder: "请输入目的地ID",
  },
  travelOrderStatus: {
    type: "select",
    label: "订单状态",
    placeholder: "请选择订单状态",
    options: [
      { label: "待支付", value: "unpaid" },
      { label: "已支付", value: "paid" },
      { label: "已完成", value: "completed" },
      { label: "已取消", value: "canceled" },
    ],
  },
  tripId: {
    type: "input",
    label: "行程ID",
    placeholder: "请输入行程ID",
  },
  userId: {
    type: "input",
    label: "用户ID",
    placeholder: "请输入用户ID",
  },
};
// 分页和筛选数据
// 修改filters的定义
const filters = ref([
  {
    type: "destinationId",
    model: "",
    placeholder: "请输入目的地ID",
    required: true
  },
  {
    type: "travelOrderStatus",
    model: "",
    placeholder: "请选择订单状态",
    required: true
  },
  {
    type: "tripId",
    model: "",
    placeholder: "请输入行程ID",
    required: true
  },
  {
    type: "userId",
    model: "",
    placeholder: "请输入用户ID",
    required: true
  },
]);
// Reactive data
const activeTab = ref("all");
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);


// Table data
const tableData = ref([]);

const handleStatusChange = (row) => {
  ElMessage.success(
    `用户 ${row.username} 状态已${row.status ? "启用" : "禁用"}`
  );
};

// 打开添加对话框
const handleAdd = () => {
  // 重置表单数据
  addForm.value = {
    tripTitle: '',
    tripImage: '',
    startDay: '',
    tripDays: 1,
    price: 0,
    city: '',
    peopleNumber: 1,
    isLuxury: false
  };
  addDialogVisible.value = true;
};

// 打开编辑对话框
const handleEdit = (row) => {
  // 填充表单数据
  editForm.value = {
    id: row.id,
    tripTitle: row.tripTitle || '',
    tripImage: row.tripImage || '',
    startDay: row.startDay || '',
    tripDays: row.tripDays || 1,
    price: row.price || 0,
    city: row.city || '',
    peopleNumber: row.peopleNumber || 1,
    isLuxury: row.isLuxury || false
  };
  editDialogVisible.value = true;
};

// 提交添加表单
const submitAdd = async () => {
  try {
    await createTrip(addForm.value);
    ElMessage.success('行程添加成功');
    addDialogVisible.value = false;
    loadTripData({ pageNum: currentPage.value });
  } catch (error) {
    ElMessage.error('行程添加失败');
    console.error(error);
  }
};

// 提交编辑表单
const submitEdit = async () => {
  try {
    await updateTrip(editForm.value);
    ElMessage.success('行程更新成功');
    editDialogVisible.value = false;
    loadTripData({ pageNum: currentPage.value });
  } catch (error) {
    ElMessage.error('行程更新失败');
    console.error(error);
  }
};

const handleDelete = async (id) => {
  try {
    await deleteTrip(id);
    ElMessage.success('行程删除成功');
    loadTripData({ pageNum: currentPage.value });
  } catch (error) {
    ElMessage.error('行程删除失败');
    console.error(error);
  }
};

const handleSizeChange = (val) => {
  pageSize.value = val;
  console.log(`Page size changed to: ${val}`);
  // Implement page size change logic
};

const handleCurrentChange = (val) => {
  currentPage.value = val;
  console.log(`Current page changed to: ${val}`);
  // Implement page change logic
};

// 处理重置操作
const handleAll = () => {
  // 重置所有筛选条件
  filters.value.forEach(filter => {
    filter.model = '';
  });
  
  // 重新加载所有数据
  loadTripData({ pageNum: 1, pageSize: pageSize.value });
};

// 处理筛选操作
const handleFilter = () => {
  // 构造筛选参数
  const filterParams = {};
  
  filters.value.forEach(filter => {
    if (filter.model !== '') {
      filterParams[filter.type] = filter.model;
    }
  });
  
  // 添加分页参数
  filterParams.pageNum = 1;
  filterParams.pageSize = pageSize.value;
  
  // 根据筛选条件加载数据
  loadTripData(filterParams);
};

// 处理标签页切换
const handleTabChange = (tab) => {
  console.log('Tab changed to:', tab);
  // 可以根据需要添加额外的逻辑
};

// 处理排序变化
const handleSortChange = (sortInfo) => {
  console.log('Sort changed to:', sortInfo);
  // 可以根据需要添加排序逻辑
};

// Lifecycle
onMounted(() => {
  // Load initial data
  loadTripData({ pageNum: 1 });
  console.log("Trip management component mounted");
});
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
