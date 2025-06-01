// SettingsPage.tsx - UI Component
import React, { useState, useEffect, useRef } from "react";
import {
    Box,
    Container,
    Typography,
    Grid,
    TextField,
    Button,
    Card,
    CardContent,
    Divider,
    Paper,
    Avatar,
    Tabs,
    Tab,
    useMediaQuery,
    useTheme,
    InputAdornment,
    IconButton,
    Alert,
    CircularProgress,
    Snackbar,
    Tooltip,
    Fade,
    Zoom,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Chip,
    Badge
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SecurityIcon from "@mui/icons-material/Security";
import HelpIcon from "@mui/icons-material/Help";
import SaveIcon from "@mui/icons-material/Save";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/Delete";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ImageIcon from "@mui/icons-material/Image";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LOGO_HOMECARE from "../../../assets/icons/HomeCareLogo.png";
import { CONTACT_US_PATH } from "../../../routes/path";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import {
    ProfileFormData,
    PasswordFormData,
    ValidationErrors,
    NotificationState,
    AvatarState,
    validateProfileForm,
    validatePasswordForm,
    validateImageFile,
    createImagePreview,
    updateUserProfile,
    changeUserPassword,
    uploadUserAvatar,
    deleteUserAvatar,
    getInitialProfileForm,
    getInitialPasswordForm,
    getInitialValidationErrors,
    getInitialAvatarState,
    createNotification,
    hasValidationErrors,
    getAvatarDisplayName,
    getAvatarSource
} from "../controllers/index";

const SettingsPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    // Get user data from Redux
    const { loggedIn, data: userData } = useSelector((state: RootState) => state.auth);
    
    // UI State
    const [tabValue, setTabValue] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    
    // Form States
    const [profileForm, setProfileForm] = useState<ProfileFormData>(getInitialProfileForm(userData));
    const [passwordForm, setPasswordForm] = useState<PasswordFormData>(getInitialPasswordForm());
    const [errors, setErrors] = useState<ValidationErrors>(getInitialValidationErrors());
    const [notification, setNotification] = useState<NotificationState>({
        open: false,
        message: "",
        severity: "success"
    });
    
    // Avatar State
    const [avatarState, setAvatarState] = useState<AvatarState>(getInitialAvatarState());

    // Initialize form with user data
    useEffect(() => {
        if (userData) {
            setProfileForm(getInitialProfileForm(userData));
        }
    }, [userData]);

    // Event Handlers
    const handleTabChange = (event: any, newValue: number) => {
        setTabValue(newValue);
        setErrors(getInitialValidationErrors());
    };

    const handleProfileFormChange = (field: keyof ProfileFormData) => 
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setProfileForm(prev => ({
                ...prev,
                [field]: event.target.value
            }));
            
            setErrors(prev => ({
                ...prev,
                [field]: ""
            }));
        };

    const handlePasswordFormChange = (field: keyof PasswordFormData) => 
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setPasswordForm(prev => ({
                ...prev,
                [field]: event.target.value
            }));
            
            setErrors(prev => ({
                ...prev,
                [field]: ""
            }));
        };

    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const validationError = validateImageFile(file);
        if (validationError) {
            setNotification(createNotification(validationError, "error"));
            return;
        }

        try {
            const preview = await createImagePreview(file);
            setAvatarState({
                preview,
                file,
                isUploading: false
            });
        } catch (error) {
            setNotification(createNotification("ບໍ່ສາມາດອ່ານໄຟລ້ໄດ້", "error"));
        }

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleUploadAvatar = async () => {
        if (!avatarState.file || !userData) return;

        setAvatarState(prev => ({ ...prev, isUploading: true }));
        
        const result = await uploadUserAvatar(avatarState.file, userData, dispatch);
        
        setNotification(createNotification(result.message, result.success ? "success" : "error"));
        
        if (result.success) {
            setAvatarState(getInitialAvatarState());
        } else {
            setAvatarState(prev => ({ ...prev, isUploading: false }));
        }
    };

    const handleDeleteAvatar = async () => {
        if (!userData) return;

        setIsLoading(true);
        const result = await deleteUserAvatar(userData, dispatch);
        setIsLoading(false);
        setDeleteDialogOpen(false);
        
        setNotification(createNotification(result.message, result.success ? "success" : "error"));
        
        if (result.success) {
            setAvatarState(getInitialAvatarState());
        }
    };

    const handleCancelAvatarChange = () => {
        setAvatarState(getInitialAvatarState());
    };

    const handleSaveProfile = async () => {
        const validationErrors = validateProfileForm(profileForm);
        setErrors(validationErrors);
        
        if (hasValidationErrors(validationErrors) || !userData) {
            return;
        }

        setIsLoading(true);
        const result = await updateUserProfile(profileForm, userData, dispatch);
        setIsLoading(false);
        
        setNotification(createNotification(result.message, result.success ? "success" : "error"));
    };

    const handleSavePassword = async () => {
        const validationErrors = validatePasswordForm(passwordForm);
        setErrors(validationErrors);
        
        if (hasValidationErrors(validationErrors) || !userData?.email) {
            return;
        }

        setIsLoading(true);
        const result = await changeUserPassword(passwordForm, userData.email);
        setIsLoading(false);
        
        setNotification(createNotification(result.message, result.success ? "success" : "error"));
        
        if (result.success) {
            setPasswordForm(getInitialPasswordForm());
        }
    };

    const handleCloseNotification = () => {
        setNotification(prev => ({ ...prev, open: false }));
    };

    // Avatar Component with Enhanced Beauty
    const AvatarSection = () => {
        const hasAvatar = userData?.avatar || avatarState.preview;
        const avatarSrc = getAvatarSource(userData, avatarState.preview);
        const displayName = getAvatarDisplayName(userData);

        return (
            <Box sx={{ 
                position: "relative", 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center",
                p: 4,
                background: "linear-gradient(145deg, rgba(97, 20, 99, 0.05) 0%, rgba(247, 147, 30, 0.05) 100%)",
                borderRadius: 6,
                border: "2px solid rgba(97, 20, 99, 0.1)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 30px 60px rgba(0, 0, 0, 0.15)",
                    border: "2px solid rgba(247, 147, 30, 0.3)"
                },
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
            }}>
                {/* Decorative Background Elements */}
                <Box
                    sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        width: 60,
                        height: 60,
                        background: "linear-gradient(135deg, rgba(97, 20, 99, 0.1), rgba(247, 147, 30, 0.1))",
                        borderRadius: "50%",
                        zIndex: 0
                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 10,
                        left: 10,
                        width: 40,
                        height: 40,
                        background: "linear-gradient(135deg, rgba(247, 147, 30, 0.1), rgba(97, 20, 99, 0.1))",
                        borderRadius: "50%",
                        zIndex: 0
                    }}
                />

                {/* Main Avatar Container */}
                <Box sx={{ position: "relative", zIndex: 1, mb: 3 }}>
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        badgeContent={
                            hasAvatar && (
                                <Tooltip title="ລຶບຮູບພາບ" arrow placement="top">
                                    <IconButton
                                        size="small"
                                        onClick={() => setDeleteDialogOpen(true)}
                                        disabled={!loggedIn || isLoading}
                                        sx={{
                                            backgroundColor: "#ff4757",
                                            color: "white",
                                            width: 36,
                                            height: 36,
                                            boxShadow: "0 4px 12px rgba(255, 71, 87, 0.4)",
                                            "&:hover": {
                                                backgroundColor: "#ff3742",
                                                transform: "scale(1.1)",
                                                boxShadow: "0 6px 16px rgba(255, 71, 87, 0.6)"
                                            },
                                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                            zIndex: 10
                                        }}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            )
                        }
                    >
                        <Box sx={{ position: "relative" }}>
                            {/* Outer Glow Ring */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: -8,
                                    left: -8,
                                    width: 180,
                                    height: 180,
                                    background: "linear-gradient(45deg, #611463, #f7931e, #611463)",
                                    borderRadius: "50%",
                                    opacity: 0.3,
                                    animation: "pulse 2s infinite",
                                    "@keyframes pulse": {
                                        "0%": {
                                            transform: "scale(1)",
                                            opacity: 0.3
                                        },
                                        "50%": {
                                            transform: "scale(1.05)",
                                            opacity: 0.5
                                        },
                                        "100%": {
                                            transform: "scale(1)",
                                            opacity: 0.3
                                        }
                                    }
                                }}
                            />
                            
                            {/* Avatar with Enhanced Design */}
                            <Avatar
                                src={avatarSrc}
                                sx={{
                                    width: 164,
                                    height: 164,
                                    border: "6px solid #ffffff",
                                    boxShadow: "0 20px 40px rgba(0,0,0,0.2), inset 0 0 20px rgba(255,255,255,0.2)",
                                    background: userData 
                                        ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" 
                                        : "linear-gradient(135deg, #e0e0e0 0%, #bdbdbd 100%)",
                                    fontSize: "52px",
                                    fontWeight: "bold",
                                    color: "white",
                                    position: "relative",
                                    overflow: "hidden",
                                    "&::before": {
                                        content: '""',
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)",
                                        borderRadius: "inherit"
                                    },
                                    "&:hover": {
                                        transform: "scale(1.02)",
                                        boxShadow: "0 25px 50px rgba(0,0,0,0.25), inset 0 0 25px rgba(255,255,255,0.3)"
                                    },
                                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                                }}
                            >
                                {!avatarSrc && (userData ? displayName : <PersonIcon sx={{ fontSize: 80 }} />)}
                            </Avatar>

                            {/* Upload Overlay with Beautiful Design */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    bottom: 12,
                                    left: 12,
                                    right: 12,
                                    height: 40,
                                    background: "linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6))",
                                    backdropFilter: "blur(10px)",
                                    borderRadius: "20px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    opacity: 0,
                                    cursor: loggedIn ? "pointer" : "default",
                                    border: "1px solid rgba(255, 255, 255, 0.2)",
                                    "&:hover": {
                                        opacity: loggedIn ? 1 : 0,
                                        background: "linear-gradient(135deg, rgba(97, 20, 99, 0.9), rgba(247, 147, 30, 0.9))"
                                    },
                                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                                }}
                                onClick={() => loggedIn && fileInputRef.current?.click()}
                            >
                                <CameraAltIcon sx={{ color: "white", fontSize: 22, mr: 1 }} />
                                <Typography variant="caption" sx={{ color: "white", fontWeight: 600 }}>
                                    ອັບໂຫລດ
                                </Typography>
                            </Box>
                        </Box>
                    </Badge>
                </Box>

                {/* User Info Display */}
                {userData && (
                    <Box sx={{ textAlign: "center", mb: 2, zIndex: 1 }}>
                        <Typography variant="h6" fontWeight={700} color="#611463" gutterBottom>
                            {userData.first_name} {userData.last_name}
                        </Typography>
                        <Chip
                            label={userData.email}
                            sx={{
                                background: "linear-gradient(45deg, rgba(97, 20, 99, 0.1), rgba(247, 147, 30, 0.1))",
                                color: "#611463",
                                fontWeight: 600,
                                borderRadius: 3
                            }}
                        />
                    </Box>
                )}

                {/* Upload Controls with Beautiful Design */}
                {avatarState.file && (
                    <Fade in={true}>
                        <Box sx={{ textAlign: "center", zIndex: 1, width: "100%" }}>
                            <Paper
                                sx={{
                                    p: 3,
                                    borderRadius: 4,
                                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(248, 249, 250, 0.9))",
                                    backdropFilter: "blur(10px)",
                                    border: "1px solid rgba(97, 20, 99, 0.1)",
                                    mb: 2
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
                                    <ImageIcon sx={{ color: "#611463", mr: 1 }} />
                                    <Typography variant="body2" fontWeight={600} color="#611463">
                                        ໄຟລ໌ທີ່ເລືອກ:
                                    </Typography>
                                </Box>
                                <Chip
                                    label={avatarState.file.name}
                                    variant="outlined"
                                    sx={{ 
                                        mb: 3, 
                                        maxWidth: "100%",
                                        borderColor: "#f7931e",
                                        color: "#f7931e",
                                        fontWeight: 600
                                    }}
                                />
                                <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                                    <Button
                                        variant="contained"
                                        onClick={handleUploadAvatar}
                                        disabled={avatarState.isUploading}
                                        startIcon={avatarState.isUploading ? 
                                            <CircularProgress size={18} color="inherit" /> : 
                                            <CheckCircleIcon />
                                        }
                                        sx={{
                                            background: "linear-gradient(45deg, #4caf50 30%, #66bb6a 90%)",
                                            color: "white",
                                            borderRadius: 3,
                                            px: 3,
                                            py: 1.5,
                                            fontWeight: 600,
                                            boxShadow: "0 4px 15px rgba(76, 175, 80, 0.3)",
                                            "&:hover": {
                                                background: "linear-gradient(45deg, #388e3c 30%, #4caf50 90%)",
                                                transform: "translateY(-2px)",
                                                boxShadow: "0 6px 20px rgba(76, 175, 80, 0.4)"
                                            },
                                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                                        }}
                                    >
                                        {avatarState.isUploading ? "ອັບໂຫລດ..." : "ບັນທຶກ"}
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={handleCancelAvatarChange}
                                        disabled={avatarState.isUploading}
                                        sx={{
                                            borderColor: "#f44336",
                                            color: "#f44336",
                                            borderRadius: 3,
                                            px: 3,
                                            py: 1.5,
                                            fontWeight: 600,
                                            "&:hover": {
                                                borderColor: "#d32f2f",
                                                backgroundColor: "rgba(244, 67, 54, 0.04)",
                                                transform: "translateY(-2px)"
                                            },
                                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                                        }}
                                    >
                                        ຍົກເລີກ
                                    </Button>
                                </Box>
                            </Paper>
                        </Box>
                    </Fade>
                )}

                {/* Hidden file input */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileSelect}
                />
            </Box>
        );
    };

    const renderSettingsContent = () => {
        switch (tabValue) {
            case 0: // Profile
                return (
                    <Fade in={true} timeout={500}>
                        <Box>
                            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                                <PersonIcon sx={{ color: "#611463", mr: 2, fontSize: 28 }} />
                                <Typography variant="h5" fontWeight={700} color="#611463">
                                    ຂໍ້ມູນບັນຊີ
                                </Typography>
                            </Box>
                            
                            {!loggedIn && (
                                <Alert 
                                    severity="warning" 
                                    sx={{ 
                                        mb: 3,
                                        borderRadius: 3,
                                        "& .MuiAlert-icon": {
                                            fontSize: 24
                                        }
                                    }}
                                >
                                    <Typography variant="body1" fontWeight={500}>
                                        ກະລຸນາເຂົ້າສູ່ລະບົບເພື່ອແກ້ໄຂຂໍ້ມູນບັນຊີ
                                    </Typography>
                                </Alert>
                            )}

                            <Grid container spacing={4}>
                                {/* Avatar Section */}
                                <Grid item xs={12} display="flex" justifyContent="center" mb={3}>
                                    <AvatarSection />
                                </Grid>
                                
                                {/* Form Fields */}
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="ຊື່ບັນຊີ"
                                        variant="outlined"
                                        value={profileForm.username}
                                        onChange={handleProfileFormChange("username")}
                                        disabled={!loggedIn || isLoading}
                                        error={!!errors.username}
                                        helperText={errors.username}
                                        InputProps={{
                                            sx: { 
                                                borderRadius: 3,
                                                backgroundColor: "rgba(255, 255, 255, 0.8)",
                                                "&:hover": {
                                                    backgroundColor: "rgba(255, 255, 255, 0.9)"
                                                }
                                            },
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonIcon sx={{ color: "#611463" }} />
                                                </InputAdornment>
                                            )
                                        }}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                "&:hover fieldset": {
                                                    borderColor: "#f7931e"
                                                },
                                                "&.Mui-focused fieldset": {
                                                    borderColor: "#611463"
                                                }
                                            }
                                        }}
                                    />
                                </Grid>
                                
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="ຊື່"
                                        variant="outlined"
                                        value={profileForm.firstName}
                                        onChange={handleProfileFormChange("firstName")}
                                        disabled={!loggedIn || isLoading}
                                        error={!!errors.firstName}
                                        helperText={errors.firstName}
                                        InputProps={{
                                            sx: { 
                                                borderRadius: 3,
                                                backgroundColor: "rgba(255, 255, 255, 0.8)"
                                            }
                                        }}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                "&:hover fieldset": {
                                                    borderColor: "#f7931e"
                                                },
                                                "&.Mui-focused fieldset": {
                                                    borderColor: "#611463"
                                                }
                                            }
                                        }}
                                    />
                                </Grid>
                                
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="ນາມສະກຸນ"
                                        variant="outlined"
                                        value={profileForm.lastName}
                                        onChange={handleProfileFormChange("lastName")}
                                        disabled={!loggedIn || isLoading}
                                        error={!!errors.lastName}
                                        helperText={errors.lastName}
                                        InputProps={{
                                            sx: { 
                                                borderRadius: 3,
                                                backgroundColor: "rgba(255, 255, 255, 0.8)"
                                            }
                                        }}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                "&:hover fieldset": {
                                                    borderColor: "#f7931e"
                                                },
                                                "&.Mui-focused fieldset": {
                                                    borderColor: "#611463"
                                                }
                                            }
                                        }}
                                    />
                                </Grid>
                                
                                {/* Email (read-only) */}
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="ອີເມວ"
                                        variant="outlined"
                                        value={userData?.email || ""}
                                        disabled
                                        InputProps={{
                                            sx: { 
                                                borderRadius: 3,
                                                backgroundColor: "rgba(240, 240, 240, 0.5)"
                                            }
                                        }}
                                        helperText="ອີເມວບໍ່ສາມາດແກ້ໄຂໄດ້"
                                    />
                                </Grid>
                                
                                {/* Save Button */}
                                <Grid item xs={12}>
                                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                                        <Button
                                            variant="contained"
                                            size="large"
                                            startIcon={isLoading ? 
                                                <CircularProgress size={20} color="inherit" /> : 
                                                <SaveIcon />
                                            }
                                            onClick={handleSaveProfile}
                                            disabled={!loggedIn || isLoading}
                                            sx={{
                                                py: 2,
                                                px: 4,
                                                borderRadius: 3,
                                                background: "linear-gradient(45deg, #611463 30%, #8e24aa 90%)",
                                                boxShadow: "0 4px 15px rgba(97, 20, 99, .3)",
                                                fontWeight: 600,
                                                fontSize: "16px",
                                                transition: "all 0.3s ease",
                                                "&:hover": {
                                                    background: "linear-gradient(45deg, #8e24aa 30%, #611463 90%)",
                                                    transform: "translateY(-2px)",
                                                    boxShadow: "0 8px 20px rgba(97, 20, 99, .4)"
                                                },
                                                "&:disabled": {
                                                    background: "rgba(0, 0, 0, 0.12)"
                                                }
                                            }}
                                        >
                                            {isLoading ? "ກຳລັງບັນທຶກ..." : "ບັນທຶກຂໍ້ມູນ"}
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Fade>
                );
                
            case 1: // Security
                return (
                    <Fade in={true} timeout={500}>
                        <Box>
                            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                                <LockIcon sx={{ color: "#611463", mr: 2, fontSize: 28 }} />
                                <Typography variant="h5" fontWeight={700} color="#611463">
                                    ການຕັ້ງຄ່າຄວາມປອດໄພ
                                </Typography>
                            </Box>
                            
                            {!loggedIn && (
                                <Alert 
                                    severity="warning" 
                                    sx={{ 
                                        mb: 3,
                                        borderRadius: 3,
                                        "& .MuiAlert-icon": {
                                            fontSize: 24
                                        }
                                    }}
                                >
                                    <Typography variant="body1" fontWeight={500}>
                                        ກະລຸນາເຂົ້າສູ່ລະບົບເພື່ອປ່ຽນລະຫັດຜ່ານ
                                    </Typography>
                                </Alert>
                            )}
                            
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="ລະຫັດຜ່ານໃໝ່"
                                        type={showPassword ? "text" : "password"}
                                        variant="outlined"
                                        value={passwordForm.newPassword}
                                        onChange={handlePasswordFormChange("newPassword")}
                                        disabled={!loggedIn || isLoading}
                                        error={!!errors.newPassword}
                                        helperText={errors.newPassword}
                                        InputProps={{
                                            sx: { 
                                                borderRadius: 3,
                                                backgroundColor: "rgba(255, 255, 255, 0.8)"
                                            },
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        edge="end"
                                                        disabled={!loggedIn}
                                                        sx={{
                                                            color: "#611463",
                                                            "&:hover": {
                                                                backgroundColor: "rgba(97, 20, 99, 0.1)"
                                                            }
                                                        }}
                                                    >
                                                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                "&:hover fieldset": {
                                                    borderColor: "#f7931e"
                                                },
                                                "&.Mui-focused fieldset": {
                                                    borderColor: "#611463"
                                                }
                                            }
                                        }}
                                    />
                                </Grid>
                                
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="ຢືນຢັນລະຫັດຜ່ານໃໝ່"
                                        type={showPassword ? "text" : "password"}
                                        variant="outlined"
                                        value={passwordForm.confirmPassword}
                                        onChange={handlePasswordFormChange("confirmPassword")}
                                        disabled={!loggedIn || isLoading}
                                        error={!!errors.confirmPassword}
                                        helperText={errors.confirmPassword}
                                        InputProps={{
                                            sx: { 
                                                borderRadius: 3,
                                                backgroundColor: "rgba(255, 255, 255, 0.8)"
                                            },
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        edge="end"
                                                        disabled={!loggedIn}
                                                        sx={{
                                                            color: "#611463",
                                                            "&:hover": {
                                                                backgroundColor: "rgba(97, 20, 99, 0.1)"
                                                            }
                                                        }}
                                                    >
                                                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                "&:hover fieldset": {
                                                    borderColor: "#f7931e"
                                                },
                                                "&.Mui-focused fieldset": {
                                                    borderColor: "#611463"
                                                }
                                            }
                                        }}
                                    />
                                </Grid>
                                
                                {/* Password Requirements */}
                                <Grid item xs={12}>
                                    <Paper 
                                        sx={{ 
                                            p: 3, 
                                            borderRadius: 3, 
                                            backgroundColor: "rgba(97, 20, 99, 0.05)",
                                            border: "1px solid rgba(97, 20, 99, 0.1)"
                                        }}
                                    >
                                        <Typography variant="subtitle2" color="#611463" fontWeight={600} gutterBottom>
                                            ຂໍ້ກຳນົດລະຫັດຜ່ານ:
                                        </Typography>
                                        <Box component="ul" sx={{ margin: 0, paddingLeft: 2 }}>
                                            <Typography component="li" variant="body2" color="text.secondary">
                                                ຢ່າງໜ້ອຍ 6 ຕົວອັກສອນ
                                            </Typography>
                                            <Typography component="li" variant="body2" color="text.secondary">
                                                ມີທັງຕົວອັກສອນແລະຕົວເລກ
                                            </Typography>
                                        </Box>
                                    </Paper>
                                </Grid>
                                
                                {/* Save Button */}
                                <Grid item xs={12}>
                                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                                        <Button
                                            variant="contained"
                                            size="large"
                                            startIcon={isLoading ? 
                                                <CircularProgress size={20} color="inherit" /> : 
                                                <LockIcon />
                                            }
                                            onClick={handleSavePassword}
                                            disabled={!loggedIn || isLoading}
                                            sx={{
                                                py: 2,
                                                px: 4,
                                                borderRadius: 3,
                                                background: "linear-gradient(45deg, #611463 30%, #8e24aa 90%)",
                                                boxShadow: "0 4px 15px rgba(97, 20, 99, .3)",
                                                fontWeight: 600,
                                                fontSize: "16px",
                                                transition: "all 0.3s ease",
                                                "&:hover": {
                                                    background: "linear-gradient(45deg, #8e24aa 30%, #611463 90%)",
                                                    transform: "translateY(-2px)",
                                                    boxShadow: "0 8px 20px rgba(97, 20, 99, .4)"
                                                },
                                                "&:disabled": {
                                                    background: "rgba(0, 0, 0, 0.12)"
                                                }
                                            }}
                                        >
                                            {isLoading ? "ກຳລັງປ່ຽນ..." : "ປ່ຽນລະຫັດຜ່ານ"}
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Fade>
                );

            default:
                return null;
        }
    };

    return (
        <Box sx={{ 
            bgcolor: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)", 
            minHeight: "100vh",
            backgroundAttachment: "fixed"
        }}>
            {/* Hero Header with Enhanced Gradient */}
            <Box
                sx={{
                    background: "linear-gradient(135deg, #611463 0%, #f7931e 50%, #611463 100%)",
                    py: { xs: 6, md: 8 },
                    borderRadius: { xs: 0, md: "0 0 50px 50px" },
                    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                    mb: 6,
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                        pointerEvents: "none"
                    }
                }}
            >
                <Container maxWidth="lg">
                    <Grid container alignItems="center" justifyContent="center" spacing={4}>
                        <Grid item xs={12} md={6} sx={{ textAlign: { xs: "center", md: "left" } }}>
                            <Typography
                                variant="h2"
                                fontWeight={800}
                                color="#fff"
                                sx={{
                                    fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
                                    textShadow: "2px 2px 8px rgba(0,0,0,0.3)",
                                    mb: 2,
                                    background: "linear-gradient(45deg, #ffffff 30%, #ffd700 90%)",
                                    backgroundClip: "text",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent"
                                }}
                            >
                                ການຕັ້ງຄ່າ
                            </Typography>
                            <Typography
                                variant="h5"
                                color="rgba(255,255,255,0.95)"
                                sx={{
                                    fontWeight: 400,
                                    maxWidth: "90%",
                                    mx: { xs: "auto", md: 0 },
                                    textShadow: "1px 1px 3px rgba(0,0,0,0.2)",
                                    lineHeight: 1.4
                                }}
                            >
                                ປັບແຕ່ງ HomeCare ເພື່ອປະສົບການທີ່ດີທີ່ສຸດ
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-end" } }}>
                            <Zoom in={true} timeout={1000}>
                                <Avatar
                                    sx={{
                                        width: isMobile ? 100 : 150,
                                        height: isMobile ? 100 : 150,
                                        bgcolor: "rgba(255,255,255,0.15)",
                                        backdropFilter: "blur(10px)",
                                        border: "3px solid rgba(255,255,255,0.3)",
                                        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                                        transition: "all 0.5s ease",
                                        "&:hover": {
                                            transform: "scale(1.1) rotate(5deg)",
                                            boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
                                        }
                                    }}
                                >
                                    <SettingsIcon sx={{ fontSize: isMobile ? 50 : 80, color: "#fff" }} />
                                </Avatar>
                            </Zoom>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Main Settings Section */}
            <Container maxWidth="xl" sx={{ py: { xs: 4, md: 8 } }}>
                <Grid container spacing={6}>
                    {/* Enhanced Settings Navigation */}
                    <Grid item xs={12} md={4} lg={3}>
                        <Card
                            elevation={8}
                            sx={{
                                borderRadius: 6,
                                overflow: "hidden",
                                height: "100%",
                                background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                                border: "1px solid rgba(97, 20, 99, 0.1)",
                                transition: "all 0.3s ease-in-out",
                                "&:hover": {
                                    transform: "translateY(-8px)",
                                    boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
                                }
                            }}
                        >
                            <Box sx={{ 
                                background: "linear-gradient(135deg, #611463 0%, #8e24aa 100%)", 
                                color: "#fff", 
                                p: 4, 
                                textAlign: "center",
                                position: "relative",
                                "&::after": {
                                    content: '""',
                                    position: "absolute",
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    height: "1px",
                                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)"
                                }
                            }}>
                                <Avatar
                                    src={LOGO_HOMECARE}
                                    alt="HomeCare Logo"
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        mx: "auto",
                                        mb: 2,
                                        bgcolor: "#fff",
                                        p: 1.5,
                                        boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
                                    }}
                                />
                                <Typography variant="h5" fontWeight={700}>
                                    ເມນູການຕັ້ງຄ່າ
                                </Typography>
                            </Box>

                            <Box sx={{ py: 2 }}>
                                <Tabs
                                    orientation={isMobile ? "horizontal" : "vertical"}
                                    variant={isMobile ? "fullWidth" : "standard"}
                                    value={tabValue}
                                    onChange={handleTabChange}
                                    sx={{
                                        '& .MuiTabs-indicator': {
                                            left: isMobile ? "auto" : 0,
                                            backgroundColor: "#f7931e",
                                            width: isMobile ? "auto" : 4,
                                            borderRadius: 4
                                        },
                                        '& .MuiTab-root': {
                                            alignItems: "flex-start",
                                            textAlign: "left",
                                            pl: 4,
                                            py: 3,
                                            minHeight: 70,
                                            transition: "all 0.3s ease",
                                            borderRadius: "0 25px 25px 0",
                                            mx: 1,
                                            my: 0.5,
                                            '&:hover': {
                                                backgroundColor: "rgba(97, 20, 99, 0.08)",
                                                transform: "translateX(8px)"
                                            },
                                            '&.Mui-selected': {
                                                color: "#611463",
                                                fontWeight: 700,
                                                backgroundColor: "rgba(247, 147, 30, 0.1)",
                                                transform: "translateX(8px)"
                                            }
                                        }
                                    }}
                                >
                                    <Tab
                                        icon={<AccountCircleIcon sx={{ fontSize: 24 }} />}
                                        iconPosition="start"
                                        label={
                                            <Box>
                                                <Typography variant="body1" fontWeight="inherit">
                                                    ຂໍ້ມູນບັນຊີ
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    ຈັດການຂໍ້ມູນສ່ວນຕົວ
                                                </Typography>
                                            </Box>
                                        }
                                    />
                                    <Tab
                                        icon={<SecurityIcon sx={{ fontSize: 24 }} />}
                                        iconPosition="start"
                                        label={
                                            <Box>
                                                <Typography variant="body1" fontWeight="inherit">
                                                    ຄວາມປອດໄພ
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    ປ່ຽນລະຫັດຜ່ານ
                                                </Typography>
                                            </Box>
                                        }
                                    />
                                </Tabs>
                            </Box>

                            <Divider sx={{ mx: 2 }} />

                            <Box sx={{ p: 4 }}>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontWeight: 500 }}>
                                    ສອບຖາມຂໍ້ມູນເພີ່ມເຕີມ
                                </Typography>
                                <Button
                                    variant="outlined"
                                    startIcon={<HelpIcon />}
                                    fullWidth
                                    onClick={() => navigate(CONTACT_US_PATH)}
                                    sx={{
                                        borderRadius: 3,
                                        borderColor: "#611463",
                                        color: "#611463",
                                        py: 1.5,
                                        fontWeight: 600,
                                        '&:hover': {
                                            borderColor: "#f7931e",
                                            backgroundColor: "rgba(247, 147, 30, 0.08)",
                                            transform: "translateY(-2px)",
                                            boxShadow: "0 4px 12px rgba(97, 20, 99, 0.2)"
                                        }
                                    }}
                                >
                                    ຕິດຕໍ່ພວກເຮົາ
                                </Button>
                            </Box>
                        </Card>
                    </Grid>

                    {/* Enhanced Settings Content */}
                    <Grid item xs={12} md={8} lg={9}>
                        <Paper
                            elevation={8}
                            sx={{
                                borderRadius: 6,
                                overflow: "hidden",
                                background: "linear-gradient(135deg, #ffffff 0%, #fafbfc 100%)",
                                border: "1px solid rgba(97, 20, 99, 0.05)",
                                transition: "all 0.3s ease-in-out",
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow: "0 20px 40px rgba(0,0,0,0.12)"
                                }
                            }}
                        >
                            <CardContent sx={{ p: { xs: 4, md: 6 } }}>
                                {renderSettingsContent()}
                            </CardContent>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

            {/* Delete Avatar Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        minWidth: { xs: 280, sm: 400 }
                    }
                }}
            >
                <DialogTitle sx={{ 
                    color: "#611463", 
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: 2
                }}>
                    <DeleteIcon />
                    ລຶບຮູບໂປຣໄຟລ໌
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ fontSize: "16px", lineHeight: 1.6 }}>
                        ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບຮູບໂປຣໄຟລ໌ນີ້? ການດຳເນີນການນີ້ບໍ່ສາມາດກັບຄືນໄດ້.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ p: 3, gap: 2 }}>
                    <Button 
                        onClick={() => setDeleteDialogOpen(false)}
                        variant="outlined"
                        sx={{ borderRadius: 2 }}
                    >
                        ຍົກເລີກ
                    </Button>
                    <Button 
                        onClick={handleDeleteAvatar}
                        variant="contained"
                        color="error"
                        disabled={isLoading}
                        startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : <DeleteIcon />}
                        sx={{ borderRadius: 2 }}
                    >
                        {isLoading ? "ກຳລັງລຶບ..." : "ລຶບ"}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Enhanced Notification Snackbar */}
            <Snackbar
                open={notification.open}
                autoHideDuration={6000}
                onClose={handleCloseNotification}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseNotification}
                    severity={notification.severity}
                    sx={{ 
                        width: '100%',
                        borderRadius: 3,
                        boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                        "& .MuiAlert-icon": {
                            fontSize: 24
                        }
                    }}
                >
                    <Typography variant="body1" fontWeight={500}>
                        {notification.message}
                    </Typography>
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default SettingsPage;