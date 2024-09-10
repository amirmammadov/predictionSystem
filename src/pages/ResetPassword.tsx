import s from "../sass/shared/_sign.module.scss";

import { toastError, toastSuccess } from "../constants";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { AuthActions } from "../services/auth";

const schema = z.object({
  email: z.string().email(),
});

type FormData = z.infer<typeof schema>;

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const { resetPassword } = AuthActions();

  const onSubmit = async (data: FormData) => {
    try {
      await resetPassword(data.email).res();
      toastSuccess("Password reset email sent. Please check your inbox.");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toastError("Failed to send password reset email. Please try again.");
    }
  };

  return (
    <div className={s.signPage}>
      <div className={s.signSwapper}>
        <div className={s.signTitle}>Reset password</div>
        <form className={s.signForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={s.signFormItem}>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              {...register("email", { required: true })}
              id="email"
              placeholder="Your email"
            />
            {errors.email && (
              <div className={s.formInputError}>{errors.email.message}</div>
            )}
          </div>
          <button type="submit" className={s.submitBtn}>
            Send reset email
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
