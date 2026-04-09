<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>
<script setup lang="ts">
import HelloWorld from "~/components/HelloWorld.vue";
import type {UserInfo} from '~/types/user'
import {useUserCurrentInfo} from "~/composables/useUserCurrentInfo";
const currentUser=useUserCurrentInfo()
const send=async ()=>{
  let data=await $fetch('/api/users/login',{method:'POST',body:{name:'test',isLogin:true}})
  console.log(data)
}
const {apiKey}=useRuntimeConfig()
console.log('apiKey',apiKey)
const {theme}=useAppConfig()
const {$user}=useNuxtApp()
console.log('$user',$user)
</script>
