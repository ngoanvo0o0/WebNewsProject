import { defineNuxtRouteMiddleware } from "#app";
import { navigateTo } from "nuxt/app";

export default defineNuxtRouteMiddleware(() => {
  if (process.client) {
    const TOKEN_KEY = "token";
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      return navigateTo("/sign-in");
    }
  }
});
