import { NavLink, Outlet } from "react-router-dom";
import "./Layout.css";

/** Felles layout med navigasjon mellom skjermbilder. */
export function Layout() {
  return (
    <div className="layout">
      <a href="#main-content" className="layout__skip">
        Hopp til innhold
      </a>
      <nav className="layout__nav" aria-label="Hovedmeny">
        <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : undefined)}>
          Spill
        </NavLink>
        <NavLink to="/regler" className={({ isActive }) => (isActive ? "active" : undefined)}>
          Regler
        </NavLink>
        <NavLink to="/spillere" className={({ isActive }) => (isActive ? "active" : undefined)}>
          Spillere
        </NavLink>
      </nav>
      <main id="main-content" className="layout__main">
        <Outlet />
      </main>
    </div>
  );
}
