"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import "./services.css";

const getServiceIcon = (title) => {
    const icons = {
        "Diagnostic Equipment": "🔬",
        "Laboratory Solutions": "🧪",
        "Biomedical Instruments": "⚕️",
        "Healthcare Consultation": "👨‍⚕️",
        "Maintenance Support": "🛠️",
        "Research Assistance": "📚",
    };

    return icons[title] || "⚙️";
};

export default function Services() {
    const pathname = usePathname();

    const pathParts = pathname.split("/").filter(Boolean);

    const district =
        pathParts.length > 0 &&
            !["services", "about", "contact", "items"].includes(pathParts[0])
            ? pathParts[0]
            : "";

    const basePath = district ? `/${district}` : "";
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const snap = await getDoc(
                    doc(
                        db,
                        "websites",
                        "centralbiomedicals",
                        "pages",
                        "services"
                    )
                );

                if (snap.exists()) {
                    setServices(snap.data().services || []);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    return (
        <main>
            {/* Hero */}
            <section className="services-hero">
                <div className="container">
                    <span>OUR SERVICES</span>

                    <h1>
                        Reliable Biomedical
                        <br />
                        Support & Maintenance
                    </h1>

                    <p>
                        End-to-end biomedical equipment services including
                        installation, calibration, preventive maintenance
                        and annual maintenance contracts.
                    </p>
                </div>
            </section>

            {/* Services */}
            <section className="services-section">
                <div className="container">

                    <div className="services-grid">

                        {loading
                            ? Array.from({ length: 6 }).map((_, index) => (
                                <div className="service-card skeleton-card" key={index}>
                                    <div className="skeleton skeleton-icon"></div>
                                    <div className="skeleton skeleton-title"></div>
                                    <div className="skeleton skeleton-text"></div>
                                    <div className="skeleton skeleton-text small"></div>
                                </div>
                            ))
                            : services.map((service, index) => (
                                <div className="service-card" key={index}>
                                    <div className="service-icon">
                                        {getServiceIcon(service.title)}
                                    </div>

                                    <h3>{service.title}</h3>

                                    <p>{service.desc}</p>
                                </div>
                            ))}
                    </div>

                </div>
            </section>

            {/* Process */}
            <section className="service-process">
                <div className="container">

                    <h2>Our Service Process</h2>

                    <div className="process-grid">
                        <div>
                            <span>1</span>
                            <h3>Inspection</h3>
                        </div>

                        <div>
                            <span>2</span>
                            <h3>Diagnosis</h3>
                        </div>

                        <div>
                            <span>3</span>
                            <h3>Execution</h3>
                        </div>

                        <div>
                            <span>4</span>
                            <h3>Support</h3>
                        </div>
                    </div>

                </div>
            </section>

            {/* CTA */}
            <section className="services-cta">
                <div className="container">

                    <h2>Need Biomedical Service Support?</h2>

                    <p>
                        Contact our technical team for installation,
                        maintenance and AMC services.
                    </p>

                    <a href={`${basePath}/contact`}>
                        Request Service
                    </a>

                </div>
            </section>
        </main>
    );
}