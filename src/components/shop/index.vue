<template>
  <div class="container">
    <!-- 
      头部信息
     -->
     <div>
      <el-row>
        <el-col :span="18"><span class="title">快乐图书</span></el-col>
        <el-col :span="6">
          <el-button-group>
            <el-button @click="showCart" type="danger" size="medium" icon="el-icon-shopping-cart-2">购物车/主页</el-button>
            <el-button @click="showOrder" type="danger" size="medium" icon="el-icon-s-order">订单</el-button>
          </el-button-group>
        </el-col>
 
      </el-row>
      <br>
      <el-row>
        <el-col :span="18"><el-input v-model="searchText" placeholder="请输入要查询的书本名字" class="search-box"></el-input></el-col>
        <el-col :span="2" >
          <router-link to="/toLogin" type="info">登录/</router-link>
          <router-link to="/toRegister" type="info">注册</router-link>
        </el-col>
        <el-col :span="1.5">
          <router-link to="/toAdmLogin" type="info">进入后台</router-link>

        </el-col>
      </el-row>

     </div>

    <!-- 
      书本商品展示：

     -->
    <div v-show="!isShowCart">
      <span class="title">主页</span>
      <el-row class="book-list">
        <el-col :span="6" v-for="(book, index) in filteredBooks" :key="index">
          <el-card shadow="hover" class="book-card">
            <img :src="'/image/'+book.cover" class="book-cover">
            <div class="book-info">
              <h4 class="book-title">{{ book.title }}</h4>
              <p class="book-author">{{ book.author }}</p>
              <p class="book-author">数量：{{ book.stock }}</p>
              <el-row>
                <el-col :span="14">
                  <p class="book-price">价格：{{ book.price }}</p>
                </el-col>
                <el-col :span="6">
                  <el-button @click="addToCart(book)" type="danger" size="mini" class="button" icon="el-icon-plus">加入购物车</el-button>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
          

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
    </div>
    

    <!-- 
      购物车展示：

     -->
     <div v-show="isShowCart">
        <el-row >
          <el-col :span="6" class="title">
            <span >购物车</span>
          </el-col>
          <el-col :span="2">
            <el-button type="danger" plain @click="settleAccounts">结账</el-button>
          </el-col>
           <el-col :span="4" >
            <span class="zongjiaSize">总价：{{totalPrice}}元</span>
          </el-col>
          
        </el-row>
        <el-row class="book-list">
          <el-col :span="6" v-for="(book,key) in cart" :key="key">
            
            <el-card shadow="hover" class="book-card">
              <img :src="'/image/'+book.cover" class="book-cover">
              <div class="book-info">
                <h4 class="book-title">{{ book.title }}</h4>
                <p class="book-author">{{ book.author }}</p>
                <p class="book-author">数量：{{book.num}}</p>
                <el-row>
                  <el-col :span="14">
                    <p class="book-price">价格：{{ book.price }}</p>
                  </el-col>
                  <el-col :span="6">
                    <el-button @click="deleteItem(book)" type="danger" size="mini" class="button" icon="el-icon-minus">取消购买</el-button>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </el-col>
        </el-row>
     </div>
    
    <router-view/>
  </div>
</template>

<script>
import $http from '@/api/axiosapi'; //$http是在导入时自定义的命名可变的
import Vue from 'vue'
  export default {
    name: "BookManage",
    created(){
      this.findBookByPage()
    },
    data() {
      return {
        searchText: "",
        pagination:{
          currentPage:1,
          pageSize:5,
          total:100,
        },
        books:[],
        cart:[],
        // cart:new Map(),
        isShowCart:false,
        index:0,
        totalPrice:0,
      };
    },
    methods:{
      deleteItem(book){
        for(let i=0;i<this.cart.length;i++){
          if(this.cart[i].bookId===book.bookId){
            this.cart[i].num--
            this.totalPrice-=this.cart[i].price
            if(this.cart[i].num===0)this.cart=this.cart.filter(item=>item.bookId!=book.bookId)
          }
        }
      },
      showCart(){
        this.isShowCart=!this.isShowCart
      },
      //结账（给账单表添加信息，账单号：自动生成，商品名称，商品id，时间）
      settleAccounts(){

      },
      showOrder(){

      },
      addToCart(book){
        console.log(book);
       /*  if(!this.cart.has(book.bookId)){
          console.log('找不到');
           Vue.set(book,'num',0)
           this.cart.set(book.bookId,book)
          console.log('找不到');

        }else{
          console.log("数量加一");
          this.cart.get(book.bookId).num++
        } */
        if(JSON.stringify(this.cart).includes(JSON.stringify(book)) === false){
          Vue.set(book,'num',1)
          this.cart.unshift(book)
          this.totalPrice+=book.price
        }else{
          for(let i=0;i<this.cart.length;i++){
            if(this.cart[i].bookId === book.bookId){
              this.cart[i].num++
              this.totalPrice+=this.cart[i].price
              break
            }
          }
          console.log(this.cart);
        }
      },
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
          this.books=res.data.list
          this.pagination.total=res.data.total
        })
        .catch()
      },
    },
    computed: {
      filteredBooks() {
        if (!this.searchText) {
          return this.books;
        }
        return this.books.filter((book) =>
          book.title.toLowerCase().includes(this.searchText.toLowerCase())
        );
      },
    },
  };
</script>

<style>
.zongjiaSize{
  font-size: 25px;
}
.title {
  font-size: 36px;
}
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
  .search-box {
    width: 95%;
    margin-bottom: 20px;
  }
  .book-list {
    margin: 0 -10px;
  }
  .book-card {
    margin: 10px;
    height: 400px;
  }
  .book-cover {
    width: 100%;
    height: 250px;
    object-fit: cover;
  }
  .book-info {
    padding: 10px 20px;
  }
  .book-title {
    margin: 0;
    font-size: 18px;
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .book-author {
    margin: 5px 0;
    font-size: 14px;
    color: #999;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .book-price {
    margin: 5px 0;
    font-size: 16px;
    font-weight: bold;
  }
</style>
