import { defineNuxtRouteMiddleware } from "#app";
import { navigateTo } from "nuxt/app";

export default defineNuxtRouteMiddleware((to, from) => {
  const regex = /^\/admin-console(?!\/sign-in)/;
  if (process.client && (to.path === "/" || regex.test(to.path))) {
    const TOKEN_KEY = "token";
    const token = localStorage.getItem(TOKEN_KEY);
    // const expToken = localStorage.getItem('exp')

    // && (Date.now() >= parseInt(expToken + '000'))
    // if (token && expToken ) {
    //   localStorage.clear()
    //   return navigateTo("/admin-console/sign-in");
    // }

    if (!token) {
      return navigateTo("/admin-console/sign-in");
    }
  }
});
