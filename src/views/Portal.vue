<template>
  <div id="fullpage">
    <div class="section" id="section0">
      <h1 @click="handleClick">fullPage.js</h1>
    </div>
    <div class="section" id="section1">
      <div class="slide" id="slide1" v-if="false">
        <h1>Slide Backgrounds</h1>
      </div>
      <div class="slide" id="slide2" v-if="false">
        <h1>Totally customizable</h1>
      </div>
    </div>
    <div class="section" id="section2">
      <h1>
        Lovely images
        <br />for a lovely page
      </h1>
    </div>
    <div class="section" id="section3">
      <h1>One Image = One thousand words</h1>
    </div>
  </div>
</template>

<script>
import fullPage from "fullpage.js";
import "fullpage.js/dist/fullpage.css";
export default {
  mounted() {
    let myFullpage = new fullPage("#fullpage", {
      verticalCentered: false,
      css3: false
    });
    console.log(myFullpage);
  },
  methods: {
    handleClick() {
      this.$router.push({
        name: "wordExport"
      });
    }
  }
};
</script>

<style scoped>
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