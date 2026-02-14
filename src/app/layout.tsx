import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/providers/auth";
import { Toaster } from "sonner";
import { CartProvider } from "@/contexts/cart-context";
import SheetCart from "@/components/SheetCart";

const inter = Inter({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-inter",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-plus-jakarta",
});

export const metadata = {
  title: "Rangooo",
  description:
    "Seu delivery mais rápido, seu negócio mais organizado. O Rangooo cuida de tudo.",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon-96x96.png"],
    other: [{ rel: "mask-icon", url: "/logos.svg", color: "#0d9488" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} ${plusJakartaSans.variable} antialiased`}
      >
        <AuthProvider>
          {/* Use o Provider, não o Context diretamente */}
          <CartProvider>
            {children}
            <Toaster />
            <SheetCart />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
