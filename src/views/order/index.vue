<template>
  <div class="user-management">
    <div class="header">
      <h2>订单管理</h2>
    </div>

    <!-- Filter Tabs -->
    <FilterBar
      v-model:activeTab="activeTab"
      :filters="customFilters"
      :filter-options="filterOptions"
      @tab-change="handleTabChange"
      @sort-change="handleSortChange"
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
        label="行程id"
        :min-width="40"
        align="center"
      />

      <el-table-column
        prop="orderNo"
        label="订单号"
        :min-width="80"
        align="center"
      />
      <el-table-column
        prop="userId"
        label="用户id"
        :min-width="40"
        align="center"
      />
      <el-table-column
        prop="orderStatus"
        label="订单状态
"
        :min-width="80"
        align="center"
      />
      <el-table-column
        prop="totalAmount"
        label="行程id
"
        :min-width="40"
        align="center"
      />
      <el-table-column
        prop="destinationId"
        label="目的地id"
        :min-width="40"
        align="center"
      />
      <el-table-column label="操作" :min-width="80" align="center">
        <template #default="scope">
          <el-button
            plain
            @click="dialogFormVisible = true"
            type="primary"
            size="small"
          >
            编辑
          </el-button>
          <el-button type="success" size="small" @click="handleView(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogFormVisible" title="Shipping address" width="500">
      <el-form :model="form">
        <el-form-item label="行程id" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="订单号" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="用户id" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="订单状态" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="行程id" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="目的地id" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
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
import { reactive, ref, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

import FilterBar from "@/components/FilterBar/index.vue";
import { getOrderList } from "../../api/order";

const dialogFormVisible = ref(false);
const formLabelWidth = "140px";
const form = reactive({
  name: "",
  region: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
});
//获取数据
const TableData = ref([]);
const loadOrderData = async () => {
  try {
    const res = await getOrderList();
    TableData.value = res.data.records;
  } catch (error) {
    console.error("加载订单数据失败:", error);
  }
};
onMounted(() => {
  // Load initial data
  loadOrderData();
  console.log("User management component mounted");
});
const filterOptions = ref({
  destinations: [
    { label: "北京", value: "beijing" },
    { label: "上海", value: "shanghai" },
    { label: "广州", value: "guangzhou" },
  ],
  days: [
    { label: "1天", value: 1 },
    { label: "2天", value: 2 },
    { label: "3天", value: 3 },
  ],
  types: [
    { label: "自由行", value: "free" },
    { label: "跟团游", value: "group" },
  ],
  times: [
    { label: "上午", value: "morning" },
    { label: "下午", value: "afternoon" },
  ],
});
const customFilters = ref([
  { type: "price", model: "", placeholder: "价格区间" },
  { type: "days", model: "", placeholder: "出行日期" },
]);
// Reactive data
const activeTab = ref("all");
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(17);

const handleView = (row) => {
  ElMessage.info(`查看用户: ${row.username}`);
  // Implement view logic here
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
