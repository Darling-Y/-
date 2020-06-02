<template>
  <div>
    <div class="topHeader" :style="{position:isFixed?'fixed':'static'}">
      <div class="header">
        <icon type="search"
              size="16"
              color="#bdbdbd">
        </icon>
        <input type="text"
               v-model="query"
               @confirm="reload"
               confirm-type="search">
      </div>
      <!-- 筛选栏 -->
      <ul class="filter-menu">
        <li v-for="(item,index) in menuList"
            :key="index"
            :class="{active:acitveIndex === index}"
            @click="acitveIndex = index">{{item}}</li>
      </ul>
    </div>
    <!-- 商品栏 -->
    <ul class="goods-list"
        :style="{marginTop:isFixed?'220rpx':'0'}">
      <li class="goods"
          v-for="(item,index) in goodsList"
          :key="index"
          @click="toItem(item.goods_id)">
        <img :src="item.goods_small_logo"
             alt="">
        <div class="right">
          <p class="text-line2">{{item.goods_name}}</p>
          <span class="price">￥<span class="num">{{item.goods_price}}</span>.00</span>
        </div>
      </li>
    </ul>
    <div class="hasBtm"
         v-show="isLastPage">--这是最后的底线了--</div>
  </div>
</template>

<script>
const PAGE_SIZE = 6
export default {
  data () {
    return {
      menuList: ['综合', '销量', '价格'],
      acitveIndex: 0,
      goodsList: [],
      query: '',
      pageNum: 1,
      isLastPage: false,
      isFixed: false
    }
  },
  // 下拉
  onLoad (options) {
    this.query = options.query
    // 查询商品列表
    this.reload()
  },
  onPullDownRefresh () {
    this.isFixed = false
    //  加载第一页
    this.reload()
  },
  // 滚轮触发事件
  onPageScroll () {
    this.isFixed = true
  },
  // 上拉加载下一页
  onReachBottom () {
    this.pageNum++
    this.queryGoodsList()
  },
  methods: {
    // 点击商品跳转到商品详情页面，附带id
    toItem (id) {
      wx.navigateTo({ url: '/pages/item/main?id=' + id })
    },
    reload () {
      //  加载第一页
      this.pageNum = 1
      this.goodsList = []
      this.isRequest = false
      this.isLastPage = false
      this.queryGoodsList()
    },
    queryGoodsList () {
      if (this.isRequest || this.isLastPage) {
        return
      }
      this.isRequest = true
      this.$request({
        url: '/api/public/v1/goods/search',
        data: {
          query: this.query,
          pagenum: this.pageNum,
          pagesize: PAGE_SIZE
        }
      }).then(data => {
        this.goodsList = [...this.goodsList, ...data.goods]
        if (this.goodsList.length === data.total) {
          this.isLastPage = true
        }
      }).finally(() => {
        this.isRequest = false
        wx.stopPullDownRefresh()
      })
    }
  }

}
</script>

<style lang="less">
.topHeader{
  position: static;
  top: 0;
  width: 100%;
  background-color: #fff;
}
.goods-list{
  margin-top: 220rpx;
}
.header {
  height: 120rpx;
  padding: 0 16rpx;
  display: flex;
  align-items: center;
  background-color: #eee;
  position: relative;
  input {
    height: 60rpx;
    flex: 1;
    border-radius: 6rpx;
    background-color: #fff;
    padding-left: 78rpx;
  }
  icon {
    position: absolute;
    left: 44rpx;
  }
}

.filter-menu {
  display: flex;
  justify-content: space-around;
  height: 100rpx;
  align-items: center;
  .active {
    color: #eb4450;
  }
}
.goods {
  height: 260rpx;
  border-top: 1px solid #ddd;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 0 20rpx;
  img {
    width: 200rpx;
    height: 200rpx;
  }
  .right {
    flex: 1;
    margin-left: 24rpx;
    p {
      margin-bottom: 70rpx;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .price {
      color: #eb4450;
      font-size: 24rpx;
      .num {
        font-size: 36rpx;
      }
    }
  }
}
.hasBtm {
  text-align: center;
  color: #666;
}
</style>