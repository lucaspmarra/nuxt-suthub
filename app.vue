<script setup>
provideHeadlessUseId(() => useId())

useSeoMeta({
  title: 'My Amazing SUTHUB Project',
  ogTitle: 'My Amazing SUTHUB Project',
  description: 'This website was created for an opportunity at SUTHUB.',
  ogDescription: 'This website was created for an opportunity at SUTHUB.',
});
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>
