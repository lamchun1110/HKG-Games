<template>
  <div id="header">
    <b-container>
      <b-navbar toggleable="lg" class="px-0">
        <b-navbar-brand href="#" class="logo">
			<img src="/images/hkg-logo-hori.png" alt="">
		</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav class="justify-content-end">
			<div @mouseover="onOver" @mouseleave="onLeave">
				<b-nav-item-dropdown text="Esports League" right ref="dropdown" class="my-sm-3">
					<b-dropdown-item class="ml-sm-2" :href="esport.link" v-for="(esport, index) in esports" :key="index">{{ esport.title }}</b-dropdown-item>
				</b-nav-item-dropdown>
			</div>

			<b-nav-form class="icons my-sm-3">
				<a class="mx-3" href="https://fb.com/Hong.Kong.Gaming">
					<img src="/images/fb-icon.png" alt="">
				</a>
				<a class="mx-3" href="https://fb.com/Hong.Kong.Gaming">
					<img src="/images/ig-icon.png" alt="">
				</a>
				<a class="mx-3" href="https://fb.com/Hong.Kong.Gaming">
					<img src="/images/youtube-icon.png" alt="">
				</a>
				<a class="mx-3" href="https://fb.com/Hong.Kong.Gaming">
					<img src="/images/twitch-icon.png" alt="">
				</a>
			</b-nav-form>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
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
		console.log(window.innerWidth)
		if(window.innerWidth > 991) {
			this.$refs.dropdown.visible = true;
		}
    },
    onLeave() {
		if(window.innerWidth > 991) {
			this.$refs.dropdown.visible = false;
		}
    },
  },
};
</script>
