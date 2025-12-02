import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebarPizzaria from "./components/AppSidebarPizzaria";

export default async function AdminPizzariaLayout({ children, params }) {
  const p = await params;
  return (
    <SidebarProvider>
      <AppSidebarPizzaria slug={p.slug} />
      <main className="w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
