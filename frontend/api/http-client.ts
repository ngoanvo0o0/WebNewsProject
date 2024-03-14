import { FetchOptions } from "ofetch";
export class HttpClient {
  constructor(private options: FetchOptions) {}

  async call<T>(
    method: Uppercase<"get" | "post" | "put" | "delete" | "patch">,
    url: string,
    data?: object,
    extras = {}
  ): Promise<T> {
    const option = {
      ...this.options,
      method: method,
      body: data,
      ...extras,
    };
    if (process.client) {
      const token = localStorage.getItem("token");
      if (token) {
        if (!option.headers) {
          option.headers = {} as Record<string, string>;
        }
        (
          option.headers as Record<string, string>
        ).authorization = `Bearer ${token}`;
      }
    }
    const $res: T = await $fetch<T>(url, option).catch((error) => {
      throw error;
    });
    return $res;
  }
}
