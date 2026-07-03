import ProductDetails from "../../../items/[slug]/ProductDetails";

export default async function Page({ params }) {

    const resolvedParams = await params;

    return (
        <ProductDetails
            slug={resolvedParams.slug}
            district={resolvedParams.district}
        />
    );
}