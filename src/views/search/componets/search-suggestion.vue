<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(str, index) in suggestions"
      :key="index"
      @click="$emit('search', str)"
    >
      <div slot="title" v-html="highLight(str)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search'
import { debounce } from 'loadsh'

export default {
  name: 'searchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  watch: {
    // 属性名要监视数据的名称
    searchText: {
      // 防抖
      handler: debounce(async function () {
      // 找到数据接口
        const { data } = await getSearchSuggestion(this.searchText)
        this.suggestions = data.data.options
      // 请求获取数据
      // 模板绑定展示
      }, 500),
      // async handler () {
      //   // 找到数据接口
      //   const { data } = await getSearchSuggestion(this.searchText)
      //   this.suggestions = data.data.options
      //   // 请求获取数据
      //   // 模板绑定展示
      // },
      immediate: true
    }
  },
  data () {
    return {
      suggestions: []
    }
  },
  components: {},
  methods: {
    highLight (str) {
      // 正则表达式中间的内容都会当做字符串对待,错误写法this.searchText
      // RegExp参数1字符串，参数2匹配模式
      return str.replace(new RegExp(this.searchText, 'gi'), `<span style="color: red">${this.searchText}</span>`)
    }
  }
}
</script>

<style scoped lang="less">
.search-suggestion{
  /deep/ .van-cell{
    position: unset !important;
    overflow: unset;
  }
}
</style>
