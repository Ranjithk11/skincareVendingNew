import {
  Button,
  Card,
  Dialog,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Box from "@mui/material/Box";
import { styled, useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/utils/routes";
import Image from "next/image";
import VendingProducts from "./vendingproducts";
import VendingServices from "./vendingServices";
import DietChart from "./DietChart";
import SkincareRoutine from "./skincareRoutine";

const StyledCoverWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100dvh",
  backgroundColor: "#f8f6f0",
  position: "relative",
  overflow: "hidden",
  "& .user-popup-image": {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "top",
  },
  "& .dialog-info": {
    width: 450,
    padding: 20,
  },
}));

const StyledTopHeader = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 16,
  left: 16,
  right: 16,
  zIndex: 3,
  backgroundColor: theme.palette.common.white,
  borderRadius: 16,
  padding: "10px 12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  boxShadow: "0 8px 18px rgba(0,0,0,0.10)",
}));

const StyledHeroImage = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: "100%",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

const StyledBottomSheet = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 2,
  backgroundColor: theme.palette.common.white,
  borderTopLeftRadius: 24,
  borderTopRightRadius: 24,
  padding: 14,
  boxShadow: "0 -10px 24px rgba(0,0,0,0.10)",
  maxHeight: "62dvh",
  overflowY: "auto",
}));

const StyledPillButton = styled(Box)(({ theme }) => ({
  borderRadius: 999,
  padding: "8px 14px",
  display: "flex",
  alignItems: "center",
  gap: 8,
  fontSize: 12,
  fontWeight: 600,
  cursor: "pointer",
  border: "1px solid #e5e7eb",
  color: "#111827",
  backgroundColor: theme.palette.common.white,
  userSelect: "none",
}));

const StyledTabPill = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  borderRadius: 999,
  padding: "8px 14px",
  fontSize: 12,
  fontWeight: 600,
  cursor: "pointer",
  userSelect: "none",
  border: "1px solid #e5e7eb",
}));

