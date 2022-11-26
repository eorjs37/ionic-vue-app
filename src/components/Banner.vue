<template>
  <swiper :modules="modules" :loop="true" :autoplay="autoplay" :height="200">
    <swiper-slide>
      <img src="../../public/assets/imgs/banner/slide1.jpg" alt="" />
    </swiper-slide>
    <swiper-slide>
      <img src="../../public/assets/imgs/banner/slider2.jpg" alt="" />
    </swiper-slide>
    <swiper-slide>
      <img src="../../public/assets/imgs/banner/slider3.jpg" alt="" />
    </swiper-slide>
  </swiper>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "@ionic/vue/css/ionic-swiper.css";
export default defineComponent({
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    let autoplay = {};
    onMounted(() => {
      autoplay = {
        delay: 3000,
        reverseDirection: false,
      };
    });
    return {
      modules: [Autoplay],
      autoplay,
    };
  },
});
</script>
<style lang="scss"></style>
