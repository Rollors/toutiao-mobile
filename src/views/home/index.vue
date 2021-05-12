<template>
  <div class="home-container">
    <!--    $router.back()从哪来回哪去-->
    <van-nav-bar class="app-nav-bar">
      <van-button class="search-btn" slot="title" icon="search" type="info" round to="/search">搜索</van-button>
    </van-nav-bar>

    <!--    文章频道列表-->
    <!--    标签页组件有个功能，只有第一次查看标签页时才会渲染里面的内容-->
    <van-tabs class="channel-tabs" v-model="active">
      <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
        <article-list :channel="channel" />
      </van-tab>
      <!--      汉堡按钮定为把列表最后位置挡住了，可以添加一个占位元素-->
      <div class="wap-nav-ocupy" slot="nav-right"></div>
      <div slot="nav-right" @click="isChannelEditShow=true" class="wap-nav-wrap">
        <van-icon name="wap-nav"></van-icon>
      </div>
    </van-tabs>
    <!--    模板中$event表示事件参数-->
    <van-popup class="channel-edit-popup" v-model="isChannelEditShow" position="bottom" closeable close-icon-position="top-left" get-container="body" style="height: 100%">
      <channel-edit
        :user-channels="channels"
        @close="isChannelEditShow = false"
        @update-active="active = $event"
        :active="active"/>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './componets/article-list'
import ChannelEdit from './componets/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data () {
    return {
      active: 0, // 控制被激活的标签，文章频道列表
      channels: [],
      isChannelEditShow: false // 控制编辑频道的状态
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    this.loadChannels()
  },
  mounted () {
  },
  methods: {
    async loadChannels () {
      let channels = []
      if (this.user) {
        // 已登录,请求获取线上用户频道
        const { data } = await getUserChannels()
        channels = data.data.channels
      } else {
        // 没有登录
        const localChannels = getItem('user-channels')
        // 如果有本地存储的频道列表
        if (localChannels) {
          channels = localChannels
        } else {
          // 用户没登录，也没有本地存储的列表,请求默认默认推荐的频道列表
          const { data } = await getUserChannels()
          channels = data.data.channels
        }
      }
      // 把处理好的数据放到token中
      this.channels = channels
    }
  }
}
</script>

<style scoped lang="less">
  .home-container{
    /deep/ .van-nav-bar__title{
      max-width: none;
    }
    .search-btn{
      width: 277px;
      height: 32px;
      background: #5babfb;
      border: none;
      .van-icon{
        font-size: 16px;
      }
      .van-button__text{
        font-size: 14px;
      }
    }

    .channel-tabs{
      /deep/ .van-tab{
        border-right: 1px solid #edeff3;
        border-bottom: 1px solid #edeff3;
      }
      /deep/ .van-tabs__line{
        width: 15px;
        height: 3px;
        background: #3296fa;
        bottom: 20px;
      }
    }
    .wap-nav-ocupy{
      width: 33px;
      flex-shrink: 0;
    }
    .wap-nav-wrap{
      position: fixed;
      right: 0;
      height: 43px;
      width: 33px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: white;
      opacity: .9;
      border-bottom: 1px solid #edeff3;
      .van-icon{
        font-size: 24px;
      }
    }
  }
</style>
