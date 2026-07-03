import Home from "../page";

export default async function Page({ params }) {
  const { district } = await params;

  return <Home district={district} />;
}