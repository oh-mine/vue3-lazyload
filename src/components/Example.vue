<script setup lang="ts">
import { ref } from "vue";

const images = ref();
fetch("http://localhost:8888/imgs")
  .then((res) => res.json())
  .then((res) => {
    images.value = res;
  });
</script>

<template>
  <div class="wrapper" v-for="image in images" :key="image.src">
    <img v-lazy="image.src" />
    <div class="title">{{ image.name }}</div>
  </div>
</template>

<style>
.wrapper {
  position: relative;
  overflow: hidden;
  border: 4px solid #aaa;
  margin: 10px 0;
}
img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  cursor: pointer;
}
.title {
  position: absolute;
  left: 0;
  bottom: -30px;
  background-color: rgba(238, 238, 238, 0.6);
  width: 100%;
  height: 30px;
  opacity: 0;
  transition: all 500ms;
}
img:hover ~ .title {
  opacity: 1;
  bottom: 0;
}
</style>
