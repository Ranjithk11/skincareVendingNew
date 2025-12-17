"use client";

import { Box, Typography, Radio } from "@mui/material";

interface SkinTypeOption {
  id: string;
  title: string;
  description: string;
}

interface Slide2Props {
  currentSlide: number;
  selectedSkinType: string;
  setSelectedSkinType: (id: string) => void;
  handleNext: () => void;
  skinTypeOptions: SkinTypeOption[];
}

export default function Slide2({
  currentSlide,
  selectedSkinType,
  setSelectedSkinType,
  handleNext,
  skinTypeOptions,
}: Slide2Props) {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        transform: `translateX(${currentSlide === 1 ? "0%" : "100%"})`,
        transition: "transform 0.3s ease",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Green diagonal background */}
      <Box
        component="svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "100%",
          height: "50%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <path
          d="M100,100 L100,0 Q70,30 40,60 Q15,80 0,100 Z"
          fill="rgba(159, 249, 159, 0.35)"
        />
      </Box>

      <Box sx={{ flex: 1, px: 3, pt: 3, pb: 2, overflow: "auto", position: "relative", zIndex: 1 }}>
        <Typography
          component="h1"
          sx={{
            fontWeight: 700,
            color: "#1a1a1a",
            fontSize: { xs: "1.5rem", sm: "1.75rem" },
            mb: 0.5,
          }}
        >
          What is your skin type?
        </Typography>
        <Typography sx={{ color: "#6b7280", fontSize: "0.875rem", mb: 3 }}>
          AI Powered Skincare Analysis
        </Typography>

        {/* Skin Type Options */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {skinTypeOptions.map((option) => (
            <Box
              key={option.id}
              onClick={() => setSelectedSkinType(option.id)}
              sx={{
                bgcolor: "white",
                borderRadius: 3,
                p: 2,
                cursor: "pointer",
                border: selectedSkinType === option.id ? "2px solid #2d5a3d" : "1px solid #e5e7eb",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "flex-start",
                gap: 1.5,
              }}
            >
              <Radio
                checked={selectedSkinType === option.id}
                sx={{
                  color: "#e5e7eb",
                  "&.Mui-checked": { color: "#2d5a3d" },
                  p: 0,
                  mt: 0.5,
                }}
              />
              <Box>
                <Typography sx={{ fontWeight: 600, color: "#1a1a1a", fontSize: "1rem", mb: 0.5 }}>
                  {option.title}
                </Typography>
                <Typography sx={{ color: "#6b7280", fontSize: "0.8rem", lineHeight: 1.4 }}>
                  {option.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Submit Button */}
      <Box
        sx={{
          bgcolor: "#2d5a3d",
          py: 1.5,
          mx: 3,
          mb: 3,
          borderRadius: 2,
          textAlign: "center",
          cursor: "pointer",
          position: "relative",
          zIndex: 1,
        }}
        onClick={handleNext}
      >
        <Typography sx={{ color: "white", fontWeight: 600, fontSize: "1rem" }}>Continue</Typography>
      </Box>
    </Box>
  );
}
