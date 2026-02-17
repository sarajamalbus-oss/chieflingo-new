import { getIsAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";
import AdminApp from "./admin-app"; // ✅ من admin-app مش من app

export default async function AdminPage() {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) {
    redirect("/");
  }

  return <AdminApp />;
}