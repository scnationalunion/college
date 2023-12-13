<template>
  <div class="container">
    <el-row>
      <el-col :span="16"><span class="title">快乐图书</span></el-col>
      <el-col :span="2"><el-button type="success" size="medium">添加用户</el-button></el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="18"><el-input v-model="searchText" placeholder="请输入要查询的书本名字" class="search-box"></el-input></el-col>
      <!-- <el-col :span="2"> -->
      <!-- <el-col :span="2"><router-link :to="d"/>登录</el-col> -->
      <el-col :span="3" >
        <el-link type="info" >登录/</el-link>
        <el-link type="info">注册</el-link>
      </el-col>
      <el-col :span="1.5">
        <el-link type="info">进入后台</el-link>
      </el-col>
    </el-row>
    <el-row class="book-list">
      <el-col :span="6" v-for="(book, index) in filteredBooks" :key="index">
        <el-card shadow="hover" class="book-card">
          <img :src="book.cover" class="book-cover">
          <div class="book-info">
            <h4 class="book-title">{{ book.title }}</h4>
            <p class="book-author">{{ book.author }}</p>
            <p class="book-price">{{ book.price }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  // import { Row, Col, Card, Input } from "element-ui";

  export default {
    name: "BookManage",
    // components: {
    //   ElRow: Row,
    //   ElCol: Col,
    //   ElCard: Card,
    //   ElInput: Input,
    // },
    data() {
      return {
        searchText: "",
        books: [
          {
            title: "Book 1",
            author: "Author 1",
            price: "$10.00",
            cover: "https://via.placeholder.com/150x200",
          },
          {
            title: "Book 2",
            author: "Author 2",
            price: "$20.00",
            cover: "https://via.placeholder.com/150x200",
          },
          {
            title: "Book 3",
            author: "Author 3",
            price: "$30.00",
            cover: "https://via.placeholder.com/150x200",
          },
          {
            title: "Book 4",
            author: "Author 4",
            price: "$40.00",
            cover: "https://via.placeholder.com/150x200",
          },
          {
            title: "Book 5",
            author: "Author 5",
            price: "$50.00",
            cover: "https://via.placeholder.com/150x200",
          },
          {
            title: "Book 6",
            author: "Author 6",
            price: "$60.00",
            cover: "https://via.placeholder.com/150x200",
          },
          {
            title: "Book 7",
            author: "Author 7",
            price: "$70.00",
            cover: "https://via.placeholder.com/150x200",
          },
          {
            title: "Book 8",
            author: "Author 8",
            price: "$80.00",
            cover: "https://via.placeholder.com/150x200",
          },
          {
            title: "Book 9",
            author: "Author 9",
            price: "$90.00",
            cover: "https://via.placeholder.com/150x200",
          },
          {
            title: "Book 10",
            author: "Author 10",
            price: "$100.00",
            cover: "https://via.placeholder.com/150x200",
          },
        ],
      };
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
