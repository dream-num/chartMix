<template>
  <div id="app">
    <ChartContainer />
  </div>
</template>

<script>
import ChartContainer from "./components/ChartContainer.vue";

export default {
  name: "app",
  components: {
    ChartContainer
  }
};
</script>

<style>
    body {
        height: 100vh;
        width: 100vw;
        background-color: #ECECEC;
    }

#app {
  margin: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: relative;
  font-family: "Lato", sans-serif;
}
</style>
