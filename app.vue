<script setup>
provideHeadlessUseId(() => useId())
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>
