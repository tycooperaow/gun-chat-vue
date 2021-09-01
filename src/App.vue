<template>
  <div id="app">
    <Login v-if="!username"/>
    <HelloWorld v-else/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Login from './components/Login.vue'
import {mapState} from 'vuex'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Login
  },
  computed:{
    ...mapState(['username'])
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
