<template>
  <div id="news-detail">
    <header-component></header-component>
    <b-container>
      <div class="title py-2">{{ news.title }}</div>
      <div class="sub-title py-2">{{ news.subtitle }}</div>
      <div class="content py-3" v-html="news.content">
        {{ news.content }}
      </div>
      <img :src="news.photo" alt="" />
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      news: {},
    };
  },
  created() {
    this.loading = true;
    axios
      .get("https://hkg.games/api/news_detail/" + this.$route.params.id)
      .then((resp) => {
        this.news = resp.data;
      })
      .finally(() => {
        this.loading = false;
      });
  },
};
</script>
