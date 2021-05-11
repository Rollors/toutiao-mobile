<template>
  <div class="channel-edit">
    <van-cell center :border="false">
      <div slot="title" class="channel-title">我的频道</div>
      <van-button type="danger" plain round size="mini" @click="isEdit = !isEdit">{{ isEdit? '完成' :'编辑'}}</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <!--      index !== 0为了吧推荐频道固定，一般推荐是第一个-->
<!--      :class="{ active: index === 激活的频道 }"-->
      <van-grid-item
        class="grid-item"
        :class="{ activeChannel: index === active }"
        v-for="(channel, index) in userChannels"
        :key="index" :text="channel.name"
        :icon="(isEdit && index !== 0) ? 'clear' : ''"
        @click="onUserChannelClick(channel, index)"></van-grid-item>
    </van-grid>

    <van-cell center :border="false">
      <div slot="title" class="channel-title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in recommendChannels"
        :key="index" :text="channel.name"
        @click="onAdd(channel)"></van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'

export default {
  name: 'ChannelEdit',
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [],
      isEdit: false // 控制编辑的显示状态
    }
  },
  computed: {
    ...mapState(['user']),
    // 推荐频道列表
    // 计算属性会观测内部数据变化而变化
    recommendChannels () {
      return this.allChannels.filter(channel => {
        // 判断channel 是否属于我的频道
        return !this.userChannels.find(userChannel => {
          return userChannel.id === channel.id
        })
      })
    }
  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },
    async onAdd (channel) {
      try {
        this.userChannels.push(channel)
        // 数据持久化
        if (this.user) {
          // 登录了，数据存储到线上
          await addUserChannel({
            channels: [
              { id: channel.id, seq: this.userChannels.length }
            ]
          })
        } else {
          // 没登录，数据存储到本地
          setItem('user-channels', this.userChannels)
        }
      } catch (err) {
        console.log(err)
        this.$toast('添加频道失败')
      }
    },
    onUserChannelClick (channel, index) {
      // 编辑状态，删除频道
      // 非编辑状态，切换频道
      if (this.isEdit && index !== 0) {
        this.deleteChannel(channel, index)
      } else {
        this.switchChannel(index)
      }
    },
    async deleteChannel (channel, index) {
      if (index <= this.active) {
        this.$emit('update-active', this.active - 1)
      }
      this.userChannels.splice(index, 1)
      try {
        if (this.user) {
          const data = await deleteUserChannel(channel.id)
          console.log(data)
        } else {
          setItem('user-channels', this.userChannels)
        }
      } catch (err) {
        console.log(err)
        console.log('删除失败')
      }
    },
    switchChannel (index) {
      // 切换频道
      this.$emit('update-active', index)
      // 子组件向父组件传递消息，事件
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="less">
  .channel-edit{
    padding-top: 54px;
    .channel-title{
      font-size: 16px;
      color: #333333;
    }
    /deep/ .grid-item{
      height: 43px;
      width: 80px;
      .van-grid-item__content{
        background: #f4f5f6;
        .van-grid-item__text{
          font-size: 14px;
          color: #222;
          margin-top: 0;
        }
      }
      .van-grid-item__icon{
        position: absolute;
        right: -8px;
        top: -5px;
        font-size: 20px;
        color: #ccc;
      }
    }
    /deep/ .activeChannel{
      .van-grid-item__text{
        color: red !important;
      }
    }
  }
</style>
