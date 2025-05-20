<template>
  <el-container style="height: 100vh;width: 100vw;">
    <!-- 侧边栏 -->
    <el-aside width="200px" style="background: #2d3a4b; color: #fff;">
      <div class="logo" style="height: 60px; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: bold;">
        LOGO
      </div>
      <el-menu
        :default-active="activeMenu"
        class="el-menu-vertical-demo"
        background-color="#2d3a4b"
        text-color="#fff"
        active-text-color="#409EFF"
        router
        :collapse="isCollapse"
      >
        <MenuItem
          v-for="item in menuConfig"
          :key="item.index"
          :item="item"
        />
      </el-menu>
    </el-aside>

    <!-- 主体部分 -->
    <el-container>
      <!-- 顶部栏 -->
      <el-header style="background: #fff; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 2px 8px #f0f1f2;">
        <div>管理后台</div>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            管理员
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile">个人中心</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <!-- 内容区 -->
      <el-main style="background: #f5f7fa;">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import MenuItem from './MenuItem.vue';

// 引入 Element Plus 图标
import { Document, Location, Setting, ArrowDown } from '@element-plus/icons-vue'

const menuConfig = [
  {
    index: '/home',
    icon: Document,
    title: '首页',
  },
  {
    index: '1',
    icon: Location,
    title: '用户管理',
    children: [
      {
        index: '/users/list',
        icon: Document,
        title: '用户列表',
      },
      {
        index: '/users/role',
        icon: Document,
        title: '角色管理',
      },
    ],
  },
  {
    index: '2',
    icon: Setting,
    title: '系统设置',
    children: [
      {
        index: '/settings/base',
        icon: Document,
        title: '基础设置',
      },
      {
        index: '/settings/security',
        icon: Document,
        title: '安全设置',
      },
    ],
  },
];

const isCollapse = ref(false);
const route = useRoute();
const router = useRouter();

const activeMenu = ref(route.path);

watch(() => route.path, (val) => {
  activeMenu.value = val;
});

function handleCommand(command) {
  if (command === 'profile') {
    router.push('/profile');
  } else if (command === 'logout') {
    // 这里可以清除token等操作
    // localStorage.removeItem('token');
    router.push('/login');
  }
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100%;
  border-right: none;
}
</style>
