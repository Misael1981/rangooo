import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebarPizzaria from "./components/AppSidebarPizzaria";

export default function AdminPizzariaLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebarPizzaria />
      <main className="w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
