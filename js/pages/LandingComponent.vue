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
            <a
              :href="banner.link"
              v-for="(banner, index) in banners"
              :key="index"
            >
              <b-carousel-slide
                :caption="banner.title"
                :text="banner.subtitle"
                :img-src="banner.photo"
              ></b-carousel-slide>
            </a>
          </b-carousel>
        </b-container>
      </div>
    </div>
    <div class="content">
      <b-container>
        <div class="my-5 p-3">
          <span
            class="tags blue text-center py-1 px-2 mr-2 pointer"
            @click="selectTag(null)"
          >
            All
          </span>
          <span
            class="tags blue text-center py-1 px-2 mr-2 pointer"
            v-for="(tag, index) in tags"
            :key="index"
            @click="selectTag(index)"
            >{{ tag }}</span
          >
        </div>
        <div class="my-5 news p-3" v-for="(item, index) in news" :key="index">
          <router-link :to="'/news/' + item.id" class="w-100">
            <b-row class="py-3">
              <b-col cols="4" lg="4" class="text-center pr-0">
                <img :src="item.photo" alt="" />
              </b-col>
              <b-col cols="8" lg="8">
                <div class="title">
                  <span
                    class="tags blue text-center py-1 px-2 mr-2"
                    v-for="(tagName, index) in item.tag"
                    :key="index"
                    >{{ tagName }}</span
                  >
                  <span>{{ item.title }}</span>
                </div>
                <div class="sub-title">
                  {{ item.subtitle }}
                </div>
                <div class="text-content">
                  {{ item.text }}
                </div>
              </b-col>
            </b-row>
          </router-link>
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
      loading: false,
      banners: [],
      news: [],
      tags: [],
      end: false,
      selectedTag: null,
    };
  },
  created() {
    this.getBanners();
    this.getTags();
  },
  mounted() {
    this.scroll();
    this.getNews();
  },
  methods: {
    onSlideStart(slide) {
      this.slideIndex = slide;
    },
    selectTag(index) {
      this.selectedTag = index;
      this.page = 0;
      this.news = [];
      this.getNews();
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

        if (bottomOfWindow && this.end == false) {
          this.getNews();
        }
      };
    },
    getBanners() {
      axios.get("https://hkg.games/api/banner").then((resp) => {
        this.banners = resp.data;
      });
    },
    getTags() {
      console.log(123);
      axios.get("https://hkg.games/api/news_tags").then((resp) => {
        this.tags = resp.data;
      });
    },
    getNews() {
      if (!this.loading) {
        this.loading = true;
        let url = "https://hkg.games/api/news_list/" + this.page;
        if (this.selectedTag != null) {
          url += "/" + this.tags[this.selectedTag];
        }
        axios
          .get(url)
          .then((resp) => {
            if (resp.data.length > 0) {
              for (var i = 0; i < resp.data.length; i++) {
                this.news.push(resp.data[i]);
              }
              this.page = this.page + 1;
            } else {
              this.end = true;
            }
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
  },
};
</script>
