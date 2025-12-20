"use client";
import HomeBannerComponent from "@/containers/home/Banner/Banner";
import HowItWork from "@/containers/home/HowItWork/HowItWork";
import ScanYourFace from "@/containers/home/ScanFace/ScanFace";
import StepThree from "@/containers/home/SetpThree/StepThree";
import DesktopLandingPage from "@/containers/slides/desktopLading";
import LandingPage from "@/containers/slides/landingPage";
import { useValidateDomainMutation } from "@/redux/api/authApi";
import { Container, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect } from "react";

const HomePage = () => {
  const [validateDomain, { data }] = useValidateDomainMutation();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    const getSubDomain = () => {
      if (typeof window === "undefined") return null;

      const host = window.location.hostname;
      const parts = host.split(".").filter(Boolean);

      if (parts.length === 2 && parts[1] === "localhost") {
        return parts[0];
      }

      if (parts.length <= 2) return null;

      const sub = parts[0];
      if (!sub || sub === "www") return null;

      return sub;
    };

    const subDomain = getSubDomain();
    if (!subDomain) return;

    validateDomain({ subDomain });
  }, [validateDomain]);


  return (
    <>
      <Container disableGutters maxWidth="xl">
        {/* <HomeBannerComponent />
        <HowItWork />
        <ScanYourFace />
        <StepThree /> */}
        <LandingPage />
      </Container>
    </>
  );
};

export default HomePage;
