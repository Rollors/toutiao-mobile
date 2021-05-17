<template>
  <div class="login-container">
    <!--    $router.back()从哪来回哪去-->
    <van-nav-bar class="app-nav-bar" title="登录" left-arrow
    @click-left="$router.back()"/>
    <!--    登录表单-->
    <!--    表单验证-->
    <!--    1使用Form组件包裹所有表单项van-field-->
    <!--    2给van-form绑定submit事件，当表单提交时触发submit事件 自动触发，只有表单验证用过才会调用submit事件-->
    <!--    3使用field的rules属性定义校验规则-->
    <van-form :show-error="false" :show-error-message="false" :validate-first="true" @submit="onLogin" @failed="onFailed" ref="login-form">
      <van-field v-model="user.mobile" icon-prefix="toutiao" left-icon="shouji" placeholder="请输入手机号" :rules="formRules.mobile" name="mobile" />
      <van-field v-model="user.code" icon-prefix="toutiao" clearable  left-icon="yanzhengma" placeholder="请输入验证码" :rules="formRules.code" name="code">
        <template #button>
          <!--          prevent阻止默认表单提交行为-->
          <van-count-down :time="1000*60" format="ss s" v-if="isCountDownShow" @finish="isCountDownShow = false"></van-count-down>
          <van-button v-else class="send-btn" size="mini" round @click.prevent="onSendSms" :loading="isSendSmsLoading">
            发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" type="info" block>登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
import { Toast } from 'vant'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      formRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机格式错误' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isCountDownShow: false, // 是否倒计时
      isSendSmsLoading: false // 发送验证码按钮的loading转态
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLogin () {
      Toast.loading({
        message: '加载中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 展示时长（ms）值为0时，toast不会消失
      })
      try {
        // 1找到数据接口
        // 2封装请求方法
        // 3情求调用登录
        const res = await login(this.user)
        // 4处理响应结果
        // console.log(res)
        Toast.success('登录成功')

        // 将后端返回的用户登录状态(token等数据)放入到vuex
        this.$store.commit('setUser', res.data.data)
        // 清除layout缓存，让它重新渲染
        this.$store.commit('removeCache', 'LayoutIndex')
        // 登录成功跳转回原来页面
        this.$router.back() // 先用这种方式，但是它不好
      } catch (err) {
        // console.log(err)
        Toast.fail('登录失败，手机号或验证码错误')
      }
    },
    onFailed (error) {
      if (error.errors[0]) {
        Toast({
          message: error.errors[0].message,
          position: 'top'
        })
      }
    },
    async onSendSms () {
      // 校验手机号
      // 验证通过，发送验证码，用户接收短信
      // 隐藏发送按钮，显示倒计时
      // 倒计时结束，隐藏倒计时，显示发送按钮
      try {
        await this.$refs['login-form'].validate('mobile')
        this.isSendSmsLoading = true // 防止网络慢，用户多发请求行为
        await sendSms(this.user.mobile)
        // 隐藏发送按钮，显示倒计时
        this.isCountDownShow = true
        // 倒计时结束，显示发送按钮，用finish事件监听
      } catch (err) {
        // try代码的错误会进入catch
        // console.dir(err) 打印429,404错误信息
        let message = ''
        if (err && err.response && err.response.status === 429) {
          // 发送短信失败错误提示
          message = '发送太频繁了，请稍后重试'
        } else if (err.name === 'mobile') {
          // 表单验证失败的错误提示
          message = err.message
        } else {
          // 未知错误
          message = '发送失败，请稍后重试'
        }
        Toast({
          message: message,
          position: 'top'
        })
      }
      this.isSendSmsLoading = false
    }
  }
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
