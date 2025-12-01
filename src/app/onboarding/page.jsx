// app/onboarding/page.jsx

import { Suspense } from "react";
import OnboardingClient from "./components/OnboardingClient";

export default async function OnboardingPage({ searchParams }) {
  const sp = await searchParams;
  const token = sp?.token ?? null;
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <OnboardingClient token={token} />
    </Suspense>
  );
}
