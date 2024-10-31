<script setup>
import {onMounted, computed} from 'vue';
import HomeSvg from '~/assets/home.svg';
import {useUserStore} from "~/stores/user-store";

useHead({
  title: 'Home',
})

const userStore = useUserStore();

const isRegistered = computed(() => userStore.isUserLoggedIn);

const continueWithoutRegister = () => {
  userStore.isUserLoggedIn = true;
};

onMounted(() => {
  const isLoggedIn = localStorage.getItem('is_user_logged_in');
  if (isLoggedIn === 'true') {
    userStore.isUserLoggedIn = true;
  }
});


</script>

<template>
  <div class="container mx-auto flex justify-center items-center p-4">
    <div class="shadow-md bg-white w-1/2 p-4 rounded-lg">
      <div v-if="!isRegistered">
        <div class="flex justify-center -mt-20">
          <HomeSvg class="h-[600px]" :fontControlled="false"/>
        </div>
        <h1>Para continuar usando, por favor
          <NuxtLink to="/register" class="font-bold text-purple-600">registre-se!</NuxtLink>
        </h1>
        <p>Ao se registrar, você terá acesso a recursos exclusivos e uma experiência personalizada.</p>
        <p>Caso deseje, é possível
          <span @click="continueWithoutRegister" class="font-bold text-purple-600 cursor-pointer">continuar como convidado!</span>
        </p>
      </div>
      <div v-else>


        <section class="bg-white dark:bg-gray-900">
          <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
            <h1
                class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
            >
              Investimos no potencial do mundo
            </h1>
            <p
                class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400"
            >
              Aqui na SUTHUB, focamos em mercados onde tecnologia, inovação e capital
              podem liberar valor a longo prazo e impulsionar o crescimento
              econômico.
            </p>
            <div
                class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 gap-4"
            >
              <a
                  @click.prevent="navigateTo('register')"
                  class="cursor-pointer inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center dark:text-white rounded-lg text-black bg-purple-400 transition-all ease-in-out delay-50 hover:bg-purple-500 focus:outline-none dark:focus:ring-blue-900"
              >
                Registrar-se
                <svg
                    class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                >
                  <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
              <a
                  @click.prevent="navigateTo('recipes')"
                  class="cursor-pointer inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center dark:text-white rounded-lg text-black bg-purple-400 transition-all ease-in-out delay-50 hover:bg-purple-500 focus:outline-none dark:focus:ring-blue-900"
              >
                Busca de Receitas
                <svg
                    class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                >
                  <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
              <a
                  @click.prevent="navigateTo('users')"
                  class="cursor-pointer inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center dark:text-white rounded-lg text-black bg-purple-400 transition-all ease-in-out delay-50 hover:bg-purple-500 focus:outline-none dark:focus:ring-blue-900"
              >
                Busca de Usuários
                <svg
                    class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                >
                  <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

