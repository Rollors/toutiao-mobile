<template>
  <div class="update-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'UpdateBirthday',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1921, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        firbidclick: true
      })
      // const date = `${this.currentDate.FullYear}-${this.currentDate.getMonth()+1}-${this.currentDate.getDate()}`
      var date = dayjs(this.currentDate).format('YYYY-MM-DD')
      await updateUserProfile({
        birthday: date
      })
      this.$toast.success('保存成功')
      this.$emit('close')
      // this.$emit('update-name', this.localName)
      // 发布input事件更新v-model绑定的数据
      this.$emit('input', date)
    }
  }
}
</script>

<style scoped>

</style>
