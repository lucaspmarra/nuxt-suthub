<script>
export default {
  props: {
    recipe: {
      type: Object,
      required: true,
      default: () => ({
        id: null,
        name: '',
        image: '',
        tags: [],
        ingredients: [],
        instructions: [],
        servings: 1,
      }),
    },
  },
};
</script>

<template>
  <div class="flex flex-row">
    <div class="w-1/6">
      <img class="w-full rounded-lg shadow-md transition duration-500 ease-out transform hover:scale-[300%] cursor-zoom-in"
           :src="recipe.image" :alt="recipe.name"/>
    </div>
    <div class="w-2/3 pl-6">
      <div class="px-6">
        <div class="font-bold text-xl mb-2">{{ recipe.name }}</div>
        <p class="text-gray-700 text-base">
          Tags: <span class="font-semibold">{{ recipe.tags.join(', ') }}</span>
        </p>

        <p class="text-gray-700 text-base">
          Porções:
          <span class="text-2xl">
            <span v-for="i in recipe.servings" :key="i">🥗</span>
          </span>
        </p>

        <h3 class="font-semibold mt-4">Ingredientes:</h3>
        <ul class="list-disc list-inside">
          <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
            {{ ingredient }}
          </li>
        </ul>

        <h3 class="font-semibold mt-4">Instruções:</h3>
        <ol class="list-decimal list-inside">
          <li v-for="(instruction, index) in recipe.instructions" :key="index">
            {{ instruction }}
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>