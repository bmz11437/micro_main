<template>
  <full-page ref="fullpage" :options="options">
    <div class="section">
      <WordExport @handle-click="handleClick('wordExport')" />
    </div>
    <div class="section">
      <MyBlog @handle-click="handleClick('MyBlog')" />
    </div>
  </full-page>
</template>

<script>
import WordExport from "./PortalItems/WordExport";
import MyBlog from "./PortalItems/MyBlog";
export default {
  name: "Portal",
  components: {
    WordExport,
    MyBlog
  },
  data() {
    return {
      microApps: [],
      options: {
        verticalCentered: false,
        css3: false
      }
    };
  },
  mounted() {
    this.microApps = this.$store.getters.appConfig.microApps;
  },
  methods: {
    getPortalComp(i) {
      let comp;
      switch (i) {
        case 0:
          comp = WordExport;
          break;
      }
      return comp;
    },
    handleClick(name) {
      this.$router.push({
        name
      });
    }
  }
};
</script>

<style scoped>
.full-page {
  width: 100%;
  height: 100%;
}
/* Style for our header texts
	* --------------------------------------- */
h1 {
  font-size: 5em;
  font-family: arial, helvetica;
  color: #fff;
  margin: 0;
  padding: 0;
  cursor: pointer;
}

/* Centered texts in each section
	* --------------------------------------- */
.section {
  text-align: center;
}

/* Backgrounds will cover all the section
	* --------------------------------------- */
#section0,
#section1,
#section2,
#section3,
#slide1,
#slide2 {
  background-size: cover;
  background-attachment: fixed;
}

/* Defining each sectino background and styles
	* --------------------------------------- */
#section0 {
  background-image: url(../assets/imgs/bg1.jpg);
}
#section0 h1 {
  top: 50%;
  transform: translateY(-50%);
  position: relative;
}
#section2 {
  background-image: url(../assets/imgs/bg3.jpg);
  padding: 6% 0 0 0;
}
#section3 {
  background-image: url(../assets/imgs/bg4.jpg);
  padding: 6% 0 0 0;
}
#section3 h1 {
  color: #000;
}

/*Adding background for the slides
	* --------------------------------------- */
#slide1 {
  background-image: url(../assets/imgs/bg2.jpg);
  padding: 6% 0 0 0;
}
#slide2 {
  background-image: url(../assets/imgs/bg5.jpg);
  padding: 6% 0 0 0;
}

/* Bottom menu
	* --------------------------------------- */
#infoMenu li a {
  color: #fff;
}
</style>