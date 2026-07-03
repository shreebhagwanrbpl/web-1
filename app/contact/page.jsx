"use client";
import { db } from "../../lib/firebase";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
    doc, getDoc,
    collection,
    addDoc,
    serverTimestamp
} from "firebase/firestore";
import "./contact.css"
import { usePathname } from "next/navigation";
export default function Contact() {
    const pathname = usePathname();

    const pathParts =
        pathname.split("/").filter(Boolean);
    const [contactInfo, setContactInfo] = useState([]);
    const [pageLoading, setPageLoading] = useState(true);
    const [districtInfo, setDistrictInfo] =
        useState(null);
    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        message: "",
    });


    const districtSlug =
        pathParts.length > 0 &&
            !["about", "contact", "services", "items"]
                .includes(pathParts[0])
            ? pathParts[0]
            : null;
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const loadDistrict = async () => {
            if (!districtSlug) return;

            try {
                const snap = await getDoc(
                    doc(
                        db,
                        "websites",
                        "centralbiomedicals",
                        "districts",
                        districtSlug
                    )
                );

                if (snap.exists()) {
                    setDistrictInfo(snap.data());
                }
            } catch (err) {
                console.error(err);
            }
        };

        loadDistrict();
    }, [districtSlug]);

    useEffect(() => {
        const loadContact = async () => {
            try {
                const snap = await getDoc(
                    doc(
                        db,
                        "websites",
                        "centralbiomedicals",
                        "pages",
                        "contact"
                    )
                );

                if (snap.exists()) {
                    setContactInfo(
                        snap.data().contactInfo || []
                    );
                }
            } catch (err) {
                console.error(err);
            } finally {
                setPageLoading(false);
            }
        };

        loadContact();
    }, []);

    const phone =
        contactInfo.find(
            (i) => i.label === "Phone Number"
        )?.value || "";

    const email =
        contactInfo.find(
            (i) => i.label === "Email Address"
        )?.value || "";

    const address =
        contactInfo.find(
            (i) => i.label === "Office Address"
        )?.value || "";

    const hours =
        contactInfo.find(
            (i) => i.label === "Working Hours"
        )?.value || "";
    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!form.name.trim()) {
            newErrors.name = "Full name is required";
        }

        if (!/^[6-9]\d{9}$/.test(form.phone)) {
            newErrors.phone =
                "Enter valid 10 digit mobile number";
        }

        if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                form.email
            )
        ) {
            newErrors.email =
                "Enter valid email address";
        }


        if (
            form.message.trim().length < 20
        ) {
            newErrors.message =
                "Message must contain at least 20 characters";
        }

        return newErrors;
    };
    const dynamicAddress =
        districtInfo
            ? `${districtInfo.district}, ${districtInfo.state}, India`
            : address;
    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors =
            validateForm();

        if (
            Object.keys(validationErrors)
                .length > 0
        ) {
            setErrors(validationErrors);
            return;
        }

        try {
            setLoading(true);

            await addDoc(
                collection(
                    db,
                    "websitesQueries",
                    "centralbiomedicals",
                    "contactQueries"
                ),
                {
                    name: form.name,
                    phone: form.phone,
                    email: form.email,
                    message: form.message,
                    district: districtSlug || "",
                    createdAt: serverTimestamp(),
                }
            );

            setForm({
                name: "",
                phone: "",
                email: "",
                message: "",
            });

            toast.success("Enquiry submitted successfully");

        } catch (error) {
            console.error(error);
            toast.error("Failed to submit enquiry");
        } finally {
            setLoading(false);
        }
    };
    if (pageLoading) {
        return (
            <main className="contact-page">

                <section className="contact-hero">
                    <div className="container">

                        <div className="skeleton hero-badge-skeleton"></div>

                        <div className="skeleton hero-title-skeleton"></div>

                        <div className="skeleton hero-title-skeleton short"></div>

                        <div className="skeleton hero-text-skeleton"></div>

                        <div className="skeleton hero-text-skeleton"></div>

                        <div className="hero-buttons">
                            <div className="skeleton hero-btn-skeleton"></div>
                            <div className="skeleton hero-btn-skeleton"></div>
                        </div>

                    </div>
                </section>

                <section className="contact-cards-section">
                    <div className="container contact-cards">

                        <div className="contact-card">
                            <div className="skeleton card-icon"></div>
                            <div className="skeleton card-title"></div>
                            <div className="skeleton card-text"></div>
                        </div>

                        <div className="contact-card">
                            <div className="skeleton card-icon"></div>
                            <div className="skeleton card-title"></div>
                            <div className="skeleton card-text"></div>
                        </div>

                        <div className="contact-card">
                            <div className="skeleton card-icon"></div>
                            <div className="skeleton card-title"></div>
                            <div className="skeleton card-text"></div>
                        </div>

                    </div>
                </section>

                <section className="contact-section">
                    <div className="container contact-layout">

                        <div className="contact-left">

                            <div className="skeleton left-title"></div>

                            <div className="skeleton left-text"></div>

                            <div className="skeleton left-text"></div>

                            <div className="support-box">
                                <div className="skeleton support-title"></div>
                                <div className="skeleton support-text"></div>
                            </div>

                            <div className="support-box">
                                <div className="skeleton support-title"></div>
                                <div className="skeleton support-text"></div>
                            </div>

                        </div>

                        <div className="contact-form-wrapper">

                            <div className="skeleton form-title"></div>

                            <div className="skeleton input-skeleton"></div>
                            <div className="skeleton input-skeleton"></div>
                            <div className="skeleton input-skeleton"></div>

                            <div className="skeleton textarea-skeleton"></div>

                            <div className="skeleton button-skeleton"></div>

                        </div>

                    </div>
                </section>

            </main>
        );
    }
    return (
        <main className="contact-page">
            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        zIndex: 999999,
                        marginTop: "80px",
                    },
                }}
            />
            {/* HERO */}

            <section className="contact-hero">

                <div className="container">

                    <div className="hero-badge">
                        BIOMEDICAL EQUIPMENT CONSULTATION in india
                    </div>

                    <h1>
                        Looking For The Right
                        Biomedical Equipment?
                    </h1>

                    <p>
                        Tell us your requirement
                        and receive expert guidance
                        for laboratory, pathology,
                        diagnostic and hospital
                        equipment.
                    </p>

                    <div className="hero-buttons">

                        <a
                            href="tel:+91XXXXXXXXXX"
                            className="call-btn"
                        >
                            Call Now
                        </a>

                        <a
                            href="#contactForm"
                            className="quote-btn"
                        >
                            Request Quote
                        </a>

                    </div>

                </div>

            </section>

            {/* CONTACT CARDS */}

            <section className="contact-cards-section">

                <div className="container contact-cards">

                    <a
                        href={`tel:${phone}`}
                        className="contact-card"
                    >
                        <span>📞</span>

                        <h3>Call Us</h3>

                        <p>{phone}</p>
                    </a>

                    <a
                        href={`mailto:${email}`}
                        className="contact-card"
                    >
                        <span>✉️</span>

                        <h3>Email Support</h3>

                        <p>{email}</p>
                    </a>

                    <div className="contact-card">

                        <span>📍</span>

                        <h3>Location</h3>

                        <p>
                            {dynamicAddress}
                        </p>

                    </div>

                </div>

            </section>

            {/* FORM SECTION */}

            <section className="contact-section">

                <div className="container contact-layout">

                    <div className="contact-left">

                        <h2>
                            Need Immediate
                            Assistance?
                        </h2>

                        <p>
                            We help hospitals,
                            laboratories and
                            diagnostic centres
                            choose the right
                            biomedical equipment.
                        </p>

                        <div className="support-box">
                            <h3>
                                Response Time
                            </h3>

                            <span>
                                Under 30 Minutes
                            </span>
                        </div>

                        <div className="support-box">
                            <h3>
                                Coverage
                            </h3>

                            <span>
                                PAN India Support
                            </span>
                        </div>

                    </div>

                    <div
                        id="contactForm"
                        className="contact-form-wrapper"
                    >

                        <h2>
                            Request Consultation
                        </h2>

                        <form
                            onSubmit={
                                handleSubmit
                            }
                            className="contact-form"
                        >

                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name *"
                                    value={
                                        form.name
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                                {errors.name && (
                                    <span className="error">
                                        {
                                            errors.name
                                        }
                                    </span>
                                )}
                            </div>

                            <div>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Mobile Number *"
                                    value={
                                        form.phone
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                                {errors.phone && (
                                    <span className="error">
                                        {
                                            errors.phone
                                        }
                                    </span>
                                )}
                            </div>

                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address *"
                                    value={
                                        form.email
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                                {errors.email && (
                                    <span className="error">
                                        {
                                            errors.email
                                        }
                                    </span>
                                )}
                            </div>



                            <div>

                                <textarea
                                    rows="6"
                                    name="message"
                                    placeholder="Describe Your Requirement *"
                                    value={
                                        form.message
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                                {errors.message && (
                                    <span className="error">
                                        {
                                            errors.message
                                        }
                                    </span>
                                )}

                            </div>

                            <button
                                type="submit"
                            >
                                {loading
                                    ? "Submitting..."
                                    : "Request Consultation"}
                            </button>

                        </form>

                    </div>

                </div>

            </section>

            {/* FAQ */}

            <section className="faq-section">

                <div className="container">

                    <h2>
                        Frequently Asked Questions
                    </h2>

                    <div className="faq-item">
                        <h3>
                            Do you provide installation support?
                        </h3>

                        <p>
                            Yes, installation
                            assistance is available
                            for selected products.
                        </p>
                    </div>

                    <div className="faq-item">
                        <h3>
                            Do you provide delivery across India?
                        </h3>

                        <p>
                            Yes, we supply
                            biomedical equipment
                            throughout India.
                        </p>
                    </div>

                    <div className="faq-item">
                        <h3>
                            Can I request a quotation?
                        </h3>

                        <p>
                            Yes, submit the form
                            and our team will
                            contact you shortly.
                        </p>
                    </div>

                </div>

            </section>

        </main>
    );


}
