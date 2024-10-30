export const useUserStore = defineStore('user', {
    state: () => (
        {
            baseUrl: 'https://dummyjson.com/',
            user: {}
        }),
    getters: {
        userInfo: (state) => state.user,
    },
    actions: {
        async createUser() {
            console.log('💠 createUser called...');
            console.log('❗ user info...', this.userInfo);

            try {
                const response = await $fetch(`${this.baseUrl}users/add`, {
                    method: 'POST',
                    body: this.userInfo,
                });
                console.log(response);
                return response;
            } catch (error) {
                console.error('⚠️ Error creating user:', error);
                throw error;
            }
        },
    },
})