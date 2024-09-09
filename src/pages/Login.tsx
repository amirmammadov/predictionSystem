import { useEffect } from "react";

import s from "../sass/shared/_sign.module.scss";

import { Link } from "react-router-dom";

import { toastError } from "../constants";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (errors.root?.message) {
      toastError(errors.root.message);
    }
  }, [errors.root]);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((_, refect) => setTimeout(refect, 1000));
      console.log(data);
    } catch (error) {
      setError("root", {
        message: String(error),
      });
    } finally {
      reset();
    }
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
            <Link to="#" className={s.resetPassword}>
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
