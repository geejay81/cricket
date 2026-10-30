import { useState } from "react";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  const [menuOpen, setMenuOpen] =
    useState(false);

  return (
    <nav className="border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link
          to="/"
          className="text-xl font-bold"
        >
          Cricket Tracker
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          <Link to="/">Home</Link>
          <Link to="/account">
            Account
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col gap-3 px-4 pb-4 md:hidden">
          <Link to="/">Home</Link>
          <Link to="/account">
            Account
          </Link>
        </div>
      )}
    </nav>
  );
}

export default NavigationBar;