const StyledMetricCard = styled(Box)(({ theme }) => ({
  border: "1px solid #f0d89a",
  borderRadius: 12,
  padding: 12,
  backgroundColor: theme.palette.common.white,
  textAlign: "center",
  minHeight: 72,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

interface CoverPageProps {
  useData: any;
  dataFUQR: any;
  publicUserProfile?: any;
  analysisData?: any;
}

const DPI = 96;
const mmToPx = (mm: number) => Math.round((mm * DPI) / 25.4);

const VENDING_DISPLAY_MM = { width: 404, height: 711 };
const VENDING_OUTER_BODY_MM = { width: 461, height: 767 };

const VENDING_DISPLAY_PX = {
  width: mmToPx(VENDING_DISPLAY_MM.width),
  height: mmToPx(VENDING_DISPLAY_MM.height),
};

const VENDING_OUTER_BODY_PX = {
  width: mmToPx(VENDING_OUTER_BODY_MM.width),
  height: mmToPx(VENDING_OUTER_BODY_MM.height),
};

const CoverPage: React.FC<CoverPageProps> = ({
  useData,
  dataFUQR,
  publicUserProfile,
  analysisData,
}) => {
  const { data: session } = useSession();
  const theme = useTheme();
  const [showUserInfo, setShowUserInfo] = useState<boolean>(false);
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isKiosk = useMediaQuery(theme.breakpoints.up("md"));
  const [tab, setTab] = useState(0);
  const [recTab, setRecTab] = useState<"products" | "services" | "diet">(
    "products"
  );

  const reportSource =
    analysisData?.data?.[0] ||
    analysisData?.data ||
    analysisData?.productRecommendation ||
    analysisData ||
    null;

  const getIn = (obj: any, path: string) => {
    if (!obj || !path) return undefined;
    return path.split(".").reduce((acc: any, key: string) => {
      if (acc == null) return undefined;
      return acc[key];
    }, obj);
  };

  const asNumber = (v: any, fallback: number) => {
    if (typeof v === "number" && Number.isFinite(v)) return v;
    if (typeof v === "string") {
      const cleaned = v.trim().replace(/[^0-9.+-]/g, "");
      const n = Number(cleaned);
      return Number.isFinite(n) ? n : fallback;
    }
    return fallback;
  };

  const pickNumber = (paths: string[], fallback: number) => {
    for (const p of paths) {
      const raw = getIn(reportSource, p);
      const parsed = asNumber(raw, NaN as any);
      if (Number.isFinite(parsed)) return parsed;
    }
    return fallback;
  };

  const overallScore = pickNumber(
    [
      "skinHealthScore",
      "overallScore",
      "score",
      "skincareHealthScore",
      "skinHealth.score",
      "skinHealth.overallScore",
      "skinSummary.score",
      "skinSummary.overallScore",
      "analysis.overallScore",
      "analysis.score",
    ],
    85
  );

  const metrics = [
    {
      label: "Moisture",
      value: pickNumber(
        [
          "moisture",
          "moistureScore",
          "skinHealth.moisture",
          "skinHealth.moistureScore",
          "skinSummary.moisture",
          "skinSummary.moistureScore",
        ],
        63
      ),
    },
    {
      label: "Wrinkles",
      value: pickNumber(
        [
          "wrinkles",
          "wrinklesScore",
          "skinHealth.wrinkles",
          "skinHealth.wrinklesScore",
          "skinSummary.wrinkles",
          "skinSummary.wrinklesScore",
        ],
        25
      ),
    },
    {
      label: "Dark Spots",
      value: pickNumber(
        [
          "darkSpots",
          "darkSpotsScore",
          "skinHealth.darkSpots",
          "skinHealth.darkSpotsScore",
          "skinSummary.darkSpots",
          "skinSummary.darkSpotsScore",
        ],
        46
      ),
    },
  ];

  const recTabs = [
    {
      key: "products" as const,
      label: "Products",
      imageSrc: "/products/product.svg",
    },
    {
      key: "services" as const,
      label: "Services",
      imageSrc: "/products/service.svg",
    },
    {
      key: "diet" as const,
      label: "Diet",
      imageSrc: "/products/diet.svg",
    },
  ];

  const keyConcerns = [
    {
      title: "Acne",
      // dotColor: "#ef4444",
      imageSrc: "/wending/acne.svg",
    },
    {
      title: "Open Pores",
      // dotColor: "#a855f7",
      imageSrc: "/wending/open.svg",
    },
    {
      title: "Uneven Skin",
      //dotColor: "#f97316",
      imageSrc: "/wending/uneven.svg",
    },
  ];

  return (
    <>
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          bgcolor: "#f8f6f0",
          ...(isKiosk
            ? {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }
            : null),
        }}
      >
        <Box
          sx={
            isKiosk
              ? {
                width: `min(${VENDING_DISPLAY_PX.width}px, 100vw)`,
                height: `min(${VENDING_DISPLAY_PX.height}px, 100vh)`,
                maxWidth: "100vw",
                maxHeight: "100vh",
                position: "relative",
                overflowX: "hidden",
                overflowY: "auto",
                backgroundColor: "#f8f6f0",
                boxShadow: 3,
              }
              : {
                width: "100%",
                minHeight: "100vh",
                position: "relative",
              }
          }
        >
          <Box
            sx={{
              p: { xs: 1.5, sm: 2 },
              px: { xs: 2, sm: 3 },
              position: isKiosk ? "absolute" : "fixed",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: { xs: 1, sm: 2 },
              bgcolor: "white",
              borderRadius: "0 0 16px 16px",
              boxShadow: 2,
              top: 0,
              left: 0,
              right: 0,
              zIndex: 10,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: 0,
              }}
            >
              <Image src="/wending/goldlogo.svg" width={50} height={50} alt="" />
              <Image
                src="/wending/logo.svg"
                alt="Leaf Water"
                width={100}
                height={50}
                style={{ objectFit: "contain" }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: { xs: 1, sm: 2 },
                flexWrap: { xs: "nowrap", sm: "wrap" },
                justifyContent: "flex-end",
                width: "auto",
              }}
            >
              <Button
                variant="outlined"
                size="small"
                sx={{
                  borderRadius: 20,
                  textTransform: "none",
                  width: { xs: "auto", sm: "auto" },
                  flex: "0 0 auto",
                  minWidth: 0,
                  px: { xs: 1, sm: 2 },
                  whiteSpace: "nowrap",
                }}
                onClick={() => setShowUserInfo(true)}
              >
                <Image src="/icons/cart.svg" width={24} height={24} alt="" />
                &nbsp;My cart
              </Button>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  borderRadius: 20,
                  textTransform: "none",
                  width: { xs: "auto", sm: "auto" },
                  flex: "0 0 auto",
                  minWidth: 0,
                  px: { xs: 1, sm: 2 },
                  whiteSpace: "nowrap",
                }}
                onClick={() => router.push(APP_ROUTES.SELFIE)}
              >
                <Image src="/icons/face.png" width={24} height={24} alt="" />
                &nbsp;Scan again
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "center",
              position: "relative",
              px: { xs: 0, sm: 2 },
              pt: isKiosk ? 8 : 0,
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                maxWidth: { xs: "100%", sm: 420, md: "100%" },
                height: { xs: "58vh", sm: "60vh", md: "72vh", lg: "78vh" },
                borderRadius: { xs: 0, sm: 2 },
                overflow: "hidden",
                boxShadow: 2,
                bgcolor: "#111827",
              }}
            >
              {useData?.data?.url && (
                <Image
                  src={useData?.data?.url}
                  alt="User Image"
                  fill
                  sizes="(max-width: 600px) 90vw, (max-width: 900px) 380px, 100vw"
                  style={{ objectFit: "contain" }}
                />
              )}
            </Box>
          </Box>

          <Card
            sx={{
              mt: -6,
              width: "100%",
              mx: 0,
              p: { xs: 2, sm: 3 },
              borderRadius: "24px 24px 0 0",
              boxShadow: 3,
              backgroundColor: "#fff",
            }}
          >


            <Tabs
              value={tab}
              onChange={(e, newValue) => setTab(newValue)}
              variant="fullWidth"
              sx={{
                "& .MuiTabs-indicator": { display: "none" },
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: 10,
                  px: 3,
                  py: 1,
                },
                "& .MuiTab-root.Mui-selected": {
                  color: "white",
                  border: "2px solid #91908fff",
                },
              }}
            >
              <Tab
                label="Skin Health"
                sx={{
                  bgcolor: tab === 0 ? "#2d5a3d" : "white",
                  color: tab === 0 ? "white" : "black",
                  border: "2px solid #91908fff",

                }}
              />
              <Tab
                label="Recommendations"
                sx={{
                  bgcolor: tab === 1 ? "#2d5a3d" : "white",
                  color: tab === 1 ? "white" : "black",
                  border: "2px solid #91908fff",
                }}
              />
            </Tabs>

            <Typography sx={{ mt: 3,mb:2, fontWeight: 700, fontSize: 30 }}>
              {tab === 0 ? "My Skincare Report" : "Recommendations"}
            </Typography>
            <Typography sx={{ mb: 3, fontSize: 30, color: "gray" }}>
              {tab === 0 ? "UNDERSTAND YOUR SKIN AT A GLANCE" : "WHAT WE RECOMMEND"}
            </Typography>

            {tab === 1 && (
              <>
                <Box
                  sx={{
                    display: "flex",
                    gap: { xs: 1.5, md: 2 },
                    overflowX: { xs: "auto", md: "hidden" },
                    pb: 1,
                    width: { md: "100%" },
                  }}
                >
                  {recTabs.map((t) => {
                    const active = recTab === t.key;
                    return (
                      <Box
                        key={t.key}
                        onClick={() => setRecTab(t.key)}
                        sx={{
                          flex: "0 0 auto",
                          width: { xs: 120, md: "calc((100% - 32px) / 3)" },
                          height: { xs: 56, md: 100 },
                          borderRadius: 2,
                          px: { xs: 1.5, md: 2 },
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          cursor: "pointer",
                          bgcolor: active ? "#0f766e" : "#2f5f52",
                          border: active ? "2px solid #f3c760" : "2px solid transparent",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: { xs: 12, md: 18 },
                            fontWeight: 800,
                            color: "white",
                          }}
                        >
                          {t.label}
                        </Typography>
                        <Box
                          component="img"
                          src={t.imageSrc}
                          alt={t.label}
                          sx={{ width: { xs: 48, md: 72 }, height: { xs: 48, md: 72 }, objectFit: "contain", borderRadius: 1 }}
                        />
                      </Box>
                    );
                  })}
                </Box>

                <Box sx={{ mt: 1.5 }}>
                  {recTab === "products" && <VendingProducts data={reportSource} />}
                  {recTab === "services" && (
                    <VendingServices
                      salonServices={reportSource?.recommendedSalonServices || []}
                      cosmeticServices={
                        reportSource?.recommendedCosmeticServices || []
                      }
                    />
                  )}
                  {recTab === "diet" && (
                    <>
                      <DietChart />
                    </>
                  )}
                </Box>
              </>
            )}

            {tab === 0 && (
              <>

                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={6}>
                    <Card
                      sx={{
                        marginTop: 2,
                        marginBottom: 2,
                        p: { xs: 2, md: 2 },
                        minHeight: { md: 80 },
                        borderRadius: 3,
                        border: "1px solid #e2e2e2",
                        textAlign: "center",
                        fontWeight: 700,
                        fontSize: { md: 18 },
                      }}
                    >
                      Good Enough
                    </Card>
                  </Grid>

                  <Grid item xs={6} sx={{ textAlign: "right" }}>
                    <Typography
                      sx={{
                        fontSize: { xs: 24, md: 32 },
                        fontWeight: 700,
                        color: "#2d5a3d",
                      }}
                    >
                      {overallScore} out of 100
                    </Typography>
                    <Typography sx={{ fontSize: { xs: 12, md: 14 }, color: "gray" }}>
                      Overall skincare health score
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={{ xs: 2, md: 3 }} mt={3}>
                  {metrics.map((item) => (
                    <Grid item xs={4} key={item.label}>
                      <Card
                        sx={{
                          p: { xs: 2, md: 3 },
                          textAlign: "center",
                          borderRadius: 3,
                          border: "1px solid #e0e0e0",
                          minHeight: { md: 120 },
                        }}
                      >
                        <Typography sx={{ fontSize: { xs: 14, md: 16 }, fontWeight: 600 }}>
                          {item.label}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: { xs: 22, md: 28 },
                            fontWeight: 700,
                            mt: { xs: 1, md: 1.25 },
                          }}
                        >
                          {item.value}%
                        </Typography>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                <Box sx={{ mt: 3 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: { xs: 16, md: 18 } }}>
                    Key Concerns
                  </Typography>
                  <Typography sx={{ fontSize: { xs: 12, md: 13 }, color: "gray", mb: 1 }}>
                    Defects picked up by the scan
                  </Typography>

                  <Grid container spacing={{ xs: 2, md: 3 }}>
                    {keyConcerns.map((c) => (
                      <Grid item xs={4} key={c.title}>
                        <Box
                          sx={{
                            position: "relative",
                            width: "100%",
                            height: { xs: 100, sm: 300, md: 400 },
                            borderRadius: 3,
                            overflow: "hidden",
                            boxShadow: 1,
                            bgcolor: "#e5e7eb",
                          }}
                        >
                          <Image
                            src={c.imageSrc}
                            alt={c.title}
                            fill
                            sizes="(max-width: 600px) 33vw, 140px"
                            style={{ objectFit: "cover" }}
                          />

                          <Box
                            sx={{
                              position: "absolute",
                              left: 0,
                              right: 0,
                              bottom: 0,
                              p: 1,
                              background:
                                "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.75) 100%)",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: 12,
                                fontWeight: 700,
                                color: "white",
                                lineHeight: 1.1,
                              }}
                            >
                              {/* {c.title} */}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>

                <Box sx={{ mt: 3 }}>
                  <SkincareRoutine />
                </Box>
              </>

            )}

          </Card>

        </Box>

        {showUserInfo && (
          <Dialog open={true} maxWidth="sm">
            <Box
              sx={(theme) => ({
                width: 450,
                padding: 3,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundImage: `url(/images/userInfoBg.png)`,
              })}
              component="div"
              className="dialog-info"
            >
              <Grid container>
                <Grid item xs={8} container spacing={1}>
                  <Grid item xs={12}>
                    <Typography
                      sx={(theme) => ({
                        color: theme.palette.common.white,
                      })}
                    >
                      Hey there,
                    </Typography>

                    {publicUserProfile ? (
                      <>
                        <Typography
                          sx={(theme) => ({
                            color: theme.palette.common.white,
                          })}
                          variant="h6"
                        >
                          {publicUserProfile?.name}
                        </Typography>
                      </>
                    ) : (
                      <Typography
                        sx={(theme) => ({
                          color: theme.palette.common.white,
                        })}
                        variant="h6"
                      >
                        {publicUserProfile?.name || session?.user.firstName}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      sx={(theme) => ({
                        color: theme.palette.common.white,
                      })}
                    >
                      Number
                    </Typography>
                    <Typography
                      sx={(theme) => ({
                        color: theme.palette.common.white,
                      })}
                      variant="h6"
                    >
                      {publicUserProfile?.phoneNumber ||
                        session?.user?.mobileNumber}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      sx={(theme) => ({
                        color: theme.palette.common.white,
                      })}
                    >
                      Age
                    </Typography>
                    <Typography
                      sx={(theme) => ({
                        color: theme.palette.common.white,
                      })}
                      variant="h6"
                    >
                      {dataFUQR?.age}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      sx={(theme) => ({
                        color: theme.palette.common.white,
                      })}
                    >
                      Gender
                    </Typography>
                    <Typography
                      sx={(theme) => ({
                        color: theme.palette.common.white,
                      })}
                      variant="h6"
                    >
                      {dataFUQR?.gender}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  <Box mb={2}>
                    <Box
                      onClick={() => {
                        setShowUserInfo(false);
                      }}
                      sx={{
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "8px 12px",
                        borderRadius: 10,
                        backgroundColor: "rgba(255,255,255,0.25)",
                        color: theme.palette.common.white,
                        fontWeight: 700,
                      }}
                    >
                      Close
                    </Box>
                  </Box>
                  <Box
                    component="div"
                    className="user-popup-image"
                    sx={{
                      width: 120,
                      height: 150,
                      backgroundSize: "cover",
                      backgroundPosition: "top center",
                      backgroundImage: `url(${useData?.data?.url})`,
                    }}
                  ></Box>
                </Grid>
              </Grid>
            </Box>
          </Dialog>
        )}
      </Box>
    </>
  );
};

export default CoverPage;
