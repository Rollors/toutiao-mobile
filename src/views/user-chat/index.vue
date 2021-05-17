<template>
  <div class="user-chat">
    <van-nav-bar
      class="app-nav-bar"
      title="小智同学"
      left-arrow
      @click-left="$router.back()"/>
    <van-cell-group class="message-wrap">
      <van-cell title="单元格"></van-cell>
      <van-cell title="单元格"></van-cell>
      <van-cell title="单元格"></van-cell>
      <van-cell title="单元格"></van-cell>
      <van-cell title="单元格"></van-cell>
      <van-cell title="单元格"></van-cell>
      <van-cell title="单元格"></van-cell>
      <van-cell title="单元格"></van-cell>
      <van-cell title="单元格"></van-cell>
      <van-cell title="单元格"></van-cell>
      <van-cell title="单元格"></van-cell>
      <van-cell title="单元格"></van-cell>
      <van-cell title="单元格"></van-cell>
      <van-cell title="单元格"></van-cell>
      <van-cell title="单元格"></van-cell>
      <van-cell title="单元格"></van-cell>
      <van-cell title="单元格"></van-cell>
    </van-cell-group>
    <van-cell-group class="send-message-wrap">
      <van-field :border="false" v-model="message" placeholder="请输入消息"/>
      <van-button type="primary" size="small">发送</van-button>
    </van-cell-group>
  </div>
</template>

<script>
// import io from 'socket.io-client'
// // 建立连接
// const socket = io('http://ttapi.research.itcast.cn')

export default {
  name: 'UserChat',
  data () {
    return {
      message: ''
    }
  },
  created () {
    // socket.on('connect', function () {
    //   console.log('建立连接')
    // })
    // // socket.on('event', function (data) {})
    // socket.on('disconnect', function () {
    //   console.log('断开连接')
    // })
    // window.socket = socket
  }
}
</script>

<style scoped lang="less">
.message-wrap{
  position: fixed;
  top: 46px;
  left: 0;
  right: 0;
  bottom: 44px;
  overflow-y: auto;
}
.send-message-wrap{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  padding: 0 14px;
  align-items: center;
}
</style>
