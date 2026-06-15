import App from "../../src/App";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const slugToView = (slug: string[] = []) => {
  const path = `/${slug.join("/")}`;
  if (path === "/services") return "services";
  if (path === "/packages") return "packages";
  if (path === "/gallery" || path === "/trends") return "trends";
  if (path === "/about" || path === "/story") return "story";
  if (path === "/booking" || path === "/book") return "book";
  if (path === "/login") return "login";
  if (path === "/register") return "register";
  if (path === "/forgot-password" || path === "/forgot") return "forgot";
  if (path === "/customer" || path === "/customer/bookings") return "customer-dashboard";
  if (path === "/admin") return "admin-dashboard";
  if (path === "/specialist" || path === "/worker") return "worker-dashboard";
  return "landing";
};

export default async function RoutedPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  return <App initialView={slugToView(slug)} />;
}
