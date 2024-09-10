import { useEffect } from "react";

import s from "../sass/shared/_sign.module.scss";

import { Link } from "react-router-dom";

import { toastError, toastSuccess } from "../constants";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { useNavigate } from "react-router-dom";

import { AuthActions } from "../services/auth";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof schema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { login, storeToken } = AuthActions();

  const navigate = useNavigate();

  useEffect(() => {
    if (errors.root?.message) {
      toastError(errors.root.message);
    }
  }, [errors.root]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    login(data.email, data.password)
      .json((json) => {
        storeToken(json.access, "access");
        storeToken(json.refresh, "refresh");

        toastSuccess("You've logged in!");
        navigate("/");
      })
      .catch((error) => {
        setError("root", { type: "manual", message: error.json.detail });
      });

    reset();
  };

  return (
    <div className={s.signPage}>
      <div className={s.signSwapper}>
        <div className={s.signTitle}>Log in</div>
        <form className={s.signForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={s.signFormItem}>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              {...register("email")}
              id="email"
              placeholder="Your email"
            />
            {errors.email && (
              <div className={s.formInputError}>{errors.email.message}</div>
            )}
          </div>
          <div className={s.signFormItem}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              {...register("password")}
              id="password"
              placeholder="Your password"
            />
            {errors.password && (
              <div className={s.formInputError}>{errors.password.message}</div>
            )}
            <Link to="/reset-password" className={s.resetPassword}>
              Forgot password?
            </Link>
          </div>
          <button type="submit" disabled={isSubmitting} className={s.submitBtn}>
            {isSubmitting ? "Loggin in..." : "Log in"}
          </button>
        </form>
        <div className={s.signSwitch}>
          Don't have an account?{" "}
          <Link to="/register" className={s.signSwitchLink}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
