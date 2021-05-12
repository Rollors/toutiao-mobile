<template>
  <div class="search-history">
    <van-cell title="搜索历史">
<!--      prop数据如果是引用类型（数组，对象）可以修改，注意修改是指：user.name='jack'/arr.push(123),但是不能重新赋值xxx = xxx，如果想的话，让父组件自己修改-->
      <div v-if="isDeleteShow" @click="$emit('update-histories', [])">
        <span>全部删除</span>
        &nbsp;
        <span @click="isDeleteShow=false">完成</span>
      </div>
      <van-icon v-else name="delete" @click="isDeleteShow=true"></van-icon>
    </van-cell>
    <van-cell
      v-for="(history, index) in searchHistories"
      :key="index"
      :title="history"
      @click="onDelete(history,index)">
      <van-icon v-show="isDeleteShow" name="close"></van-icon>
    </van-cell>
  </div>
</template>

<script>

export default {
  name: 'searchHistory',
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false
    }
  },
  methods: {
    onDelete (history, index) {
      // 如果是删除状态，执行删除操作
      if (this.isDeleteShow) {
        this.searchHistories.splice(index, 1)
        // 持久化处理
        // 1修改本地存储的数据
        // 2请求接口删除线上的数据
        // 注释是因为在父组件对this.searchHistories在watch中进行监视，只要变化，就能立刻改变
        // setItem('search-histories', this.searchHistories)
        return
      }
      // 非删除状态，展示搜索结果
      this.$emit('search', history)
    }
  }
}
</script>

<style scoped lang="less">
</style>
