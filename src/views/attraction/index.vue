<template>
  <div class="user-management">
    <div class="header">
      <h2>景点管理</h2>
    </div>
    <FilterBar
      :activeTab="activeTab"
      :filterOptions="filterOptions"
      :filters="filters"
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
      class="user-table"
      :header-cell-style="{ backgroundColor: '#f5f7fa', color: '#606266' }"
      max-heigh="100%"
      show-header
      size="medium"
    >
      <el-table-column prop="id" label="景点编号" width="120" align="center" />
      <el-table-column
        prop="city"
        label="城市"
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="sightName"
        label="景点的中文名称"
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="sightEnglishName"
        label="景点的英文名称"
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="sightIntroduction"
        label="景点的简要介绍"
        width="120"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column label="景点图片" width="120" align="center">
        <template #default="scope">
          <el-avatar 
            :size="60" 
            :src="scope.row.sightImage" 
            shape="square" 
            @click="handlePreview(scope.row.sightImage)"
            style="cursor: pointer"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="location"
        label="景点的地理位置"
        width="120"
        align="center"
      />
      <el-table-column
        prop="visitWay"
        label="游览该景点的方式"
        width="120"
        align="center"
      />
      <el-table-column
        prop="suggestTime"
        label="游览该景点的建议时长"
        width="120"
        align="center"
      />
      <el-table-column
        prop="openingTime"
        label="景点的开放时间"
        width="120"
        align="center"
      />
      <el-table-column
        prop="tip"
        label="游览该景点的小贴士"
        width="120"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="suggestTime"
        label="建议游览时长"
        width="120"
        align="center"
      />
      <el-table-column
        prop="destinationId"
        label="目的地ID"
        width="120"
        align="center"
      />
      <el-table-column label="操作" width="140" align="center">
        <template #default="scope">
          <div style="display: flex; gap: 8px">
            <el-button
              type="primary"
              size="small"
              @click="openEditDialog(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              size="small"
              @click="handleDelete(scope.row)"
            >
              删除
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑景点信息" v-model="editDialogVisible" width="50%">
      <el-form :model="form" label-width="120px">
        <el-form-item label="景点名称">
          <el-input v-model="form.sightName"></el-input>
        </el-form-item>
        <el-form-item label="英文名称">
          <el-input v-model="form.sightEnglishName"></el-input>
        </el-form-item>
        <el-form-item label="景点介绍">
          <el-input type="textarea" v-model="form.sightIntroduction"></el-input>
        </el-form-item>
        <el-form-item label="景点图片">
          <el-upload
            class="avatar-uploader"
            action="/api/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <div class="image-container">
              <img v-if="form.sightImage" :src="form.sightImage" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              <div v-if="form.sightImage" class="image-actions">
                <el-button circle @click.stop="handlePreview(form.sightImage)">
                  <el-icon><ZoomIn /></el-icon>
                </el-button>
                <el-button circle @click.stop="form.sightImage = ''">
                  <el-icon><Delete /></el-icon>
                </el-button>
              </div>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="地理位置">
          <el-input v-model="form.location"></el-input>
        </el-form-item>
        <el-form-item label="游览方式">
          <el-input v-model="form.visitWay"></el-input>
        </el-form-item>
        <el-form-item label="建议时长">
          <el-input v-model="form.suggestTime"></el-input>
        </el-form-item>
        <el-form-item label="开放时间">
          <el-input v-model="form.openingTime"></el-input>
        </el-form-item>
        <el-form-item label="小贴士">
          <el-input type="textarea" v-model="form.tip"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitEdit">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog v-model="addDialogVisible" title="添加景点" width="50%">
      <el-form :model="form1" label-width="120px">
        <el-form-item label="景点名称">
          <el-input v-model="form1.sightName" />
        </el-form-item>
        <el-form-item label="英文名称">
          <el-input v-model="form1.sightEnglishName" />
        </el-form-item>
        <el-form-item label="景点介绍">
          <el-input v-model="form1.sightIntroduction" type="textarea" />
        </el-form-item>
        <el-form-item label="景点图片">
          <el-upload
            class="avatar-uploader"
            action="/api/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <div class="image-container">
              <img v-if="form1.sightImage" :src="form1.sightImage" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              <div v-if="form1.sightImage" class="image-actions">
                <el-button circle @click.stop="handlePreview(form1.sightImage)">
                  <el-icon><ZoomIn /></el-icon>
                </el-button>
                <el-button circle @click.stop="form1.sightImage = ''">
                  <el-icon><Delete /></el-icon>
                </el-button>
              </div>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="地理位置">
          <el-input v-model="form1.location" />
        </el-form-item>
        <el-form-item label="游览方式">
          <el-input v-model="form1.visitWay" />
        </el-form-item>
        <el-form-item label="建议时长">
          <el-input v-model="form1.suggestTime" />
        </el-form-item>
        <el-form-item label="开放时间">
          <el-input v-model="form1.openingTime" />
        </el-form-item>
        <el-form-item label="小贴士">
          <el-input v-model="form1.tip" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitAdd">确认</el-button>
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
import { ref, onMounted, h } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { Plus, ZoomIn, Delete } from '@element-plus/icons-vue';
import FilterBar from "@/components/FilterBar/index.vue";

