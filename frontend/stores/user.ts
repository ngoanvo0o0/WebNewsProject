import { UserSecretTokenDto } from "~/models/auth.model";
import { useNuxtApp } from "nuxt/app";
import { defineStore } from "pinia";
import { TOKEN_KEY, USER_KEY } from "~/constants/common.const";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: "",
    user: getUserInfo(),
  }),

  actions: {
    async signUp(credentials: {
      email: string;
      password: string;
      userType: string;
    }) {
      const { $api } = useNuxtApp();
      const { token, userInfo } = await $api.auth.signUp(credentials);
      this.token = token;
      this.user = userInfo;
      localStorage.setItem(USER_KEY, JSON.stringify(userInfo));
      localStorage.setItem(TOKEN_KEY, token)

    },
    async signIn(credentials: { email: string; password: string }) {
      const { $api } = useNuxtApp();
      const { token, userInfo } = await $api.auth.signIn(credentials);
      this.token = token;
      this.user = userInfo;
      localStorage.setItem(USER_KEY, JSON.stringify(userInfo));
      localStorage.setItem(TOKEN_KEY, token);
    },
    async signInWithToken(secretToken: UserSecretTokenDto) {
      const { $api } = useNuxtApp();
      const { token, userInfo } = await $api.auth.signInWithToken(secretToken);
      localStorage.setItem(USER_KEY, JSON.stringify(userInfo));
      localStorage.setItem(TOKEN_KEY, token);
    },
  },
});

const getUserInfo = () => {
  if (process.client) {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : {};
  }

  return {};
};
