"use server";

import axios from "axios";
import { Deserializer } from "jsonapi-serializer";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import decamelizeKeys from "decamelize-keys";

type HttpOptions = {
    method?: "get" | "post" | "put" | "delete";
    skipDeserialization?: boolean
};

const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;
const LOCAL_TOKEN = process.env.NEXT_PUBLIC_USER_LOCAL_TOKEN;

const UNAUTHENTICATED = 401;
const UNAUTHORIZED = 403;

const http = <T>(url: string, body?: {}, options?: HttpOptions): Promise<T> => {
  const method = options?.method || "get";
  const skipDeserialization = options?.skipDeserialization || false;
  const cookieStore = cookies();
  const token = cookieStore.get("token") || { value: LOCAL_TOKEN };
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token?.value}`,
  };

  const data = decamelizeKeys(body || {});

  return Promise.resolve()
    .then(() => {
      return axios({
        baseURL: API_URL,
        url,
        method,
        headers,
        data,
      });
    })
    .then((response) => {
      if (skipDeserialization) {
        return response.data as T;
      }

      return new Deserializer({ keyForAttribute: "camelCase" }).deserialize(
        response.data
      ) as T;
    })
    .catch((error) => {
      if (
        error.response &&
                (error.response.status === UNAUTHENTICATED ||
                    error.response.status === UNAUTHORIZED)
      ) {
        return redirect("/not_authorized");
      }

      throw error;
    });
};

export const get = <T>(url: string, params?: any, options?: HttpOptions) => {
  return http<T>(url, params, { ...options, method: "get" });
};

export const post = <T>(url: string, body?: {}, options?: HttpOptions) => {
  return http<T>(url, body, { ...options, method: "post" });
};

export const put = <T>(url: string, body?: {}, options?: HttpOptions) => {
  return http<T>(url, body, { ...options, method: "put" });
};

export const del = <T>(url: string, options?: HttpOptions) => {
  return http<T>(url, {}, { ...options, method: "delete" });
};
