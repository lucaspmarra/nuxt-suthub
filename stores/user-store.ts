export const useUserStore = defineStore('user', {
    state: () => (
        {
            baseUrl: 'https://dummyjson.com/',
            user: {} as IUser,
            users: [] as IUser[],
        }),
    getters: {
        user_info: (state) => state.user,
        users_list: (state) => state.users,
    },
    actions: {
        async createUser() {
            console.log('💠 createUser called...');
            console.log('❗ user info...', this.user_info);

            try {
                const response: unknown = await $fetch(`${this.baseUrl}users/add`, {
                    method: 'POST',
                    body: this.user_info,
                });
                console.log(response);
                return response;
            } catch (error) {
                console.error('⚠️ Error creating user:', error);
                throw error;
            }
        },
        async getAllUsers(name?: string) {
            console.log('💠 getAllUsers called...');
            console.log(name)


            try {
                const url = name
                    ? `${this.baseUrl}users/search?q=${encodeURIComponent(name)}`
                    : `${this.baseUrl}users`;

                const response: IUserResponse = await $fetch(url);
                console.log(response);

                this.users = response.users;

                return response;
            } catch (error) {
                console.error('⚠️ Error fetching users:', error);
                throw error;
            }
        },

    },
})