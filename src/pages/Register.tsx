import s from "../sass/shared/_sign.module.scss";

import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className={s.signPage}>
      <div className={s.signSwapper}>
        <div className={s.signTitle}>Sign up</div>
        <form className={s.signForm}>
          <div className={s.signFormName}>
            <div className={s.signFormNameItem}>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" placeholder="Your name" />
            </div>
            <div className={s.signFormNameItem}>
              <label htmlFor="surname">Your surname</label>
              <input type="text" id="surname" placeholder="Your surname" />
            </div>
          </div>
          <div className={s.signFormItem}>
            <label htmlFor="email">Email address</label>
            <input type="email" id="email" placeholder="Your email" />
          </div>
          <div className={s.signFormItem}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Your password" />
          </div>
          <div className={s.signFormItem}>
            <label htmlFor="password">Confirm password</label>
            <input
              type="password"
              id="password"
              placeholder="Repeat password"
            />
          </div>
          <button type="submit" className={s.submitBtn}>
            Sign up
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
