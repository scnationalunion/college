<template>
  <div>
    <div class="carousel">
      <el-carousel indicator-position="outside" height="1000px" >
        <el-carousel-item v-for="item in picsArr" :key="item">
          <el-image
          :src="item"
          fit="fit"></el-image>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import m1 from '../../assets/image/m1.jpg'
import m2 from '../../assets/image/m2.jpeg'
import welcome from '../../assets/image/welcome.jpeg'
export default {
  name:'index',
  data(){
    return {
      picsArr:[welcome,m1,m2,],
      picObf:{},
      // {img:require('@/assets/image/')}
    }
  },
  created(){
    console.log(this.img);
  }
}
</script>

<style scoped>

.carousel{
  width: 100%;
  height: 100%;
}
</style>