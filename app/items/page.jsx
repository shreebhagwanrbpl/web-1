"use client";

import { useMemo, useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import "./items.css";
import { usePathname } from "next/navigation";
export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const snap = await getDoc(
                    doc(
                        db,
                        "websites",
                        "centralbiomedicals",
                        "pages",
                        "products"
                    )
                );

                if (snap.exists()) {
                    const allProducts = snap.data().products || [];



                    const publishedProducts = allProducts.filter(
                        (p) => p.isPublished !== false
                    );



                    setProducts(publishedProducts);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);
    const pathname = usePathname();

    const pathParts =
        pathname.split("/").filter(Boolean);

    const district =
        pathParts.length > 0 &&
            !["products", "about", "contact", "services"]
                .includes(pathParts[0])
            ? pathParts[0]
            : "";

    const basePath =
        district ? `/${district}` : "";
    const productsPerPage = 12;

    const filteredProducts = useMemo(() => {
        return products.filter((product) =>
            (product.title || "")
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [products, search]);

    const totalPages = Math.ceil(
        filteredProducts.length / productsPerPage
    );

    const startIndex =
        (currentPage - 1) * productsPerPage;

    const currentProducts =
        filteredProducts.slice(
            startIndex,
            startIndex + productsPerPage
        );

    const getVisiblePages = () => {
        if (totalPages <= 3) {
            return Array.from(
                { length: totalPages },
                (_, i) => i + 1
            );
        }

        if (currentPage === 1) {
            return [1, 2, 3];
        }

        if (currentPage === totalPages) {
            return [
                totalPages - 2,
                totalPages - 1,
                totalPages,
            ];
        }

        return [
            currentPage - 1,
            currentPage,
            currentPage + 1,
        ];
    };

    return (
        <main>

            <section className="products-hero">
                <div className="container">

                    <span>OUR PRODUCTS</span>

                    <h1>
                        Biomedical & Laboratory
                        Equipment Solutions
                    </h1>

                    <p>
                        Explore advanced biomedical,
                        pathology and hospital equipment
                        for modern healthcare facilities.
                    </p>

                </div>
            </section>

            <section className="products-section">

                <div className="container">

                    <div className="products-top">

                        <div>
                            <h2>Explore Equipment</h2>

                            <p>
                                Browse advanced healthcare, pathology and
                                laboratory solutions for hospitals, clinics,
                                research centres and diagnostic labs.
                            </p>
                        </div>

                        <div className="search-box">
                            <input
                                type="text"
                                placeholder="Search analyzer, microscope, ECG..."
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>

                    </div>

                    <div className="products-grid">

                        {loading
                            ? Array.from({ length: 12 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="product-card skeleton-product"
                                >
                                    <div className="skeleton skeleton-img"></div>
                                    <div className="skeleton skeleton-title"></div>
                                    <div className="skeleton skeleton-text"></div>
                                    <div className="skeleton skeleton-btn"></div>
                                </div>
                            ))
                            :
                            currentProducts.map((product) => (


                                <div
                                    key={product.id || product.slug}
                                    className="product-card"
                                >
                                    <div className="product-image">

                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            loading="lazy"
                                        />

                                    </div>

                                    <div className="product-content">

                                        <div className="product-category">
                                            Brand:  {product.brand || "Biomedical Equipment"}
                                        </div>

                                        <h3>{product.title}</h3>

                                        <p>
                                            Model: {product.model
                                            }
                                        </p>

                                        <div className="product-footer">

                                            <a
                                                href={`${basePath}/items/${product.slug}`}
                                                className="details-btn"
                                            >
                                                View Details
                                            </a>
                                            {/* 
                                        <a
                                            href={`/enquiry/${product.slug || product.id}`}
                                            className="enquiry-btn"
                                        >
                                            Get Quote
                                        </a> */}

                                        </div>

                                    </div>
                                </div>

                            ))}

                    </div>
                    <div className="pagination">

                        <button
                            onClick={() =>
                                setCurrentPage((p) => p - 1)
                            }
                            disabled={currentPage === 1}
                        >
                            Prev
                        </button>

                        {getVisiblePages().map((page) => (
                            <button
                                key={page}
                                onClick={() =>
                                    setCurrentPage(page)
                                }
                                className={
                                    currentPage === page
                                        ? "active-page"
                                        : ""
                                }
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={() =>
                                setCurrentPage((p) => p + 1)
                            }
                            disabled={
                                currentPage === totalPages
                            }
                        >
                            Next
                        </button>

                    </div>

                </div>

            </section>

        </main>
    );
}