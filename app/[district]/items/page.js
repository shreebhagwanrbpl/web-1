import Products from "../../items/page";

export default async function Page({ params }) {

  const resolvedParams = await params;

  const district =
    resolvedParams?.district || "jaipur";

  const city = district
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );

  return <Products city={city} />;
}