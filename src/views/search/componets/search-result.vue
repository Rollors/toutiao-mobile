<template>
  <div class="search-result">
    <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad">
      <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"></van-cell>
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'

export default {
  name: 'searchResult',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 10
    }
  },
  methods: {
    async onLoad () {
      const { data } = await getSearchResult({
        page: this.page,
        per_page: this.perPage,
        q: this.searchText
      })
      const { results } = data.data
      this.list.push(...results)
      this.loading = false
      if (results.length) {
        this.page++
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style scoped lang="less">
.search-result{
  position: fixed;
  right: 0;
  left: 0;
  top: 54px;
  bottom: 0;
  overflow-y: auto;
  /deep/.van-cell{
    position: unset !important;
    overflow: unset;
  }
}
</style>
