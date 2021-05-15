<template>
  <div class="comment-reply">
    <van-nav-bar
      class="app-nav-bar-reply">
      <div slot="title">{{ comment.reply_count }}条回复</div>
      <van-icon
        name="cross"
        slot="left"
        @click="$emit('close')"/>
    </van-nav-bar>
    <comment-item
      :comment="comment" />
    <van-cell title="所有回复" />
    <div class="reply-comment">
      <comment-list
        type="c"
        :source="comment.com_id"
        :list="commentList" />
    </div>
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small" @click="isPostShow=true">写评论</van-button>
    </div>
    <van-popup
      v-model="isPostShow"
      position="bottom"
    >
      <post-comment :target="comment.com_id" :article-id="articleId" @post-success="onPostSuccess"/>
    </van-popup>
  </div>
</template>

<script>
import CommentItem from './comment-item'
import CommentList from './comment-list'
import PostComment from './post-comment'
export default {
  name: 'CommentReply',
  components: {
    CommentItem,
    CommentList,
    PostComment
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      isPostShow: false,
      commentList: []
    }
  },
  methods: {
    onPostSuccess (comment) {
      this.commentList.unshift(comment)
      this.comment.reply_count++
      this.isPostShow = false
    }
  }
}
</script>

<style scoped lang="less">
.comment-reply{
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
      width: 200px;
      height: 30px;
      border: 1px solid #eee;
      font-size: 15px;
      line-height: 23px;
      color: #a7a7a7;
    }
  }
}

</style>
