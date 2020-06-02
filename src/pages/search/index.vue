<template>
  <div class="wrapper">
    <SearchBar @confirm="toSearchList"
               :query="query" />
    <div class="history-search">
      <div class="title">
        <span class="title">历史搜索</span>
        <icon type="clear"
              size="18"
              @click="clearList">
        </icon>
      </div>
      <ul>
        <li v-for="(item,index) in keywordList"
            :key="index"
            @click="toSearchList(item)">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar'
// 放在外部便于以后统一修改
const KEYWORD_LIST = 'keyword_list'
export default {
  // 注册组件
  components: {
    SearchBar
  },
  data () {
    return {
      keywordList: [],
      query: ''
    }
  },
  onShow () {
    this.keywordList = wx.getStorageSync(KEYWORD_LIST) || []
    this.query = ''
  },
  methods: {
    // 点击叉叉删除历史记录弹窗
    clearList () {
      wx.showModal({
        title: '提示', // 提示的标题,
        content: '你确定要清空历史搜索记录吗？', // 提示的内容,
        showCancel: true, // 是否显示取消按钮,
        cancelText: '取消', // 取消按钮的文字，默认为取消，最多 4 个字符,
        cancelColor: '#000000', // 取消按钮的文字颜色,
        confirmText: '确定', // 确定按钮的文字，默认为取消，最多 4 个字符,
        confirmColor: '#3CC51F', // 确定按钮的文字颜色,
        success: res => {
          if (res.confirm) {
            // 本地缓存也一起清除
            wx.removeStorageSync({KEYWORD_LIST})
            this.keywordList = []
          }
        }
      })
    },
    toSearchList (keyword) {
      this.query = keyword
      let arr = this.keywordList.filter(v => {
        return v !== keyword
      })
      arr.unshift(keyword)
      wx.setStorageSync(
        KEYWORD_LIST,
        arr
      )
      wx.navigateTo({
        url: `/pages/search_list/main?query=${keyword}`})
    }
  }

}
</script>

<style lang="less">
.search {
  background-color: #eee;
  padding: 30rpx 15rpx;
  display: flex;
  justify-content: space-between;
  font-size: 28rpx;
  position: relative;
  icon {
    position: absolute;
    top: 50rpx;
    left: 38rpx;
  }
  input {
    height: 60rpx;
    flex: 1;
    background-color: #fff;
    padding-left: 70rpx;
    box-sizing: border-box;
    border-radius: 4rpx;
  }
  button {
    width: 160rpx;
    height: 60rpx;
    line-height: 60rpx;
    border-radius: 8rpx;
    font-size: 28rpx;
    border: 1rpx solid #bfbfbf;
    background-color: #eee;
    margin-left: 20rpx;
  }
}

.history-search {
  color: #333;
  font-size: 28rpx;
  padding: 30rpx 30rpx 30rpx 15rpx;
  .title {
    display: flex;
    justify-content: space-between;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    margin-top: 30rpx;
    li {
      height: 64rpx;
      line-height: 64rpx;
      padding: 0 26rpx;
      background-color: #ddd;
      margin: 0 30rpx 16rpx 0;
    }
  }
}
</style>