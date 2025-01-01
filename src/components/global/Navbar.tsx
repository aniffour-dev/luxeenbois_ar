"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SlHandbag } from "react-icons/sl";
import Menu from "./Menu";
import Logo from "./Logo";

const Header = () => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("EN");

  const languages = [
    { code: "FR", name: "Français" },
    { code: "AR", name: "Arabic" },
  ];

  const handleLanguageChange = (langCode: string) => {
    setCurrentLang(langCode);
    setIsLangOpen(false);
  };

  return (
    <>
      <div className="bg-amber-500 py-2 text-white font-semibold flex justify-center items-center flex-col lg:flex-row gap-1 px-4 lg:px-0">
        <span className="font-bold text-white">Special Offer🎉:</span>
        <span className="text-white">
          Achetez 2 pour 3200dhs – Économisez 560dhs!
        </span>
      </div>
      <header className="w-full bg-white shadow-sm relative">
        <div className="max-w-[1200px] mx-auto px-4 h-16 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                // X icon when menu is open
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                // Hamburger icon when menu is closed
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Logo */}
          <Logo />

          {/* Desktop Navigation Links */}
          <Menu />

          {/* Right Section - Language and Cart */}
          <div className="flex items-center gap-4">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-gray-100"
              >
                {currentLang}
                <ChevronDown className="w-4 h-4" />
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Shopping Bag Icon */}
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <SlHandbag className="text-amber-600 size-5" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden absolute w-full bg-white shadow-lg z-10">
            <div className="px-4 py-2 space-y-2">
              <a
                href="/"
                className="block px-3 py-2 rounded-md hover:bg-gray-100"
              >
                Home
              </a>
              <a
                href="/about"
                className="block px-3 py-2 rounded-md hover:bg-gray-100"
              >
                About
              </a>
              <a
                href="/reviews"
                className="block px-3 py-2 rounded-md hover:bg-gray-100"
              >
                Reviews
              </a>
              <a
                href="/contact"
                className="block px-3 py-2 rounded-md hover:bg-gray-100"
              >
                Contact
              </a>
            </div>
          </nav>
        )}
      </header>
    </>
  );
};

export default Header;
