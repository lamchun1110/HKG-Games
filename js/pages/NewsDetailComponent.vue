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
      news: {
        title: "Title1",
        subtitle: "Sub1",
        photo: "/media/news/d98d56d1-f203-4ed1-9e85-1f371ca795c8.png",
        text: "asdfasbn das das\r\ns acascasca",
        content:
          "asdasujb fjkawbfjcvksdn  c  <br>asc as<br>cas<br>edfnkjgnvjowencvpasmcas<br>csdnjvberjkolnvmsd,vsd",
      },
    };
  },
  created() {
    this.loading = true;
    axios
      .get("https://hkg.games/api/news_detail/" + this.$route.params.id)
      .then((resp) => {
        this.esports = resp;
      })
      .finally(() => {
        this.loading = false;
      });
  },
};
</script>
