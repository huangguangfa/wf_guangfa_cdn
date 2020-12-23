<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'rootView',
  components: {
    HelloWorld
  },
  props: {
    loading: Boolean,
    content: String 
  }
}
</script>

<style src="./style/reaet.css"></style>
<style>
    .main-container{width: 100%; height: 100%;}
</style>
