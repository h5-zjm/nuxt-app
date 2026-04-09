<template>
  <div>
    <div class="flex justify-between">
      <form class="flex" @submit.prevent="onSubmit">
        <UInput v-model="keyword" v-bind="keywordAttrs" :color="errors.keyword?'red':'gray'"/>
        <UButton type="submit" class="ml-2">搜索</UButton>
        <UButton v-if="searchText" type="button" class="ml-2" color="white" @click="onClear">清除</UButton>
      </form>
      <div>
        <UButton to="/users/create" color="white" variant="solid">创建新用户</UButton>
      </div>
    </div>
    <UTable :rows="usersData" :columns="columns" :loading="pending" v-model:sort="sort" sort-mode="manual">
      <template #disabled-data="{row}">
        <UToggle v-model="row.disabled" @update:modelValue="(disabled:boolean)=>toggleDisabled(disabled,row._id)"></UToggle>
      </template>
      <template #edit-data="{row}">
        <UButton :to="'/users/'+row._id">编辑</UButton>
      </template>
    </UTable>
    <div class="flex justify-end">
      <UPagination v-model="currentPage" :page-count="pageCount" :total="data?.total" />
    </div>

  </div>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'
import {z} from 'zod'
import {useForm} from 'vee-validate'
import {toTypedSchema} from '@vee-validate/zod'
const currentPage=ref(1)
const pageCount=ref(2)
const sort=ref({
  column:'createdAt',
  direction:'desc'
})

const searchText=ref('')
const schema=z.object({
  keyword:z.string().min(1)
})
const {handleSubmit,defineField,errors}=useForm(
    {
      validationSchema:toTypedSchema(schema)
    }
)
const onSubmit=handleSubmit((value)=>{
  console.log(value)
  currentPage.value=1
  searchText.value=value.keyword
  console.log(searchText.value)
})
const [keyword,keywordAttrs] = defineField('keyword')
const onClear=()=>{
  keyword.value=''
  searchText.value=''
  currentPage.value=1
}
const {data,pending,refresh}=await useFetch('/api/users',{
  query:{
    orderBy:computed(()=>sort.value.column),
    currentPage:currentPage,
    pageSize:pageCount,
    order:computed(()=>sort.value.direction),
    keyword:searchText
  }
})
const usersData=computed(()=>data.value?.data?.map(user=>({
  ...user,
  createdAt:dayjs(user.createdAt).format('YYYY-MM-DD HH:mm'),
  updateAt:dayjs(user.updateAt).format('YYYY-MM-DD HH:mm')
}))||[])
const toggleDisabled=async (disabled:boolean,id:string)=>{
  await $fetch(`/api/users/${id}`,{
    method:'PATCH',
    body:{disabled}
  })
  await refresh()
}
const columns = [{
  key: '_id',
  label: 'ID'
}, {
  key: 'username',
  label: 'User name'
}, {
  key: 'nickName',
  label: 'nickname'
}, {
  key: 'type',
  label: 'type'
}, {
  key: 'role',
  label: 'role',
},{
  key: 'createdAt',
  label: 'createdAt',
  sortable:true,
},
  {
    key: 'updateAt',
    label: 'updateAt',
    sortable:true,
  },
  {
    key:'disabled',
    label: 'disabled',
  },
  {
    key:'edit',
    label: '编辑',
  }
]
</script>
<style scoped></style>
