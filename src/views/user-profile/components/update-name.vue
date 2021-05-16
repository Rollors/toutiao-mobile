<template>
  <div class="update-name">
    <van-nav-bar
      left-text="取消"
      title="昵称"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <div class="name-field-wrap">
      <van-field
        v-model="localName"
        rows="3"
        type="textarea"
        maxlength="7"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'

export default {
  name: 'UpdateName',
  props: {
    // 声明接收父组件-v-model的value
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      localName: this.value
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        firbidclick: true
      })
      try {
        await updateUserProfile({
          name: this.localName
        })
        this.$toast.success('保存成功')
        this.$emit('close')
        // this.$emit('update-name', this.localName)
        // 发布input事件更新v-model绑定的数据
        this.$emit('input', this.localName)
      } catch (err) {
        if (err && err.response && err.response.status === 409) {
          this.$toast.fail('昵称已存在')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.name-field-wrap{
  padding: 10px;
}
</style>
