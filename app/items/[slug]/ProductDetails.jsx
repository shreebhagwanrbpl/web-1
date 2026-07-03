"use client";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../../../lib/firebase";
// import toast from "react-hot-toast";
import "./ProductDetails.css"
export default function ProductDetails({
    slug,
    district = ""
}) {

    const [product, setProduct] = useState(null);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [submitting, setSubmitting] = useState(false);
    useEffect(() => {

        const loadProduct = async () => {

            const snap = await getDoc(
                doc(
                    db,
                    "websites",
                    "centralbiomedicals",
                    "pages",
                    "products"
                )
            );

            if (!snap.exists()) return;

            const products =
                snap.data().products || [];

            const found =
                products.find(
                    (p) => p.slug === slug
                );

            setProduct(found);
        };

        loadProduct();

    }, [slug]);

    const submitForm = async (e) => {

        e.preventDefault();

        if (!name.trim()) {
            return toast.error("Name is required");
        }

        if (!/^[A-Za-z ]+$/.test(name)) {
            return toast.error("Only letters allowed in name");
        }

        if (!/^[6-9]\d{9}$/.test(phone)) {
            return toast.error("Enter valid 10 digit mobile number");
        }

        if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ) {
            return toast.error("Enter valid email address");
        }

        const id = toast.loading("Sending...");

        try {

            await addDoc(
                collection(
                    db,
                    "websitesQueries",
                    "centralbiomedicals",
                    "productQueries"
                ),
                {
                    productName: product.title,
                    slug: product.slug,
                    name,
                    phone,
                    email,
                    createdAt: new Date()
                }
            );

            setName("");
            setPhone("");
            setEmail("");

            toast.success(
                "Enquiry Submitted",
                { id }
            );

        } catch {

            toast.error(
                "Something went wrong",
                { id }
            );
        }
    };
    if (!product) {
        return (
            <section className="details-page">

                <div className="container">

                    <div className="details-grid">

                        {/* LEFT COLUMN */}

                        <div className="left-column">

                            <div className="skeleton skeleton-image"></div>

                            <div className="enquiry-card">

                                <div className="skeleton skeleton-form-title"></div>

                                <div className="skeleton skeleton-input"></div>

                                <div className="skeleton skeleton-input"></div>

                                <div className="skeleton skeleton-input"></div>

                                <div className="skeleton skeleton-button"></div>

                            </div>

                        </div>

                        {/* RIGHT COLUMN */}

                        <div className="product-info">

                            <div className="skeleton skeleton-badge"></div>

                            <div className="skeleton skeleton-heading"></div>

                            <div className="skeleton skeleton-model"></div>

                            <div className="skeleton skeleton-desc"></div>
                            <div className="skeleton skeleton-desc"></div>
                            <div className="skeleton skeleton-desc"></div>

                            <br />

                            <div className="specs">

                                <div className="skeleton skeleton-spec"></div>

                                <div className="skeleton skeleton-spec"></div>

                                <div className="skeleton skeleton-spec"></div>

                                <div className="skeleton skeleton-spec"></div>

                                <div className="skeleton skeleton-spec"></div>

                                <div className="skeleton skeleton-spec"></div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>
        );
    }

    return (

        <section className="details-page">
            <Toaster position="top-right" />
            <div className="container">

                <div className="details-grid">

                    {/* LEFT SIDE */}

                    <div className="left-column">

                        <div className="product-gallery">

                            <div className="main-image">

                                <img
                                    src={product.image}
                                    alt={product.title}
                                />

                            </div>

                        </div>

                        <div className="enquiry-card">

                            <h2>
                                Request Quote
                            </h2>

                            <form onSubmit={submitForm}>

                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                />

                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    value={phone}
                                    maxLength={10}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, "");
                                        setPhone(value);
                                    }}
                                />

                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                />

                                <button
                                    type="submit"
                                    disabled={submitting}
                                >
                                    {submitting
                                        ? "Submitting..."
                                        : "Send Enquiry"}
                                </button>

                            </form>

                        </div>

                    </div>

                    {/* RIGHT SIDE */}

                    <div className="product-info">

                        <span className="brand-badge">
                            {product.brand}
                        </span>

                        <h1>
                            {product.title}
                        </h1>

                        <p className="model">
                            Model : {product.model}
                        </p>



                        <div className="specs">

                            <div>
                                <strong>Brand</strong>
                                <span>
                                    {product.brand || "-"}
                                </span>
                            </div>

                            <div>
                                <strong>Model</strong>
                                <span>
                                    {product.model || "-"}
                                </span>
                            </div>

                            <div>
                                <strong>Instrument</strong>
                                <span>
                                    {product.instrument || "-"}
                                </span>
                            </div>

                            <div>
                                <strong>Automation</strong>
                                <span>
                                    {product.automation || "-"}
                                </span>
                            </div>

                            <div>
                                <strong>Throughput</strong>
                                <span>
                                    {product.throughput || "-"}
                                </span>
                            </div>

                            <div>
                                <strong>Availability</strong>
                                <span>
                                    {product.availability || "In Stock"}
                                </span>
                            </div>

                        </div>
                        <div className="description-box">

                            <h3>
                                Description
                            </h3>

                            <p>
                                {product.desc}
                            </p>

                        </div>
                    </div>

                </div>

            </div>

        </section>

    );
}