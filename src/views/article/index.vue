<template>
  <div class="article-container">
    <!--    导航栏-->
    <van-nav-bar
      class="app-nav-bar"
      title="文章详情"
      left-arrow
      @click-left="$router.back()"/>
    <div class="article-wrap">
      <!--    文章标题-->
      <h1 class="title">{{ article.title }}</h1>
      <van-cell center class="user-info">
        <div slot="title" class="name">{{ article.aut_name }}</div>
        <van-image
          slot="icon"
          class="avatar"
          round
          fit="cover"
          :src="article.aut_photo"/>
        <div slot="label" class="pubdate">{{ article.pubdate | relativeTime }}</div>
        <van-button
          class="follow-btn"
          :type="article.is_followed ? 'default':'info'"
          round
          size="small"
          :loading="isFollowLoading"
          icon="article.is_followed ? '':'plus'"
          @click="onFollow" >{{ article.is_followed ? '已关注' : '关注' }}</van-button>
      </van-cell>
      <!--    正文内容
        ref属性可以得到Dom
      -->
      <div
        class="content markdown-body"
        v-html="article.content" ref="article-content">
      </div>
    </div>
    <!--    底部区域-->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small">写评论</van-button>
      <van-icon
        name="comment-o"
        info="123"
        color="#777" />
      <van-icon
        :color="article.is_collected ? 'orange':'#777'"
        :name="article.is_collected ? 'star':'star-o'"
        @click="onCollect" />
      <van-icon
        :color="article.attitude === 1 ? 'red': '#777'"
        :name="article.attitude === 1 ? 'good-job' : 'good-job-o'"
        @click="onLike"/>
      <van-icon
        name="share"
        color="#777" />
    </div>
  </div>
</template>

<script>
// 在组件中获取动态路由参数
//    1.this.$route.params.xxxx
//    2.props传参，推荐,在本省的路由表中要声明使用props
import './github-markdown.css'
import { getArticleById, addCollect, deleteCollect, addLike, deleteLike } from '@/api/article'
import { ImagePreview } from 'vant'
import { addFollow, deleteFollow } from '@/api/user'

// ImagePreview(['https://img.yzcdn.cn/vant/apple-1.jpg', 'https://img.yzcdn.cn/vant/apple-2.jpg'])
export default {
  name: 'ArticleContainer',
  props: {
    articleId: {
      type: [String, Object, Number],
      required: true
    }
  },
  data () {
    return {
      article: [],
      isFollowLoading: false,
      isCollectLoading: false
    }
  },
  created () {
    this.loadArticle()
  },
  methods: {
    async loadArticle () {
      // 404错误，文章不存在，因为前后端id不一致，解决后端返回大数字问题
      const { data } = await getArticleById(this.articleId)
      this.article = data.data

      // 获取文章内容dom容器，
      // const articleContent = this.$refs['article-content']
      // 数据改变影响视图更新，不是立即的
      // 所以需要在修改数据之后马上操作被该数据影响的视图DOM，需要把这个代码放到$nextTick中
      // 得到所有的img标签，
      // const imgs = articleContent.querySelectorAll('img')
      // // 空数组
      // console.log(imgs)
      // this.$nextTick是vue中提供的一个方法
      // this.$nextTick(() => {
      //   const imgs = articleContent.querySelectorAll('img')
      //   console.log(imgs)
      // })
      this.$nextTick(() => {
        this.handlePerviewImage()
      })
      // 给所有img注册点击事件，
      // 在事件处理函数中调用ImagePreview函数
    },
    handlePerviewImage () {
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      const imgPaths = []
      imgs.forEach((img, index) => {
        imgPaths.push(img.src)
        console.log(imgPaths)
        img.onclick = function () {
          ImagePreview({
            images: imgPaths, // 预览图片路径列表
            startPosition: index // 起始位置
          })
        }
      })
    },
    async onFollow () {
      this.isFollowLoading = true
      if (this.article.is_followed) {
        // 已关注,取消关注
        await deleteFollow(this.article.aut_id)
      } else {
        // 未关注，添加关注
        await addFollow(this.article.aut_id)
      }
      // 更新视图
      this.article.is_followed = !this.article.is_followed
      this.isFollowLoading = false
    },
    async onCollect () {
      this.$toast.loading({
        message: '操作中',
        forbidClick: true
      })
      this.isCollectLoading = true
      if (this.article.is_collected) {
        // 已收藏,取消收藏
        await deleteCollect(this.articleId)
      } else {
        // 未收藏，添加收藏
        await addCollect(this.articleId)
      }
      // 更新视图
      this.article.is_collected = !this.article.is_collected
      this.isCollectLoading = false
      this.$toast.success(`${this.article.is_collected ? '' : '取消'}收藏成功`)
    },
    async onLike () {
      this.$toast.loading({
        message: '操作中',
        forbidClick: true
      })
      if (this.article.attitude === 1) {
        // 已点赞,取消已点赞
        await deleteLike(this.articleId)
        this.article.attitude = -1
      } else {
        // 未已点赞，添加已点赞
        await addLike(this.articleId)
        this.article.attitude = 1
      }
      // 更新视图
      this.$toast.success(`${this.article.attitude === 1 ? '' : '取消'}点赞成功`)
    }
  }
}
</script>

<style scoped lang="less">
.article-container {
  .article-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 44px;
    overflow-y: auto;
   }
  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 141px;
      height: 26px;
      border: 1px solid #eee;
      font-size: 15px;
      line-height: 23px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 24px;
    }
  }
}
.title{
  font-size: 20px;
  color: #3a3a3a;
  padding: 14px;
  background-color: #ffffff;
  margin: 0;
}
.user-info{
  height: 100%;
  .avatar{
    width: 35px;
    height: 35px;
    margin-right: 8px;
  }
  .name{
    font-size: 12px;
    color: #333333;
  }
  .pubdate{
    font-size: 11px;
    color: #b4b4b4;
  }
  .follow-btn{
    width: 85px;
    height: 29px;
  }
}
ul{
  list-style: unset;
}
.markdown-body{
  padding: 14px;
  background-color: #ffffff;
}
</style>
