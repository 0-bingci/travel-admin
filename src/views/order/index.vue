<template>
  <div class="user-management">
    <div class="header">
      <h2>订单管理</h2>
    </div>

    <!-- Filter Tabs -->
    <FilterBar
      v-model:activeTab="activeTab"
      :filters="filters"
      :filter-options="filterOptions"
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
            @click="handleEdit(scope.row)"
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
    <el-dialog v-model="dialogFormVisible" title="编辑" width="500">
      <el-form :model="form">
        <el-form-item label="行程id" :label-width="formLabelWidth">
          <el-input v-model="form.tripId" autocomplete="off" />
        </el-form-item>
        <el-form-item label="订单号" :label-width="formLabelWidth">
          <el-input v-model="form.orderNo" autocomplete="off" />
        </el-form-item>
        <el-form-item label="用户id" :label-width="formLabelWidth">
          <el-input v-model="form.userId" autocomplete="off" />
        </el-form-item>
        <el-form-item label="订单状态" :label-width="formLabelWidth">
          <el-input v-model="form.orderStatus" autocomplete="off" />
        </el-form-item>
        <el-form-item label="总金额" :label-width="formLabelWidth">
          <el-input v-model="form.totalAmount" autocomplete="off" />
        </el-form-item>
        <el-form-item label="目的地id" :label-width="formLabelWidth">
          <el-input v-model="form.destinationId" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="submitEdit">取消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog v-model="addDialogFormVisible" title="增加" width="500">
      <el-form :model="form1">
        <el-form-item label="行程id" :label-width="formLabelWidth">
          <el-input v-model="form1.tripId" autocomplete="off" />
        </el-form-item>
        <el-form-item label="订单号" :label-width="formLabelWidth">
          <el-input v-model="form1.orderNo" autocomplete="off" />
        </el-form-item>
        <el-form-item label="用户id" :label-width="formLabelWidth">
          <el-input v-model="form1.userId" autocomplete="off" />
        </el-form-item>
        <el-form-item label="订单状态" :label-width="formLabelWidth">
          <el-input v-model="form1.orderStatus" autocomplete="off" />
        </el-form-item>
        <el-form-item label="总金额" :label-width="formLabelWidth">
          <el-input v-model="form1.totalAmount" autocomplete="off" />
        </el-form-item>
        <el-form-item label="目的地id" :label-width="formLabelWidth">
          <el-input v-model="form1.destinationId" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="submitAdd">
            确定
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
import { ref, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

import FilterBar from "@/components/FilterBar/index.vue";
import { getOrderList, addOrder, deleteOrder, updateOrder } from "../../api/order";

const dialogFormVisible = ref(false);
const addDialogFormVisible = ref(false);
const formLabelWidth = "140px";
const form = ref({
  tripId: "",
  orderNo: "",
  userId: "",
  orderStatus: "",
  totalAmount: "",
  destinationId: "",
});
const form1 = ref({
  tripId: "",
  orderNo: "",
  userId: "",
  orderStatus: "",
  totalAmount: "",
  destinationId: "",
});
const submitEdit = async () => {
  try {
    await updateOrder(form.value);
    ElMessage.success("修改成功");
    dialogFormVisible.value = false;
    const params = {...filters.value,
    pageNum: currentPage.value,
    pageSize: pageSize.value,
  };
    loadOrderData(params); // 刷新列表
  } catch (error) {
    ElMessage.error("修改失败");
    dialogFormVisible.value = false;
  }
};
//获取数据
const TableData = ref([]);
const loadOrderData = async (data: any) => {
  try {
    const res = await getOrderList(data);
    TableData.value = res.data.data.records;
    total.value = res.data.data.total;
  } catch (error) {
    console.error("加载订单数据失败:", error);
  }
};
onMounted(() => {
  // Load initial data
  const params={pageSize:10,pageNum:1};
  loadOrderData(params);
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
  },
  {
    type: "travelOrderStatus",
    model: "",
    placeholder: "请选择订单状态",
  },
  {
    type: "tripId",
    model: "",
    placeholder: "请输入行程ID",
  },
  {
    type: "userId",
    model: "",
    placeholder: "请输入用户ID",
  },
]);
// Reactive data
const activeTab = ref("all");
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
//编辑
const handleEdit = async (row:any) => { 
  // currentRow.value = row;
  form.value = {
    tripId: row.tripId || '',
    orderNo: row.orderNo || '',
    userId: row.userId || '',
    orderStatus: row.orderStatus || '',
    totalAmount: row.totalAmount || '',
    destinationId: row.destinationId || '',
  };
  console.log(row);
  
  dialogFormVisible.value = true;

};
//删除
const handleView = async (row:any) => {
  try {
    await ElMessageBox.confirm("确定要删除该景点吗？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    });
    await deleteOrder(row.id);
    ElMessage.success("删除成功");
    const params = {
    ...filters.value,
    pageNum: currentPage.value,
    pageSize: pageSize.value,
  };
    loadOrderData(params); // 刷新列表

  } catch (error) {
    if (error !== "cancel") {
      ElMessage.error("删除失败");
    }
  }
};

const handleSizeChange = (val: number) => {
  pageSize.value = val;
  const params = { pageNum: val, pageSize: pageSize.value };
  loadOrderData(params);
};

const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  const params = { pageNum: currentPage.value, pageSize: pageSize.value };
  loadOrderData(params);
};

const handleAll = () => {
  currentPage.value = 1;
  pageSize.value = 10;
  const params = {
    pageNum: currentPage.value,
    pageSize: pageSize.value
  };
  // 加载全部数据
  loadOrderData(params);
};
const handleAdd=()=>{
  addDialogFormVisible.value = true;
}
//提交添加
const submitAdd = async () => {
  try {
    const response = await addOrder(form1.value);
    console.log(response);
    
    if (response.status === 200) {
      ElMessage.success("新增景点成功");
      addDialogFormVisible.value = false;
      loadOrderData({});
    } else {
      ElMessage.error("新增景点失败");
    }
  } catch (error:any) {
    ElMessage.error("请求失败：" + error.message);
  }
};

const handleFilter = () => {
  // 重置到第一页
  const params = {
    ...filters.value,
    pageNum: currentPage.value,
    pageSize: pageSize.value,
  };
  // 应用筛选条件加载数据
  loadOrderData(params);
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
