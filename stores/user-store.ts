export const useUserStore = defineStore('user', {
    state: () => (
        {
            baseUrl: 'https://dummyjson.com/',
            user: {} as IUserRegister,
            users: [] as IUser[],
            isUserLoggedIn: false,
        }),
    getters: {
        user_info: (state) => state.user,
        users_list: (state) => state.users,
    },
    actions: {
        async createUser() {
            try {
                if (this.user_info.monthlyIncome) {
                    this.user_info.monthlyIncome = parseFloat(
                        this.user_info.monthlyIncome
                            .replace(/\./g, '')
                            .replace(',', '.')
                    );
                }

                const response: unknown = await $fetch(`${this.baseUrl}users/add`, {
                    method: 'POST',
                    body: this.user_info,
                });

                this.isUserLoggedIn = true;

                localStorage.setItem('is_user_logged_in', 'true');
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
        logout() {
            this.isUserLoggedIn = false;
            localStorage.removeItem('is_user_logged_in');
        }
    },
})