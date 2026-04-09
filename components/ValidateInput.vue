<template>
  <div>
    <label class="block text-sm font-medium text-gray-900">{{name}}</label>
    <input class="mt-1 w-full resize-none rounded-lg border-gray-300 focus:border-indigo-500 focus:outline-none" :id="name" :placeholder="placeholder" :type="type" :value="value" @input="handleChange" @blur="handleChange"/>
    <span class="text-red-500 text-xs italic" v-if="errorMessage">{{errorMessage}}</span>
  </div>
</template>
<script setup lang="ts">
import {useField} from "vee-validate";
interface IProps {
  name: string,
  placeholder?:string,
  type?:string
}
const props=defineProps<IProps>()
const {value,errorMessage,handleChange}=useField(()=>props.name)
</script>
