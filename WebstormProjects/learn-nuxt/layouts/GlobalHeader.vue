<script setup lang="ts">
import {useUserCurrentInfo} from "~/composables/useUserCurrentInfo";
const currentUser=useUserCurrentInfo()
const items=[
  [
    {
      label: currentUser.value.data?.username,
      avatar: {
        src: 'https://avatars.githubusercontent.com/u/739984?v=4'
      }
    }
  ],[
    {
      label: '编辑个人资料',
      icon: 'i-heroicons-pencil-square-20-solid',
      shortcuts: ['E'],
      click: () => {
        console.log('Edit')
      }
    },
    {
      label: '退出登录',
      icon: 'i-heroicons-arrow-left-on-rectangle-20-solid',
      shortcuts: ['D'],
      click: () => {
        console.log('Edit')
      }
    }
  ]
]
</script>

<template>
  <header>
    <nav>
      <ul class="flex justify-between px-3 py-3 pb-3 border-b border-slate-100">
        <li>
          <nuxt-link to="/">Home</nuxt-link>
        </li>
        <li>
          <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
            <UAvatar
                size="sm"
                src="https://avatars.githubusercontent.com/u/739984?v=4"
                alt="Avatar"
            />
          </UDropdown>
        </li>
      </ul>
    </nav>

  </header>
</template>

<style scoped>

</style>
