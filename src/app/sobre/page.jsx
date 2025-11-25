// app/para-estabelecimentos/page.jsx

import Link from "next/link";
import AboutHeader from "./components/AboutHeader";
import HeroSectionAbout from "./components/HeroSectionAbout";
import AboutUs from "./components/AboutUs";
import Plans from "./components/Plans";
import FeaturesSection from "./components/FeaturesSection";
import FinalCount from "./components/FinalCount";

export default function ParaEstabelecimentosPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <AboutHeader />

      {/* HeroSection */}
      <HeroSectionAbout />

      {/* Sobre Nós */}
      <AboutUs />

      {/* Seção de Planos */}
      <Plans />

      {/* Seção de Funcionalidades */}
      <FeaturesSection />

      {/* CTA Final */}
      <FinalCount />
    </div>
  );
}
