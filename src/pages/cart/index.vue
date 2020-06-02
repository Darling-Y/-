<template>
  <div class="content">
    <div class="title">
      <span class="iconfont icon-shop"></span>
      <span>优购生活馆</span>
    </div>
    <!-- 商品列表 -->
    <ul class="goods-list">
      <li class="goods-item" v-for="item in goodsList" :key="item.goods_id">
        <span class="iconfont" @click="item.checked=!item.checked" :class="item.checked?'icon-gouxuan':'icon-weigouxuan'"></span>
        <img :src="item.goods_small_logo"
             alt="">
        <div class="right">
          <p class="line-clamp2">{{item.goods_name}}</p>
          <div class="btm">
            <span class="price">￥<span>{{item.goods_price}}</span>.00</span>
            <div class="goods-num">
              <button @click="item.num--" :disabled="item.num===1">-</button>
              <span>{{item.num}}</span>
              <button @click="item.num++">+</button>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="account">
      <div class="select-all">
        <span @click="isAll = !isAll" class="iconfont" :class="isAll?'icon-gouxuan':'icon-weigouxuan'"></span>
        <span>全选</span>
      </div>

      <div class="price">
        <p>合计:<span class="num">￥{{totalPrice}}.00</span></p>
        <p class="info">包含运费</p>
      </div>
      <div class="account-btn"  @click="doAccount">结算({{totalNum}})</div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      goodsList: []
    }
  },
  // 页面一打开获取后台缓存的购物车商品信息
  onShow () {
    this.getGoodsList()
  },
  // 关闭前
  onHide () {
    // 同步修改数据
    let cart = {}
    this.goodsList.forEach(v => {
      cart[v.goods_id] = {
        num: v.num,
        checked: v.checked
      }
    })
    wx.setStorageSync('cart', cart)
  },
  methods: {
    doAccount () {
      // 当商品数量为0
      if (!this.totalNum) {
        wx.showToast({
          title: '请选择商品',
          icon: 'none'
        })
        return
      }
      // 检查token是否登录
      let token = wx.getStorageSync('token')
      // 不存在说明没有登录,去登录页面
      if (!token) {
        wx.navigateTo({ url: '/pages/login/main' })
        return
      }
      // 以上判断都正确的话,跳转支付页面
      wx.navigateTo({ url: '/pages/pay/main' })
    },
    // 页面一打开获取后台缓存的购物车商品信息
    getGoodsList () {
      // 取出缓存里的数据
      let cart = wx.getStorageSync('cart')
      console.log(cart)
      // 判断是否为空
      if (!cart) {
        return
      }
      this.$request({
        url: '/api/public/v1/goods/goodslist?goods_ids=' + Object.keys(cart)
      }).then(data => {
        data.forEach(v => {
          v.num = cart[v.goods_id].num
          v.checked = cart[v.goods_id].checked
        })
        this.goodsList = data
      })
    }
  },
  // 计算属性
  computed: {
    // 所有商品计算总价
    totalPrice () {
      return this.goodsList.reduce((sum, v) => {
        return sum + (v.checked ? v.num * v.goods_price : 0)
      }, 0)
    },
    // 所有商品计算总数
    totalNum () {
      return this.goodsList.reduce((sum, v) => {
        return sum + (v.checked ? v.num : 0)
      }, 0)
    },
    isAll: {
      get () {
        return this.goodsList.every(v => {
          return v.checked
        })
      },
      set (status) {
        this.goodsList.forEach(v => {
          v.checked = status
        })
      }
    }
  }
}
</script>

<style lang="less">
.iconfont {
  font-size: 44rpx;
}
.line-clamp2{
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.title {
  height: 88rpx;
  display: flex;
  align-items: center;
  .iconfont {
    color: #999;
    margin: 6rpx 12rpx 0 32rpx;
  }
}

.goods-item {
  height: 206rpx;
  background-color: #fff;
  border-top: 1rpx solid #ddd;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  .iconfont {
    color: #eb4450;
    margin: 0 30rpx;
  }
  img {
    width: 160rpx;
    height: 160rpx;
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 0 20rpx 0 18rpx;
    .btm {
      display: flex;
      margin-top: 40rpx;
      justify-content: space-between;
      .price {
        color: #eb4450;
        > span {
          font-size: 24px;
        }
      }
      .goods-num {
        display: flex;
        align-items: center;
        button {
          width: 60rpx;
          height: 50rpx;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 4rpx solid #666;
        }
        span {
          margin: 0 30rpx;
        }
      }
    }
  }
}
.goods-list {
  position: absolute;
  bottom: 98rpx;
  top: 88rpx;
  width: 100%;
  overflow: auto;
  padding-bottom: 60rpx;
  background-color: #f4f4f4;
}
.account {
  height: 98rpx;
  border-bottom: 1rpx solid #ddd;
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  .iconfont {
    color: #eb4450;
    margin: 0 30rpx;
  }
  .account-btn {
    width: 230rpx;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background-color: #eb4450;
  }
  .select-all {
    flex: 1;
  }
  .price {
    margin-right: 20rpx;
    .num {
      color: #eb4450;
    }
    .info {
      color: #999;
    }
  }
}
</style>