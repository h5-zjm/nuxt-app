<script setup lang="ts">
import handleClick from "~/composables/index"
  const props = defineProps({
    message: String,
  })
  const count = ref(0)
handleClick('j',()=>{
  count.value++
})
</script>

<template>
  <div>
    <div>{{props.message}}</div>
    <div>
      {{count}}
    </div>
    <button @click="count++">点击加</button>
  </div>

</template>

<style scoped>
</style>
