import { log } from "console";
import { navigateTo } from "nuxt/app";
import { FetchOptions } from "ofetch";
import { TokenDto } from "~/models/auth.model";
export class HttpClient {
  constructor(private options: FetchOptions) {}

  private optionRequestHandler: FetchOptions = {
    onRequest: (context) => {
      if (process.client) {
        const token = localStorage.getItem("token");
        if (token) {
          if (!context.options.headers) {
            context.options.headers = {} as Record<string, string>;
          }
          (
            context.options.headers as Record<string, string>
          ).authorization = `Bearer ${token}`;
        }
      }
    },
  };

  async call<T>(
    method: Uppercase<"get" | "post" | "put" | "delete" | "patch">,
    url: string,
    data?: object,
    query?: object,
    extras = {}
  ): Promise<T> {
    const option = {
      ...this.options,
      method: method,
      body: data,
      query,
      ...this.optionRequestHandler,
      ...extras,
    } as FetchOptions;
    const $res: T = await $fetch<T>(url, option).catch((error) => {
      // FetchError
      console.log(error.status); // throw error;
      if (error.status === 401) {
        if (process.client) {
          const refreshToken = localStorage.getItem("refresh-token");
          if (refreshToken) {
            return $fetch<TokenDto>("api/auth/refresh", {
              ...this.options,
              method: "post",
              body: { token: refreshToken },
            })
              .then((response) => {
                const token = response.token as string;
                localStorage.setItem("token", token);
                const jsonToken = JSON.parse(atob(token.split(".")[1]));
                localStorage.setItem("exp", jsonToken?.exp);
                return $fetch<T>(url, option);
              })
              .catch(() => {
                localStorage.clear();
                navigateTo("/admin-console/sign-in");
              });
          } else {
            localStorage.clear();
            navigateTo("/admin-console/sign-in");
          }
        }
      }
      throw error;
    });
    // localStorage.setItem('token', token);
    // const jsonToken = JSON.parse(atob(token.split('.')[1]))
    // localStorage.setItem('exp', jsonToken?.exp);
    // }

    return $res;
  }
}
