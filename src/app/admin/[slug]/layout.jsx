import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./components/AppSidebar";
import { getEstablishmentBySlugForAdmin } from "@/app/actions/get-establishment-by-slug-for-admin";
import PrintWSWrapper from "./components/PrintWSWrapper";

export default async function AdminLayout({ children, params }) {
  const p = await params;
  const establishment = await getEstablishmentBySlugForAdmin(p.slug);

  if (!establishment) {
    return <div>Estabelecimento não encontrado.</div>;
  }

  return (
    <SidebarProvider>
      <PrintWSWrapper printingToken={establishment.printingToken} />
      <AppSidebar slug={p.slug} />
      <main className="w-full bg-red-50">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
