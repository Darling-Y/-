<template>
  <div class="header">
    <input type="text"
           v-model.trim="keyword"
           confirm-type="search"
           @confirm="confirmHandler">
    <icon class="search-icon"
          type="search"
          size="16">
    </icon>
    <div class="clear-box"
         @click.stop="keyword=''">
      <icon type="clear"
            size="16"
            color="#ccc"
            v-show="keyword">
      </icon>
    </div>
  </div>
</template>
<script>
export default {
  props: ['query'],
  data () {
    return {
      keyword: this.query
    }
  },
  methods: {
    confirmHandler () {
      if (this.keyword) {
        this.$emit('confirm', this.keyword)
      }
    }
  },
  watch: {
    query (newValue) {
      this.keyword = newValue
    }
  }
}
</script>
<style lang="less" scoped>
.header {
  height: 120rpx;
  background-color: #eee;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 15rpx;

  input {
    background-color: #fff;
    height: 60rpx;
    width: 720rpx;
    padding-left: 74rpx;
    box-sizing: border-box;
    -webkit-border-top-left-radius: 10rpx;
    -webkit-border-bottom-left-radius: 10rpx;
  }
  .search-icon {
    position: absolute;
    left: 44rpx;
  }
  .clear-box {
    display: flex;
    width: 100rpx;
    height: 60rpx;
    right: 44rpx;
    background-color: #fff;
    -webkit-border-top-right-radius: 10rpx;
    -webkit-border-bottom-right-radius: 10rpx;
    z-index: 999;
    justify-content: center;
    align-items: center;
  }
}
</style>