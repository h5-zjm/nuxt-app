<template>
  <div class="my-10 mb-10"><form @submit.prevent="login" class="mx-auto max-w-md space-y-4 rounded-lg border border-gray-300 bg-gray-100 p-6">
    <ValidateInput name="name" placeholder="请输入name" type="text"></ValidateInput>
<!--    <div>-->
<!--      <label class="block text-sm font-medium text-gray-900" for="name">Name</label>-->

<!--      <input class="mt-1 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:outline-none" id="name" type="text" placeholder="Your name" v-model="name" v-bind="nameAttrs">-->
<!--      <span class="text-red-500 text-xs italic" v-if="errors.name">{{errors.name}}</span>-->

<!--    </div>-->
    <ValidateInput name="email" placeholder="请输入email" type="text"></ValidateInput>
    <ValidateInput name="password" placeholder="请输入password" type="text"></ValidateInput>
    <ValidateInput name="confirmPassword" placeholder="请输入confirmPassword" type="text"></ValidateInput>
<!--    <div>-->
<!--      <label class="block text-sm font-medium text-gray-900" for="email">Email</label>-->

<!--      <input class="mt-1 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:outline-none border" id="email" type="email" placeholder="Your email" v-model="email" v-bind='emailAttrs' :class="{'border-red-500':errors.email,'border-gray-200':!errors.email}">-->
<!--      <span class="text-red-500 text-xs italic" v-if="errors.email">{{errors.email}}</span>-->
<!--    </div>-->

<!--    <div>-->
<!--      <label class="block text-sm font-medium text-gray-900" for="password">password</label>-->

<!--      <input class="mt-1 w-full resize-none rounded-lg border-gray-300 focus:border-indigo-500 focus:outline-none" id="password" placeholder="Your password"  v-model="password" v-bind="passwordAttrs"/>-->
<!--      <span class="text-red-500 text-xs italic" v-if="errors.password">{{errors.password}}</span>-->
<!--    </div>-->

    <button class="block w-full rounded-lg border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition-colors hover:bg-transparent hover:text-indigo-600 disabled:opacity-75" type="submit" :disabled="isSubmitting">
      {{isSubmitting?'loading':'sign in'}}
    </button>
  </form></div>
</template>
<script setup lang="ts">
import {signUpSchema} from '../validators/user'
import {useForm} from 'vee-validate'
import {toTypedSchema} from "@vee-validate/zod";
import ValidateInput from "~/components/ValidateInput.vue";
definePageMeta({
  layout:"custom"
    }
)
const {values,defineField,errors,handleSubmit,isSubmitting}=useForm({
  validationSchema: toTypedSchema(signUpSchema)
})
const formData=reactive({
  email:'',
  password:'',
  name:''
})
const callbackMessage=ref({
  isShow:false,
  isValid:true,
  message:''
})
const user=useUserCurrentInfo()
const emailError=ref<undefined|string[]>()
const login = handleSubmit(async (values) => {
  // const result=loginSchema.safeParse(formData)
  // if(!result.success){
  //   console.log(result.error.format())
  //   const errorMap=result.error.format()
  //   emailError.value=errorMap.email?._errors
  // }else{
  //   emailError.value=undefined
  //   user.value.isLogin = true;
  //   user.value.username = 'zhengjiameng'
  //   navigateTo('/login/1')
  // }
  try{
    await $fetch('/api/users/signup',{
      method:'POST',
      body:values
    })
    callbackMessage.value={
      isShow:true,
      isValid: true,
      message:'注册成功'
    }
    navigateTo('/login/1')
  }catch(error){
    callbackMessage.value={
      isShow:true,
      isValid: false,
      message:error.data.statusMessage
    }
  }

  console.log('values',values)
})

</script>
