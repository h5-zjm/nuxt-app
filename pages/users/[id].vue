<template>
  <div class="w-full">
    <div class="w-1/2 mx-auto p-5">
      <UForm ref="form" :schema="userCreateShema" :state="filterData" @submit="onSubmit">
          <template v-for="{as,label,name,belongsTo,...attrs} in fields">
            <UFormGroup class="mb-3" :label="label" :name="name" v-if="!belongsTo||(belongsTo&&userData[belongsTo.key]===belongsTo.value)">
              <component :is="as" v-model="userData[name]" v-bind="attrs"/>
            </UFormGroup>
          </template>
        <UButton type="submit" :loading="isLoading">提交</UButton>
      </UForm>

    </div>
  </div>
  <UModal v-model="isOpen" :ui="{width:'w-60'}">
    <div class="p-4 text-center">
      <h2 class="font-semibold text-lg my-2">用户创建成功</h2>
      <p class="text-sm text-gray-700 mb-7">选择下一步进行的操作</p>
      <div class="my-2">
        <UButton class="w-full block mb-2" color="white" variant="solid" to="/users">
          回到列表
        </UButton>
        <UButton class="w-full block" @click="reCreate">再次创建</UButton>
      </div>
    </div>
  </UModal>
</template>
<script setup>
import {UInput,USelect,UToggle} from "#components";
import {z} from "zod";
const initUserData={
  username:'',
  nickName:'',
  type:'email',
  disabled:false,
  email:'',
  password:'',
  phoneNumber:'',
  oauthID:'',provider:'',
  picture:'',
  role:'normal'
}
const userData=ref({
  ...initUserData
})
const isOpen=ref(false);
const isLoading=ref(false);
const route=useRoute()
const form=ref()
    const userId=route.params.id;
const isCreatingMode=userId==='create'
const fields=[
  {
    label:'用户名',
    name:'username',
    as:UInput
  },
  {
    label:'昵称',
    name:'nickName',
    as:UInput
  },
  {
    label:'注册方式',
    name:'type',
    as:USelect,
    options:[
        { label:'Email',value:'email'},
        { label:'Cellphone',value:'cellphone'},
        { label:'Oauth2',value:'Oauth2'}
    ],
    onChange:(e)=>{
      userData.value.email=''
      userData.value.password=''
      userData.value.phoneNumber=''
      userData.value.provider=''
      userData.value.oauthID=''
    }
  },
  {
    label:'email',
    name:'email',
    as:UInput,
    belongsTo:{
      key:'type',value:'email',
    }
  },
  {
    label:'Password',
    name:'password',
    as:UInput,
    belongsTo:{
      key:'type',value:'email',
    },
    type:'password',
  },
  {
    label:'电话',
    name:'phoneNumber',
    as:UInput,
    belongsTo:{
      key:'type',value:'cellphone',
    },
  },
  {
    label:'oauth Provide',
    name:'provider',
    as:USelect,
    options:[
      { label:'github',value:'github'},
      { label:'gitee',value:'gitee'},
    ],
    belongsTo:{
      key:'type',value:'Oauth2',
    },
  },
  {
    label:'oauthId',
    name:'oauthID',
    as:UInput,
    belongsTo:{
      key:'type',value:'Oauth2',
    },
  },
  {
    label:'disabled',
    name:'disabled',
    as:UToggle
  },
  // {
  //   label:'upload',
  //   name:'picture',
  //   as:FileUploader,
  //   action:'/api/upload',
  // },
  {
    label:'角色',
    name:'role',
    as:USelect,
    options:[
      { label:'普通用户',value:'normal'},
      { label:'管理员',value:'admin'},
    ],
  },
]
const userCreateShema=z.object({
  username:z.string().min(3),
  nickName:z.string(),
  type:z.enum(['email','cellphone','Oauth2']),
  disabled:z.boolean().optional(),
  phoneNumber:z.string().refine((value)=>/^1[3-9]\d{9}$/.test(value),'手机号码格式错误').optional(),
  email:z.string().email().optional(),
  password:z.string().min(6).optional(),
  provider:z.enum(['gitee', 'github']).optional(),
  oauthID:z.string().optional(),
  role:z.string().optional(),
})
const filterData=computed(()=>removeEmpty(userData.value))
const removeEmpty=(obj)=>Object.fromEntries(Object.entries(obj).filter(([_,v])=>v!==''&&v!==undefined&&v!==null))
const onSubmit=async (event)=>{
  form.value.clear()
  console.log(removeEmpty(userData.value))
  isLoading.value=true
  try {
    if(isCreatingMode){
      await $fetch('/api/users', {method:'POST',body:event.data})
    }else{
      await $fetch(`/api/users/${userId}?mode=updateUser`, {method:'PATCH',body:event.data})
    }
    isOpen.value=true
  }catch(err){
    if(err.statusCode==409){
      form.value.setErrors({
        path:'username',
        message:err.data.statusMessage,
      })
    }
  }finally{
    isLoading.value=false
  }
}
const reCreate=()=>{
  isOpen.value=false
  Object.assign(userData.value,initUserData)
}
const getUserData=async ()=>{
  const {data}=await useFetch(`/api/users/${userId}`)
  Object.assign(userData.value,data.value)
}
onMounted(()=>{
  if(!isCreatingMode){
    getUserData()
  }
})
</script>
