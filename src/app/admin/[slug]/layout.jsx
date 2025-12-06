import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./components/AppSidebar";
import { getEstablishmentBySlug } from "@/app/actions/get-establishment-by-slug";

export default async function AdminLayout({ children, params }) {
  const p = await params;
  const establishment = await getEstablishmentBySlug(p.slug);

  if (!establishment) {
    return <div>Estabelecimento não encontrado.</div>;
  }

  return (
    <SidebarProvider>
      <AppSidebar slug={p.slug} />
      <main className="w-full bg-red-50">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
