<script setup lang="ts">
definePageMeta({
  layout: 'register'
})

useHead({
  title: 'Register',
})

</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen overflow-hidden">
    <div class="p-1 md:p-1 w-full max-w-3xl"> <RegisterComponent/>
    </div>
    <div class="flex items-center justify-center">
      <NuxtLink to="/">Voltar para o ínicio</NuxtLink>
    </div>
  </div>
</template>