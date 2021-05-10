<template>
  <div class="home-container">
    <!--    $router.back()从哪来回哪去-->
    <van-nav-bar class="app-nav-bar">
      <van-button class="search-btn" slot="title" icon="search" type="info" round>搜索</van-button>
    </van-nav-bar>

    <!--    文章频道列表-->
    <!--    标签页组件有个功能，只有第一次查看标签页时才会渲染里面的内容-->
    <van-tabs v-model="active">
      <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
        <article-list :channel="channel" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './componets/article-list'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList
  },
  props: {},
  data () {
    return {
      active: 0, // 控制被激活的标签，文章频道列表
      channels: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()
  },
  mounted () {
  },
  methods: {
    async loadChannels () {
      const { data } = await getUserChannels()
      this.channels = data.data.channels
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
  }
</style>
