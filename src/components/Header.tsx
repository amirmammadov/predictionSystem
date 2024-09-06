import s from "../sass/components/_header.module.scss";

import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className={s.header}>
      <a className={s.logo}>
        <img src="/assets/logo.png" alt="simple_co" className={s.logoImg} />
      </a>
      {isAuthenticated && <button className={s.logoutBtn}>Logout</button>}
    </header>
  );
};

export default Header;
