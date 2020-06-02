<template>
  <div>
    <button  open-type="getUserInfo"
      @getuserinfo="getUserInfo">点我登录</button>
  </div>
</template>

<script>
export default{
  methods: {
    getUserInfo (info) {
      console.log(info)
    }
  }
}
</script>

<style>
</style>