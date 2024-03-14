import { defineNuxtPlugin } from "#app";
import * as vt from "vue-toastification";
import "vue-toastification/dist/index.css";
import * as Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

import '@vuepic/vue-datepicker/dist/main.css'


import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(vt.default);

  return {
    provide: {
      toast: vt.useToast(),
      loading:  Loading.useLoading({ color: "#4f46e5", loader: "bars" }),
    },
  };
});
