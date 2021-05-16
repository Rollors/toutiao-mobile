<template>
  <div class="update-photo">
    <img :src="image" alt="">
    <van-nav-bar
      class="toolbar"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserPhoto } from '@/api/user'

export default {
  name: 'UpdatePhoto',
  props: {
    file: {
      required: true
    }
  },
  data () {
    return {
      image: window.URL.createObjectURL(this.file)
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true
      })
      // multipart/form-data 则一定要提交formdata数据对象，不能提交{}，没用
      const fd = new FormData()
      fd.append('photo', this.file)// 文件对象
      await updateUserPhoto(fd)
      this.$toast.success('保存成功')
      this.$emit('close')
      this.$emit('update-photo', this.image)
    }
  }
}
</script>

<style scoped lang="less">
  .toolbar{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