import { getAttractionList, addAttraction, updateAttraction, deleteAttraction } from "../../api/attraction";

const handleAvatarSuccess = (response: any) => {
  form.value.sightImage = response.url
}

const handlePreview = (url: string) => {
  if (!url) {
    ElMessage.warning('请先上传图片')
    return
  }
  ElMessageBox({
    title: '图片预览',
    message: h('img', { 
      src: url, 
      style: 'max-width: 100%; max-height: 80vh; display: block; margin: 0 auto;' 
    }),
    customClass: 'image-preview-dialog',
    showConfirmButton: false,
    closeOnClickModal: true
  })
}

const beforeAvatarUpload = (file: File) => {
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isJPG) {
    ElMessage.error('图片只能是 JPG/PNG 格式!')
  }
  if (!isLt2M) {
    ElMessage.error('图片大小不能超过 2MB!')
  }
  return isJPG && isLt2M
}


//获取数据
const TableData = ref([]);
const loadAttractionData = async (data:any) => {
  const res = await getAttractionList(data);
  console.log(res);
  
  TableData.value = res.data.records;
  total.value = res.data.total;
};
// 在methods中添加handleFilter方法
const handleFilter = () => {
  // 构造筛选参数
  const filterParams = {
    ...filters.value,
    pageNum: currentPage.value,
    pageSize: pageSize.value,
  };
  // 调用接口获取筛选数据
  loadAttractionData(filterParams);
};
// 筛选配置
const filterOptions = {
  destinationId: {
    type: "input",
    label: "目的地ID",
    placeholder: "请输入目的地ID",
  },
  visitWay: {
    type: "select",
    label: "游览方式",
    placeholder: "请选择游览方式",
    options: [
      { label: "步行", value: "walk" },
      { label: "自驾", value: "drive" },
      { label: "公共交通", value: "public" },
    ],
  },
  suggestTime: {
    type: "input",
    label: "建议时长",
    placeholder: "请输入建议游览时长(小时)",
  },
  cityName: {
    type: "input",
    label: "城市名称",
    placeholder: "请输入城市名称",
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
    type: "visitWay",
    model: "",
    placeholder: "请选择游览方式",
  },
  {
    type: "suggestTime",
    model: "",
    placeholder: "请输入建议时长",
  },
  {
    type: "cityName",
    model: "",
    placeholder: "请输入城市名称",
  },
]);
// Reactive data
const activeTab = ref("all");
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);

