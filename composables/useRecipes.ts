import {useRecipesStore} from '~/stores/recipe-store';

export const useRecipesHandler = () => {
    const store = useRecipesStore()

    const getAllRecipes = () => {
        try {
            store.getRecipes().then(() => true);
        } catch (e) {
            console.log(e)
        }
    }

    const getAllTags = () => {
        try {
            store.getRecipesTag().then(() => true);
        } catch (e) {
            console.log(e)
        }
    }

    const getRecipesTagged = (tag) => {
        console.log('💠 getRecipesTagged called with: ', tag)
        try {
            store.getRecipesByTag(tag).then(() => true);
        } catch (e) {
            console.log(e)
        }
    }

    return {
        getAllRecipes,
        getAllTags,
        getRecipesTagged
    }
}