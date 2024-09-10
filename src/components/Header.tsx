import s from "../sass/components/_header.module.scss";

import { useNavigate } from "react-router-dom";

import { AuthActions } from "../services/auth";

const Header = () => {
  const { getToken, logout, removeTokens } = AuthActions();

  const token = getToken("access");

  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
      .res(() => {
        removeTokens();

        navigate("/login");
      })
      .catch(() => {
        removeTokens();
        navigate("/login");
      });
  };

  return (
    <header className={s.header}>
      <a className={s.logo}>
        <img src="/assets/logo.png" alt="simple_co" className={s.logoImg} />
      </a>
      {token && (
        <button className={s.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
