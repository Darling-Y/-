<template>
  <div>
    <!-- 搜索 -->
    <SearchLink/>
    <!-- 轮播图 -->
    <swiper indicator-dots
            autoplay
            circular
            indicator-color="rgba(255,255,255,0.3)"
            indicator-active-color="#fff">
      <block v-for="(item,index) in swiperdata"
             :key="index">
        <swiper-item>
          <image :src="item.image_src"></image>
        </swiper-item>
      </block>
    </swiper>
    <!-- 分类 -->
    <ul class="cates">
      <li v-for="(item,index) in catitems"
          :key="index">
        <img :src="item.image_src" />
      </li>
    </ul>
    <!-- 楼层 -->
    <ul>
      <li class="floor-item"
          v-for="(item,index) in floordata"
          :key="index">
        <img :src="item.floor_title.image_src"
             alt="">
        <div class="products">
          <img :src="item.product_list[0].image_src"
               alt="">
          <div class="right">
            <block v-for="(item1,index1) in item.product_list"
                   :key="index1">
              <img v-if="index1"
                   :src="item1.image_src"
                   alt="">
            </block>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import SearchLink from '@/components/SearchLink'
export default {
  components: {
    SearchLink
  },
  data () {
    return {
      swiperdata: [],
      catitems: [],
      floordata: []
    }
  },
  methods: {
    // 轮播
    getSwiperdata () {
      this.$request({
        url: '/api/public/v1/home/swiperdata'
      }).then(data => {
        this.swiperdata = data
      })
    },
    // 分类
    getCatitems () {
      this.$request({
        url: '/api/public/v1/home/catitems'
      }).then(data => {
        this.catitems = data
      })
    },
    // 楼层
    getFloordata () {
      this.$request({
        url: '/api/public/v1/home/floordata'
      }).then(data => {
        this.floordata = data
      })
    }

  },
  created () {
    // 轮播
    this.getSwiperdata()
    // 分类
    this.getCatitems()
    // 楼层
    this.getFloordata()
  }
}
</script>

<style lang="less">
// 轮播图
swiper image {
  width: 100%;
  height: 340rpx;
}
// 分类
.cates {
  display: flex;
  height: 194rpx;
  align-items: center;
  justify-content: space-evenly;
  img {
    width: 128rpx;
    height: 140rpx;
  }
}
// 楼层
.floor-item {
  margin-bottom: 20rpx;
  > img {
    width: 100%;
    height: 88rpx;
  }
  .products {
    display: flex;
    margin-top: 20rpx;
    padding-left: 18rpx;
    > img {
      width: 232rpx;
      height: 386rpx;
    }
    .right {
      flex: 1;
      font-size: 0;
      > img {
        width: 232rpx;
        height: 188rpx;
        margin-left: 10rpx;
        margin-bottom: 10rpx;
      }
    }
  }
}
</style>