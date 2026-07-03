import ProductDetails from "./ProductDetails";

export default async function Page({ params }) {
    return (
        <ProductDetails
            slug={params.slug}
        />
    );
}