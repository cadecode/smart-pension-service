<template>
  <div>
    <Slider></Slider>
    <Recommend></Recommend>
  </div>
</template>

<script>
import Slider from '../components/home/Slider'
import Recommend from '../components/home/Recommend';

export default {
  name: 'Home',
  components: {
    Slider,
    Recommend
  }
}
</script>