<template>
<div>
   <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="参数名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="getDataList()">查询</el-button>
        <el-button  type="danger" @click="addOrUpdateHandle()">新增</el-button>
        <el-button  type="danger" @click="downloadFile">导出Excel</el-button>
        <!-- <el-button @click="openFileDialog">选择文件</el-button> -->
        <!-- <a v-if="downloadLink" :href="downloadLink" :download="fileName">下载文件</a> -->
      </el-form-item>
    </el-form>
          <!-- @selection-change="selectionChangeHandle" -->
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      style="width: 100%;">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="id"
        header-align="center"
        align="center"
        label="id">
      </el-table-column>
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="名字">
      </el-table-column>
      <el-table-column
        prop="year"
        header-align="center"
        align="center"
        label="入学年份">
      </el-table-column>
      <el-table-column
        prop="schoolId"
        header-align="center"
        align="center"
        label="学院id">
      </el-table-column>
      <el-table-column
        prop="majorId"
        header-align="center"
        align="center"
        label="专业id">
      </el-table-column>
      <el-table-column
        prop="stuInstructorId"
        header-align="center"
        align="center"
        label="辅导员id">
      </el-table-column>
      <el-table-column
        prop="credit"
        header-align="center"
        align="center"
        label="学分">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</div>
 
</template>

<script>
  import AddOrUpdate from './student-add-or-update'
  export default {
    data () {
      return {
        dataForm: {
          key: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,

        downloadLink: null,
        fileName: ''
      }
    },
    components: {
      AddOrUpdate
    },
    created () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        console.log("-----------sgasgg");
        
        this.dataListLoading = true
        this.$http.get('/api/college/student/list?page='+this.pageIndex+'&limit='+this.pageSize+"&key="+this.dataForm.key)
        .then((res) => {
          let data=res.data
          console.log("获得数据",res.data);
          if (data.code===0) {
            this.dataList = res.data.page.list
            console.log(this.dataList,'1==>this.dataList');
            this.totalPage = res.data.page.totalCount
          } else {
            this.dataList = []
            this.totalPage = 0
            console.log(this.dataList,'2==>this.dataList');
          }
          this.dataListLoading = false
        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      // 删除
      deleteHandle (id) {
        let ids=[id]
        this.$confirm(`确定对[id=${id}]进行删除`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/api/college/student/delete',ids)
          .then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      },
    downloadFile() {
      // 向后端发送请求，获取下载链接
      this.$http.get('/api/college/student/download', {
        responseType: 'blob' // 响应类型设置为blob，以获取文件内容
      })
      .then(response => {
        // 创建一个临时的下载链接
        const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
        // 创建一个隐藏的<a>标签，设置下载链接和文件名
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'filename.xlsx'; // 文件名可以根据实际情况进行设置
        // 模拟用户点击下载链接进行下载
        link.click();
        // 释放临时的下载链接对象
        window.URL.revokeObjectURL(downloadUrl);
      })
      .catch(error => {
        console.error('下载文件失败:', error);
        // 处理下载失败的逻辑
      });
    },
    }
  }
</script>
