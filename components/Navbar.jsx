"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import "./Navbar.css";

export default function Navbar() {


    const [menuOpen, setMenuOpen] =
        useState(false);

    const pathname =
        usePathname();

    const pathParts =
        pathname
            .split("/")
            .filter(Boolean);

    const reservedRoutes = [
        "about",
        "contact",
        "items",
        "products",
        "services",
        "get-in-touch",
    ];

    const district =
        pathParts[0] &&
            !reservedRoutes.includes(
                pathParts[0]
            )
            ? pathParts[0]
            : "";
    const closeMenu = () => {
        setMenuOpen(false);
    };
    const makeLink = (
        path = ""
    ) => {

        if (!district) {
            return path || "/";
        }

        if (!path) {
            return `/${district}`;
        }

        return `/${district}${path}`;
    };

    return (
        <header className="navbar">

            <div className="nav-container">

                <Link
                    href={makeLink("")}
                    onClick={closeMenu}
                    className="logo"
                >
                    Humanbio
                    <span>Medical</span>
                </Link>

                <ul
                    className={`nav-links ${menuOpen ? "active" : ""
                        }`}
                >

                    <li>
                        <Link
                            href={makeLink("")}
                            onClick={closeMenu}
                        >
                            Home
                        </Link>
                    </li>

                    <li>
                        <Link
                            href={makeLink(
                                "/about"
                            )}
                            onClick={closeMenu}
                        >
                            About
                        </Link>
                    </li>

                    <li>
                        <Link
                            href={makeLink(
                                "/services"
                            )}
                            onClick={closeMenu}
                        >
                            Services
                        </Link>
                    </li>

                    <li>
                        <Link
                            href={makeLink(
                                "/items"
                            )}
                            onClick={closeMenu}
                        >
                            Products
                        </Link>
                    </li>

                    <li>
                        <Link
                            href={makeLink(
                                "/contact"
                            )}
                            onClick={closeMenu}
                        >
                            Contact
                        </Link>
                    </li>

                </ul>

                <button

                    className="menu-btn"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? "✕" : "☰"}
                </button>

            </div>

        </header>
    );


}
