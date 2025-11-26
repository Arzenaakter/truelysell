"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiX, HiMenu, HiChevronDown } from "react-icons/hi";

import logo from "@/assets/img/logo.svg";
import LoginFormModal from "../auth/LoginFormModal";
import RegistrationFormModal from "../auth/RegistrationFormModal";
import { MdLock } from "react-icons/md";
import { useAppContext } from "@/context/AppContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const { userRole, token, logout } = useAppContext();

  // ✅ Scroll listener only once
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed bg-white top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white backdrop-blur-sm shadow-md py-6"
          : "bg-transparent py-6 "
      }`}
    >
      <div className="container mx-auto ">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group ps-4 lg:ps-0">
            <Image src={logo} alt="Logo" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex space-x-1">
            <Dropdown title="Home">
              <DropdownLink href="/">Sub1</DropdownLink>
              <DropdownLink href="/">Sub2</DropdownLink>
            </Dropdown>
            <Dropdown title="Services">
              <DropdownLink href="/">Sub1</DropdownLink>
              <DropdownLink href="/">Sub2</DropdownLink>
            </Dropdown>
            <Dropdown title="Pages">
              <DropdownLink href="/pages/about">About</DropdownLink>
              <DropdownLink href="/pages/blog">Blog</DropdownLink>
              <DropdownLink href="/pages/contact-us">Contact Us</DropdownLink>
              <DropdownLink href="/pages/faq">FAQ</DropdownLink>
              <DropdownLink href="/pages/how-it-works">
                How it works
              </DropdownLink>
              <DropdownLink href="/pages/privacy-policy">
                Privacy Policy
              </DropdownLink>
              <DropdownLink href="/pages/terms-conditions">
                Terms & Conditions
              </DropdownLink>
            </Dropdown>

            <NavLink
              href={
                userRole === "Admin"
                  ? "/admin"
                  : userRole === "Provider"
                  ? "/provider"
                  : userRole === "Customer"
                  ? "/customer"
                  : "/"
              }
            >
              {userRole}
            </NavLink>
          </nav>

          {/* Auth Buttons for Desktop */}
          <div className="hidden xl:flex items-center space-x-2 lg:space-x-4">
            {token ? (
              <button
                onClick={() => logout()}
                className="flex items-center gap-1 px-4 py-2 rounded text-white font-medium text-sm 
                 bg-linear-to-r from-(--primary) to-(--primary-blue)
                 hover:opacity-90 transition-all duration-200"
              >
                Sign out
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="flex items-center gap-1 px-4 py-2 rounded font-medium text-sm bg-gray-200/80 text-gray-800"
                >
                  <MdLock size={15} />
                  <span>Sign In</span>
                </button>
                <LoginFormModal
                  isOpen={isLoginOpen}
                  onClose={() => setIsLoginOpen(false)}
                  setIsLoginOpen={setIsLoginOpen}
                  isRegistrationOpen={isRegistrationOpen}
                  setIsRegistrationOpen={setIsRegistrationOpen}
                />
                <button
                  onClick={() => {
                    setIsRegistrationOpen(true);
                  }}
                  className="flex items-center gap-1 px-4 py-2 rounded text-white font-medium text-sm 
                  bg-linear-to-r from-(--primary) to-(--primary-blue) 
                  hover:opacity-90 transition-all duration-200"
                >
                  <MdLock size={15} />
                  <span>Join Us</span>
                </button>
                <RegistrationFormModal
                  isOpen={isRegistrationOpen}
                  onClose={() => setIsRegistrationOpen(false)}
                  onSuccess={() => {
                    setIsRegistrationOpen(false);
                    setIsLoginOpen(true);
                  }}
                />
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="xl:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer "
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <HiX className="w-10 h-10 text-(--primary) pe-4 lg:pe-0" />
            ) : (
              <HiMenu className="w-10 h-10 text-(--primary) pe-4 lg:pe-0" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="xl:hidden mt-4 py-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-100 animate-fadeIn">
            <nav className="flex flex-col space-y-2">
              <MobileNavLink href="/">Home</MobileNavLink>
              <MobileNavLink href="/">Services</MobileNavLink>
              <MobileNavLink href="/">Pages</MobileNavLink>
              <MobileNavLink
                href={
                  userRole === "Admin"
                    ? "/admin"
                    : userRole === "Provider"
                    ? "/provider"
                    : userRole === "Customer"
                    ? "/customer"
                    : "/"
                }
              >
                {userRole}
              </MobileNavLink>

              <div className="border-t border-gray-200 my-2 pt-2 space-y-3">
                {token ? (
                  <button
                    onClick={() => logout()}
                    className="flex items-center gap-1 px-4 py-2 rounded text-white font-medium text-sm 
                 bg-linear-to-r from-(--primary) to-(--primary-blue) 
                 hover:opacity-90 transition-all duration-200"
                  >
                    Sign out
                  </button>
                ) : (
                  <div className="flex items-center gap-2 ms-4">
                    <button
                      onClick={() => {
                        setIsLoginOpen(true);
                      }}
                      className="flex items-center gap-1 px-4 py-2 rounded font-medium text-sm bg-gray-200/80 text-gray-800"
                    >
                      <MdLock size={15} />
                      <span>Sign In</span>
                    </button>
                    <LoginFormModal
                      isOpen={isLoginOpen}
                      onClose={() => setIsLoginOpen(false)}
                      setIsLoginOpen={setIsLoginOpen}
                      isRegistrationOpen={isRegistrationOpen}
                      setIsRegistrationOpen={setIsRegistrationOpen}
                    />
                    <button
                      onClick={() => {
                        setIsRegistrationOpen(true);
                      }}
                      className="flex items-center gap-1 px-4 py-2 rounded text-white font-medium text-sm 
                  bg-linear-to-r from-(--primary) to-(--primary-blue) 
                  hover:opacity-90 transition-all duration-200"
                    >
                      <MdLock size={15} />
                      <span>Join Us</span>
                    </button>
                    <RegistrationFormModal
                      isOpen={isRegistrationOpen}
                      onClose={() => setIsRegistrationOpen(false)}
                      onSuccess={() => {
                        setIsRegistrationOpen(false);
                      }}
                      isRegistrationOpen={isRegistrationOpen}
                      setIsRegistrationOpen={setIsRegistrationOpen}
                    />
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

/* ---------- Helper Components ---------- */

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="px-1 py-2 text-gray-800 hover:text-(--primary-hover) font-medium transition-colors relative group"
    >
      {children}
    </Link>
  );
}

function Dropdown({ title, children }) {
  return (
    <div className="relative group">
      <button className="px-1 py-2 text-gray-800 hover:text-(--primary-hover) font-medium flex items-center">
        {title}
        <HiChevronDown className="w-5 h-5 ml-1" />
      </button>
      <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
        {children}
      </div>
    </div>
  );
}

function DropdownLink({ href, children }) {
  return (
    <Link
      href={href}
      className="block font-medium px-4 py-1 text-gray-700 hover:text-(--primary-hover) transition-colors"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ href, children, isHighlighted = false }) {
  return (
    <Link
      href={href}
      className={`px-4 py-2.5 block transition-all duration-200  ${
        isHighlighted ? "" : ""
      }`}
    >
      {children}
    </Link>
  );
}
