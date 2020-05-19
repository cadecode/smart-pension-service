<template>
  <Carousel class="slider" autoplay loop arrow="never">
    <CarouselItem v-bind:key="banner" v-for="banner in banners">
      <img v-bind:src="banner" />
    </CarouselItem>
  </Carousel>
</template>

<script>
export default {
  name: 'Slider',
  data () {
    return {
      banners: [
        'http://localhost:3000/banner/1.jpg',
        'http://localhost:3000/banner/2.jpg',
        'http://localhost:3000/banner/3.jpg',
        'http://localhost:3000/banner/4.jpg'
      ]
    }
  }
}
</script>

<style>
.slider {
  margin-top: 70px;
}

.slider img {
  width: 100%;
  min-height: 150px;
}
</style>