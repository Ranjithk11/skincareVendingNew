"use client";

import { Box } from "@mui/material";
import Image from "next/image";
import { ReactNode } from "react";

interface PageBackgroundProps {
  children: ReactNode;
}

export default function PageBackground({
  children,
}: PageBackgroundProps) {
  return (
    <Box
      sx={{
        minHeight: "100dvh",
        bgcolor: "#f8f6f0",
        position: "relative",
        overflow: "visible",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Wave pattern background image - top left area */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: { xs: "100%", sm: "80%", md: "100%" },
          height: { xs: "45%", sm: "50%", md: "100%" },
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <Box sx={{ display: { xs: "block", md: "none" }, position: "absolute", inset: 0 }}>
          <Image
            src="/wending/linesbg.svg"
            alt=""
            fill
            style={{
              objectFit: "contain",
              objectPosition: "top left",
            }}
            priority
          />
        </Box>
        <Box sx={{ display: { xs: "none", md: "block" }, position: "absolute", inset: 0 }}>
          <Image
            src="/wending/linesbg.png"
            alt=""
            fill
            style={{
              objectFit: "cover",
              objectPosition: "top left",
            }}
            priority
          />
        </Box>
      </Box>


      {/* Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
