<template>
  <div id="app">
    <div v-wechat-title="$route.meta.title"></div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss" src="./assets/scss/global.scss" />
