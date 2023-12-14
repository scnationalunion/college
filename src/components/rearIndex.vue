<template>
  <div>
    <el-container style="height: 100vh; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '3']">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>正在管理。。。</template>
          <!-- <el-menu-item-group > -->
            <!-- <template slot="title">分组一</template> -->
            <el-menu-item index="1-1" @click="toUploadIndex">分片上传</el-menu-item>
            <el-menu-item index="1-2" @click="toEsIndex">ElasticSearch实验</el-menu-item>
            <el-menu-item index="1-3" @click="toStudent">学生表查询</el-menu-item>
            <el-menu-item index="1-4" @click="toMindMap">思维导图</el-menu-item>
          <!-- </el-menu-item-group> -->
        </el-submenu>
        <el-submenu index="2">
        </el-submenu>
      </el-menu>
    </el-aside>
    
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>
      
      <el-main>
        <router-view></router-view>
        <!-- <el-table :data="tableData">
          <el-table-column prop="date" label="日期" width="140">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="address" label="地址">
          </el-table-column>
        </el-table> -->
      </el-main>
    </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    };
    return {
      tableData: Array(20).fill(item),
      activeIndex: "1",
    }
  },
  methods: {
    

    //都是一些静态路由，可以尝试弄一下动态路由
    toMindMap(){
       this.$router.push(
        { name: "mindMap" },
        () => {},
        () => {}
      );
    },
    toUploadIndex(){
      this.$router.push(
        { name: "upload" },
        () => {},
        () => {}
      );
    },
    showOrder() {
      this.$router.push(
        { name: "order" },
        () => {},
        () => {}
      );
    },
    test() {
      this.$router.push(
        { name: "test" },
        () => {},
        () => {}
      );
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    goUser() {
      this.$router.push(
        { name: "user" },
        () => {},
        () => {}
      );
    },
    goMain() {
      this.$router.push(
        { name: "main" },
        () => {},
        () => {}
      );
    },
    showBook() {
      this.$router.push(
        { name: "showBook" },
        () => {},
        () => {}
      );
    },
    toEsIndex(){
       this.$router.push(
        { name: "esIndex" },
        () => {},
        () => {}
      );
    },
    toStudent(){
         this.$router.push(
        { name: "student" },
        () => {},
        () => {}
      );
    }
  },
};
</script>

<style scoped>
/* .aa {
  background-color: black;
  flood-color: aliceblue;
} */

 .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

    <!-- <el-container> -->
      <!-- <el-row>
        <el-col :span="24">
          <el-header>
          <div style="aa">
            <el-row :span="24" justify="end"></el-row>
          </div>
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#abcdef"
            text-color="#0000FF"
          >
            <el-menu-item index="/index/main" @click="goMain">主页</el-menu-item>
            <el-menu-item index="/index/main" @click="goMain">文件上传</el-menu-item>
            <el-menu-item index="/index/order" @click="showOrder">订单</el-menu-item>
            <el-menu-item index="/index/user" @click="goUser">用户管理</el-menu-item>
            <el-menu-item index="/index/showBook" @click="showBook">书本管理</el-menu-item>
            <el-menu-item index="/index/test" @click="test">测试</el-menu-item>
            <el-submenu index="/2">
              <template slot="title">我的工作台</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
              <el-menu-item index="2-3">选项3</el-menu-item>
              <el-submenu index="2-4">
                <template slot="title">dd</template>
                <el-menu-item index="2-4-1">选项1</el-menu-item>
                <el-menu-item index="2-4-2">选项2</el-menu-item>
                <el-menu-item index="2-4-3">选项3</el-menu-item>
              </el-submenu>
            </el-submenu>
          </el-menu>
        </el-header>
        </el-col>
        
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-main>
            <router-view />
          </el-main>
      </el-col>
        
      </el-row> -->
    <!-- </el-container> -->