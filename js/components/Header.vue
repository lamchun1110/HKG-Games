<template>
  <div id="header">
    <b-container>
      <b-row class="align-items-center">
        <b-col class="logo">
          <router-link to="/">
            <img src="/images/hkg-logo-hori.png" alt="" />
          </router-link>
        </b-col>
        <b-col class="text-right menus">
          <div
            @mouseover="onOver"
            @mouseleave="onLeave"
            class="d-inline-block px-3"
          >
            <b-dropdown text="Esport League" ref="dropdown">
              <b-dropdown-item
                :href="esport.link"
                v-for="(esport, index) in esports"
                :key="index"
                >{{ esport.title }}</b-dropdown-item
              >
            </b-dropdown>
          </div>
          <a
            class="px-3"
            href="https://fb.com/Hong.Kong.Gaming"
            target="_blank"
          >
            <img src="/images/fb-icon.png" alt="" />
          </a>
          <a
            class="px-3"
            href="https://fb.com/Hong.Kong.Gaming"
            target="_blank"
          >
            <img src="/images/ig-icon.png" alt="" />
          </a>
          <a
            class="px-3"
            href="https://fb.com/Hong.Kong.Gaming"
            target="_blank"
          >
            <img src="/images/youtube-icon.png" alt="" />
          </a>
          <a
            class="px-3"
            href="https://fb.com/Hong.Kong.Gaming"
            target="_blank"
          >
            <img src="/images/twitch-icon.png" alt="" />
          </a>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      esports: [
        { title: "FIFA Pro Club Hong Kong", link: "https://fpchk.com" },
      ],
    };
  },
  created() {
    axios.get("https://hkg.games/api/esports_league").then((resp) => {
      this.esports = resp;
    });
  },
  methods: {
    onOver() {
      this.$refs.dropdown.visible = true;
    },
    onLeave() {
      this.$refs.dropdown.visible = false;
    },
  },
};
</script>
