"use client";
import HomeBannerComponent from "@/containers/home/Banner/Banner";
import HowItWork from "@/containers/home/HowItWork/HowItWork";
import ScanYourFace from "@/containers/home/ScanFace/ScanFace";
import StepThree from "@/containers/home/SetpThree/StepThree";
import DesktopLandingPage from "@/containers/slides/desktopLading";
import LandingPage from "@/containers/slides/landingPage";
import { Container, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const HomePage = () => {
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
