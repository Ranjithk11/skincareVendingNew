"use client";

import React, { useState } from "react";
import { Box, Card, Grid, Switch, Typography, useMediaQuery, useTheme } from "@mui/material";

/* ===============================
   PAGE BACKGROUND (FIXED)
================================ */
const PageBackground = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        position: "relative", // 🔴 FIX: never fixed
        backgroundColor: "#fff",
        backgroundImage: {
          xs: "url('/wending/linesbg.svg')",
          sm: "url('/wending/linesbg.png')",
        },
        backgroundRepeat: "no-repeat",
        backgroundSize: {
          xs: "700px auto",
          sm: "100% auto",
        },
        backgroundPosition: {
          xs: "top -60px right -180px",
          sm: "top -80px right -240px",
        },
        pb: 4,
      }}
    >
      {children}
    </Box>
  );
};

/* ===============================
   STEP RAIL (PIXEL PERFECT)
================================ */
const StepRail = ({ index, total }: { index: number; total: number }) => {
  return (
    <Box
      sx={{
        width: 36,
        display: "flex",
        alignItems: "stretch",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* Vertical Line */}
      <Box
        sx={(theme) => ({
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          top: index === 0 ? 0 : `calc(-1 * ${theme.spacing(3)})`,
          bottom: index === total - 1 ? 0 : `calc(-1 * ${theme.spacing(3)})`,
          width: 5,
          background: "linear-gradient(360deg, #1DC9A0 0%, #316D52 100%)",
          borderRadius: 999,
          zIndex: 1,
        })}
      />


      {/* Step Number */}
      <Box
        sx={{
          width: 26,
          height: 26,
          borderRadius: "50%",
          background: "linear-gradient(360deg, #1DC9A0 0%, #316D52 100%)",
          color: "#fff",
          fontSize: 12,
          fontWeight: 800,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
          mt: 0.5,
        }}
      >
        {index + 1}
      </Box>
    </Box>
  );
};

/* ===============================
   HOW TO USE CARD (WITH IMAGE)
================================ */
const HowToUseCard = ({
  title,
  body,
  image,
}: {
  title: string;
  body: string;
  image?: string;
}) => {
  return (
    <Card
      sx={{
        mt: 1.5,
        p: { xs: 1.5, md: 2.5 },
        borderRadius: 2,
        border: "1px solid #e5e7eb",
        boxShadow: "none",
        display: "flex",
        alignItems: { md: "center" },
        gap: { xs: 1.5, md: 3 },
      }}
    >
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontSize: { xs: 12, md: 16 }, fontWeight: 900 }}>
          {title}
        </Typography>
        <Typography sx={{ mt: 0.75, fontSize: { xs: 11, md: 13 }, color: "#374151" }}>
          {body}
        </Typography>
      </Box>

      {image && (
        <Box
          component="img"
          src={image}
          sx={{
            width: { xs: 70, md: 140 },
            height: { xs: 70, md: 140 },
            objectFit: "contain",
            flexShrink: 0,
          }}
        />
      )}
    </Card>
  );
};

/* ===============================
   PRODUCT CARD
================================ */
const ProductCard = ({
  title,
  price,
  image,
}: {
  title: string;
  price: string;
  image: string;
}) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Card
      sx={{
        p: { xs: 1.5, md: 2 },
        borderRadius: 2,
        border: "1px solid #e5e7eb",
        boxShadow: "none",
        height: "100%",
        display: isDesktop ? "flex" : "block",
        alignItems: isDesktop ? "center" : undefined,
        gap: isDesktop ? 2 : undefined,
      }}
    >
      <Box
        sx={{
          height: { xs: 100, md: 140 },
          width: isDesktop ? 140 : "100%",
          minWidth: isDesktop ? 140 : undefined,
          bgcolor: "#f3f4f6",
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={image} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ mt: isDesktop ? 0 : 1, fontSize: { xs: 11, md: 13 }, fontWeight: 700 }}>
          {title}
        </Typography>

        <Typography sx={{ fontSize: { xs: 11, md: 13 }, fontWeight: 800, color: "#0f766e" }}>
          {price}
        </Typography>

        <Box sx={{ mt: 1, display: "flex", gap: 1, justifyContent: isDesktop ? "flex-start" : "flex-start" }}>
          <Box
            sx={{
              flex: isDesktop ? "0 0 auto" : 1,
              px: 2,
              py: 0.7,
              border: "1px solid #e5e7eb",
              borderRadius: 999,
              fontSize: 10,
              fontWeight: 700,
              textAlign: "center",
              minWidth: isDesktop ? 96 : undefined,
            }}
          >
            Buy Now
          </Box>
          <Box
            sx={{
              px: 1.5,
              py: 0.7,
              borderRadius: 999,
              bgcolor: "#0f766e",
              color: "#fff",
              fontSize: 10,
              fontWeight: 800,
              minWidth: isDesktop ? 64 : undefined,
              textAlign: "center",
            }}
          >
            Try
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

