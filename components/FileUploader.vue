<template>
<!--  <div class="file-uploader">-->
<!--    <div class="flex items-center space-x-6">-->
<!--      <UAvatar :ui="{background:'bg-white dark:bg-gray-800'}" :src="innerValue"></UAvatar>-->
<!--      <UButton @click="triggerUpload" class="ml-5">UPLOAD</UButton>-->
<!--      <input type="file" :style="{display: 'none'}" ref="fileInput" accept="image/*" @change="handleFileChange">-->
<!--    </div>-->
<!--  </div>-->
</template>
<script setup lang="ts">
// interface FileUploader {
//   username:string;
//   modelValue?:string;
//   action:string
// }
// const props=defineProps<FileUploader>()
// const emit=defineEmits(['update:modelValue']);
// const innerValue = ref(props.modelValue||'')
// watch(()=>props.modelValue,(val)=>{
//   if(typeof val==="string"){
//     innerValue.value=val
//   }
// })
// const fileInput=ref<null|HTMLInputElement>(null)
// const triggerUpload=()=>{
//   if(fileInput.value){
//     fileInput.value.click()
//   }
// }
// const handleFileChange=(e:Event)=>{
//   const target=e.target as HTMLInputElement;
//   if(target.files){
//     const files = target.files[0];
//     postFile(files)
//   }
// }
// const postFile=async (readFile:File)=>{
//   const formData = new FormData();
//   formData.append('file',readFile);
//   try {
//     const result=await $fetch(props.action,{
//       method:'POST',
//       body:formData,
//     });
//     innerValue.value = result.url;
//     emit('update:modelValue',result.url);
//     emit('change',{result,file:readFile});
//   }catch(err){
//     emit('error',err);
//   }finally{
//     if(fileInput.value){
//       fileInput.value.value=''
//     }
//   }
// }
</script>
