<template>
  <div>
    <div v-if="pending">pending...</div>
    <div>{{route.params.id}}</div>
    {{data}}
  </div>

</template>
<script setup>
const route = useRoute();
const {data,pending}=await useFetch('/api/users/'+route.params.id,{
  lazy:true,
  server:false
})
// useHead({
//   title: 'xiangqingye',
//   meta:[{
//     name: '111',
//     content: '999'
//   }]
// })
useSeoMeta({
  title:()=>data.value ? 'page detail '+data.value.name : 'loading...',
  description:'xiangqingye',
})
// const data=ref(null)
// const {data:userData}=useNuxtData('user/'+route.params.id)
// if(userData.value){
//   data.value=userData;
// }else{
//   data.value=await useAsyncData('user/'+route.params.id,()=>$fetch('https://jsonplaceholder.typicode.com/users/'+route.params.id))
// }
</script>
