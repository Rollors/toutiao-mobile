<template>
  <div class="article-list">
    <van-pull-refresh v-model="isPullDownLoading" @refresh="onRefresh" :success-text="refreshText" :success-duration="1000">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <article-item v-for="(item, index) in articles" :key="index" :article="item" />
        <!--        <van-cell v-for="(item, index) in articles" :key="index" :title="item.title" />-->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'

export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      articles: [],
      loading: false,
      finished: false,
      timestamp: null,
      isPullDownLoading: false,
      refreshText: ''
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      // 1请求获取数据
      // timestamp 是 时间戳整数 单位毫秒 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳,就是获取页面，请求最新页面用当前最新时间戳，下一页数据使用上一次返回数据中的时间戳
      // with_top 是 0或1 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包
      const { data } = await getArticles({ channel_id: this.channel.id, timestamp: this.timestamp || Date.now(), with_top: 1 })
      // console.log(data)
      // 2把数据放到list数组中
      const { results } = data.data
      this.articles.push(...results)
      // 3设置本次加载结束，它才可以判断是否需要加载下一次，否则会永远停在这
      this.loading = false
      // 4数据全部加载完成
      if (results.length) {
        // 更新获取下一页页码
        this.timestamp = data.data.pre_timestamp
      } else {
        this.finished = true
      }
    },
    async onRefresh () {
      // 下拉刷新，组件自己就会展示loading状态
      // 1请求获取数据
      const { data } = await getArticles({ channel_id: this.channel.id, timestamp: Date.now(), with_top: 1 })
      // 2把数据放到数据列表中，往顶部追加
      this.articles.unshift(...data.data.results)
      // 3关闭loading状态
      this.isPullDownLoading = false

      this.refreshText = `更新了${data.data.results.length}条数据`
    }
  }
}
</script>

<style scoped lang="less">
.article-list{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  top: 90px;
  overflow: auto;
  .van-pull-refresh{
    .van-list{
      .article-item{
        height: 100%;
      }
    }
  }
}
</style>
