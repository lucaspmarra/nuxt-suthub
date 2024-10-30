<script setup>
import {ref, computed, onMounted, watch} from 'vue'
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue'
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/vue/20/solid'
import {useRecipesHandler} from '~/composables/useRecipes'
import {useRecipesStore} from '~/stores/recipe-store'
import RecipeInfo from "~/components/recipeInfo.vue";
import {InformationCircleIcon} from '@heroicons/vue/24/outline';

const recipeStore = useRecipesStore()
const {getAllTags, getRecipesTagged} = useRecipesHandler()

const tags = computed(() => recipeStore.recipes_tag || [])
const recipes = computed(() => recipeStore.recipes_tagged || [])
const recipesLoading = ref(false)
const tagSelected = ref([])
const recipeSelected = ref(null)

const tagQuery = ref('')
const recipeQuery = ref('')


const filteredTags = computed(() =>
    tagQuery.value === ''
        ? tags.value
        : tags.value.filter(tag =>
            tag.toLowerCase().replace(/\s+/g, '').includes(tagQuery.value.toLowerCase().replace(/\s+/g, ''))
        )
)

const filteredRecipes = computed(() =>
    recipeQuery.value === ''
        ? recipes?.value
        : recipes?.value.filter(recipe =>
            recipe.name.toLowerCase().replace(/\s+/g, '').includes(recipeQuery.value.toLowerCase().replace(/\s+/g, ''))
        )
)

const getRecipesUsingTag = async (tags) => {
  try {
    recipesLoading.value = true;
    const receitasDaTag = await getRecipesTagged(tags);
    console.log(receitasDaTag)
  } catch (e) {
    console.log(e)
  } finally {
    setTimeout(() => {
      recipesLoading.value = false;
    }, 2000)

  }

}

watch(tagSelected, async (value) => {
  console.log('Tags selecionadas:', value);
  recipeSelected.value = null;
  recipes.value = [];

  if (value.length === 0) {
    // do nothing
  } else {

    await getRecipesUsingTag(value);
  }
});

onMounted(async () => {
  await getAllTags()
})
</script>

<template>
  <main class="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-3xl bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-8 text-gray-900">Receitas</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="tags">Categorias</label>
          <Combobox id="tags" v-model="tagSelected" multiple>
            <div class="relative mt-1">
              <div
                  class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
              >
                <ComboboxInput
                    class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                    :displayValue="tag => tag || ''"
                    @input="tagQuery = $event.target.value"
                />
                <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true"/>
                </ComboboxButton>
              </div>
              <TransitionRoot
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  @after-leave="tagQuery = ''"
              >
                <ComboboxOptions
                    class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                >
                  <div
                      v-if="filteredTags.length === 0 && tagQuery !== ''"
                      class="relative cursor-default select-none px-4 py-2 text-gray-700"
                  >
                    Nothing found.
                  </div>

                  <ComboboxOption
                      v-for="tag in filteredTags"
                      as="template"
                      :key="tag"
                      :value="tag"
                      v-slot="{ selected, active }"
                  >
                    <li
                        class="relative cursor-default select-none py-2 pl-10 pr-4"
                        :class="{ 'bg-teal-600 text-white': active, 'text-gray-900': !active }"
                    >
                  <span
                      class="block truncate"
                      :class="{ 'font-medium': selected, 'font-normal': !selected }"
                  >
                    {{ tag }}
                  </span>
                      <span
                          v-if="selected"
                          class="absolute inset-y-0 left-0 flex items-center pl-3"
                          :class="{ 'text-white': active, 'text-teal-600': !active }"
                      >
                    <CheckIcon class="h-5 w-5" aria-hidden="true"/>
                  </span>
                    </li>
                  </ComboboxOption>
                </ComboboxOptions>
              </TransitionRoot>
            </div>
          </Combobox>
        </div>
        <div>
          <label for="tags">Receitas</label>
          <Combobox id="tags" v-model="recipeSelected">
            <div class="relative mt-1">
              <div
                  class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
              >
                <ComboboxInput
                    class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                    :displayValue="(recipe) => recipe ? recipe.name : ''"
                    @input="recipeQuery = $event.target.value"
                />
                <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true"/>
                </ComboboxButton>
              </div>
              <TransitionRoot
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  @after-leave="recipeQuery = ''"
              >
                <ComboboxOptions
                    class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                >
                  <div
                      v-if="filteredRecipes.length === 0 && recipeQuery !== ''"
                      class="relative cursor-default select-none px-4 py-2 text-gray-700"
                  >
                    Nothing found.
                  </div>

                  <ComboboxOption
                      v-for="recipe in filteredRecipes"
                      as="template"
                      :key="recipe.id"
                      :value="recipe"
                      v-slot="{ selected, active }"
                  >
                    <li
                        class="relative cursor-default select-none py-2 pl-10 pr-4"
                        :class="{ 'bg-teal-600 text-white': active, 'text-gray-900': !active }"
                    >
                  <span
                      class="block truncate"
                      :class="{ 'font-medium': selected, 'font-normal': !selected }"
                  >
                    {{ recipe.name }}
                  </span>
                      <span
                          v-if="selected"
                          class="absolute inset-y-0 left-0 flex items-center pl-3"
                          :class="{ 'text-white': active, 'text-teal-600': !active }"
                      >
                    <CheckIcon class="h-5 w-5" aria-hidden="true"/>
                  </span>
                    </li>
                  </ComboboxOption>
                </ComboboxOptions>
              </TransitionRoot>
            </div>
          </Combobox>
        </div>
      </div>
      <div class="flex flex-col items-center justify-center min-h-[200px]">
        <div v-if="!tagSelected.length" class="flex items-center space-x-2 text-gray-600">
          <InformationCircleIcon class="h-6 w-6 text-blue-500"/>
          <p>Por favor, selecione uma categoria.</p>
        </div>
        <div v-else-if="!recipes.length" class="flex items-center space-x-2 text-gray-600">
          <InformationCircleIcon class="h-6 w-6 text-blue-500"/>
          <p>Nenhuma receita encontrada para esta categoria.</p>
        </div>
        <div v-else-if="!recipeSelected" class="flex items-center space-x-2 text-gray-600">
          <InformationCircleIcon class="h-6 w-6 text-blue-500"/>
          <p>Por favor, selecione uma receita.</p>
        </div>
        <div v-else class="mt-6">
          <RecipeInfo :recipe="recipeSelected"/>
        </div>
      </div>
    </div>
  </main>
</template>
