import s from "../sass/shared/_sign.module.scss";

import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className={s.signPage}>
      <div className={s.signSwapper}>
        <div className={s.signTitle}>Log in</div>
        <form className={s.signForm}>
          <div className={s.signFormItem}>
            <label htmlFor="email">Email address</label>
            <input type="email" id="email" placeholder="Your email" />
          </div>
          <div className={s.signFormItem}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Your password" />
            <Link to="#" className={s.resetPassword}>
              Forgot password?
            </Link>
          </div>
          <button type="submit" className={s.submitBtn}>
            Log in
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
