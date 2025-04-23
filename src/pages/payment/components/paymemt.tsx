import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  IconButton,
  Card,
  CardContent,
  Avatar,
  Stack,
  Snackbar,
  Alert,
  TextField,
  InputAdornment,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogContent,
  Zoom,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PaymentsIcon from "@mui/icons-material/Payments";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import RefreshIcon from "@mui/icons-material/Refresh";
import WarningIcon from "@mui/icons-material/Warning";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import BadgeIcon from "@mui/icons-material/Badge";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { LOCATION_PATH } from "../../../routes/path";
import useMainController from "../controllers/index";

// Font size constants
const fontSize = {
  title: "1.6rem",
  subtitle: "1.1rem",
  text: "0.9rem",
  button: "1rem",
};

const PaymentPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Get everything from the controller
  const {
    locations,
    loading,
    error,
    totalAmount,
    paymentAmount,
    paymentError,
    paymentState,
    successDialogOpen,
    alertOpen,
    alertMessage,
    alertSeverity,
    retry,
    navigate,
    formatCurrency,
    handlePaymentAmountChange,
    handleAlertClose,
    handlePaymentSubmit
  } = useMainController();

  // Show loading skeleton
  if (loading) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #611463 0%, #8a1c8d 100%)',
        p: 2
      }}>
        <Container maxWidth="md">
          <Paper
            elevation={8}
            sx={{
              p: { xs: 2, sm: 3, md: 4 },
              borderRadius: 3,
              maxWidth: '100%',
              mx: 'auto',
              boxShadow: '0 8px 24px rgba(97, 20, 99, 0.2)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
              <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
              <Skeleton variant="text" sx={{ fontSize: fontSize.title, width: '60%' }} />
            </Box>

            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Skeleton variant="text" sx={{ fontSize: fontSize.subtitle, mb: 2 }} />
                <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 3, mb: 2 }} />
                <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 3, mb: 2 }} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 3, mb: 3 }} />
                <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 3, mb: 2 }} />
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress sx={{ color: '#611463' }} />
            </Box>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #611463 0%, #8a1c8d 100%)',
      p: 2
    }}>
      <Container
        maxWidth="lg"
        sx={{
          width: {
            xs: '100%',
            sm: '90%',
            md: '80%',
            lg: '60%',
          }
        }}
      >
        <Paper
          elevation={8}
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            borderRadius: 3,
            maxWidth: '100%',
            mx: 'auto',
            boxShadow: '0 8px 24px rgba(97, 20, 99, 0.2)',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {error && (
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              p: 1,
              bgcolor: 'rgba(211, 47, 47, 0.1)',
              color: '#d32f2f',
              textAlign: 'center',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ErrorIcon sx={{ fontSize: '0.9rem', mr: 0.5 }} />
              ກຳລັງໃຊ້ຂໍ້ມູນຕົວຢ່າງ (ມີຂໍ້ຜິດພາດໃນການໂຫຼດຂໍ້ມູນ)
              <IconButton
                size="small"
                onClick={retry}
                sx={{ ml: 1, color: '#d32f2f', p: 0.2 }}
                aria-label="Retry loading data"
              >
                <RefreshIcon sx={{ fontSize: '0.9rem' }} />
              </IconButton>
            </Box>
          )}

          {/* Header with back button */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2,
            position: 'relative',
            mt: error ? 2 : 0
          }}>
            <IconButton
              onClick={() => navigate("/Location/:id")}
              sx={{
                color: '#611463',
                '&:hover': {
                  backgroundColor: 'rgba(97, 20, 99, 0.08)',
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              <ArrowBackIcon />
            </IconButton>

            {/* Title */}
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontSize: fontSize.title,
                textAlign: "center",
                fontWeight: "bold",
                color: '#611463',
                flexGrow: 1,
                mb: 0,
                background: 'linear-gradient(90deg, #611463 0%, #8a1c8d 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PaymentsIcon sx={{ mr: 1, WebkitTextFillColor: '#611463' }} />
              ຊຳລະເງິນ
            </Typography>
            <Box sx={{ width: 40 }} /> {/* Spacer for alignment */}
          </Box>

          {/* Left and Right Sections */}
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {/* Left Section - Service Items */}
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  gutterBottom
                  sx={{
                    fontSize: fontSize.subtitle,
                    mb: 2,
                    color: '#611463',
                    borderLeft: '4px solid #611463',
                    pl: 1.5,
                    py: 0.5,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <ReceiptLongIcon sx={{ mr: 1 }} />
                  ລາຍລະອຽດການບໍລິການ
                </Typography>

                {/* Service Items List */}
                <Box sx={{ maxHeight: '400px', overflowY: 'auto', mb: 3, pr: 1 }}>
                  {locations.map((location) => (
                    <Card
                      key={location.id}
                      sx={{
                        mb: 2,
                        borderRadius: 3,
                        boxShadow: "0 3px 10px rgba(0,0,0,0.06)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-3px)",
                          boxShadow: "0 6px 15px rgba(97, 20, 99, 0.15)"
                        }
                      }}
                    >
                      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                        {/* Main info row */}
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                          <Avatar
                            src={location.image}
                            sx={{
                              mr: 2,
                              width: 56,
                              height: 56,
                              border: '2px solid #f0f0f0',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                            }}
                          />
                          <Box flexGrow={1} sx={{ textAlign: "left" }}>
                            <Typography sx={{
                              fontSize: fontSize.subtitle,
                              fontWeight: "bold",
                              color: '#611463'
                            }}>
                              {location.firstName} {location.surname}
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                              <Typography variant="body2" sx={{ fontSize: '0.85rem', mr: 1.5, color: '#555' }}>
                                {location.service}
                              </Typography>
                            </Box>
                          </Box>
                          <Typography
                            fontWeight="bold"
                            sx={{
                              fontSize: fontSize.text,
                              bgcolor: '#f8f6f9',
                              color: '#611463',
                              p: 1,
                              borderRadius: 2
                            }}
                          >
                            {location.priceFormatted}
                          </Typography>
                        </Box>

                        {/* Additional info row */}
                        <Box sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 2,
                          flexWrap: "wrap"
                        }}>
                          <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            mr: 2,
                            mb: { xs: 1, sm: 0 },
                            bgcolor: '#f8f6f9',
                            borderRadius: 5,
                            px: 1.5,
                            py: 0.5
                          }}>
                            <CategoryIcon sx={{ fontSize: '0.9rem', color: '#8a1c8d', mr: 0.5 }} />
                            <Typography variant="body2" sx={{ fontSize: '0.8rem', color: '#555' }}>
                              {location.category}
                            </Typography>
                          </Box>
                          <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            bgcolor: '#f8f6f9',
                            borderRadius: 5,
                            px: 1.5,
                            py: 0.5
                          }}>
                            <PersonIcon sx={{ fontSize: '0.9rem', color: '#8a1c8d', mr: 0.5 }} />
                            <Typography variant="body2" sx={{ fontSize: '0.8rem', color: '#555' }}>
                              {location.gender}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Car details - ONLY for category ID 5 */}
                        {location.cat_id === 5 && (
                          <Box sx={{
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            alignItems: { xs: "center", sm: "flex-start" },
                            gap: 2,
                            mb: 2,
                            p: 2,
                            backgroundColor: '#f0e9f1',
                            borderRadius: 2,
                            border: '1px dashed rgba(97, 20, 99, 0.2)',
                            borderLeft: '3px solid #8a1c8d'
                          }}>
                            {/* Car image - only if available */}
                            {location.carImage && (
                              <Box sx={{
                                width: { xs: "100%", sm: "40%" },
                                height: { xs: 150, sm: 120 },
                                borderRadius: 2,
                                overflow: "hidden",
                                position: "relative",
                                boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                                flexShrink: 0,
                              }}>
                                <img
                                  src={location.carImage}
                                  alt="Vehicle"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                              </Box>
                            )}

                            {/* Car details */}
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="subtitle2" sx={{ mb: 1, color: '#611463', fontWeight: 600 }}>
                                ຂໍ້ມູນລົດ
                              </Typography>
                              <Grid container spacing={1}>
                                <Grid item xs={12} sm={6}>
                                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                                    <TimeToLeaveIcon sx={{ fontSize: '0.9rem', color: '#8a1c8d', mr: 0.5 }} />
                                    <Typography variant="body2" sx={{ fontSize: '0.8rem', color: '#555', fontWeight: 500 }}>
                                      {location.carBrand || 'N/A'} {location.carModel || 'N/A'}
                                    </Typography>
                                  </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                  <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                    <BadgeIcon sx={{ fontSize: '0.9rem', color: '#8a1c8d', mr: 0.5 }} />
                                    <Typography variant="body2" sx={{ fontSize: '0.8rem', color: '#555' }}>
                                      {location.licensePlate || 'N/A'}
                                    </Typography>
                                  </Box>
                                </Grid>
                                {location.carYear && (
                                  <Grid item xs={12} sm={6}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                                      <CalendarTodayIcon sx={{ fontSize: '0.9rem', color: '#8a1c8d', mr: 0.5 }} />
                                      <Typography variant="body2" sx={{ fontSize: '0.8rem', color: '#555' }}>
                                        ປີ {location.carYear}
                                      </Typography>
                                    </Box>
                                  </Grid>
                                )}
                              </Grid>
                            </Box>
                          </Box>
                        )}

                        {/* Location info row */}
                        <Box sx={{
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: "#f0e9f1",
                          borderRadius: 2,
                          p: 1.5,
                          flexWrap: { xs: "wrap", sm: "nowrap" },
                          borderLeft: '3px solid #8a1c8d'
                        }}>
                          <Box sx={{ display: "flex", alignItems: "center", mr: 2, mb: { xs: 1, sm: 0 }, minWidth: "45%" }}>
                            <HomeIcon sx={{ fontSize: '0.9rem', color: '#8a1c8d', mr: 0.5 }} />
                            <Typography variant="body2" sx={{ fontSize: '0.8rem', color: '#555' }}>
                              {location.village}
                            </Typography>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <LocationCityIcon sx={{ fontSize: '0.9rem', color: '#8a1c8d', mr: 0.5 }} />
                            <Typography variant="body2" sx={{ fontSize: '0.8rem', color: '#555' }}>
                              {location.city}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </Box>
            </Grid>

            {/* Right Section - Payment Input and Summary */}
            <Grid item xs={12} md={6}>
              {/* Address Box */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  color="textSecondary"
                  sx={{
                    fontSize: fontSize.subtitle,
                    mb: 1,
                    fontWeight: 500,
                    color: '#611463',
                  }}
                >
                  ທີ່ຢູ່
                </Typography>

                {/* Custom Address Display Box */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    backgroundColor: "#f8f6f9",
                    fontSize: fontSize.text,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    py: 1.5,
                    px: 2,
                    border: '1px solid rgba(0, 0, 0, 0.23)',
                  }}
                >
                  {/* Start Icon */}
                  <LocationOnIcon sx={{ color: '#611463', mr: 1.5, mt: 0.5 }} />

                  {/* Address Content */}
                  <Box sx={{ flexGrow: 1 }}>
                    {localStorage.getItem('addressName') ? (
                      <>
                        <Typography
                          component="div"
                          sx={{
                            fontWeight: 'bold',
                            fontSize: fontSize.text,
                            lineHeight: 1.2
                          }}
                        >
                          {localStorage.getItem("addressName") || ""}
                        </Typography>
                        <Typography
                          component="div"
                          sx={{
                            fontSize: fontSize.text,
                            color: 'text.secondary',
                            mt: 0.5
                          }}
                        >
                          {localStorage.getItem("addressVillage") || ""}, {localStorage.getItem("addressCity") || ""}
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Typography
                          component="div"
                          sx={{
                            fontWeight: 'bold',
                            fontSize: fontSize.text,
                            lineHeight: 1.2
                          }}
                        >
                          ບ້ານ ໂນນສະຫວ່າງ
                        </Typography>
                        <Typography
                          component="div"
                          sx={{
                            fontSize: fontSize.text,
                            color: 'text.secondary',
                            mt: 0.5
                          }}
                        >
                          ວຽງຈັນ
                        </Typography>
                      </>
                    )}
                  </Box>
                </Box>
              </Box>

              {/* Payment Section */}
              <Card
                sx={{
                  backgroundColor: "#f8f6f9",
                  mb: 3,
                  borderRadius: 3,
                  boxShadow: '0 4px 12px rgba(97, 20, 99, 0.1)',
                  border: '1px solid rgba(97, 20, 99, 0.08)',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  position: 'relative',
                  '&:hover': {
                    boxShadow: '0 6px 15px rgba(97, 20, 99, 0.15)',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '5px',
                    background: 'linear-gradient(90deg, #611463, #8a1c8d)',
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    sx={{
                      fontSize: fontSize.subtitle,
                      fontWeight: "bold",
                      mb: 3,
                      color: "#611463",
                      borderBottom: '2px solid rgba(97, 20, 99, 0.1)',
                      paddingBottom: 1
                    }}
                  >
                    ສະຫຼຸບລາຄາ
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography sx={{ fontSize: fontSize.subtitle, fontWeight: "bold", color: '#611463' }}>
                        ລາຄາລວມ:
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: "right" }}>
                      <Typography
                        sx={{
                          fontSize: fontSize.subtitle,
                          fontWeight: "bold",
                          color: "#007736",
                          bgcolor: 'rgba(0, 119, 54, 0.1)',
                          p: 1,
                          borderRadius: 1,
                          display: 'inline-block'
                        }}
                      >
                        {formatCurrency(totalAmount)}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Payment Input */}
              <Card
                sx={{
                  mb: 2,
                  borderRadius: 3,
                  boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
                  transition: "all 0.3s ease",
                  border: paymentError ?
                    (paymentState === "insufficient" ? "1px solid #d32f2f" : "1px solid #ff9800") :
                    "1px solid rgba(97, 20, 99, 0.08)",
                  '&:hover': {
                    boxShadow: "0 6px 15px rgba(97, 20, 99, 0.15)"
                  }
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    sx={{
                      fontSize: fontSize.subtitle,
                      fontWeight: "bold",
                      mb: 2,
                      color: "#611463",
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    ໃສ່ຈຳນວນເງິນ
                    {paymentState === "excess" && (
                      <WarningIcon
                        sx={{
                          ml: 1,
                          fontSize: '1.1rem',
                          color: '#ff9800'
                        }}
                      />
                    )}
                    {paymentState === "insufficient" && (
                      <WarningIcon
                        sx={{
                          ml: 1,
                          fontSize: '1.1rem',
                          color: '#d32f2f'
                        }}
                      />
                    )}
                  </Typography>

                  <TextField
                    fullWidth
                    variant="outlined"
                    label="ຈຳນວນເງິນ (KIP)"
                    value={paymentAmount}
                    onChange={handlePaymentAmountChange}
                    error={!!paymentError}
                    helperText={paymentError}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        fontSize: fontSize.text,
                        '&.Mui-focused fieldset': {
                          borderColor: paymentState === "insufficient" ? '#d32f2f' :
                            paymentState === "excess" ? '#ff9800' : '#611463',
                        },
                      },
                      '& label.Mui-focused': {
                        color: paymentState === "insufficient" ? '#d32f2f' :
                          paymentState === "excess" ? '#ff9800' : '#611463',
                      },
                      '& .MuiFormHelperText-root': {
                        color: paymentState === "insufficient" ? '#d32f2f' :
                          paymentState === "excess" ? '#ff9800' : 'inherit',
                      }
                    }}
                    InputLabelProps={{
                      sx: {
                        fontSize: fontSize.text,
                        color: paymentState === "insufficient" ? '#d32f2f' :
                          paymentState === "excess" ? '#ff9800' : '#611463'
                      }
                    }}
                  />
                </CardContent>
              </Card>

              {/* Payment Recommendations */}
              {paymentState === "excess" && (
                <Card sx={{
                  mb: 2,
                  borderRadius: 2,
                  bgcolor: 'rgba(255, 152, 0, 0.08)',
                  border: '1px solid rgba(255, 152, 0, 0.2)'
                }}>
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <WarningIcon sx={{ color: '#ff9800', mr: 1, mt: 0.2, fontSize: '1rem' }} />
                      <Typography sx={{ fontSize: '0.85rem', color: '#666' }}>
                        ຈຳນວນເງິນທີ່ປ້ອນເຂົ້າແມ່ນຫຼາຍກວ່າຈຳນວນເງິນທີ່ຕ້ອງຈ່າຍຫຼາຍເກີນໄປ. ກະລຸນາກວດສອບຈຳນວນເງິນຂອງທ່ານ.
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              )}
              {/* Add this new code block for insufficient payment */}
              {paymentState === "insufficient" && (
                <Card sx={{
                  mb: 2,
                  borderRadius: 2,
                  bgcolor: 'rgba(211, 47, 47, 0.08)',
                  border: '1px solid rgba(211, 47, 47, 0.2)'
                }}>
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <WarningIcon sx={{ color: '#d32f2f', mr: 1, mt: 0.2, fontSize: '1rem' }} />
                      <Typography sx={{ fontSize: '0.85rem', color: '#666' }}>
                        ຈຳນວນເງິນທີ່ປ້ອນເຂົ້າແມ່ນບໍ່ພຽງພໍສຳລັບການຊຳລະ. ກະລຸນາກວດສອບຈຳນວນເງິນຂອງທ່ານ.
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              )}

              {/* Debug Button - Helps with troubleshooting */}
              {error && (
                <Box sx={{ textAlign: 'center', mt: 1, mb: 1 }}>
                  <Button
                    size="small"
                    onClick={() => console.log("Debug info", { locations, totalAmount })}
                    sx={{ fontSize: '0.7rem', color: 'rgba(97, 20, 99, 0.6)' }}
                  >
                    ສະແດງຂໍ້ມູນການແກ້ໄຂ
                  </Button>
                </Box>
              )}
            </Grid>
          </Grid>

          {/* Action Buttons */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
            sx={{ mt: 4 }}
          >
            <Button
              variant="outlined"
              onClick={() => navigate(LOCATION_PATH)}
              sx={{
                fontSize: fontSize.button,
                px: 4,
                py: 1.5,
                width: { xs: "100%", sm: "auto", md: "auto" },
                minWidth: { sm: 150 },
                borderRadius: 2,
                borderColor: '#d32f2f',
                color: '#d32f2f',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: '#b71c1c',
                  color: '#b71c1c',
                  backgroundColor: 'rgba(211, 47, 47, 0.04)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              ຍົກເລີກ
            </Button>
            <Button
              variant="contained"
              onClick={handlePaymentSubmit}
              disabled={paymentState !== "valid"}
              sx={{
                fontSize: fontSize.button,
                px: 4,
                py: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #611463 0%, #8a1c8d 100%)',
                width: { xs: "100%", sm: "auto", md: "auto" },
                minWidth: { sm: 150 },
                boxShadow: '0 4px 12px rgba(97, 20, 99, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #6b1870 0%, #9a2c9d 100%)',
                  boxShadow: '0 6px 15px rgba(97, 20, 99, 0.4)',
                  transform: 'translateY(-3px)'
                },
                '&:disabled': {
                  background: '#9e9e9e',
                  color: '#f5f5f5',
                  boxShadow: 'none'
                },
                transition: 'all 0.3s ease'
              }}
            >
              ຊຳລະເງິນ
            </Button>
          </Stack>
        </Paper>

        {/* Success Payment Dialog */}
        <Dialog
          open={successDialogOpen}
          maxWidth="sm"
          fullWidth
          TransitionComponent={Zoom}
          PaperProps={{
            style: {
              borderRadius: '12px',
              boxShadow: '0 8px 20px rgba(97, 20, 99, 0.15)',
              padding: '12px',
              background: 'linear-gradient(135deg, #fff 0%, #f9f5fa 100%)',
              overflow: 'visible'
            }
          }}
        >
          <DialogContent sx={{ position: 'relative', textAlign: 'center', py: 3 }}>
            {/* Success icon animation */}
            <Box sx={{
              position: 'relative',
              height: '100px',
              width: '100px',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* Animated rings around the check icon */}
              <Box sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                border: '2px solid rgba(97, 20, 99, 0.2)',
                animation: 'expand 1.5s ease-out',
                '@keyframes expand': {
                  '0%': { transform: 'scale(0.5)', opacity: 1 },
                  '100%': { transform: 'scale(1.3)', opacity: 0 }
                },
                animationIterationCount: 1
              }} />

              <Box sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                border: '2px solid rgba(30, 142, 62, 0.2)',
                animation: 'expand 1.5s ease-out 0.3s',
                '@keyframes expand': {
                  '0%': { transform: 'scale(0.5)', opacity: 1 },
                  '100%': { transform: 'scale(1.3)', opacity: 0 }
                },
                animationIterationCount: 1
              }} />

              {/* Success icon */}
              <CheckCircleIcon
                sx={{
                  fontSize: '80px',
                  color: '#1e8e3e',
                  filter: 'drop-shadow(0 3px 6px rgba(30, 142, 62, 0.2))',
                  animation: 'fadeIn 0.5s ease-in',
                  '@keyframes fadeIn': {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 }
                  }
                }}
              />
            </Box>

            {/* Success message */}
            <Typography
              variant="h5"
              sx={{
                mt: 2.5,
                mb: 1,
                fontWeight: '600',
                color: '#611463',
                fontSize: '1.5rem',
              }}
            >
              ການຊຳລະເງິນສຳເລັດແລ້ວ
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: '#616161',
                mb: 2.5,
                fontSize: '0.95rem',
              }}
            >
              ຂອບໃຈສຳລັບການໃຊ້ບໍລິການ. ກຳລັງໄປຫາໜ້າຖັດໄປ...
            </Typography>

            {/* Payment amount detail */}
            <Box sx={{
              mt: 2,
              p: 2.5,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '8px',
              border: '1px solid #e6c9e9',
              boxShadow: '0 2px 12px rgba(97, 20, 99, 0.06)',
              position: 'relative',
              display: 'inline-block',
              width: '85%',
            }}>
              <Typography fontWeight="600" sx={{ color: '#611463' }}>
                ຈຳນວນເງິນທີ່ຊຳລະ: <span style={{ color: '#1e8e3e' }}>{formatCurrency(paymentAmount)}</span>
              </Typography>
            </Box>
          </DialogContent>
        </Dialog>

        {/* Snackbar Alert */}
        <Snackbar
          open={alertOpen}
          autoHideDuration={6000}
          onClose={handleAlertClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleAlertClose}
            severity={alertSeverity}
            sx={{
              width: '100%',
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              '& .MuiAlert-message': {
                fontSize: fontSize.text
              }
            }}
            elevation={6}
            variant="filled"
          >
            {alertMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default PaymentPage;