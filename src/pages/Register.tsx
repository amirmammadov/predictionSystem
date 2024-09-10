import { useEffect } from "react";

import s from "../sass/shared/_sign.module.scss";

import { Link } from "react-router-dom";

import { toastError, toastSuccess } from "../constants";

import { AuthActions } from "../services/auth";

import { useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

type FormData = z.infer<typeof schema>;

const Register = () => {
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

  const { register: registerUser } = AuthActions();

  const navigate = useNavigate();

  useEffect(() => {
    if (errors.root?.message) {
      // toastError(errors.root.message);
      toastError("User already exists!");
    }
  }, [errors.root]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    registerUser(data.firstName, data.lastName, data.email, data.password)
      .json(() => {
        toastSuccess("You've signed up!");

        navigate("/");
      })
      .catch((error) => {
        setError("root", {
          type: "manual",
          message: error.json,
        });
      });

    reset();
  };

  return (
    <div className={s.signPage}>
      <div className={s.signSwapper}>
        <div className={s.signTitle}>Sign up</div>
        <form className={s.signForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={s.signFormName}>
            <div className={s.signFormNameItem}>
              <label htmlFor="name">Your name</label>
              <input
                type="text"
                {...register("firstName")}
                id="name"
                placeholder="Your name"
                className={`${errors.firstName && s.nameInputError}`}
              />
            </div>
            <div className={s.signFormNameItem}>
              <label htmlFor="surname">Your surname</label>
              <input
                type="text"
                {...register("lastName")}
                id="surname"
                placeholder="Your surname"
                className={`${errors.lastName && s.nameInputError}`}
              />
            </div>
          </div>
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
          </div>
          <div className={s.signFormItem}>
            <label htmlFor="password">Confirm password</label>
            <input
              type="password"
              {...register("confirmPassword")}
              id="password"
              placeholder="Repeat password"
            />
            {errors.confirmPassword && (
              <div className={s.formInputError}>
                {errors.confirmPassword.message}
              </div>
            )}
          </div>
          <button type="submit" disabled={isSubmitting} className={s.submitBtn}>
            {isSubmitting ? "Signing up..." : "Sign up"}
          </button>
        </form>
        <div className={s.signSwitch}>
          Already have an account?{" "}
          <Link to="/login" className={s.signSwitchLink}>
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
