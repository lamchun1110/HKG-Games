<template>
  <div>
    <header-component></header-component>
    <div
      class="banner"
      :style="'background-image: url(' + banners[slideIndex].url + ')'"
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
              :text="banner.desc"
              :img-src="banner.url"
            ></b-carousel-slide>
          </b-carousel>
        </b-container>
      </div>
    </div>
    <div class="content">
      <b-container>
        <div class="my-5 news p-3" v-for="(item, index) in news" :key="index">
          <b-row class="py-3">
            <b-col>
              <img :src="item.photo" alt="" />
            </b-col>
            <b-col>
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
            <b-col class="align-self-center text-right">
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
      banners: [
        {
          title: "slide",
          desc: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
          url: "https://picsum.photos/1024/480/?image=52",
        },
        {
          title: "slide",
          desc: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
          url: "https://picsum.photos/1024/480/?image=52",
        },
        {
          title: "slide",
          desc: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
          url: "https://picsum.photos/1024/480/?image=52",
        },
      ],
      news: [
        {
          title: "title2",
          subtitle: "sub2222",
          photo: "/media/news/3198cd40-41fe-4a33-a1f3-d75cda8ed13c.png",
          text: "asdas dasdasc as\r\ncascas c",
          id: 2,
          button_text: "Madness",
        },
        {
          title: "fasfas da",
          subtitle: "da sdasd",
          photo: "/media/news/4fca7594-73db-458b-bff2-8d482199d8c2.png",
          text: "wge vbwefgqwaczxc sd",
          id: 6,
          button_text: "dasd",
        },
      ],
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
        this.banners = resp;
      });
    },
    getNews() {
      this.loading = true;
      axios
        .get("https://hkg.games/api/news_list/" + this.page)
        .then((resp) => {
          this.news = resp;
          this.scrolledToBottom = false;
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
