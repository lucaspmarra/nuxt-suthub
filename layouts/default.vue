<script setup lang="ts">


import AppTopBar from "~/layouts/components/AppTopBar.vue";
</script>

<template>
  <div class="bg-gradient-to-r from-purple-300 to-pink-300 min-h-screen flex flex-col">
    <AppTopBar/>
    <div class="flex-1">
      <slot/>
    </div>
  </div>
</template>
