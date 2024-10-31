<script setup lang="ts">
import {onMounted} from "vue";
import {useUserStore} from "~/stores/user-store";

const userStore = useUserStore();
const router = useRouter()
const isLoggedIn = computed(() => userStore.isUserLoggedIn);

const logout = () =>{
  userStore.logout();

  router.push({path: '/'})
}

onMounted(() => {
  const isUserLoggedIn = localStorage.getItem('is_user_logged_in');
  if (isUserLoggedIn === 'true') {
    userStore.isUserLoggedIn = true;
  }
});
</script>

<template>
  <div class="h-16 flex items-center transition-all duration-300 bg-white m-2 rounded-md z-10">
    <div class="flex items-center w-80">
      <button class="mr-2 flex items-center justify-center w-10 h-10 rounded-full text-text-color">
        <i class="pi pi-bars text-xl"></i>
      </button>
      <NuxtLink to="/" class="flex items-center text-lg font-medium text-text-color">
        <img src="https://www.suthub.com/logo-suthub.png" alt="">
      </NuxtLink>
    </div>

    <div class="ml-auto flex gap-4 p-4">
      <div class="hidden lg:flex">
        <div class="flex gap-4">
          <button type="button"
                  class="flex items-center justify-start w-auto h-auto p-2 rounded-lg text-text-color hover:bg-surface-hover transition-all duration-300">
            <NuxtLink to="/register" exactActiveClass="font-bold">Registro</NuxtLink>
          </button>
          <button type="button"
                  class="flex items-center justify-start w-auto h-auto p-2 rounded-lg text-text-color hover:bg-surface-hover transition-all duration-300">
            <NuxtLink to="/recipes">Receitas</NuxtLink>
          </button>
          <button type="button"
                  class="flex items-center justify-start w-auto h-auto p-2 rounded-lg text-text-color hover:bg-surface-hover transition-all duration-300">
            <NuxtLink to="/users">Usuários</NuxtLink>
          </button>

          <button v-if="isLoggedIn" type="button"
                  @click.prevent="logout"
                  class="flex items-center justify-start w-auto h-auto p-2 rounded-lg text-text-color hover:bg-surface-hover transition-all duration-300">
            Deslogar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
