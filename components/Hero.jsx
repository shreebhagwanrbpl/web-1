"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import "./Hero.css";

export default function Hero() {
    const [heroData, setHeroData] = useState(null);
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();

    const pathParts = pathname.split("/").filter(Boolean);

    const district =
        pathParts.length > 0 &&
            !["about", "contact", "products", "services"].includes(pathParts[0])
            ? pathParts[0]
            : "";

    const city = district
        ? district
            .replace(/-/g, " ")
            .replace(/\b\w/g, c => c.toUpperCase())
        : "India";
    const basePath = district ? `/${district}` : "";
    useEffect(() => {
        const fetchHero = async () => {
            try {
                const snap = await getDoc(
                    doc(db, "websites", "centralbiomedicals", "pages", "home")
                );

                if (snap.exists()) {
                    setHeroData(snap.data());
                }
            } finally {
                setLoading(false);
            }
        };

        fetchHero();
    }, []);
    if (loading) {
        return (
            <section className="hero">
                <div className="hero-container">

                    <div className="hero-content">
                        <div className="skeleton badge"></div>

                        <div className="skeleton title"></div>
                        <div className="skeleton title short"></div>

                        <div className="skeleton text"></div>
                        <div className="skeleton text"></div>
                        <div className="skeleton text small"></div>

                        <div className="hero-buttons">
                            <div className="skeleton btn"></div>
                            <div className="skeleton btn"></div>
                        </div>
                    </div>

                    <div className="hero-image">
                        <div className="skeleton image"></div>
                    </div>

                </div>
            </section>
        );
    }
    return (
        <section className="hero">
            <div className="hero-container">
                <div className="hero-content">

                    <span className="hero-badge">
                        Trusted Biomedical Equipment Supplier in {city}
                    </span>

                    <h1>
                        {heroData?.title}
                    </h1>

                    <p>
                        {heroData?.description}
                    </p>

                    <div className="hero-buttons">

                        <a
                            href={`${basePath}/services`}
                            className="btn-primary"
                        >
                            {heroData?.button1Text}
                        </a>

                        <a
                            href={`${basePath}/contact`}
                            className="btn-secondary"
                        >
                            {heroData?.button2Text}
                        </a>

                    </div>

                    <div className="hero-stats">
                        <div>
                            <h3>500+</h3>
                            <p>Products</p>
                        </div>

                        <div>
                            <h3>1000+</h3>
                            <p>Clients</p>
                        </div>

                        <div>
                            <h3>24/7</h3>
                            <p>Support</p>
                        </div>
                    </div>
                </div>

                <div className="hero-image">
                    <img
                        src={
                            heroData?.imageUrl ||
                            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900"
                        }
                        alt="Biomedical Equipment"
                    />
                </div>
            </div>
        </section>
    );
}