import { defineNuxtPlugin } from "nuxt/app";
import { AdminConsoleApi } from "~/api/admin-console.api";
import { AdvertisementApi } from "~/api/advertisement.api";
import { AuthApi } from "~/api/auth.api";
import { UploadApi } from "~/api/upload.api";

interface ApiInstances {
  auth: AuthApi;
  adminConsole: AdminConsoleApi,
  advertisement: AdvertisementApi,
  upload: UploadApi,
}

export default defineNuxtPlugin((nuxtApp) => {
  const fetchOptions = {
    baseURL: nuxtApp.$config.public.apiURL,
  };
  const apis: ApiInstances = {
    auth: new AuthApi(fetchOptions),
    adminConsole: new AdminConsoleApi(fetchOptions),
    advertisement: new AdvertisementApi(fetchOptions),
    upload: new UploadApi(fetchOptions)
  };

  return {
    provide: {
      api: apis,
    },
  };
});
