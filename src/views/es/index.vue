<template>
  <div>
    这是es的实验页面== &gt; 酒店信息的查询<br>
  
    <br>
    <!-- {{hotels[0].name}}
    <div v-html="hotels[0].name"></div> -->

    <el-row :gutter="20">
       <el-col :span="12" :offset="6">
        <el-autocomplete 
            style="  width: 600px; "
            v-model="params.key"
            :fetch-suggestions="getSuggestion"
            placeholder="请输入内容"
            @select="handleSelect"
         ></el-autocomplete>
         <el-button type="success" @click="getHotelData">搜索</el-button>
      </el-col>
    </el-row>
      <br>
      <br>
      <br>
      <br>
      <br>
    <el-row>
      <el-button type="text" class="button" @click="add()">添加</el-button>
    </el-row>
      <el-col :span="8" v-for="(o, index) in hotels" :key="o.id" :offset="index > 0 ? 2 : 2">
        <el-card :body-style="{ padding: '0px' }">
          <!-- <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image"> -->
          展示
          <div style="padding: 14px;">
            <div class="bottom clearfix">
              <div class="hotel-name" v-html="'酒店名字:'+o.name"></div>
              <el-row><div v-html="'地址:'+o.address"></div></el-row>
              <el-row><div v-html="'品牌:'+o.brand"></div></el-row>
              <el-row><div v-html="' 商业区：'+o.business"></div></el-row>
              <div v-html="'价格：'+o.price"></div>
              <el-row><div v-html="'评分：'+o.score"></div></el-row>
              <el-row><div v-html="'星级：'+o.starName"></div></el-row>
              <el-row><div v-html="o.suggestion"></div></el-row>
              <el-button type="text" class="button" @click="deleteHotel(o)">删除</el-button>
              <el-button type="text" class="button" @click="update(o)">修改</el-button>
            </div>
          </div>
        </el-card>
      </el-col>

    <el-dialog
      :title="!form.id ? '新增' : '修改'"
      :close-on-click-modal="false"
      :visible.sync="visible"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
          <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="品牌">
          <el-input v-model="form.brand"></el-input>
        </el-form-item>
        <el-form-item label="商业区">
          <el-input v-model="form.business"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="得分">
          <el-input v-model="form.score"></el-input>
        </el-form-item>
        <el-form-item label="星级">
          <el-input v-model="form.starName"></el-input>
        </el-form-item>
      
        <el-form-item>
          <el-button @click="visible = false">取消</el-button>
         <el-button type="primary" @click="saveOrUpdateHotel()">确定</el-button>      
      </el-form-item>
      </el-form>

    </el-dialog>

  </div>
</template>

<script>
export default {
  data(){
    return{
      hotels: [

      ],// 酒店数据
      total: 0, // 总条数
      totalPage: 0, // 总页数
      params: {
        key: "", // 搜索关键字
        page: 1, // 当前页码
        size: 5, // 每页大小
        sortBy: "default",// 排序字段
        filters: {}, // 过滤字段
      },
      visible: false,
      form: {
        id:'',
        name: '',
        business:'',
        address:'',
        brand: '',
        price: '',
        score: '',
        starName: '',
      }
    }
  },
  methods:{///hotel/list
    getHotelData(){
      this.$http.post('/api/hotel/list',this.params)
      .then(({data})=>{
        this.hotels = data.hotels
        console.log( "酒店信息：",this.hotels);

      });
    },
    getSuggestion(queryString, cb) {
      if(queryString === ''){
        return this.getSuggestion
      }
      let results=[]
      if(queryString !==''){
        this.$http
          .get('/api/hotel/suggestion?key=' + queryString)
          .then(({data})=>{
            let temp = data
            for(let i=0;i < temp.length;i++){
              let v = temp[i]
              results.push({"value":v})
            }
          });
      }
      cb(results);
    },
    handleSelect(item) {
      console.log("click-----------------");
      console.log(item.value);
      this.params.key=item.value
      this.getHotelData()
    },
    deleteHotel(hotel){
      this.$http.post('/api/hotel/delete',hotel)
        .then(({res})=>{
          console.log(res,'==>res');
        })
        .catch(err=>{
          this.$message({
            message: "操作失败",
            type: "error",
            duration: 1500,
          });
          console.log(err);
        });
    },
    update(o){
      this.visible=true
      this.form=o
    },
    add(){
      this.form={}
      this.visible = true
    },
    saveOrUpdateHotel(){
       let reqParam = {
          id: this.form.id || undefined,
          name: this.form.name,
          business: this.form.business,
          address: this.form.address,
          brand: this.form.brand,
          price: this.form.price,
          score: this.form.score,
          starName: this.form.starName,
      };
      this.$http
      .post(
          `/api/hotel/${!this.form.id ? "insert" : "update"}`,
          reqParam 
        )
      .then(({res})=>{
        this.visible=false
        this.$message({
          message: "操作成功",
          type: "success",
          duration: 1500,
        });
      })
      .catch(err=>{
        console.log(err);
        this.$message({
          message: "操作失败",
          type: "error",
          duration: 1500,
        });
      });
      //渲染
      this.$nextTick(() => {
        // init(id)
      })
    },
  },
  mounted() {
  },
  created(){
    this.getHotelData()
  }

}
</script>

<style  scoped>
/* .hotel-name {
    font-size: 18px;
    color: #333;
    font-weight: bold;
    font-family: "Helvetica Neue", "Arial", "PingFang SC", "Microsoft Yahei", "SimSun", sans-serif;
    line-height: 26px;
} */

  
</style>

  <!-- <el-select
      :v-model="params.key"
      clearable
      multiple
      filterable
      remote
      reserve-keyword
      placeholder="请输入关键词"
      :remote-method="getSuggestion"
      :loading="loading"
     >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select> -->