<template>
  <div class="update-gender">
    <van-picker
      show-toolbar
      :columns="columns"
      :default-index="defaultIndex"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      @change="onGenderChange"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateGender',
  props: {
    // 声明接收父组件-v-model的value
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      defaultIndex: this.value
    }
  },
  methods: {
    onGenderChange (picker, value, index) {
      this.defaultIndex = index
    },
    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        firbidclick: true
      })
      await updateUserProfile({
        gender: this.defaultIndex
      })
      this.$toast.success('保存成功')
      this.$emit('close')
      // this.$emit('update-name', this.localName)
      // 发布input事件更新v-model绑定的数据
      this.$emit('input', this.defaultIndex)
    }
  }
}
</script>

<style scoped>

</style>
