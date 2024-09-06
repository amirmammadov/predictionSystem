import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <header>
        <div>header</div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
