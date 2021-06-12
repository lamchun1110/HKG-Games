<template>
  <div>
    <header-component></header-component>
    <div
      v-if="banners.length > 0"
      class="banner"
      :style="'background-image: url(' + banners[slideIndex].photo + ')'"
    >
      <div class="backdrop-filter">
        <b-container>
          <b-carousel
            fade
            :interval="4000"
            controls
            @sliding-start="onSlideStart"
          >
            <b-carousel-slide
              v-for="(banner, index) in banners"
              :key="index"
              :caption="banner.title"
              :text="banner.subtitle"
              :img-src="banner.photo"
            ></b-carousel-slide>
          </b-carousel>
        </b-container>
      </div>
    </div>
    <div class="content">
      <b-container>
        <div class="my-5 news p-3" v-for="(item, index) in news" :key="index">
          <b-row class="py-3">
            <b-col sm="12" lg="4">
              <img :src="item.photo" alt="" />
            </b-col>
            <b-col sm="12" lg="4">
              <div class="title">
                {{ item.title }}
              </div>
              <div class="sub-title">
                {{ item.subtitle }}
              </div>
              <div class="text-content">
                {{ item.text }}
              </div>
            </b-col>
            <b-col sm="12" lg="4" class="align-self-center text-right">
              <router-link
                :to="'/news/' + item.id"
                class="btn btn-primary text-white"
              >
                {{ item.button_text }}
              </router-link>
            </b-col>
          </b-row>
        </div>
        <div class="text-center mb-3" v-if="loading">
          <b-spinner label="Spinning"></b-spinner>
        </div>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slideIndex: 0,
      page: 0,
      scrolledToBottom: false,
      loading: false,
      banners: [],
      news: [],
    };
  },
  created() {
    this.getBanners();
    this.getNews();
  },
  mounted() {
    this.scroll();
  },
  methods: {
    onSlideStart(slide) {
      this.slideIndex = slide;
    },
    scroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
          ) +
            window.innerHeight ===
          document.documentElement.offsetHeight;

        if (bottomOfWindow) {
          this.scrolledToBottom = true; // replace it with your code
        }
      };
    },
    getBanners() {
      axios.get("https://hkg.games/api/banner").then((resp) => {
        this.banners = resp.data;
      });
    },
    getNews() {
      this.loading = true;
      axios
        .get("https://hkg.games/api/news_list/" + this.page)
        .then((resp) => {
          this.news = resp.data;
          this.scrolledToBottom = false;
          this.page = this.page + 1;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
