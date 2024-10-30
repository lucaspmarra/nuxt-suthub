<script setup lang="ts">
import {MapPinIcon} from '@heroicons/vue/20/solid'
import {useFormatDate} from "~/composables/formatDate";

const props = defineProps<{
  user?: IUser;
}>();

const {user} = toRefs(props);

const openMap = () => {
  const {lat, lng} = user?.value.address?.coordinates || {};
  if (lat && lng) {
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
  } else {
    console.error("Coordinates not available");
  }
};

const gender = computed(() => {
  if (!user?.value?.gender) return '';
  return user?.value.gender.charAt(0).toUpperCase() + user?.value.gender.slice(1);
})

</script>

<template>
  <div
      class="bg-gray-100 rounded-lg shadow-md overflow-hidden transition-all ease-in-out delay-150 hover:shadow-purple-300 hover:shadow-lg w-full flex flex-col justify-between"
  >
    <div>
      <img :src="user?.image" alt="User Photo" class="w-full h-48 object-cover"/>
      <div class="p-2">
        <h3 class="text-xl font-bold break-words">
          {{ user?.firstName }} {{ user?.lastName }}
        </h3>
        <p class="text-gray-600">{{ useFormatDate(user?.birthDate) }}</p>
        <p class="text-gray-600">{{ gender }}</p>
        <hr class="mt-2"/>
      </div>
    </div>
    <div class="flex justify-end p-2">
      <button
          @click="openMap()"
          class="bg-purple-300 text-black px-4 py-2 rounded transition-all ease-in-out delay-50 hover:bg-purple-400 focus:outline-none break-words flex items-center justify-center"
      >
        <MapPinIcon class="w-4 h-4 mr-2"/>
        Ver no mapa
      </button>
    </div>
  </div>
</template>