/* ===============================
   MAIN PAGE
================================ */
export default function SkincareRoutinePage() {
  const [night, setNight] = useState(false);

  const steps = night
    ? [
      {
        title: "Cleanser",
        subtitle: "Removes dirt and impurities.",
        howTitle: "How to Use Your Cleanser",
        howBody: "Wet your face with lukewarm water and apply a small amount of cleanser to your fingertips. Gently massage it onto your skin in circular motions for 20–30 seconds, focusing on areas with excess oil or buildup. Rinse thoroughly and pat your skin dry with a clean towel. Use twice daily for best results.",
        howImg: "/products/ceta1.svg",
        products: [
          { title: "Cetaphil Creamy Cleanser", price: "Rs. 599/-", image: "/products/cetaPink.png" },
          { title: "Cetaphil Gentle Skin Cleanser", price: "Rs. 654/-", image: "/products/ceta1.svg" },
        ],
      },
      {
        title: "Face Serum",
        subtitle: "Delivers active ingredients.",
        howTitle: "How to Use Serum",
        howBody: "Apply 2–3 drops at night.",
        howImg: "/products/pilgram.svg",
        products: [
          { title: "Pilgrim Niacinamide Serum", price: "Rs. 590/-", image: "/products/pilgram.svg" },
        ],
      },
    ]
    : [
      {
        title: "Cleanser",
        subtitle: "Removes dirt, oil and impurities.",
        howTitle: "How to Use Your Cleanser",
        howBody: "Wet your face with lukewarm water and apply a small amount of cleanser to your fingertips.",
        howImg: "/products/ceta1.svg",
        products: [
          { title: "Cetaphil Creamy Cleanser", price: "Rs. 599/-", image: "/products/cetaPink.png" },
          { title: "Cetaphil Gentle Skin Cleanser", price: "Rs. 654/-", image: "/products/ceta1.svg" },
        ],
      },
      {
        title: "Daycream",
        subtitle: "Hydrates and protects skin.",
        howTitle: "How to Use Daycream",
        howBody: "After cleansing, apply a small amount of day cream to your face and neck. Gently massage it in using upward, circular motions until fully absorbed.",
        howImg: "/products/cetapik.svg",
        products: [
          { title: "Cetaphil Brightening Day Cream", price: "Rs. 1019/-", image: "/products/cetapik.svg" },
        ],
      },
      {
        title: "Sunscreen",
        subtitle: "Protects from UV rays.",
        howTitle: "How to Use Sunscreen",
        howBody: "Apply sunscreen as the final step in your morning routine. Use a generous amount and spread it evenly over your face and neck.",
        howImg: "/products/cetayellow.svg",
        products: [
          { title: "Pilgrim SPF 50", price: "Rs. 599/-", image: "/products/ultrasun.png" },
        ],
      },
    ];

  return (
    <PageBackground>
      <Box sx={{ px: 2, pt: 2, width: "100%" }}>
        {/* HEADER */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 800 }}>
              My Skincare Routine – {night ? "Night" : "Day"}
            </Typography>
            <Typography sx={{ fontSize: 10, color: "#6b7280" }}>
              {night ? "NIGHTTIME ROUTINE" : "DAYTIME ROUTINE"}
            </Typography>
          </Box>
          <Switch checked={night} onChange={(e) => setNight(e.target.checked)} />
        </Box>

        {/* STEPS */}
        {steps.map((s, i) => (
          <Box key={i} sx={{ display: "flex", gap: 2, mb: 3 }}>
            <StepRail index={i} total={steps.length} />
            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 900 }}>{s.title}</Typography>
              <Typography sx={{ fontSize: 11, color: "#374151" }}>
                {s.subtitle}
              </Typography>

              <HowToUseCard title={s.howTitle} body={s.howBody} image={s.howImg} />

              <Grid container spacing={1.5} sx={{ mt: 1 }}>
                {s.products.map((p, idx) => (
                  <Grid item xs={6} key={idx}>
                    <ProductCard {...p} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        ))}
      </Box>
    </PageBackground>
  );
}
