<template>
  <div class="login-container">
    <div class="login-card">
      <div class="logo">
        <span>logo</span>
      </div>

      <h1 class="title">{{ isRegister ? '管理后台注册' : '管理后台登录' }}</h1>
      <p class="subtitle"></p>
      <div class="toggle-mode">
      </div>

      <el-form
        :model="form"
        :rules="rules"
        ref="loginFormRef"
        label-width="80px"
        v-if="!isRegister"
      >
        <el-form-item  prop="username" label-width="0">
          <el-input v-model="form.username" placeholder="用户名" autocomplete="off" />
        </el-form-item>
        <el-form-item  prop="password" label-width="0">
          <el-input
          placeholder="密码"
            v-model="form.password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label-width="0">
          <el-button
            type="primary"
            @click="onSubmit"
            :loading="loading"
            style="width: 100%"
            >{{ isRegister ? '注册' : '登录' }}</el-button
          >
        </el-form-item>
      </el-form>
      <el-form
        :model="form"
        :rules="rules"
        ref="loginFormRef"
        label-width="80px"
        v-if="isRegister"
      >
      <el-form-item  prop="username" label-width="0">
          <el-input v-model="form.username" autocomplete="off" placeholder="请输入用户名"/>
        </el-form-item>
        <el-form-item  prop="password" label-width="0" >
          <el-input
          placeholder="请输入密码"
            v-model="form.password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item  prop="confirmPassword" label-width="0">
          <el-input
          placeholder="重复输入密码"
            v-model="form.confirmPassword"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label-width="0">
          <el-button
            type="primary"
            @click="onSubmit"
            :loading="loading"
            style="width: 100%"
            >{{ isRegister ? '注册' : '登录' }}</el-button
          >
        </el-form-item>
      </el-form>
      <span @click="toggleMode">
          {{ isRegister ? '已有账号？去登录' : '没有账号？去注册' }}
        </span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const router = useRouter();
const isRegister = ref(false);
const form = ref({
  username: "",
  password: "",
  confirmPassword: ""
});
const loading = ref(false);
const loginFormRef = ref(null);

const rules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  confirmPassword: [
    { required: true, message: "请确认密码", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (value !== form.value.password) {
          callback(new Error('两次输入密码不一致'));
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ]
};

const toggleMode = () => {
  isRegister.value = !isRegister.value;
  loginFormRef.value.resetFields();
};

const onSubmit = () => {
  loginFormRef.value.validate((valid) => {
    if (valid) {
      loading.value = true;
      // 模拟请求
      setTimeout(() => {
        loading.value = false;
        if (isRegister.value) {
          ElMessage.success("注册成功");
          toggleMode();
        } else {
          // 这里可以保存token等
          // localStorage.setItem('token', 'xxx')
          ElMessage.success("登录成功");
          router.push("/");
        }
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
