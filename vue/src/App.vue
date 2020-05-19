<template>
  <div id="app">
    <Head></Head>
    <router-view></router-view>
    <BackTop></BackTop>
    <Foot></Foot>
  </div>
</template>

<script>
import Head from './components/common/Head'
import Foot from './components/common/Foot'

export default {
  name: 'App',
  components: {
    Head,
    Foot
  }
}
</script>