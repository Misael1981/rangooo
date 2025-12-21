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
  Home,
  Inbox,
  Printer,
  ShoppingBasket,
  Users,
  Warehouse,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AppSidebar = async ({ slug }) => {
  const items = [
    {
      title: "Dashboard Administrativo",
      url: `/admin/${slug}`,
      icon: Home,
    },
    {
      title: "Gerenciar Pedidos",
      url: `/admin/${slug}/pedidos`,
      icon: Inbox,
    },
    {
      title: "Dados do Estabelecimento",
      url: `/admin/${slug}/establishment`,
      icon: Warehouse,
    },
    {
      title: "Gerenciar Cardápio",
      url: `/admin/${slug}/products`,
      icon: ShoppingBasket,
    },
    {
      title: "Gerenciar Usuários",
      url: `/admin/${slug}/users`,
      icon: Users,
    },
    {
      title: "Status de Impressão",
      url: `/admin/${slug}/printing-status`,
      icon: Printer,
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
    <div className="bg-white">
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
            <SidebarGroupLabel>Applicações</SidebarGroupLabel>
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
    </div>
  );
};

export default AppSidebar;
