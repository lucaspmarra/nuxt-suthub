<script setup>
import Index from "~/pages/index.vue";

provideHeadlessUseId(() => useId())
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>
