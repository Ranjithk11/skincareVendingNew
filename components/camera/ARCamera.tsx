import React, { useEffect, useRef, useState } from "react";
import {
  camera,
  faceDetectionAdapter,
  loadFaceDetectorModels,
} from "@biopassid/face-sdk";
import { arCameraOptions } from "./config";
import Button from "@mui/material/Button";
import { Box, Grid, Typography, styled } from "@mui/material";
import { APP_BAR_SIZE } from "@/utils/constants";
import { Icon } from "@iconify/react";

const StyledCameraCapture = styled(Box)(({ theme }) => ({
  padding: 10,
  boxSizing: "border-box",
  overflow: "hidden",
}));

const StyledARCameraComponent = styled(Box)(({ theme }) => ({
  // height: `calc(100vh - ${APP_BAR_SIZE}px)`,
  // width: "60%",
  // display: "flex",
  // flexDirection: "column",
  // padding: 20,
  // [theme.breakpoints.only("xs")]: {
  //   padding: 0,
  //   width: "100%",
  //   height: `calc(100vh - ${56}px)`,
  // },
  // "& .camera_capture_view": {
  //   flex: 1,
  //   width: "100%",
  //   position: "relative",
  //   overflow: "hidden",
  //   borderRadius: 20,
  //   backgroundColor: theme.palette.secondary.main,
  //   [theme.breakpoints.only("xs")]: {
  //     borderRadius: 0,
  //   },
  //   "& .info_view": {
  //     width: "100%",
  //     height: "100%",
  //     display: "flex",
  //     flexDirection: "column",
  //     alignItems: "center",
  //     justifyContent: "center",
  //     backgroundColor: theme.palette.secondary.main,
  //     "& .MuiTypography-body1": {
  //       color: theme.palette.common.white,
  //       fontSize: 18,
  //       width: "55%",
  //       lineHeight: 1.3,
  //       textAlign: "center",
  //       [theme.breakpoints.only("xs")]: {
  //         fontSize: 18,
  //         width: "95%",
  //       },
  //     },
  //     "& svg": {
  //       fontSize: 120,
  //       [theme.breakpoints.only("xs")]: {
  //         fontSize: 100,
  //       },
  //     },
  //   },
  //   "& .camera_view": {
  //     width: "100%",
  //     height: "100%",
  //   },
  //   "& .footer": {
  //     display: "none",
  //     position: "absolute",
  //     width: "100%",
  //     bottom: 40,
  //     "& .MuiButtonBase-root": {
  //       minWidth: 0,
  //     },
  //     [theme.breakpoints.only("xs")]: {
  //       padding: 10,
  //       display: "block",
  //     },
  //   },
  // },
  // "& .camera_view_footer": {
  //   minHeight: 70,
  //   maxHeight: 70,
  //   width: "100%",
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   "& .MuiButtonBase-root": {
  //     minWidth: 0,
  //   },
  //   [theme.breakpoints.only("xs")]: {
  //     padding: 10,
  //     display: "none",
  //   },
  // },
}));

interface ARCameraComponentProps {
  onCaptured: (file: any) => void;
  onSkip: () => void;
  disabledSkipBtn?: boolean;
  initializing: boolean;
  autoStart?: boolean;
}

const ARCameraComponent = ({
  onCaptured,
  onSkip,
  disabledSkipBtn,
  initializing,
  autoStart = false,
}: ARCameraComponentProps) => {
  const { takePicture } = camera();
  const [isCamOpen, setIsCamOpen] = useState<boolean>(false);
  const refAccessFiles = useRef<HTMLInputElement>(null);
  const hasAutoStartedRef = useRef(false);
  const maskTweakedRef = useRef(false);

  async function handleTakePicture() {
    setIsCamOpen(true);
    await loadFaceDetectorModels();
    try {
      const resp = await takePicture({
        element: document.querySelector("#elementId") as HTMLDivElement,
        faceDetectionAdapter: faceDetectionAdapter,
        options: arCameraOptions,
      });
      onCaptured(resp?.base64);
      setIsCamOpen(false);
    } catch (error) {
      setIsCamOpen(false);
    }
  }

  const handleUploadFiles = async (event: any) => {
    let file = event?.target?.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      onCaptured(reader.result);
    };
    reader.onerror = function (error) {
      alert("Something wrong please try again...");
    };
  };

  useEffect(() => {
    if (!autoStart) return;
    if (initializing) return;
    if (isCamOpen) return;
    if (hasAutoStartedRef.current) return;

    hasAutoStartedRef.current = true;
    handleTakePicture();
  }, [autoStart, initializing, isCamOpen]);

  useEffect(() => {
    if (!isCamOpen) {
      maskTweakedRef.current = false;
      return;
    }

    const root = document.querySelector("#elementId") as HTMLDivElement | null;
    if (!root) return;

    const applyMaskTweaks = () => {
      if (maskTweakedRef.current) return;

      const whiteOverlayTransform = "translateY(-30px) scale(1.1)";
      const greenOverlayTransform = "translateY(-30px) scale(1.0)";

      const candidates = Array.from(root.querySelectorAll("*")).filter((el) => {
        const styleAttr = el.getAttribute("style") || "";
        if (/clip-path\s*:/i.test(styleAttr)) return true;
        if (el.tagName.toLowerCase() === "svg") return true;
        return false;
      });

      const allSvgs = Array.from(root.querySelectorAll<SVGElement>("svg")).filter(
        (svg) => {
          const rect = svg.getBoundingClientRect();
          return rect.width >= 200 && rect.height >= 200;
        }
      );

      if (candidates.length === 0 && allSvgs.length === 0) return;

      candidates.forEach((target) => {
        const htmlTarget = target as HTMLElement;
        htmlTarget.style.transformOrigin = "center";
        htmlTarget.style.transform = whiteOverlayTransform;

        const svg =
          target instanceof SVGElement
            ? target
            : target.querySelector("svg");
        if (!svg) return;

        const strokeEls = svg.querySelectorAll<SVGElement>("[stroke]");
        strokeEls.forEach((el) => {
          const current = el.getAttribute("stroke-width");
          if (!current) return;
          const num = Number(current);
          if (!Number.isFinite(num)) return;
          el.setAttribute(
            "stroke-width",
            String(Math.max(1, Math.round(num * 0.75)))
          );
        });
      });

      allSvgs.forEach((svg) => {
        const svgEl = svg as unknown as HTMLElement;
        svgEl.style.transformOrigin = "center";
        const hasGreenStroke =
          !!svg.querySelector(
            '[stroke="#00FF00"], [stroke="#00ff00"], [stroke="rgb(0,255,0)"], [stroke="rgb(0, 255, 0)"]'
          );

        svgEl.style.transform = hasGreenStroke
          ? greenOverlayTransform
          : whiteOverlayTransform;
      });

      const findSvgByStroke = (strokeSelectors: string[]) => {
        for (const selector of strokeSelectors) {
          const el = root.querySelector(`svg:has(${selector})`) as SVGElement | null;
          if (el) return el;
        }
        for (const svg of allSvgs) {
          for (const selector of strokeSelectors) {
            if (svg.querySelector(selector)) return svg;
          }
        }
        return null;
      };

      const whiteSvg = findSvgByStroke([
        '[stroke="#FFFFFF"]',
        '[stroke="#ffffff"]',
        '[stroke="white"]',
      ]);
      const greenSvg = findSvgByStroke([
        '[stroke="#00FF00"]',
        '[stroke="#00ff00"]',
        '[stroke="rgb(0,255,0)"]',
        '[stroke="rgb(0, 255, 0)"]',
      ]);

      if (whiteSvg && greenSvg) {
        const whiteRect = whiteSvg.getBoundingClientRect();
        const greenRect = greenSvg.getBoundingClientRect();
        if (greenRect.width > 0 && greenRect.height > 0) {
          const widthRatio = whiteRect.width / greenRect.width;
          const heightRatio = whiteRect.height / greenRect.height;
          const ratio = (widthRatio + heightRatio) / 2;
          const clamped = Math.max(0.9, Math.min(1.1, ratio));
          const greenEl = greenSvg as unknown as HTMLElement;
          greenEl.style.transformOrigin = "center";
          greenEl.style.transform = `translateY(-30px) scale(${clamped.toFixed(3)})`;
        }
      }
      maskTweakedRef.current = true;
    };

    applyMaskTweaks();

    const observer = new MutationObserver(() => applyMaskTweaks());
    observer.observe(root, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [isCamOpen]);

  return (
    <>
      {!isCamOpen && (
        <Box
          component="div"
          className="scanning-section"
        >
          <Box pt={2}>
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ color: "white" }}>
                  Take a selfie and receive your <br />
                  personal recommendations
                </Typography>
              </Grid>
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                item
                spacing={3}
                xs={12}
              >
                <Grid item>
                  <Button
                    disabled={initializing}
                    sx={{ backgroundColor: "#3AC862" }}
                    endIcon={<Icon icon="material-symbols:camera" />}
                    onClick={() => {
                      if (isCamOpen) {
                        return null;
                      } else {
                        handleTakePicture();
                      }
                    }}
                  >
                    Take Selfie
                  </Button>
                </Grid>
                {/* <Grid item>
                  <Button
                    disabled={initializing}
                    sx={{ backgroundColor: "#48C2DD" }}
                    onClick={() => {
                      if (isCamOpen) {
                        return null;
                      } else {
                        refAccessFiles?.current?.click();
                      }
                    }}
                    endIcon={
                      <Icon icon="material-symbols:backup-outline-rounded" />
                    }
                    color="primary"
                  >
                    Gallery
                  </Button>
                </Grid> */}
              </Grid>
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                item
                xs={12}
              >
                <Box
                  sx={{
                    maxWidth: 300,
                    backgroundColor: "#464646C9",
                    color: "white",
                    textAlign: "center",
                  }}
                  padding={1}
                >
                  Please stand in a well lit area with as few objects as
                  possible.
                </Box>
              </Grid>
              
            </Grid>
          </Box>
          <input
            ref={refAccessFiles}
            type="file"
            accept="image/*"
            hidden
            onChange={handleUploadFiles}
          />
        </Box>
      )}
      {isCamOpen && (
        <StyledCameraCapture
          component="div"
          id="elementId"
          className="scanning-section"
        ></StyledCameraCapture>
      )}
    </>
    // <StyledARCameraComponent>
    //   <Box component="div" className="camera_capture_view">
    //     {!isCamOpen && (
    //       <Box component="div" className="info_view">
    //         <Box mb={2}>
    //           <Icon icon="tabler:camera-selfie" />
    //         </Box>
    //         <Typography variant="body1">
    //           {initializing
    //             ? "Please wait..."
    //             : "Please, set your desired configurations and press the Capture button to start"}
    //         </Typography>
    //       </Box>
    //     )}
    //     {isCamOpen && (
    //       <Box component="div" id="elementId" className="camera_view"></Box>
    //     )}
    //     <Box component="div" className="footer">
    //       <Grid
    //         container
    //         spacing={2}
    //         alignItems="center"
    //         justifyContent="space-between"
    //       >
    //         <Grid item xs={4}>
    //           <Button
    //             disabled={initializing}
    //             fullWidth={true}
    //             variant="contained"
    //             color="milkWhite"
    //             onClick={() => {
    //               if (isCamOpen) {
    //                 return null;
    //               } else {
    //                 refAccessFiles?.current?.click();
    //               }
    //             }}
    //           >
    //             Gallery
    //           </Button>
    //         </Grid>
    //         <Grid item xs={4}>
    //           <Button
    //             fullWidth={true}
    //             onClick={() => {
    //               if (isCamOpen) {
    //                 return null;
    //               } else {
    //                 handleTakePicture();
    //               }
    //             }}
    //           >
    //             Capture
    //           </Button>
    //         </Grid>
    //         <Grid item xs={4}>
    //           <Button
    //             disabled={initializing}
    //             color="inherit"
    //             fullWidth={true}
    //             onClick={() => {
    //               if (isCamOpen || disabledSkipBtn) {
    //                 return null;
    //               } else {
    //                 onSkip();
    //               }
    //             }}
    //           >
    //             Skip
    //           </Button>
    //         </Grid>
    //       </Grid>
    //     </Box>
    //   </Box>
    //   <Box component="div" className="camera_view_footer">
    //     <Grid
    //       container
    //       spacing={2}
    //       alignItems="center"
    //       justifyContent="space-between"
    //     >
    //       <Grid item xs={4}>
    //         <Button
    //           fullWidth={true}
    //           variant="outlined"
    //           disabled={initializing}
    //           onClick={() => {
    //             if (isCamOpen) {
    //               return null;
    //             } else {
    //               refAccessFiles?.current?.click();
    //             }
    //           }}
    //         >
    //           Gallery
    //         </Button>
    //       </Grid>
    //       <Grid item xs={4}>
    //         <Button
    //           fullWidth={true}
    //           disabled={isCamOpen || initializing}
    //           onClick={handleTakePicture}
    //         >
    //           Capture
    //         </Button>
    //       </Grid>
    //       <Grid item xs={4}>
    //         <Button
    //           color="inherit"
    //           disabled={disabledSkipBtn || initializing}
    //           fullWidth={true}
    //           onClick={() => {
    //             if (isCamOpen) {
    //               return null;
    //             } else {
    //               onSkip();
    //             }
    //           }}
    //         >
    //           Skip
    //         </Button>
    //       </Grid>
    //     </Grid>
    //   </Box>
    //   <input
    //     ref={refAccessFiles}
    //     type="file"
    //     accept="image/*"
    //     hidden
    //     onChange={handleUploadFiles}
    //   />
    // </StyledARCameraComponent>
  );
};

export default ARCameraComponent;
