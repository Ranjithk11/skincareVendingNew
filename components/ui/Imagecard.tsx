
"use client";

import { Box } from "@mui/material";
import Image from "next/image";

export default function Imagecard() {
  return (
    <Box
      sx={{
        position: "relative",
        width: "674px",
        height: "750px",
        opacity: 1,
      }}
    >
      <Image
        src="/wending/img.svg"
        alt="Woman applying skincare"
        fill
        style={{ objectFit: "contain", objectPosition: "bottom center" }}
        priority
        sizes="674px"
      />
    </Box>
  );
}
