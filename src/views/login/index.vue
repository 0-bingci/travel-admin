<template>
  <div class="login-container">
    <div class="login-card">
      <div class="logo">
        <span>logo</span>
      </div>

      <h1 class="title">Welcome back!</h1>
      <p class="subtitle">Log in</p>

      <el-form
        :model="form"
        :rules="rules"
        ref="loginFormRef"
        label-width="80px"
      >
        <el-form-item placeholder="用户名" prop="username" label-width="0">
          <el-input v-model="form.username" autocomplete="off" />
        </el-form-item>
        <el-form-item placeholder="密码" prop="password" label-width="0">
          <el-input
            v-model="form.password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label-width="0">
          <el-button
            type="primary"
            @click="onLogin"
            :loading="loading"
            style="width: 100%"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
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
  display: flex;
  min-width: 100vw;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #a1c4fd 0%, #6f86d6 100%);

  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.login-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 40px 30px;
  width: 100%;
  max-width: 360px;
  text-align: center;
}

.logo {
  width: 50px;
  height: 50px;
  background-color: #4a6cf7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: white;
  font-size: 14px;
}

.title {
  color: #333;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 5px;
}

.subtitle {
  color: #666;
  font-size: 16px;
  margin-bottom: 25px;
}

.form-group {
  margin-bottom: 20px;
  width: 91%;
}

input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s;
}

input:focus {
  outline: none;
  border-color: #4a6cf7;
}

.login-button {
  width: 100%;
  padding: 12px;
  background: linear-gradient(to right, #4a6cf7, #6f86d6);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.3s;
}

.login-button:hover {
  opacity: 0.9;
}

.links {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  font-size: 14px;
}

.forgot-password,
.register {
  color: #666;
  text-decoration: none;
  transition: color 0.3s;
}

.forgot-password:hover,
.register:hover {
  color: #4a6cf7;
}
</style>
