<template>
  <div>
    <!-- 
      表格组件：
        存放用户信息
     -->
    <el-table :height="400"
      :data="filterTableData"
      style="width: 100%">
      <el-table-column label="用户id" width="180" prop="userId"></el-table-column>
      <el-table-column label="用户名" width="180" prop="username"></el-table-column>
      <el-table-column label="邮箱" width="180" prop="email"></el-table-column>
      <el-table-column label="电话号码" width="180" prop="phone"></el-table-column>
      <el-table-column label="注册日期" width="180" prop="registerDate"></el-table-column>
      <el-table-column align="right">
        <template #header >
          <el-row type="flex" class="row-bg" justify="end">
              <el-col :span="6"><el-input v-model="search" size="small" placeholder="Type to search"/></el-col>
              <el-col :span="3"><el-button type="success" size="small">添加用户</el-button></el-col>
          </el-row>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          
          <el-popconfirm
            width="220"
            confirm-button-text="OK"
            cancel-button-text="No, Thanks"
            icon-color="#626AEF"
            title="Are you sure to delete this?"
            @confirm="handleDelete(scope.$index, scope.row)"
          >
            <template #reference>
              <el-button
                size="mini"
                type="danger"
               >删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- 
      分页组件：
     -->
    <div>
      <el-row type="flex" class="row-bg" justify="end">
        <el-col >
          <el-pagination
            :current-page="pagination.currentPage"
            background
            layout="total,sizes,prev, pager, next,jumper"
            :total="pagination.total"
            :page-size="pagination.pageSize"
            :page-sizes="[5,6,10,20,30]"
            :pager-count="5"
            @current-change	="currentChange"
            @size-change	="sizeChange"

            >
          </el-pagination>
        </el-col>
      </el-row>
      
    </div>

    <!-- 
      添加组件：
        
     -->
    <el-button size="mini" type="success" @click="addUser">添加</el-button>
    <el-button
          size="mini"
          type="success"
          @click="isShowOfForm = false">收起</el-button>
     <transition name="el-zoom-in-center">
        <div v-if="isShowOfForm" class="transition-box">
          <el-radio-group v-model="labelPosition" size="small">
            <el-radio-button label="left">左对齐</el-radio-button>
            <el-radio-button label="right">右对齐</el-radio-button>
            <el-radio-button label="top">顶部对齐</el-radio-button>
          </el-radio-group>
          <div style="margin: 20px;"></div>
          <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign"
          >
            <el-form-item label="username">
              <el-input v-model="formLabelAlign.username"></el-input>
            </el-form-item>
            <el-form-item label="email">
              <el-input v-model="formLabelAlign.email"></el-input>
            </el-form-item>
            <el-form-item label="phone">
              <el-input v-model="formLabelAlign.phone"></el-input>
            </el-form-item>
            <el-form-item label="profile">
              <el-input v-model="formLabelAlign.profile"></el-input>
            </el-form-item>
            <el-form-item label="password">
              <el-input v-model="formLabelAlign.password"></el-input>
            </el-form-item>
            <!-- <el-form-item label="date">
              <el-input v-model="formLabelAlign.registerDate"></el-input>
            </el-form-item> -->
              <el-form-item>
              <el-button type="primary" @click="submitForm">保存</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>

          </el-form>
        </div>
      </transition>
      
  </div>
</template>

<script>
import $http from '@/api/axiosapi'; //$http是在导入时自定义的命名可变的
export default {
  name:'user',
  data() {
    return {
      search:'',
      isShowOfForm:false,
      show2:true,
      tableData: [],
      pagination:{
        currentPage:1,
        pageSize:5,
        total:100,
      },
      labelPosition: 'right',
      formLabelAlign: {
        username: '',
        email: '',
        phone: '',
        password: '',
        profile: '',
        registerDate:'',
      }
    }
  },
  methods: {
    //改变每页大小
    sizeChange(size){
      this.pagination.pageSize=size
      this.findUserByPage()
    },
    //分页页码更改触发
    currentChange(page){
      this.pagination.currentPage=page
      this.findUserByPage()
    },
    findUserByPage(){
      // $http.post("/api/mimissm/findUserByPage",{currentPage:this.pagination.currentPage,pageSize:this.pagination.pageSize})
      
      $http.post("/api/mimissm/findUserByPage","currentPage=" 
      + this.pagination.currentPage + "&pageSize=" + this.pagination.pageSize)
      .then(res=>{
        console.log(res.data);
        this.tableData=res.data.list
        this.pagination.total=res.data.total
      }).catch()
    },
    //重置表格
    resetForm(){
      this.formLabelAlign={}
    },
    //展开添加表单
    addUser(){      
      if(this.isShowOfForm)
      this.formLabelAlign={}
      else this.isShowOfForm=true
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.isShowOfForm=true;
      this.formLabelAlign=row
    },
    handleDelete(index, row) {
      console.log(index, row);
      $http.get('/api/mimissm/deleteOne?userId='+row.userId).then(res=>{
          this.open2(res.data.retMsg)
          this.findAllUser()
      })
    },
    submitForm(){
      if("userId" in this.formLabelAlign){
        console.log(this.formLabelAlign);
        this.formLabelAlign.registerDate=new Date(this.formLabelAlign.registerDate)
        $http.post('/api/mimissm/updateOne',this.formLabelAlign).then(res=>{
          this.open2(res.data.retMsg)
          this.formLabelAlign.registerDate=this.formLabelAlign.registerDate.toString()
          this.findAllUser()
          this.formLabelAlign={}

      }
      ).catch()}
      else{
        $http.post('/api/mimissm/save',this.formLabelAlign)
        .then(res=>{
          this.open2(res.data.retMsg)
          this.findUserByPage()
        }).catch()
        this.formLabelAlign={}
      }
    },
    open2(msg) {
      this.$message({
        message: msg,
        type: 'success'
      });
    },
    findAllUser(){
      $http.get('/api/mimissm/findAllUser')
      .then(res=>{
        this.tableData = res.data
        console.log(this.tableData)
        })
      .catch(e=>{console.log(e)})
    }
},
  computed:{
    filterTableData(){
        let table=this.tableData.filter(data =>
        !this.search ||
        data.username.toLowerCase().includes(this.search.toLowerCase()))
       return table
    }
  },
  created(){
    // $http.get('/api/mimissm/findAllUser')
    // .then(res=>{
    //   this.tableData = res.data
    //   console.log(this.tableData)
    //   })
    // .catch(e=>{console.log(e)})
    this.findUserByPage()
  },
  
}
</script>

<style scoped>
.transition-box {
    margin-bottom: 10px;
    width: 50%;
    height: 100px;
    border-radius: 4px;
    /* background-color: #409EFF; */
    text-align: center;
    /* color: #fff; */
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
</style>