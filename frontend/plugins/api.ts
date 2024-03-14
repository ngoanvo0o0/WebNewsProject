import { defineNuxtPlugin } from "nuxt/app";
import { AdminConsoleApi } from "~/api/admin-console.api";
import { AuthApi } from "~/api/auth.api";

interface ApiInstances {
  auth: AuthApi;
  adminConsole: AdminConsoleApi,
}

export default defineNuxtPlugin((nuxtApp) => {
  const fetchOptions = {
    baseURL: nuxtApp.$config.public.apiURL,
  };
  const apis: ApiInstances = {
    auth: new AuthApi(fetchOptions),
    adminConsole: new AdminConsoleApi(fetchOptions),
  };

  return {
    provide: {
      api: apis,
    },
  };
});
