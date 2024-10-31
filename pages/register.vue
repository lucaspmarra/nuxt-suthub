<script setup lang="ts">
definePageMeta({
  layout: 'register'
})

useHead({
  title: 'Register',
})

</script>

<template>
  <div>
    <RegisterComponent/>
    <div
        class="flex items-center justify-center">
      <NuxtLink to="/">Voltar para o ínicio</NuxtLink>
    </div>
  </div>
</template>
