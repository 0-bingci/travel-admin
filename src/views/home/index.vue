<template>
  <div class="dashboard">
    <h1>管理仪表盘</h1>
    
    <!-- 数据概览卡片 -->
    <div class="stats-grid">
      <el-card class="stat-card">
        <div class="stat-value">{{ dashboardStore.tripCount }}</div>
        <div class="stat-label">总行程数</div>
      </el-card>
      
      <el-card class="stat-card">
        <div class="stat-value">{{ dashboardStore.attractionCount }}</div>
        <div class="stat-label">总景点数</div>
      </el-card>
      
      <el-card class="stat-card">
        <div class="stat-value">{{ dashboardStore.orderCount }}</div>
        <div class="stat-label">总订单数</div>
      </el-card>
      
      <!-- <el-card class="stat-card">
        <div class="stat-value">{{ dashboardStore.todayOrderCount }}</div>
        <div class="stat-label">今日订单</div>
      </el-card> -->
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useDashboardStore } from '../../store/modules/dashboard';
import { getOrderList } from "../../api/order";
import { getAttractionList } from "../../api/attraction";
import { getTripList } from "../../api/trip";

const dashboardStore = useDashboardStore();

const loadStats = async () => {
  try {
    const [tripsRes, attractionsRes, ordersRes] = await Promise.all([
      getTripList({ pageNum: 1 }),
      getAttractionList({ pageNum: 1 }),
      getOrderList({ pageNum: 1 })
    ]);

    dashboardStore.setStats({
      tripCount: tripsRes.data.length,
      attractionCount: attractionsRes.data.records.length,
      orderCount: ordersRes.data.data.records.length,
      todayOrderCount: ordersRes.data.data.records.length
    });
  } catch (error) {
    console.error('加载统计数据失败:', error);
  }
};

onMounted(() => {
  loadStats();
});
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 20px 0;
}

.stat-card {
  text-align: center;
  padding: 20px;
}

.stat-value {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 8px;
}

.stat-label {
  color: #666;
}

.quick-actions {
  display: flex;
  gap: 15px;
  margin-top: 30px;
}
</style>