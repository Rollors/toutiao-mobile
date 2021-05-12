<template>
  <div class="search-container">
    <!--    搜索栏-->
    <!--    在van-search外出增加form标签，且不为空，即可在ios输入法中显示搜索按钮-->
    <form action="/">
      <van-search
        v-model="searchText"
        placeholder="请输入搜索关键字"
        @search="onSearch(searchText)"
        @cancel="$router.back()"
        show-action
      @focus="isResultShow = false"></van-search>
    </form>
    <!--    搜索结果-->
    <searchResult v-if="isResultShow" :search-text="searchText"/>
    <!--    联想建议-->
    <searchSuggestion v-else-if="searchText" :search-text="searchText" @search="onSearch" />
    <!--    历史记录-->
    <searchHistory v-else :searchHistories="searchHistories" @search="onSearch" @update-histories="searchHistories = $event" />
  </div>
</template>

<script>
import searchSuggestion from './componets/search-suggestion'
import searchHistory from './componets/search-history'
import searchResult from './componets/search-result'
import { setItem, getItem } from '@/utils/storage'
// import { getSearchHistories } from '@/api/search'
import { mapState } from 'vuex'

export default {
  name: 'SearchIndex',
  components: {
    searchSuggestion,
    searchHistory,
    searchResult
  },
  watch: {
    searchHistories () {
      // 监视搜索历史记录的变化
      setItem('search-histories', this.searchHistories)
    }
  },
  data () {
    return {
      searchText: '',
      isResultShow: false,
      searchHistories: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.loadSearchHistories()
  },
  methods: {
    onSearch (searchText) {
      // 把输入框设置为要搜索的文本
      this.searchText = searchText
      const index = this.searchHistories.indexOf(searchText)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(searchText)
      // 如果用户已登录，则把历史搜索记录存储到线上
      //    提示：只要调用获取搜索结果的数据接口，后端会自动存储搜索历史记录
      // 如果用户未登录，则把历史搜索记录存储到本地
      // 注释是因为在组件对this.searchHistories在watch中进行监视，只要变化，就能立刻改变
      // setItem('search-histories', this.searchHistories)
      // 展示搜索结果
      this.isResultShow = true
    },
    async loadSearchHistories () {
      // 因为后端存储的用户搜索历史记录太少，所以将本地与后端结合
      const localHistories = getItem('search-histories') || []
      // if (this.user) {
      //   const { data } = await getSearchHistories()
      //   localHistories = [...new Set([...localHistories, ...data.data.keywords])]
      // }
      this.searchHistories = localHistories
    }
  }
}
</script>

<style scoped>

</style>
