<template>
  <div class="my-container">
    <van-cell-group v-if="user" class="my-info">
      <van-cell class="base-info"  center :border="false">
        <van-image class="avatar" slot="icon" round fit="cover" :src="currentUser.photo"></van-image>
        <div class="name" slot="title">{{ currentUser.name }}</div>
        <van-button class="update-btn" size="small" round>编辑资料</van-button>
      </van-cell>
      <van-grid class="data-info" :border="false">
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">{{ currentUser.art_count }}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">{{ currentUser.follow_count }}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">{{ currentUser.fans_count }}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">{{ currentUser.like_count }}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <div v-else class="not-login">
      <div @click="$router.push('/login')"><img class="mobile" src="./手机.png"></div>
      <div class="text">登录/注册</div>
    </div>
    <van-grid class="nav-grid mb-4" :column-num="2">
      <van-grid-item class="nav-grid-item" icon-prefix="toutiao" icon="shoucang" text="收藏"></van-grid-item>
      <van-grid-item class="nav-grid-item" icon-prefix="toutiao" icon="lishi" text="历史"></van-grid-item>
    </van-grid>
    <van-cell title="消息通知" is-link to="/"></van-cell>
    <van-cell class="mb-4" title="小智同学" is-link to="/"></van-cell>
    <van-cell v-if="user" class="logout-cell" title="退出登录" @click="onLogout"></van-cell>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getCurrentUser } from '@/api/user'

export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data () {
    return {
      currentUser: {} // 当前用户自身的信息
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    this.loadCurrentUser()
  },
  mounted () {},
  methods: {
    async loadCurrentUser () {
      // {}解构数据，提取返回数据中的data
      const { data } = await getCurrentUser()
      this.currentUser = data.data
    },
    onLogout () {
      // 提示用户确认退出
      // 确认退出
      this.$dialog.confirm({
        title: '退出提示',
        message: '确认退出吗？'
      }).then(() => {
        // 确认执行这里
        // 清除用户登录状态
        this.$store.commit('setUser', null)
      }).catch(() => {
        // 取消执行这里
      })
    }
  }
}
</script>

<!--
组件的样式作用域
默认全局样式，会影响其他组件样式，
如果不希望当前组件样式影响别的组件，
则在style 后面加scoped为<style scoped>

在有作用域的组件中如何给子组件设置样式？
  默认只能作用到子组件的根节点
    使用子组件根节点本身的类名
    如果是第三方组件，不知道根节点类名，那就审查元素，或者添加类名
    组件的class属性默认作用到组件的根节点
    建议使用自己的类名
  使用/deep/或者>>>可以把样式作用到更深，不仅仅是子组件的根节点
-->
<style scoped lang="less">
.my-container {
  .my-info{
    background: url("./banner.png") no-repeat;
    .base-info {
      box-sizing: border-box;
      height: 115px;
      background-color: unset;
      padding-top: 38px;
      padding-bottom: 11px;
      .avatar{
        box-sizing: border-box;
        height: 66px;
        width: 66px;
        border: 1px solid white;
        margin-right: 11px;
      }
      .name {
        color: white;
        font-size: 15px;
      }
      .update-btn{
        height: 26px;
        font-size: 10px;
        color: #666666;
      }
    }
    .data-info{
      .data-info-item{
        height: 65px;
        color: #ffffff;
        .text-wrap{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .count{
            font-size: 18px;
          }
          .text{
            font-size: 11px;
          }
        }
      }
    }
    /deep/ .van-grid-item__content{
      background-color: unset;
    }
  }
  .not-login{
    height: 180px;
    background: url("./banner.png") no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    .mobile{
      width: 66px;
      height: 66px;
    }
    .text{
      color: white;
      font-size: 14px;
    }
  }
  /deep/ .nav-grid{
    .nav-grid-item{
      height: 70px;
      .toutiao{
        font-size: 22px;
      }
      .toutiao-shoucang{
        color: #eb5253;
      }
      .toutiao-lishi{
        color: #ff9d1d;
      }
      .van-grid-item__text{
        font-size: 14px;
        color: #333333;
      }
    }
  }
  .logout-cell{
    text-align: center;
    color: #d86262;
  }
  .mb-4{
    margin-bottom: 4px;
  }
}
</style>