const editDialogVisible = ref(false);
const currentRow = ref({});
const form = ref({
  id: 0,
  sightName: "",
  sightEnglishName: "",
  sightIntroduction: "",
  sightImage: "",
  location: "",
  visitWay: "",
  suggestTime: "",
  openingTime: "",
  tip: "",
});

const openEditDialog = (row:any) => {
  currentRow.value = row;
  form.value = {
    id: row.id,
    sightName: row.sightName,
    sightEnglishName: row.sightEnglishName,
    sightIntroduction: row.sightIntroduction,
    sightImage: row.sightImage,
    location: row.location,
    visitWay: row.visitWay,
    suggestTime: row.suggestTime,
    openingTime: row.openingTime,
    tip: row.tip,
  };
  editDialogVisible.value = true;
};
//删除
const handleDelete = async (row:any) => {
  try {
    await ElMessageBox.confirm("确定要删除该景点吗？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    });
    await deleteAttraction(row.id);
    ElMessage.success("删除成功");
    const params = {
    ...filters.value,
    pageNum: currentPage.value,
    pageSize: pageSize.value,
  };
    loadAttractionData(params); // 刷新列表
  } catch (error) {
    if (error !== "cancel") {
      ElMessage.error("删除失败");
    }
  }
};
//编辑
const submitEdit = async () => {
  try {
    await updateAttraction(form.value);
    ElMessage.success("修改成功");
    editDialogVisible.value = false;
    const params = {...filters.value,
    pageNum: currentPage.value,
    pageSize: pageSize.value,
  };
    loadAttractionData(params); // 刷新列表
  } catch (error) {
    ElMessage.error("修改失败");
  }
};

const addDialogVisible = ref(false);
const form1 = ref({
  id: 0,
  sightName: "",
  sightEnglishName: "",
  sightIntroduction: "",
  sightImage: "",
  location: "",
  visitWay: "",
  suggestTime: "",
  openingTime: "",
  tip: "",
});
// 添加
const handleAdd = () => {
  addDialogVisible.value = true;
  form1.value = {
    id: 0,
    sightName: "",
    sightEnglishName: "",
    sightIntroduction: "",
    sightImage: "",
    location: "",
    visitWay: "",
    suggestTime: "",
    openingTime: "",
    tip: "",
  };
};

//提交添加
const submitAdd = async () => {
  try {
    const response = await addAttraction(form1.value);
    console.log(response);
    
    if (response.status === 200) {
      ElMessage.success("新增景点成功");
      addDialogVisible.value = false;
      loadAttractionData({});
    } else {
      ElMessage.error("新增景点失败");
    }
  } catch (error:any) {
    ElMessage.error("请求失败：" + error.message);
  }
};
//重置
const handleAll = () => {
  pageSize.value = 10;
  currentPage.value = 1;
  const params = { pageNum: currentPage.value, pageSize: pageSize.value };
  loadAttractionData(params);
};
//分页改变
const handleSizeChange = (val:number) => {
  pageSize.value = val;
  const params = { pageNum: currentPage.value, pageSize: pageSize.value };
  loadAttractionData(params);
};
const handleCurrentChange = (val:number) => {
  currentPage.value = val;
  const params = { pageNum: currentPage.value, pageSize: pageSize.value };
  loadAttractionData(params);
};
//初始化
onMounted(() => {
  const params = { pageNum: currentPage.value, pageSize: pageSize.value };
  loadAttractionData(params);
});
</script>

<style scoped>
.image-container {
  position: relative;
  width: 178px;
  height: 178px;
}

.avatar-uploader .avatar {
  width: 100%;
  height: 100%;
  display: block;
}

.image-actions {
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 10px;
  opacity: 0;
  transition: opacity 0.3s;
}

.image-container:hover .image-actions {
  opacity: 1;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
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
  max-height: 80vh;
  font-size: 1rem;
  white-space: nowrap;
}

.user-table .el-table__cell {
  padding: 12px 0;
}

.user-table .el-table__header .el-table__cell {
  white-space: nowrap;
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
