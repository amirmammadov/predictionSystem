import s from "../sass/shared/_sign.module.scss";

import { toastError } from "../constants";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { AuthActions } from "../services/auth";

import { useSearchParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const schema = z.object({
  password: z.string().min(8),
});

type FormData = z.infer<typeof schema>;

const ResetPasswordConfirm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [uid, setUid] = useState("");
  const [token, setToken] = useState("");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { resetPasswordConfirm } = AuthActions();

  useEffect(() => {
    if (searchParams.get("uid") && searchParams.get("token")) {
      setUid(searchParams.get("uid") as string);
      setToken(searchParams.get("token") as string);
    }
  }, [searchParams]);

  const onSubmit = async (data: FormData) => {
    try {
      await resetPasswordConfirm(data.password, token, uid).res();
      toastError("Password has been reset successfully.");
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toastError("Failed to reset password. Please try again.");
    }
  };
  return (
    <div className={s.signPage}>
      <div className={s.signSwapper}>
        <div className={s.signTitle}>Set new password</div>
        <form className={s.signForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={s.signFormItem}>
            <label htmlFor="password">New password</label>
            <input
              type="password"
              {...register("password")}
              id="password"
              placeholder="Enter your new password"
            />
            {errors.password && (
              <div className={s.formInputError}>{errors.password.message}</div>
            )}
          </div>
          <button type="submit" className={s.submitBtn}>
            Reset password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordConfirm;
