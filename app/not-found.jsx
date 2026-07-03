export default function NotFound() {
    return (
        <> <main className="not-found-page">


            <div className="background-circle circle-1"></div>
            <div className="background-circle circle-2"></div>

            <div className="not-found-content">

                <span className="error-code">
                    404
                </span>

                <h1>
                    Oops! Page Not Found
                </h1>

                <p>
                    The page you are looking for may
                    have been moved, deleted or is
                    temporarily unavailable.
                </p>

                <div className="not-found-actions">

                    <a
                        href="/"
                        className="home-btn"
                    >
                        Back To Home
                    </a>

                    <a
                        href="/contact"
                        className="contact-btn"
                    >
                        Contact Us
                    </a>

                </div>

            </div>

        </main>

        </>
    );


}
