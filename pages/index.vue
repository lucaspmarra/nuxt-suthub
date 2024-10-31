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
        <h1>Opções de Navegação</h1>
        <ul>
          <li>
            <NuxtLink to="/register">Registro</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/recipes">Receitas</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/users">Usuários</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import HomeSvg from '~/assets/home.svg';

const isRegistered = ref(false);

const continueWithoutRegister = () => {
  isRegistered.value = true;
};
</script>
