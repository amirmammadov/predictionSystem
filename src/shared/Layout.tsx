import s from "../sass/shared/_layout.module.scss";

import { Outlet } from "react-router-dom";

import Header from "../components/Header";

function Layout() {
  return (
    <>
      <Header />
      <main className={s.mainLayout}>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
