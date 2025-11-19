"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import logo from "@/assets/img/logo-white.svg";
import logoWhite from "@/assets/img/logo.svg";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { useAppContext } from "@/context/AppContext";

const Sidebar = ({ navLinks, role }) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({});
  const router = useRouter();
  const { logout } = useAppContext();
  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // helper: check if active
  const isActive = (path) => pathname === path;

  // helper: check if parent should be open based on active child
  const isParentActive = (children) =>
    children?.some((child) => pathname === child.path);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden fixed top-6 cursor-pointer left-4 z-50  0"
      >
        {!isMobileMenuOpen && <FaBars className="text-gray-600 text-xl" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        ${
          role !== "admin"
            ? "bg-white text-[#080C18]"
            : "bg-[#080C18] shadow-xl"
        }
          fixed md:sticky top-0 left-0 z-40 h-screen rounded-tr-2xl
          w-64 md:w-64 lg:w-[270px]
           backdrop-blur-xl border-r border-blue-100 
          flex flex-col py-6 px-4 space-y-2
          transform transition-transform duration-300 ease-in-out
          ${
            isMobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {isMobileMenuOpen && (
          <button
            onClick={toggleMobileMenu}
            className="md:hidden fixed top-4 cursor-pointer right-4 z-50  h-6 w-6 rounded-full bg-gray-200 p-2 flex items-center justify-center"
          >
            <FaTimes className="text-gray-600 " />
          </button>
        )}

        <Link
          href={"/"}
          className={`flex items-center  ${
            role !== "admin" ? "" : "mb-8 mt-14 md:mt-0"
          } gap-2 `}
        >
          <Image src={role !== "admin" ? logoWhite : logo} alt="Logo" />
        </Link>

        <nav className="flex-1 space-y-1 overflow-y-scroll sidebar-scroll">
          {navLinks.map((section, index) => (
            <div key={index} className="mb-6">
              <p className="text-gray-400 text-xs uppercase mb-2">
                {section.section}
              </p>
              <ul className="text-[14px]">
                {section.items.map((item, i) => {
                  const parentActive = isParentActive(item.children);
                  if (item.label === "Logout") {
                    return (
                      <li key={i}>
                        <button
                          onClick={logout}
                          className={`flex items-center gap-2 w-full text-left py-2 px-3 rounded ${
                            role !== "admin"
                              ? "text-[#080C18] hover:text-(--primary)"
                              : "text-white hover:bg-(--primary-blue)"
                          }`}
                        >
                          {item.icon}
                          {item.label}
                        </button>
                      </li>
                    );
                  }

                  return (
                    <li key={i}>
                      {item.children ? (
                        <>
                          <button
                            onClick={() => toggleMenu(item.label)}
                            className={`flex items-center justify-between w-full py-2 px-3 rounded ${
                              role === "admin"
                                ? parentActive
                                  ? "bg-blue-700 text-white "
                                  : "hover:bg-blue-700 text-white"
                                : parentActive
                                ? "text-(--primary)"
                                : "hover:text-(--primary) text-[#080C18]"
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              {item.icon}
                              {item.label}
                            </span>
                            <span>
                              {openMenus[item.label] || parentActive ? (
                                <IoIosArrowDown />
                              ) : (
                                <IoIosArrowForward />
                              )}
                            </span>
                          </button>
                          <div
                            className={`ml-6 mt-1 overflow-hidden transition-all duration-300 ease-in-out 
    ${openMenus[item.label] || parentActive ? "max-h-96" : "max-h-0"}
  `}
                          >
                            <ul className="space-y-1 ">
                              {item.children.map((child, j) => (
                                <li key={j}>
                                  <Link
                                    href={child.path}
                                    className={`block py-1 px-2 rounded   ${
                                      role === "admin"
                                        ? isActive(child.path)
                                          ? "text-(--primary-blue) "
                                          : "hover:text-(--primary-blue) text-white"
                                        : isActive(child.path)
                                        ? "text-(--primary) "
                                        : "hover:text-(--primary) text-[#080C18]"
                                    }`}
                                  >
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </>
                      ) : (
                        <Link
                          href={item.path}
                          className={`flex items-center gap-2 py-2 px-3 rounded ${
                            isActive(item.path)
                              ? ` ${
                                  role !== "admin"
                                    ? " text-[var(--primary)]"
                                    : " bg-[var(--primary-blue)] text-white"
                                }`
                              : `   ${
                                  role !== "admin"
                                    ? " text-[#080C18] hover:text-[var(--primary)]"
                                    : " text-white hover:bg-[var(--primary-blue)]"
                                }`
                          }`}
                        >
                          {item.icon}
                          {item.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
