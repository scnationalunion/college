<template>
  <div>
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
export default {
  data(){
    return{
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
    }
  },
  props:['searchText'],
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
}
</script>

<style scoped>
 /* .book-list {
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
  } */
</style>

