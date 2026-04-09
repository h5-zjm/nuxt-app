<template>
  <UVerticalNavigation :links="links" />
</template>
<script setup lang="ts">
const links = [{
  label: '用户管理',
  icon: 'i-heroicons-home',
  to: '/users'
}, {
  label: '海报管理',
  icon: 'i-heroicons-home',
  to: '/getting-started/installation'
}, {
  label: '模版管理',
  icon: 'i-heroicons-chart-bar',
  to: '/components/vertical-navigation'
}, {
  label: 'Command Palette',
  icon: 'i-heroicons-command-line',
  to: '/components/command-palette'
}]
</script>
<style scoped>

</style>
