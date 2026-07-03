"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { usePathname } from "next/navigation";
import "./Footer.css";

export default function Footer() {

    const pathname = usePathname();

    const pathParts =
        pathname.split("/").filter(Boolean);

    const [contactInfo, setContactInfo] =
        useState([]);

    const [districtInfo, setDistrictInfo] =
        useState(null);
    const [loading, setLoading] = useState(true);
    const district =
        pathParts.length > 0 &&
            ![
                "about",
                "contact",
                "products",
                "services",
                "items"
            ].includes(pathParts[0])
            ? pathParts[0]
            : "";

    const basePath =
        district
            ? `/${district}`
            : "";

    useEffect(() => {

        const loadData = async () => {

            try {

                const contactSnap =
                    await getDoc(
                        doc(
                            db,
                            "websites",
                            "centralbiomedicals",
                            "pages",
                            "contact"
                        )
                    );

                if (
                    contactSnap.exists()
                ) {
                    setContactInfo(
                        contactSnap.data()
                            .contactInfo || []
                    );
                }

                if (district) {

                    const districtSnap =
                        await getDoc(
                            doc(
                                db,
                                "websites",
                                "centralbiomedicals",
                                "districts",
                                district
                            )
                        );

                    if (
                        districtSnap.exists()
                    ) {
                        setDistrictInfo(
                            districtSnap.data()
                        );
                    }
                }

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }
        };

        loadData();

    }, [district]);

    const phone =
        contactInfo.find(
            (item) =>
                item.label ===
                "Phone Number"
        )?.value ||
        "+91 XXXXX XXXXX";

    const email =
        contactInfo.find(
            (item) =>
                item.label ===
                "Email Address"
        )?.value ||
        "info@centralbiomedical.com";

    const dynamicAddress =
        districtInfo
            ? `${districtInfo.district}, ${districtInfo.state}, India`
            : "Rajasthan, India";

    if (loading) {
        return (
            <footer className="footer">
                <div className="footer-container">

                    <div className="footer-col company-info">
                        <div className="skeleton footer-title"></div>
                        <div className="skeleton footer-line"></div>
                        <div className="skeleton footer-line"></div>
                        <div className="skeleton footer-line short"></div>
                        <div className="skeleton footer-badge-loader"></div>
                    </div>

                    <div className="footer-col">
                        <div className="skeleton footer-heading"></div>
                        <div className="skeleton footer-link"></div>
                        <div className="skeleton footer-link"></div>
                        <div className="skeleton footer-link"></div>
                        <div className="skeleton footer-link"></div>
                    </div>

                    <div className="footer-col">
                        <div className="skeleton footer-heading"></div>
                        <div className="skeleton footer-link"></div>
                        <div className="skeleton footer-link"></div>
                        <div className="skeleton footer-link"></div>
                        <div className="skeleton footer-link"></div>
                    </div>

                    <div className="footer-col">
                        <div className="skeleton footer-heading"></div>
                        <div className="skeleton footer-line"></div>
                        <div className="skeleton footer-line"></div>
                        <div className="skeleton footer-line short"></div>
                    </div>

                </div>
            </footer>
        );
    }
    return (
        <footer className="footer">

            <div className="footer-container">

                {/* Company Info */}

                <div className="footer-col company-info">

                    <h2>
                        Central Biomedical
                    </h2>

                    <p>
                        Delivering advanced
                        biomedical, diagnostic
                        and laboratory equipment
                        solutions for hospitals,
                        pathology laboratories,
                        clinics and healthcare
                        institutions across India.
                    </p>

                    <div className="footer-badge">
                        ✓ Trusted Healthcare
                        Partner
                    </div>

                </div>

                {/* Products */}

                <div className="footer-col">

                    <h3>Products</h3>

                    <ul>

                        <li>
                            <a href={`${basePath}/items`}>
                                Hematology Analyzer
                            </a>
                        </li>

                        <li>
                            <a href={`${basePath}/items`}>
                                Biochemistry Analyzer
                            </a>
                        </li>

                        <li>
                            <a href={`${basePath}/items`}>
                                Electrolyte Analyzer
                            </a>
                        </li>

                        <li>
                            <a href={`${basePath}/items`}>
                                Microscopes
                            </a>
                        </li>

                        <li>
                            <a href={`${basePath}/items`}>
                                Laboratory Instruments
                            </a>
                        </li>

                    </ul>

                </div>

                {/* Company */}

                <div className="footer-col">

                    <h3>Company</h3>

                    <ul>

                        <li>
                            <a href={`${basePath}/`}>
                                Home
                            </a>
                        </li>

                        <li>
                            <a href={`${basePath}/about`}>
                                About Us
                            </a>
                        </li>

                        <li>
                            <a href={`${basePath}/services`}>
                                Services
                            </a>
                        </li>

                        <li>
                            <a href={`${basePath}/items`}>
                                Products
                            </a>
                        </li>

                        <li>
                            <a href={`${basePath}/contact`}>
                                Contact Us
                            </a>
                        </li>

                    </ul>

                </div>

                {/* Contact */}

                <div className="footer-col">

                    <h3>
                        Get In Touch
                    </h3>

                    <p>
                        📍 {dynamicAddress}
                    </p>

                    <p>
                        📞 {phone}
                    </p>

                    <p>
                        ✉️ {email}
                    </p>

                    <div className="footer-support">

                        <strong>
                            Support Hours
                        </strong>

                        <p>
                            Mon - Sat :
                            9:00 AM - 7:00 PM
                        </p>

                    </div>

                </div>

            </div>

            <div className="footer-bottom">

                <p>
                    © {new Date().getFullYear()}
                    {" "}
                    Central Biomedical.
                    All Rights Reserved.
                </p>

            </div>

        </footer>
    );
}