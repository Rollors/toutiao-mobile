<template>
  <div class="login-container">
    <!--    $router.back()从哪来回哪去-->
    <van-nav-bar class="app-nav-bar" title="登录" left-arrow
    @click-left="$router.back()"/>
    <!--    登录表单-->
    <van-cell-group>
      <van-field v-model="user.mobile" icon-prefix="toutiao" left-icon="shouji" placeholder="请输入手机号" />
      <van-field v-mode="user.code" icon-prefix="toutiao" clearable  left-icon="yanzhengma" placeholder="请输入验证码">
        <template #button>
          <van-button class="send-btn" size="mini" round>
            发送验证码</van-button>
        </template>
      </van-field>
    </van-cell-group>
    <div class="login-btn-wrap"><van-button class="login-btn" type="info" block>登录</van-button></div>
  </div>
</template>

<script>
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.login-container{
  .send-btn{
    width: 76px;
    height: 23px;
    background: #ededed;
    .van-button__text{
      font-size: 11px;
      color: #666666;
    }
  }
  .login-btn-wrap{
    padding: 26px 16px;
    .login-btn{
      background: #6db4fb;
      border: none;
      .van-button__text{
        font-size: 15px;
      }
    }
  }
}
</style>
