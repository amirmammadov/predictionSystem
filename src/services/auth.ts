import wretch from "wretch";
import Cookies from "js-cookie";

import { API } from "../constants";

const api = wretch(API).accept("application/json");

const storeToken = (token: string, type: "access" | "refresh") => {
  Cookies.set(type + "Token", token);
};

const getToken = (type: string) => {
  return Cookies.get(type + "Token");
};

const removeTokens = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
};


const register = (
  first_name: string,
  last_name: string,
  custom_email: string,
  password: string
) => {
  return api.post(
    { first_name, last_name, custom_email, password },
    "/auth/users/"
  );
};

const login = (email: string, password: string) => {
  return api.post({ custom_email: email, password }, "/auth/jwt/create");
};

const logout = () => {
  const refreshToken = getToken("refresh");
  return api.post({ refresh: refreshToken }, "/auth/logout/");
};

const handleJWTRefresh = () => {
  const refreshToken = getToken("refresh");
  return api.post({ refresh: refreshToken }, "/auth/jwt/refresh");
};


const resetPassword = (custom_email: string) => {
  return api.post({ custom_email }, "/auth/users/reset_password/");
};

const resetPasswordConfirm = (
  new_password: string,
  token: string,
  uid: string
) => {
  return api.post(
    { uid, token, new_password },
    "/auth/users/reset_password_confirm/"
  );
};

export const AuthActions = () => {
  return {
    login,
    resetPasswordConfirm,
    handleJWTRefresh,
    register,
    resetPassword,
    storeToken,
    getToken,
    logout,
    removeTokens,
  };
};
