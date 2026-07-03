import "./about.css";

export default function About() {
    return (
        <main>

            {/* Hero */}
            <section className="about-hero">
                <div className="container">

                    <span className="hero-tag">
                        OUR STORY
                    </span>

                    <h1>
                        Building Trust Through
                        Healthcare Innovation
                    </h1>

                    <p>
                        We help hospitals, laboratories and healthcare
                        institutions access reliable biomedical technology,
                        professional support and innovative diagnostic solutions.
                    </p>

                    <div className="about-achievements">

                        <div className="achievement-card">
                            <h2>10+</h2>
                            <span>Years Experience</span>
                        </div>

                        <div className="achievement-card">
                            <h2>500+</h2>
                            <span>Projects Delivered</span>
                        </div>

                        <div className="achievement-card">
                            <h2>300+</h2>
                            <span>Happy Clients</span>
                        </div>

                        <div className="achievement-card">
                            <h2>24/7</h2>
                            <span>Technical Support</span>
                        </div>

                    </div>

                </div>
            </section>

            {/* Story */}
            <section className="story-section">
                <div className="container story-grid">

                    <div className="story-content">

                        <span className="story-tag">
                            OUR COMPANY
                        </span>

                        <h2>
                            Empowering Healthcare Through
                            Innovation & Reliability
                        </h2>

                        <p>
                            We specialize in delivering advanced biomedical,
                            laboratory and diagnostic equipment solutions
                            for hospitals, research centers and healthcare
                            institutions across India.
                        </p>

                        <p>
                            Our commitment extends beyond equipment supply.
                            We provide installation, technical consultation,
                            maintenance and long-term support to ensure
                            uninterrupted healthcare operations.
                        </p>

                        <div className="story-points">

                            <div>✓ Advanced Technology</div>
                            <div>✓ Expert Support Team</div>
                            <div>✓ Quality Assurance</div>
                            <div>✓ Pan India Service Network</div>

                        </div>

                    </div>

                    <div className="story-card">

                        <h3>Our Mission</h3>

                        <p>
                            To provide innovative biomedical solutions
                            that improve efficiency, accuracy and
                            patient care outcomes.
                        </p>

                        <div className="mission-stats">

                            <div>
                                <h4>500+</h4>
                                <span>Projects</span>
                            </div>

                            <div>
                                <h4>300+</h4>
                                <span>Clients</span>
                            </div>

                        </div>

                    </div>

                </div>
            </section>

            {/* Timeline */}
            <section className="timeline-section">
                <div className="container">

                    <h2>Our Journey</h2>

                    <div className="timeline">

                        <div className="timeline-item">
                            <h3>2015</h3>
                            <p>Company Founded</p>
                        </div>

                        <div className="timeline-item">
                            <h3>2018</h3>
                            <p>100+ Installations</p>
                        </div>

                        <div className="timeline-item">
                            <h3>2021</h3>
                            <p>Expanded Services</p>
                        </div>

                        <div className="timeline-item">
                            <h3>2025</h3>
                            <p>500+ Equipment Delivered</p>
                        </div>

                    </div>

                </div>
            </section>

            {/* CTA */}
            <section className="about-cta">

                <div className="container">

                    <h2>
                        Let's Build Better Healthcare Together
                    </h2>

                    <p>
                        Discover advanced biomedical equipment and
                        healthcare technology solutions.
                    </p>

                    <a href="/contact">
                        Contact Us
                    </a>

                </div>

            </section>

        </main>
    );
}