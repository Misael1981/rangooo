import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import prisma from "@/lib/prisma";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  ShoppingBasket,
  Users,
  Warehouse,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AppSidebarPizzaria = async ({ slug }) => {
  const items = [
    { title: "Home", url: `/pizzarias/${slug}/admin`, icon: Home },
    {
      title: "Gerenciar Pedidos",
      url: `/pizzarias/${slug}/admin/pedidos`,
      icon: Inbox,
    },
    {
      title: "Dados do Estabelecimento",
      url: `/pizzarias/${slug}/admin/establishment`,
      icon: Warehouse,
    },
    {
      title: "Gerenciar Cardápio",
      url: `/pizzarias/${slug}/admin/products`,
      icon: ShoppingBasket,
    },
    {
      title: "Gerenciar Usuários",
      url: `/pizzarias/${slug}/admin/users`,
      icon: Users,
    },
  ];
  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    select: {
      id: true,
      ownerId: true,
      name: true,
      avatarImageUrl: true,
      brandColors: true,
    },
  });
  return (
    <Sidebar>
      <SidebarHeader>
        <div
          className="relative h-[150px] w-full rounded-md border-2 border-red-600 p-6"
          style={{
            backgroundColor: Array.isArray(restaurant.brandColors)
              ? (restaurant.brandColors[0] ?? "#ffffff")
              : (restaurant.brandColors ?? "#ffffff"),
          }}
        >
          <Image
            src={restaurant.avatarImageUrl}
            alt={restaurant.name}
            fill
            className="object-contain p-4"
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebarPizzaria;
