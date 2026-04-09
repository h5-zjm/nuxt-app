<template>
  <div>222222</div>
</template>
<script setup lang="ts">
import {z} from 'zod'
const mySchema = z.string('').min(5)
const result=mySchema.safeParse('12')
console.log(result)
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})
type LoginData=z.infer<typeof loginSchema>
</script>
