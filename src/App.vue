<template>
  <div id="app">
    <regForm/>
  </div>
</template>

<script>
import regForm from './components/regForm'

import './css/styles.css'

export default {
  name: 'App',
  components: {
    regForm
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
