import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebarRangooo from "./components/AppSidebarRangooo";

export default function AdminRangoooLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebarRangooo />
      <main className="w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
