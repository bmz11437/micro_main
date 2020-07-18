<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>

</script>
<style>
#app {
  width: 100%;
  height: 100%;
  background: url(https://user-images.githubusercontent.com/25878302/50690661-72ad2280-102e-11e9-814d-68b5d5e38c21.jpg);
  background-repeat: no-repeat;
  background-size: 100%;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
