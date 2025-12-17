"use client";

import { Button, ButtonProps } from "@mui/material";
import { ReactNode } from "react";

interface ActionButtonProps extends Omit<ButtonProps, "variant"> {
  children: ReactNode;
  variant?: "primary" | "outline";
  icon?: ReactNode;
  fullWidth?: boolean;
}

export default function ActionButton({
  children,
  variant = "primary",
  icon,
  fullWidth = false,
  sx,
  ...props
}: ActionButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <Button
      fullWidth={fullWidth}
      startIcon={icon}
      sx={{
        borderRadius: "50px",
        textTransform: "none",
        py: isPrimary ? { xs: 1.25, sm: 1.5 } : { xs: 0.875, sm: 1 },
        px: isPrimary ? { xs: 2.5, sm: 3 } : { xs: 1.5, sm: 2 },
        fontSize: isPrimary
          ? { xs: "0.95rem", sm: "1.1rem" }
          : { xs: "0.75rem", sm: "0.85rem" },
        fontWeight: 500,
        boxShadow: isPrimary ? 3 : 0,
        bgcolor: isPrimary ? "#2d5a3d" : "white",
        color: isPrimary ? "white" : "#374151",
        border: isPrimary ? "none" : "1px solid #e5e7eb",
        "&:hover": {
          bgcolor: isPrimary ? "#234a31" : "#f9fafb",
          borderColor: isPrimary ? "none" : "#d1d5db",
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
