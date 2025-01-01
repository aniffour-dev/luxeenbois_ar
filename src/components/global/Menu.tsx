import Link from "next/link";
import React from "react";

interface MenuItem {
  label: string;
  href: string;
}

const menuItems: MenuItem[] = [
  { label: "Accueil", href: "/" },
  { label: "A propos", href: "/about" },
  { label: "Avis", href: "/reviews" },
  { label: "Contact", href: "/contact" },
];

const Menu: React.FC = () => {
  return (
    <nav className="hidden lg:block">
      <ul className="flex justify-start items-center gap-5">
        {menuItems.map(({ label, href }) => (
          <li key={`${label}-${href}`}> {/* Combine label and href for a unique key */}
            <Link
              href={href}
              className="text-slate-700 duration-300 hover:text-black font-bold uppercase"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
