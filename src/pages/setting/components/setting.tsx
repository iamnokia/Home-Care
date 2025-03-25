import React, { useState } from "react";
import {
    Box,
    Container,
    Typography,
    Grid,
    TextField,
    Button,
    Stack,
    Card,
    CardContent,
    Divider,
    Paper,
    Avatar,
    Switch,
    Tabs,
    Tab,
    useMediaQuery,
    useTheme,
    Slider,
    FormControlLabel,
    Select,
    MenuItem,
    InputAdornment,
    IconButton,
    FormControl,
    InputLabel,
    Radio,
    RadioGroup
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SecurityIcon from "@mui/icons-material/Security";
import LanguageIcon from "@mui/icons-material/Language";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import HelpIcon from "@mui/icons-material/Help";
import SaveIcon from "@mui/icons-material/Save";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PhoneIcon from "@mui/icons-material/Phone";
import LOGO_HOMECARE from "../../../assets/icons/HomeCareLogo.png";
import { CONTACT_US_PATH } from "../../../routes/path";
import { useNavigate } from "react-router-dom";



const SettingsPage = () => {
    const navigate = useNavigate();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [tabValue, setTabValue] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [settings, setSettings] = useState({
        notifications: true,
        darkMode: false,
        language: "english",
        fontSize: 16,
        dataUsage: 50,
        autoBackup: true,
        emailNotifications: true,
        gender: "male"
    });

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleSettingChange = (name, value) => {
        setSettings({
            ...settings,
            [name]: value
        });
    };

    const handleSliderChange = (name) => (event, newValue) => {
        handleSettingChange(name, newValue);
    };

    const handleToggleChange = (name) => (event) => {
        handleSettingChange(name, event.target.checked);
    };

    const handleSelectChange = (name) => (event) => {
        handleSettingChange(name, event.target.value);
    };

    const handleRadioChange = (name) => (event) => {
        handleSettingChange(name, event.target.value);
    };

    const renderSettingsContent = () => {
        switch (tabValue) {
            case 0: // Profile
                return (
                    <Box>
                        <Typography variant="h6" fontWeight={600} color="#611463" sx={{ mb: 3 }}>
                            ຂໍ້ມູນບັນຊີ
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} display="flex" justifyContent="center" mb={2}>
                                <Box sx={{ position: "relative" }}>
                                    <Avatar
                                        sx={{
                                            width: 120,
                                            height: 120,
                                            border: "4px solid #f8f8f8",
                                            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                                        }}
                                    >
                                        <AccountCircleIcon sx={{ fontSize: 80 }} />
                                    </Avatar>
                                    <Button
                                        variant="contained"
                                        component="label"
                                        sx={{
                                            minWidth: "auto",
                                            width: 36,
                                            height: 36,
                                            borderRadius: "50%",
                                            position: "absolute",
                                            bottom: 5,
                                            right: 5,
                                            padding: 0,
                                            backgroundColor: "#f7931e",
                                            "&:hover": {
                                                backgroundColor: "#e57e00"
                                            }
                                        }}
                                    >
                                        <CloudUploadIcon fontSize="small" />
                                        <input type="file" hidden accept="image/*" />
                                    </Button>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="ຊື່ຂອງທ່ານ"
                                    variant="outlined"
                                    InputProps={{
                                        sx: { borderRadius: 2 }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="ນາມສະກຸນ"
                                    variant="outlined"
                                    InputProps={{
                                        sx: { borderRadius: 2 }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="ຊື່ບັນຊີ"
                                    variant="outlined"
                                    InputProps={{
                                        sx: { borderRadius: 2 }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="ເບີໂທລະສັບ"
                                    variant="outlined"
                                    InputProps={{
                                        sx: { borderRadius: 2 },
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PhoneIcon sx={{ color: "text.secondary" }} />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="ທີ່ຢູ່ອີເມລ"
                                    variant="outlined"
                                    InputProps={{
                                        sx: { borderRadius: 2 }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl component="fieldset">
                                    <Typography variant="subtitle1" sx={{ mb: 1 }}>ເພດ</Typography>
                                    <RadioGroup
                                        row
                                        value={settings.gender}
                                        onChange={handleRadioChange("gender")}
                                    >
                                        <FormControlLabel value="male" control={<Radio sx={{ color: "#611463", '&.Mui-checked': { color: "#611463" } }} />} label="Male" />
                                        <FormControlLabel value="female" control={<Radio sx={{ color: "#611463", '&.Mui-checked': { color: "#611463" } }} />} label="Female" />
                                        <FormControlLabel value="other" control={<Radio sx={{ color: "#611463", '&.Mui-checked': { color: "#611463" } }} />} label="Other" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="ທີ່ຢູ່"
                                    variant="outlined"
                                    InputProps={{
                                        sx: { borderRadius: 2 }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
                                    <Button
                                        variant="contained"
                                        startIcon={<SaveIcon />}
                                        sx={{
                                            py: 2,
                                            px: 3,
                                            borderRadius: 2,
                                            background: "linear-gradient(45deg, #611463 30%, #8e24aa 90%)",
                                            boxShadow: "0 3px 5px 2px rgba(97, 20, 99, .3)",
                                            fontWeight: 600,
                                            transition: "all 0.3s ease",
                                            marginLeft: "auto",
                                            "&:hover": {
                                                background: "linear-gradient(45deg, #8e24aa 30%, #611463 90%)",
                                                transform: "translateY(-2px)",
                                                boxShadow: "0 6px 10px 2px rgba(97, 20, 99, .4)"
                                            }
                                        }}
                                    >
                                        ບັນທຶກ
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                );
            case 1: // Security
                return (
                    <Box>
                        <Typography variant="h6" fontWeight={600} color="#611463" sx={{ mb: 3 }}>
                            ການຕັ້ງຄ່າຄວາມປອດໄພ
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="ລະຫັດຜ່ານປັດຈຸບັນ"
                                    type={showPassword ? "text" : "password"}
                                    variant="outlined"
                                    InputProps={{
                                        sx: { borderRadius: 2 },
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="ລະຫັດຜ່ານໃໝ່"
                                    type={showPassword ? "text" : "password"}
                                    variant="outlined"
                                    InputProps={{
                                        sx: { borderRadius: 2 },
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="ຢືນຢັນລະຫັດຜ່ານໃໝ່"
                                    type={showPassword ? "text" : "password"}
                                    variant="outlined"
                                    InputProps={{
                                        sx: { borderRadius: 2 },
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="subtitle1" fontWeight={500} sx={{ mt: 1, mb: 2 }}>
                                    ການນຳໃຊ້
                                </Typography>
                                <Button
                                    variant="outlined"
                                    color="warning"
                                    sx={{
                                        borderRadius: 2,
                                        px: 3,
                                        mr: 2
                                    }}
                                >
                                    ອອກຈາກລະບົບ
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                                    <Button
                                        variant="contained"
                                        startIcon={<SaveIcon />}
                                        sx={{
                                            py: 1,
                                            px: 3,
                                            borderRadius: 2,
                                            background: "linear-gradient(45deg, #611463 30%, #8e24aa 90%)",
                                            boxShadow: "0 3px 5px 2px rgba(97, 20, 99, .3)",
                                            fontWeight: 600,
                                            transition: "all 0.3s ease",
                                            "&:hover": {
                                                background: "linear-gradient(45deg, #8e24aa 30%, #611463 90%)",
                                                transform: "translateY(-2px)",
                                                boxShadow: "0 6px 10px 2px rgba(97, 20, 99, .4)"
                                            }
                                        }}
                                    >
                                        ບັນທຶກ
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                );
            case 2: // Preferences
                return (
                    <Box>
                        <Typography variant="h6" fontWeight={600} color="#611463" sx={{ mb: 3 }}>
                            ການປັບແຕ່ງສ່ວນໂຕ
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <DarkModeIcon sx={{ color: "#611463", mr: 2 }} />
                                        <Typography variant="subtitle1">ໂໝດກາງຄືນ</Typography>
                                    </Box>
                                    <Switch
                                        checked={settings.darkMode}
                                        onChange={handleToggleChange("darkMode")}
                                        sx={{
                                            '& .MuiSwitch-switchBase.Mui-checked': {
                                                color: "#611463",
                                                '&:hover': {
                                                    backgroundColor: "rgba(97, 20, 99, 0.08)",
                                                },
                                            },
                                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                                backgroundColor: "#8e24aa",
                                            },
                                        }}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                    <LanguageIcon sx={{ color: "#611463", mr: 2 }} />
                                    <Typography variant="subtitle1">ພາສາ</Typography>
                                </Box>
                                <Select
                                    fullWidth
                                    value={settings.language}
                                    onChange={handleSelectChange("language")}
                                    sx={{ borderRadius: 2 }}
                                >
                                    <MenuItem value="english">English</MenuItem>
                                    <MenuItem value="thai">ไทย</MenuItem>
                                    <MenuItem value="ລາວ">Lao</MenuItem>
                                    <MenuItem value="chinese">漢語</MenuItem>
                                </Select>
                            </Grid>

                            <Grid item xs={12}>
                                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                                    <Button
                                        variant="contained"
                                        startIcon={<SaveIcon />}
                                        sx={{
                                            py: 1,
                                            px: 3,
                                            borderRadius: 2,
                                            background: "linear-gradient(45deg, #611463 30%, #8e24aa 90%)",
                                            boxShadow: "0 3px 5px 2px rgba(97, 20, 99, .3)",
                                            fontWeight: 600,
                                            transition: "all 0.3s ease",
                                            marginLeft: "auto",
                                            "&:hover": {
                                                background: "linear-gradient(45deg, #8e24aa 30%, #611463 90%)",
                                                transform: "translateY(-2px)",
                                                boxShadow: "0 6px 10px 2px rgba(97, 20, 99, .4)"
                                            }
                                        }}
                                    >
                                        ບັນທຶກ
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                );

            default:
                return null;
        }
    };

    return (
        <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh" }}>
            {/* Hero Header with Gradient */}
            <Box
                sx={{
                    background: "linear-gradient(45deg, #611463 30%, #f7931e 90%)",
                    py: { xs: 4, md: 6 },
                    borderRadius: { xs: 0, md: "0 0 30px 30px" },
                    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                    mb: 4
                }}
            >
                <Container maxWidth="lg">
                    <Grid container alignItems="center" justifyContent="center" spacing={3}>
                        <Grid item xs={12} md={6} sx={{ textAlign: { xs: "center", md: "left" } }}>
                            <Typography
                                variant="h3"
                                fontWeight={700}
                                color="#fff"
                                sx={{
                                    fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                                    textShadow: "1px 1px 3px rgba(0,0,0,0.2)"
                                }}
                            >
                                Settings
                            </Typography>
                            <Typography
                                variant="h6"
                                color="rgba(255,255,255,0.9)"
                                sx={{
                                    mt: 1,
                                    fontWeight: 400,
                                    maxWidth: "90%",
                                    mx: { xs: "auto", md: 0 }
                                }}
                            >
                                Customize your experience to make HomeCare work best for you
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-end" } }}>
                            <Avatar
                                sx={{
                                    width: isMobile ? 80 : 120,
                                    height: isMobile ? 80 : 120,
                                    bgcolor: "rgba(255,255,255,0.2)",
                                    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                        boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
                                    }
                                }}
                            >
                                <SettingsIcon sx={{ fontSize: isMobile ? 40 : 60, color: "#fff" }} />
                            </Avatar>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Main Settings Section */}
            <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 } }}>
                <Grid container spacing={4}>
                    {/* Settings Navigation */}
                    <Grid item xs={12} md={3}>
                        <Card
                            elevation={3}
                            sx={{
                                borderRadius: 4,
                                overflow: "hidden",
                                height: "100%",
                                transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                                "&:hover": {
                                    transform: "translateY(-5px)",
                                    boxShadow: "0 12px 20px rgba(0,0,0,0.1)"
                                }
                            }}
                        >
                            <Box sx={{ bgcolor: "#611463", color: "#fff", p: 3, textAlign: "center" }}>
                                <Avatar
                                    src={LOGO_HOMECARE}
                                    alt="HomeCare Logo"
                                    sx={{
                                        width: 70,
                                        height: 70,
                                        mx: "auto",
                                        mb: 2,
                                        bgcolor: "#fff",
                                        p: 1
                                    }}
                                />
                                <Typography variant="h6" fontWeight={600}>
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
                                            width: isMobile ? "auto" : 3,
                                            borderRadius: 4
                                        },
                                        '& .MuiTab-root': {
                                            alignItems: "flex-start",
                                            textAlign: "left",
                                            pl: 3,
                                            py: 2,
                                            minHeight: 60,
                                            transition: "all 0.3s ease",
                                            '&:hover': {
                                                backgroundColor: "rgba(97, 20, 99, 0.05)"
                                            },
                                            '&.Mui-selected': {
                                                color: "#611463",
                                                fontWeight: 600
                                            }
                                        }
                                    }}
                                >
                                    <Tab
                                        icon={<AccountCircleIcon />}
                                        iconPosition="start"
                                        label="ຂໍ້ມູນບັນຊີ"
                                        sx={{ borderLeft: tabValue === 0 ? "3px solid #f7931e" : "none" }}
                                    />
                                    <Tab
                                        icon={<SecurityIcon />}
                                        iconPosition="start"
                                        label="ຄວາມປອດໄພ"
                                        sx={{ borderLeft: tabValue === 1 ? "3px solid #f7931e" : "none" }}
                                    />
                                    <Tab
                                        icon={<ColorLensIcon />}
                                        iconPosition="start"
                                        label="ປັບແຕ່ງ"
                                        sx={{ borderLeft: tabValue === 2 ? "3px solid #f7931e" : "none" }}
                                    />

                                </Tabs>
                            </Box>

                            <Divider />

                            <Box sx={{ p: 3 }}>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                    ສອບຖາມຂໍ້ມູນເພີ່ມເຕີມ
                                </Typography>
                                <Button
                                    variant="outlined"
                                    startIcon={<HelpIcon />}
                                    fullWidth
                                    onClick={() => navigate(CONTACT_US_PATH)}
                                    sx={{
                                        borderRadius: 2,
                                        borderColor: "#611463",
                                        color: "#611463",
                                        '&:hover': {
                                            borderColor: "#8e24aa",
                                            backgroundColor: "rgba(97, 20, 99, 0.05)"
                                        }
                                    }}
                                >
                                    ຕິດຕໍ່ພວກເຮົາ
                                </Button>
                            </Box>
                        </Card>
                    </Grid>

                    {/* Settings Content */}
                    <Grid item xs={12} md={9}>
                        <Paper
                            elevation={3}
                            sx={{
                                borderRadius: 4,
                                overflow: "hidden",
                                transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                                "&:hover": {
                                    transform: "translateY(-5px)",
                                    boxShadow: "0 12px 20px rgba(0,0,0,0.1)"
                                }
                            }}
                        >
                            <CardContent sx={{ p: 4 }}>
                                {renderSettingsContent()}
                            </CardContent>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default SettingsPage;