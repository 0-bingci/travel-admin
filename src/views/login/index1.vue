<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 class="login-title">管理后台登录</h2>
      <el-form
        :model="form"
        :rules="rules"
        ref="loginFormRef"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onLogin"
            :loading="loading"
            style="width: 100%"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const router = useRouter();
const form = ref({
  username: "",
  password: "",
});
const loading = ref(false);
const loginFormRef = ref(null);

const rules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
};

const onLogin = () => {
  loginFormRef.value.validate((valid) => {
    if (valid) {
      loading.value = true;
      // 模拟登录请求
      setTimeout(() => {
        loading.value = false;
        // 这里可以保存token等
        // localStorage.setItem('token', 'xxx')
        ElMessage.success("登录成功");
        router.push("/");
      }, 1000);
    }
  });
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f7fa;
}
.login-card {
  width: 350px;
  padding: 30px 20px 10px 20px;
}
.login-title {
  text-align: center;
  margin-bottom: 30px;
  color: #409eff;
  font-weight: bold;
  letter-spacing: 2px;
}
</style>
