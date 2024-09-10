import wretch, { Wretch, WretchError } from "wretch";
import { AuthActions } from "./auth";

import { API } from "../constants";

const { handleJWTRefresh, storeToken, getToken } = AuthActions();

const api = () => {
  return wretch(API)
    .auth(`Bearer ${getToken("access")}`)
    .catcher(401, async (_error: WretchError, request: Wretch) => {
      try {
        const { access } = (await handleJWTRefresh().json()) as {
          access: string;
        };

        storeToken(access, "access");

        return request
          .auth(`Bearer ${access}`)
          .fetch()
          .unauthorized(() => {
            window.location.replace("/");
          })
          .json();
      } catch (err) {
        window.location.replace("/");
        console.log(err);
      }
    });
};

export const fetcher = (url: string): Promise<unknown> => {
  return api().get(url).json();
};
