"use client";

import { ActionButton, FeatureCard, Logo, PageBackground } from "@/components/ui";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  const handleStartScan = () => {
    router.push("/questionnaire");
  };

  return (
    <PageBackground>
      {/* SECTION 1: Top Section - Header, Hero Text, Button, Image */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 5,
          display: "flex",
          flexDirection: "column",
          px: { xs: 3, sm: 3, md: 4 },
          pt: { xs: 5, sm: 2.5, md: 3 },
          pb: 0,
          maxWidth: { xs: "100%", sm: "768px", md: "800px" },
          mx: "auto",
          width: "100%",
          maxHeight: "100vh",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: { xs: 1.5, sm: 2.5, md: 3 },
          }}
        >
          <Logo />
          <ActionButton
            variant="outline"
            icon={<Image src="/wending/productlog.svg" alt="Products" width={18} height={18} />}
          >
            Browse Products
          </ActionButton>
        </Box>

        {/* Hero Section */}
        <Box sx={{ mb: { xs: 2, sm: 3, md: 3.5 }, mt: 5 }}>
          <Typography
            component="h1"
            sx={{
              fontWeight: 700,
              color: "#1a1a1a",
              lineHeight: 1.2,
              mb: { xs: 1, sm: 1.5, md: 2 },
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
            }}
          >
            Ready to transform your skin with AI? Scan Now.
          </Typography>
          <Typography
            sx={{
              color: "#4a4a4a",
              lineHeight: 1.6,
              fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
              mt: 2,
            }}
          >
            Discover personalized skincare recommendations powered by AI technology
          </Typography>
        </Box>

        {/* CTA Button */}
        <ActionButton
          variant="primary"
          fullWidth
          icon={<Image src="/wending/scanlogo.svg" alt="Scan" width={22} height={22} />}
          sx={{ mb: { xs: 2, sm: 3, md: 3 },mt:2 }}
          onClick={handleStartScan}
        >
          Start AI Skin Scan
        </ActionButton>

      </Box>

      {/* SECTION 2: Bottom Section - Image + Feature Card with green background */}
      <Box
        sx={{
          position: "relative",
          zIndex: 0,
          width: "100%",
          mt: "auto", // Push to bottom
        }}
      >
        {/* Green curved background shape */}
        <Box
          component="svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <path
            d="M100,100 L100,0 Q70,20 40,50 Q15,75 0,100 L0,100 Z"
            fill="rgba(159, 249, 159, 0.42)"
          />
        </Box>

        {/* Container for image and card overlap */}
        <Box
          sx={{
            position: "relative",
            px: { xs: 2, sm: 3, md: 4 },
            pb: { xs: 1.5, sm: 2, md: 2 },
            maxWidth: { xs: "100%", sm: "768px", md: "800px" },
            mx: "auto",
            width: "100%",
          }}
        >
          {/* Hero Image - positioned above card */}
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: { xs: 280, sm: 350, md: 420 },
              zIndex: 2,
            }}
          >
            <Image
              src="/wending/img.svg"
              alt="Woman applying skincare"
              fill
              style={{ objectFit: "contain", objectPosition: "bottom center" }}
              priority
              sizes="(max-width: 600px) 100vw, (max-width: 900px) 768px, 800px"
            />
          </Box>

          {/* Feature Card - directly below image */}
          <FeatureCard
            label="LEARN MORE"
            title="AI Powered Analysis"
            description="Deep insights into your skin, powered by intelligent diagnostics."
          />
        </Box>
      </Box>
    </PageBackground>
  );
}
