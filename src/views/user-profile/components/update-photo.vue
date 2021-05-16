<template>
  <div class="update-photo">
    <img class="image" :src="image" ref="image">
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
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  name: 'UpdatePhoto',
  props: {
    file: {
      required: true
    }
  },
  data () {
    return {
      image: window.URL.createObjectURL(this.file),
      cropper: null
    }
  },
  mounted () {
    // 获取需要裁切的图片DOM
    const image = this.$refs.image
    this.cropper = new Cropper(image, {
      aspectRatio: 1,
      viewMode: 1,
      dragMode: 'move',
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  },
  methods: {
    getCroppedCanvas () {
      return new Promise(resolve => {
        this.cropper.getCroppedCanvas().toBlob((file) => {
          resolve(file)
        })
      })
    },
    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true,
        duration: 0 // 展示时间，0表示持续展示
      })
      const file = await this.getCroppedCanvas()
      const fd = new FormData()
      fd.append('photo', file)
      // multipart/form-data 则一定要提交formdata数据对象，不能提交{}，没用
      // const fd = new FormData()
      // fd.append('photo', this.file)// 文件对象
      await updateUserPhoto(fd)
      this.$emit('close')
      this.$emit('update-photo', window.URL.createObjectURL(file))
      this.$toast.success('保存成功')
    }
  }
}
</script>

<style scoped lang="less">
.update-photo{
  top: 100px;
  .toolbar{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000000;
    /deep/.van-nav-bar__content{
      .van-nav-bar__text{
        color: #ffffff !important;
      }
    }
  }
  .image{
    display: block;
    max-width: 100%;
  }
}
</style>
