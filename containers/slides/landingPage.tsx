"use client";

import { LandingTopSection, PageBackground } from "@/components/ui";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  const handleStartScan = () => {
    router.push("/questionnaire");
  };

  const handleBrowseProducts = () => {
    router.push("/products");
  };

  return (
    <PageBackground showGreenCurve>
      <LandingTopSection onStartScan={handleStartScan} onBrowseProducts={handleBrowseProducts} />
    </PageBackground>
  );
}
