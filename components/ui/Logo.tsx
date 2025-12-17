"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";

interface LogoProps {
    size?: "small" | "medium" | "large";
    showText?: boolean;
}

const sizeMap = {
    small: 32,
    medium: 56,
    large: 56,
};

export default function Logo({ size = "medium", showText = true }: LogoProps) {
    const dimension = sizeMap[size];

    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ width: dimension, height: dimension, position: "relative" }}>
                <Image
                    src="/wending/goldlogo.svg"
                    alt="Leaf Water Logo"
                    fill
                    style={{ objectFit: "contain" }}
                    priority
                />

            </Box>

            <Box sx={{ width: dimension * 2.5, height: dimension, position: "relative" }}>
                <Image
                    src="/wending/logo.svg"
                    alt="Leaf Water Logo"
                
                    fill
                    style={{ objectFit: "contain" }}
                    priority
                />
            </Box>
        </Box>
    );
}
