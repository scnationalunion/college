<template>
<div>
  <div class="login-container" >
    <img class="bg-image" src="/image/m5.jpeg">
    <el-card class="login-card" v-if="showForm">
      <h2 class="login-title">管理员登录页面</h2>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-width="80px">
        <el-form-item label="Username" prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入你的用户名"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入你的密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login" :loading="loginLoading">登录</el-button>
          <!-- <el-button type="primary" @click="register">注册</el-button> -->
        </el-form-item>
      </el-form>
    </el-card>
    <!-- <el-card class="login-card" v-if="!showForm" >
      <h2 class="login-title">用户注册页面</h2>
        <el-form ref="form" :model="form" label-width="80px" :rules="registerRule">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input type="password" v-model="form.confirmPassword" placeholder="请再次输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="register" :loading="registerLoading">确认注册</el-button>
            <el-button type="primary" @click="register">取消</el-button>
          </el-form-item>
        </el-form>
    </el-card> -->

  </div>
 
</div>
  
    
</template>

<script>
  import { Card, Form, FormItem, Input, Button } from 'element-ui';
  import $http from '@/api/axiosapi'; //$http是在导入时自定义的命名可变的

  export default {
    name: 'LoginPage',
    components: {
      ElCard: Card,
      ElForm: Form,
      ElFormItem: FormItem,
      ElInput: Input,
      ElButton: Button,
    },
    data() {
      return {
        showForm:true,
        form: {
          username: '',
          password: '',
          confirmPassword: ''
        },
        loginForm: {
          username: '',
          password: '',
        },
        loginRules: {
          username: [
            { required: true, message: 'Please enter your username', trigger: 'blur' },
          ],
          password: [
            { required: true, message: 'Please enter your password', trigger: 'blur' },
          ],
        },
        registerRule:{
          username: [
            { required: true, message: 'Please enter your username', trigger: 'blur' },
          ],
          password: [
            { required: true, message: 'Please enter your password', trigger: 'blur' },
          ],
        },
        loginLoading: false,
        registerLoading:false,
        msg:'',
      };
    },
    methods: {
      // register() {
      //   this.showForm=false
      //   this.$refs.form.validate(valid => {
      //     if (valid) {
      //       // 在这里添加处理注册逻辑的代码
      //       if(this.form.password===this.form.confirmPassword){
      //         $http.post('api/mimissm/register',"username="+this.form.username+"&password="+this.form.password)
      //         .then(res=>{
      //           this.msg=res.data.retMsg
      //           if(res.data.status){
      //             this.showForm=!this.showForm
      //           }
      //         }).catch()
      //       }
      //       // 可以通过 this.form.username 和 this.form.password 访问输入的用户名和密码
      //       // 注册成功后可以跳转到首页或者其他页面
      //       this.registerLoading = true;
      //         setTimeout(() => {
      //           this.registerLoading = false;
      //           this.$message.success(this.msg);
      //         }, 1000);
      //     }
      //   })
      // },
      login() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            // TODO: 登录验证逻辑
            let msg='',ok=false;
            $http.post('/api/mimissm/login',"username="+this.loginForm.username+"&password="+this.loginForm.password)
            .then(res=>{
              msg=res.data.retMsg;
              ok=res.data.status;
              if(ok){
                console.log("正在跳转！！！");
                this.$router.push({path:'/toRearIndex'},()=>{},()=>{})
              }
            }).catch()
            this.loginLoading = true;
              setTimeout(() => {
                this.loginLoading = false;
                this.$message.success(msg);
              }, 1000);
          } else {
            return false;
          }
        });
      },
    },
  };
</script>

<style scoped>
  .login-container {
    height: 100vh;
    position: relative;
  }
  .bg-image {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.3;
  }
  .login-card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 400px;
    width: 100%;
    padding: 20px;
  }
  .login-title {
    font-size: 24px;
    text-align: center;
    margin-bottom: 20px;
  }


</style>
