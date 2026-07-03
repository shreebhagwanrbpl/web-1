import Hero from "../components/Hero";
import { headers } from "next/headers";
export const metadata = {
    title: "Biomedical Equipment Supplier",
    description:
        "Hospital, Laboratory & Diagnostic Equipment Supplier Across India",
};

export default function Home({ district = "" }) {

    const basePath = district
        ? `/${district}`
        : "";

    return (
        <main>
            <Hero />

            {/* Trust Section */}
            <section className="trust-section">
                <div className="container">
                    <p className="section-tag">TRUSTED BY HEALTHCARE PROFESSIONALS</p>

                    <div className="trust-grid">
                        <div>🏥 Hospitals</div>
                        <div>🧪 Pathology Labs</div>
                        <div>🔬 Research Centers</div>
                        <div>💉 Diagnostic Clinics</div>
                    </div>
                </div>
            </section>

            {/* Product Categories */}
            <section className="product-section">
                <div className="container">
                    <h2>Our Product Categories</h2>

                    <div className="product-grid">
                        <div className="product-card">
                            <span>🩸</span>
                            <h3>Hematology</h3>
                            <p>Advanced blood analyzers and testing systems.</p>
                        </div>

                        <div className="product-card">
                            <span>🧬</span>
                            <h3>Biochemistry</h3>
                            <p>Fully automatic biochemistry analyzers.</p>
                        </div>

                        <div className="product-card">
                            <span>🔬</span>
                            <h3>Microscopy</h3>
                            <p>Research and diagnostic microscopes.</p>
                        </div>

                        <div className="product-card">
                            <span>🧪</span>
                            <h3>Lab Instruments</h3>
                            <p>Centrifuges, incubators and lab equipment.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Us */}
            <section className="why-us">
                <div className="container">
                    <h2>Why Choose Us</h2>

                    <div className="why-grid">
                        <div>
                            <h3>01</h3>
                            <p>Certified Equipment</p>
                        </div>

                        <div>
                            <h3>02</h3>
                            <p>Expert Engineers</p>
                        </div>

                        <div>
                            <h3>03</h3>
                            <p>24/7 Technical Support</p>
                        </div>

                        <div>
                            <h3>04</h3>
                            <p>Pan India Delivery</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="stats">
                <div className="container stats-grid">
                    <div>
                        <h2>1500+</h2>
                        <p>Installations</p>
                    </div>

                    <div>
                        <h2>500+</h2>
                        <p>Products</p>
                    </div>

                    <div>
                        <h2>300+</h2>
                        <p>Hospitals Served</p>
                    </div>

                    <div>
                        <h2>24/7</h2>
                        <p>Support</p>
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="process">
                <div className="container">
                    <h2>How We Work</h2>

                    <div className="process-grid">
                        <div>
                            <span>1</span>
                            <h3>Consultation</h3>
                        </div>

                        <div>
                            <span>2</span>
                            <h3>Product Selection</h3>
                        </div>

                        <div>
                            <span>3</span>
                            <h3>Installation</h3>
                        </div>

                        <div>
                            <span>4</span>
                            <h3>Support & AMC</h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="premium-cta">
                <div className="container">
                    <h2>Looking For Reliable Biomedical Equipment?</h2>
                    <p>
                        Get expert consultation and best pricing for your hospital or lab.
                    </p>

                    <a
                        href={`${basePath}/contact`}
                        className="cta-btn"
                    >
                        Request Quote
                    </a>
                </div>
            </section>
        </main>
    );
}