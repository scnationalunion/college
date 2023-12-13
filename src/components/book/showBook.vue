<template>
  <div style="border: 2px solid #abcdef;">
    <el-table
      :data="filterTableData"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      :border="true"
      :header-cell-style="{color:'#FF0000	',fontSize:'14px'}"
      height="500"
      >
      <el-table-column label="书名" width="180" prop="title"></el-table-column>
      <el-table-column label="作者" width="180" prop="author"></el-table-column>
      <el-table-column label="出版日期" width="180" prop="publishDate"></el-table-column>
      <el-table-column label="出版社" width="180" prop="publisher"></el-table-column>
      <el-table-column label="存货" width="180" prop="stock"></el-table-column>
      <el-table-column label="价格" width="180" prop="price"></el-table-column>
      
      <el-table-column align="right">
        <template #header >
          <el-row type="flex" class="row-bg" justify="end">
              <el-col :span="6"><el-input v-model="search" size="small" placeholder="Type to search"/></el-col>
              <el-col :span="3"><el-button type="success" size="small">添加书本</el-button></el-col>
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
              >编辑</el-button>
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
    <el-button @click="isShowOfForm = !isShowOfForm">添加</el-button>
     <transition name="el-zoom-in-center">
        <div v-show="isShowOfForm" class="transition-box">.el-zoom-in-center</div>
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
      isShowOfForm:true,
      tableData: [],
      pagination:{
      currentPage:1,
      pageSize:5,
      total:100,
      },
    }
  },
  methods: {
    currentChange(page){
      this.pagination.currentPage=page
      this.findBookByPage()
    },
    sizeChange(size){
      this.pagination.pageSize=size
      this.findBookByPage()
    },
    findBookByPage(){
      $http.post('/api/mimissm/findBookByPage',
      "currentPage=" + this.pagination.currentPage +
       "&pageSize=" + this.pagination.pageSize)
      .then(res=>{
        this.tableData=res.data.list
        this.pagination.total=res.data.total
      })
      .catch()
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
      $http.get('/api/mimissm/deleteOneBook?bookId='+row.bookId)
      .then(res=>{
          this.open2(res.data.retMsg)
          this.findAllBooks()
        })
      .catch(e=>{console.log(e)})
    },
    open2(msg) {
      this.$message({
        message: msg,
        type: 'success'
      });
    },
    findAllBooks(){
      $http.get('/api/mimissm/findAll')
      .then(res=>{
        this.tableData = res.data.list
        console.log(this.tableData)
        })
      .catch(e=>{console.log(e)})
    },
    tableRowClassName({row,rowIndex}) {
      console.log(row);
      if (rowIndex % 2 === 1) {
        return 'warning-row';
      } else return 'success-row';
    }
  },
  computed:{
    filterTableData(){
        let table=this.tableData.filter(data =>
        !this.search ||
        data.author.toLowerCase().includes(this.search.toLowerCase()))
       return table
    }
  },
  created(){
    //获取表格信息
    this.findBookByPage()
  }
}
</script>

<style >
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

 .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>