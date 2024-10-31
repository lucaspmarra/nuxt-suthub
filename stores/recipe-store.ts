export const useRecipesStore = defineStore('recipes', {
    state: () => (
        {
            baseUrl: 'https://dummyjson.com',
            recipes: [],
            recipesByTag: [],
            tags: [],
        }),
    getters: {
        recipes_list: (state) => state.recipes,
        recipes_tagged: (state) => state.recipesByTag,
        recipes_tag: (state) => state.tags,
    },
    actions: {
        async getRecipesTag() {
            try {
                const response = await $fetch(`${this.baseUrl}/recipes/tags`);
                this.tags = response;

                return response;
            } catch (error) {
                console.error('⚠️ Error getting tags:', error);
                throw error;
            }
        },
        async getRecipes() {
            try {
                const response = await $fetch(`${this.baseUrl}/recipes`, {
                    method: 'GET',
                });
                this.recipes = response.recipes;

                return response;
            } catch (error) {
                console.error('⚠️ Error getting recipes:', error);
                throw error;
            }
        },
        async getRecipesByTag(tag) {
            try {
                const response = await $fetch(`${this.baseUrl}/recipes/tag/${tag}`, {
                    method: 'GET',
                });
                this.recipesByTag = response.recipes;

                return response;
            } catch (error) {
                console.error('⚠️ Error getting recipes:', error);
                throw error;
            }
        },
    },
})