"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";

interface FeatureCardProps {
  label: string;
  title: string;
  description: string;
  qrCodeSrc?: string;
  activeIndex?: number;
  totalDots?: number;
}

export default function FeatureCard({
  label,
  title,
  description,
  qrCodeSrc = "/wending/qr.svg",
  activeIndex = 0,
  totalDots = 3,
}: FeatureCardProps) {
  return (
    <Box
      sx={{
        bgcolor: "#2d5a3d",
        borderRadius: { xs: 3, sm: 4 },
        p: { xs: 2, sm: 3 },
        // pr: { xs: 10, sm: 14 }, // Extra padding on right for QR code
        color: "white",
        position: "relative",
        overflow: "visible",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          sx={{
            color: "#FFFFFF",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            mb: 0.5,
            display: "block",
            fontSize: { xs: "0.65rem", sm: "0.75rem" },
          }}
        >
          {label}
        </Typography>
        <Typography
          sx={{
            fontWeight: 700,
            mb: 0.5,
            fontSize: { xs: "1rem", sm: "1.25rem" },
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            color: "#FFFFFF",
            lineHeight: 1.5,
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
            maxWidth: { xs: "85%", sm: "75%" },
          }}
        >
          {description}
        </Typography>

        {/* Pagination dots */}
        <Box sx={{ display: "flex", gap: 0.75, mt: { xs: 1.5, sm: 2 } }}>
          {Array.from({ length: totalDots }).map((_, i) => (
            <Box
              key={i}
              sx={{
                width: { xs: 6, sm: 8 },
                height: { xs: 6, sm: 8 },
                borderRadius: "50%",
                bgcolor: i === activeIndex ? "white" : "rgba(255,255,255,0.4)",
              }}
            />
          ))}
        </Box>
      </Box>

      {/* QR Code - Positioned at right, vertically centered */}
      <Box
        sx={{
          position: "absolute",
          right: { xs: 12, sm: 16, md: 20 },
          top: "50%",
          transform: "translateY(-50%)",
          width: { xs: 80, sm: 100, md: 110 },
          height: { xs: 80, sm: 100, md: 110 },
          bgcolor: "white",
          borderRadius: { xs: 2, sm: 2.5 },
          p: 1,
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        <Image
          src={qrCodeSrc}
          alt="QR Code"
          width={100}
          height={100}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </Box>
    </Box>
  );
}
