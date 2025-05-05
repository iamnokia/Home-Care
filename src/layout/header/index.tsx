import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import FreeIcon from "../../assets/icons/HomeCareLogo.png";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BadgeIcon from "@mui/icons-material/Badge";
import StarIcon from "@mui/icons-material/Star";
import {
  SERVICE_PATH,
  HOME_PATH,
  HISTORY_PATH,
  CONTACT_US_PATH,
  SETTING_PATH
} from "../../routes/path";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  Fade,
  Paper,
  CircularProgress,
  Chip,
  Divider,
} from "@mui/material";
import LoginDialog from "../components/dialog-login";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { logout } from "../../store/authenticationSlice";

interface PageItem {
  to: string;
  label: string;
}

interface SettingItem {
  to: string;
  label: string;
  onClick?: () => void;
}

const pages: PageItem[] = [
  { to: HOME_PATH, label: "ໜ້າຫຼັກ" },
  { to: SERVICE_PATH, label: "ການບໍລິການ" },
  { to: HISTORY_PATH, label: "ປະຫວັດການບໍລິການ" },
  { to: CONTACT_US_PATH, label: "ຕິດຕໍ່ພວກເຮົາ" },
];

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state: RootState) => state.auth);

  const [currentPath, setCurrentPath] = useState<string>(location.pathname);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [loginDialogOpen, setLoginDialogOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<{
    employees: any[];
    cars: any[];
    totalFound: number;
  }>({
    employees: [],
    cars: [],
    totalFound: 0
  });
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const handleOpenLoginDialog = (): void => {
    setLoginDialogOpen(true);
  };

  const handleLogout = (): void => {
    handleCloseUserMenu();
    dispatch(logout());
  };

  const settings: SettingItem[] = loggedIn
    ? [
        { to: SETTING_PATH, label: "ຂໍ້ມູນບັນຊີ" },
        { to: SETTING_PATH, label: "ຕັ້ງຄ່າ" },
        { 
          to: "#", 
          label: "ອອກຈາກລະບົບ",
          onClick: handleLogout
        }
      ]
    : [
        { to: "#", label: "ເຂົ້າສູ່ລະບົບ", onClick: handleOpenLoginDialog }
      ];

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElNav(event.currentTarget);
  };
  
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (): void => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (): void => {
    setAnchorElUser(null);
  };

  const handleCloseLoginDialog = (): void => {
    setLoginDialogOpen(false);
  };

  const searchInObject = (obj: any, searchField: string, term: string): boolean => {
    const value = obj[searchField]?.toString().toLowerCase() || '';
    return value.includes(term.toLowerCase());
  };

  const filterEmployees = (employees: any[], term: string): any[] => {
    const searchFields = ['first_name', 'last_name', 'address', 'gender', 'city', 'cat_name'];
    return employees.filter(employee => 
      searchFields.some(field => searchInObject(employee, field, term))
    );
  };

  const filterCars = (cars: any[], term: string): any[] => {
    const searchFields = ['car_brand', 'model', 'license_plate'];
    return cars.filter(car => 
      searchFields.some(field => searchInObject(car, field, term))
    );
  };

  const performSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults({ employees: [], cars: [], totalFound: 0 });
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    try {
      const [employeesResponse, carsResponse] = await Promise.all([
        fetch('https://homecare-pro.onrender.com/employees/read_employees'),
        fetch('https://homecare-pro.onrender.com/emp_car/read_emp_car')
      ]);

      const employeesData = await employeesResponse.json();
      const carsData = await carsResponse.json();

      const filteredEmployees = filterEmployees(employeesData, query);
      const filteredCars = filterCars(carsData, query);

      setSearchResults({
        employees: filteredEmployees,
        cars: filteredCars,
        totalFound: filteredEmployees.length + filteredCars.length
      });
      setShowResults(true);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults({ employees: [], cars: [], totalFound: 0 });
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults({ employees: [], cars: [], totalFound: 0 });
    setShowResults(false);
  };

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  const handleViewDetails = (id: string | number, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/service-detail/${id}`);
  };

  return (
    <>
      <AppBar position="static" sx={{ 
        background: 'linear-gradient(135deg, #611463 0%, #7b1980 100%)',
        boxShadow: '0 6px 25px rgba(0, 0, 0, 0.4)',
      }}>
        <Container maxWidth="xl">
          <Toolbar 
            disableGutters 
            sx={{ 
              minHeight: { xs: '85px', md: '100px' },
              py: 1.5,
              backdropFilter: 'blur(10px)'
            }}
          >
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                width: "85px",
                height: "85px",
                mr: 3,
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
                  zIndex: -1,
                  borderRadius: "50%",
                  filter: "blur(10px)"
                }
              }}
            >
              <img
                src={FreeIcon}
                alt=""
                style={{ 
                  width: "100px", 
                  height: "100px", 
                  marginTop: -8,
                  filter: "drop-shadow(0 5px 10px rgba(0,0,0,0.3))",
                  transition: "all 0.5s ease",
                }}
              />
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                sx={{ 
                  p: 1.5,
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(5px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(247, 147, 30, 0.1)',
                    transform: 'scale(1.05)',
                    borderColor: '#f7931e'
                  }
                }}
              >
                <MenuIcon fontSize="large" sx={{ 
                  filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.3))'
                }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
                TransitionComponent={Fade}
                PaperProps={{
                  elevation: 8,
                  sx: {
                    borderRadius: 3,
                    mt: 2,
                    boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                    overflow: 'hidden',
                    minWidth: '250px'
                  }
                }}
              >
                {pages.map((page) => (
                  <MenuItem 
                    key={page.to} 
                    onClick={handleCloseNavMenu}
                    component={Link}
                    to={page.to}
                    sx={{
                      borderLeft: page.to === currentPath ? '5px solid #f7931e' : 'none',
                      backgroundColor: page.to === currentPath ? 'rgba(247, 147, 30, 0.1)' : 'transparent',
                      py: 2,
                      pl: 3,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(97, 20, 99, 0.08)',
                        pl: 4
                      }
                    }}
                  >
                    <Typography 
                      textAlign="left" 
                      fontSize="16px" 
                      fontWeight={page.to === currentPath ? "bold" : "normal"}
                    >
                      {page.label}
                    </Typography>
                  </MenuItem>
                ))}
                {!loggedIn && (
                  <MenuItem
                    onClick={() => {
                      handleCloseNavMenu();
                      handleOpenLoginDialog();
                    }}
                    sx={{
                      py: 2,
                      my: 1,
                      mx: 2,
                      backgroundColor: 'rgba(247, 147, 30, 0.9)',
                      borderRadius: '8px',
                      '&:hover': {
                        backgroundColor: 'rgba(247, 147, 30, 1)',
                      }
                    }}
                  >
                    <Typography 
                      textAlign="center" 
                      fontWeight="bold" 
                      color="white"
                      fontSize="16px"
                    >
                      ເຂົ້າສູ່ລະບົບ
                    </Typography>
                  </MenuItem>
                )}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "White",
                textDecoration: "none",
                fontSize: { xs: "1.4rem", sm: "1.6rem" },
              }}
            >
              HomeCare
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
                gap: 8,
                px: 4,
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  left: "50%",
                  bottom: "-20px",
                  height: "2px",
                  width: "40%",
                  transform: "translateX(-50%)",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                }
              }}
            >
              {pages.map((page) => (
                <Link
                  key={page.to}
                  to={page.to}
                  onClick={handleCloseNavMenu}
                  style={{
                    margin: "2px 0",
                    display: "flex",
                    textDecoration: "none",
                    fontSize: "19px",
                    boxSizing: "border-box",
                    color: page.to === currentPath ? "#ffffff" : "rgba(255, 255, 255, 0.85)",
                    borderBottom:
                      page.to === currentPath ? "3px solid #f7931e" : "none",
                    fontWeight: page.to === currentPath ? "bold" : "500",
                    position: "relative",
                    transition:
                      "transform 0.4s ease, color 0.3s ease-in-out, border-bottom 0.3s ease-in-out",
                    overflow: "hidden",
                    padding: "10px 5px",
                    alignItems: "center",
                    letterSpacing: "0.5px",
                    textShadow: page.to === currentPath ? "0 1px 3px rgba(0,0,0,0.2)" : "none",
                  }}
                  onMouseEnter={(e) => {
                    const indicator = e.currentTarget.querySelector('.hover-indicator') as HTMLElement;
                    if (indicator) indicator.style.left = '0';
                  }}
                  onMouseLeave={(e) => {
                    const indicator = e.currentTarget.querySelector('.hover-indicator') as HTMLElement;
                    if (indicator) indicator.style.left = '-100%';
                  }}
                >
                  {page.label}
                  <span
                    style={{
                      position: "absolute",
                      left: "-100%",
                      bottom: 0,
                      height: "3px",
                      width: "100%",
                      background: "linear-gradient(90deg, transparent, #f7931e, #ffb347)",
                      transition: "left 0.4s ease",
                      borderRadius: "10px 10px 0 0",
                      boxShadow: "0 -1px 5px rgba(247, 147, 30, 0.3)"
                    }}
                    className="hover-indicator"
                  />
                </Link>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0, display: 'flex', gap: 3, alignItems: 'center' }}>
              {!loggedIn ? (
                <Button
                  onClick={handleOpenLoginDialog}
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(45deg, #f7931e 0%, #ffb347 100%)',
                    color: "white",
                    "&:hover": {
                      background: 'linear-gradient(45deg, #f7931e 30%, #ffb347 90%)',
                      transform: "translateY(-3px)",
                      boxShadow: '0 8px 16px rgba(247, 147, 30, 0.4)'
                    },
                    textTransform: "none",
                    borderRadius: "30px",
                    padding: "10px 28px",
                    fontSize: "17px",
                    fontWeight: "bold",
                    letterSpacing: "0.5px",
                    transition: "all 0.4s ease",
                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                      transition: "all 0.4s ease",
                    },
                    "&:hover::before": {
                      left: "100%",
                    },
                  }}
                >
                  ເຂົ້າສູ່ລະບົບ
                </Button>
              ) : null}
              <Tooltip title="Open settings">
                <IconButton 
                  onClick={handleOpenUserMenu} 
                  sx={{ 
                    p: 1, 
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    transition: 'all 0.4s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      transform: 'scale(1.1)',
                      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
                      borderColor: '#f7931e'
                    },
                    backdropFilter: 'blur(5px)',
                    background: 'rgba(255, 255, 255, 0.05)'
                  }}
                >
                  <Avatar 
                    alt="" 
                    src="" 
                    sx={{ 
                      width: 42, 
                      height: 42,
                      boxShadow: '0 3px 10px rgba(0, 0, 0, 0.3)',
                      background: 'linear-gradient(135deg, #f7931e 0%, #ffb347 100%)',
                      border: '2px solid rgba(255, 255, 255, 0.7)'
                    }} 
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                PaperProps={{
                  elevation: 8,
                  sx: {
                    borderRadius: 2,
                    minWidth: '180px',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                    overflow: 'hidden'
                  }
                }}
              >
                {settings.map((setting) => (
                  <MenuItem 
                    key={setting.to + setting.label} 
                    onClick={setting.onClick || handleCloseUserMenu}
                    component={Link}
                    to={setting.to}
                    sx={{
                      py: 1.5,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(97, 20, 99, 0.08)',
                        pl: 3
                      }
                    }}
                  >
                    <Typography textAlign="center" fontSize="15px">{setting.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
        <Box
          sx={{
            background: 'linear-gradient(to right, #4e0e52 0%, #7b1980 50%, #4e0e52 100%)',
            display: "flex",
            width: "100%",
            justifyContent: "flex-end",
            minHeight: 70,
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: 'inset 0 5px 15px rgba(0, 0, 0, 0.15)',
            position: "relative"
          }}
        >
          <Grid sx={{ 
            px: { xs: 2, md: 20 }, 
            alignItems: "center", 
            display: "flex",
            width: { xs: '100%', md: 'auto' },
            justifyContent: { xs: 'center', md: 'flex-end' },
            py: 1.5,
            position: "relative"
          }}>
            <Box sx={{ position: 'relative', width: { xs: '100%', sm: '320px' }, maxWidth: '450px' }}>
              <TextField
                placeholder="ຄົ້ນຫາ ພະນັກງານ, ລົດ..."
                variant="standard"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.97)",
                  borderRadius: "35px",
                  width: "100%",
                  "& .MuiInput-underline:before": {
                    borderBottom: "none",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottom: "none",
                  },
                  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                    borderBottom: "none",
                  },
                  boxShadow: searchQuery ? '0 8px 25px rgba(97, 20, 99, 0.2)' : '0 4px 15px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.4s ease',
                  '&:hover': {
                    boxShadow: '0 12px 30px rgba(97, 20, 99, 0.3), 0 0 20px rgba(247, 147, 30, 0.2)',
                    transform: 'translateY(-2px)'
                  },
                  border: `2px solid ${searchQuery ? '#f7931e' : 'rgba(255, 255, 255, 0.4)'}`,
                }}
                InputProps={{
                  style: {
                    height: 54,
                    paddingLeft: 24,
                    paddingRight: 24,
                    fontSize: '16px',
                    fontWeight: '500',
                    letterSpacing: '0.5px',
                    fontFamily: '"Noto Sans Lao", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon 
                        sx={{ 
                          color: searchQuery ? '#f7931e' : '#611463',
                          fontSize: '24px',
                          transition: 'all 0.3s ease',
                        }}
                      />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      {isSearching ? (
                        <CircularProgress size={20} sx={{ color: '#f7931e' }} />
                      ) : searchQuery ? (
                        <IconButton
                          size="small"
                          onClick={clearSearch}
                          sx={{ 
                            mr: 1,
                            '&:hover': { 
                              backgroundColor: 'rgba(97, 20, 99, 0.1)' 
                            }
                          }}
                        >
                          <CloseIcon sx={{ color: '#611463' }} />
                        </IconButton>
                      ) : null}
                    </InputAdornment>
                  )
                }}
              />

              {showResults && (
                <Paper
                  elevation={16}
                  sx={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    mt: 2,
                    maxHeight: '500px',
                    overflowY: 'auto',
                    zIndex: 1000,
                    borderRadius: 3,
                    backgroundColor: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(97, 20, 99, 0.1)',
                    '&::-webkit-scrollbar': {
                      width: '6px',
                    },
                    '&::-webkit-scrollbar-track': {
                      background: 'rgba(97, 20, 99, 0.05)',
                      borderRadius: '3px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: 'rgba(97, 20, 99, 0.2)',
                      borderRadius: '3px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                      background: 'rgba(97, 20, 99, 0.3)',
                    },
                    boxShadow: '0 8px 32px rgba(97, 20, 99, 0.12), 0 0 0 1px rgba(97, 20, 99, 0.05)',
                  }}
                >
                  {searchResults.totalFound === 0 ? (
                    <Box sx={{ 
                      p: 4, 
                      textAlign: 'center',
                      background: 'linear-gradient(145deg, rgba(97, 20, 99, 0.02), rgba(247, 147, 30, 0.02))',
                      borderRadius: 3,
                    }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: '#611463',
                          fontWeight: '600',
                          mb: 1,
                          fontSize: '18px'
                        }}
                      >
                        ບໍ່ພົບຜົນການຄົ້ນຫາ
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: 'rgba(97, 20, 99, 0.7)',
                          fontSize: '15px'
                        }}
                      >
                        ກະລຸນາລອງຄໍາທີ່ຕ່າງກັນ
                      </Typography>
                    </Box>
                  ) : (
                    <>
                      <Box 
                        sx={{ 
                          p: 2, 
                          background: 'linear-gradient(135deg, rgba(97, 20, 99, 0.05), rgba(247, 147, 30, 0.05))',
                          borderBottom: '1px solid rgba(97, 20, 99, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 2,
                        }}
                      >
                        <Chip 
                          label={`${searchResults.totalFound} ຜົນການຄົ້ນຫາ`}
                          sx={{ 
                            background: 'linear-gradient(45deg, #611463, #f7931e)',
                            color: 'white',
                            fontWeight: 'bold',
                            '& .MuiChip-label': {
                              px: 2,
                            }
                          }}
                        />
                      </Box>

                      {searchResults.employees.length > 0 && (
                        <Box>
                          <Box sx={{ 
                            p: 2, 
                            background: 'linear-gradient(90deg, transparent, rgba(97, 20, 99, 0.03), transparent)',
                            borderTop: '1px solid rgba(97, 20, 99, 0.05)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5
                          }}>
                            <PersonIcon sx={{ color: '#611463', fontSize: '24px' }} />
                            <Typography 
                              variant="h6" 
                              sx={{ 
                                color: '#611463',
                                fontWeight: '700',
                                fontSize: '18px'
                              }}
                            >
                              ພະນັກງານ ({searchResults.employees.length})
                            </Typography>
                          </Box>
                          {searchResults.employees.map((employee: any) => (
                            <Box 
                              key={employee.emp_id}
                              onClick={() => navigate(`/service-detail/${employee.emp_id}`)}
                              sx={{ 
                                p: 2.5, 
                                mx: 2,
                                mb: 1.5,
                                borderRadius: 2,
                                background: `linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.95))`,
                                border: '1px solid rgba(97, 20, 99, 0.08)',
                                transition: 'all 0.3s ease',
                                '&:hover': { 
                                  transform: 'translateY(-4px) translateX(8px)',
                                  boxShadow: '0 12px 24px rgba(97, 20, 99, 0.12), -5px 0 20px rgba(247, 147, 30, 0.08)',
                                  borderColor: '#f7931e',
                                  cursor: 'pointer'
                                },
                                position: 'relative',
                                overflow: 'hidden',
                                '&::before': {
                                  content: '""',
                                  position: 'absolute',
                                  left: 0,
                                  top: 0,
                                  height: '100%',
                                  width: '4px',
                                  background: 'linear-gradient(to bottom, #611463, #f7931e)',
                                  transform: 'translateX(-100%)',
                                  transition: 'transform 0.3s ease',
                                },
                                '&:hover::before': {
                                  transform: 'translateX(0)',
                                }
                              }}
                            >
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Avatar
                                  sx={{ 
                                    bgcolor: 'linear-gradient(45deg, #611463, #f7931e)',
                                    width: 40,
                                    height: 40,
                                    mr: 2,
                                    boxShadow: '0 4px 12px rgba(97, 20, 99, 0.3)'
                                  }}
                                >
                                  {employee.first_name[0]}{employee.last_name[0]}
                                </Avatar>
                                <Box>
                                  <Typography 
                                    variant="h6" 
                                    fontWeight="bold"
                                    sx={{ 
                                      fontSize: '17px',
                                      color: '#611463'
                                    }}
                                  >
                                    {employee.first_name} {employee.last_name}
                                  </Typography>
                                  <Typography 
                                    variant="body2" 
                                    sx={{ 
                                      color: '#f7931e',
                                      fontWeight: '600',
                                      fontSize: '14px'
                                    }}
                                  >
                                    {employee.cat_name}
                                  </Typography>
                                </Box>
                              </Box>
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                                <Chip 
                                  size="small"
                                  label={`ເພດ: ${employee.gender}`}
                                  sx={{ 
                                    bgcolor: 'rgba(97, 20, 99, 0.08)',
                                    color: '#611463',
                                    '& .MuiChip-label': { px: 1.5 }
                                  }}
                                />
                                <Chip 
                                  size="small"
                                  icon={<LocationOnIcon sx={{ fontSize: '16px !important' }} />}
                                  label={`${employee.city}`}
                                  sx={{ 
                                    bgcolor: 'rgba(247, 147, 30, 0.08)',
                                    color: '#f7931e',
                                    '& .MuiChip-label': { px: 1.5 }
                                  }}
                                />
                              </Box>
                              <Typography 
                                variant="body2" 
                                sx={{ 
                                  color: 'rgba(97, 20, 99, 0.7)',
                                  mt: 1.5,
                                  fontSize: '14px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 0.5
                                }}
                              >
                                <LocationOnIcon sx={{ fontSize: '16px', color: 'rgba(97, 20, 99, 0.5)' }} />
                                {employee.address}
                              </Typography>
                              <Button
                                variant="contained"
                                onClick={(e) => handleViewDetails(employee.emp_id, e)}
                                fullWidth
                                sx={{
                                  mt: 2,
                                  bgcolor: '#611463',
                                  '&:hover': { bgcolor: '#4b1050' },
                                  textTransform: 'none',
                                  borderRadius: '10px',
                                  fontSize: '14px'
                                }}
                              >
                                ເບິ່ງລາຍລະອຽດ
                              </Button>
                            </Box>
                          ))}
                        </Box>
                      )}
                      
                      {searchResults.cars.length > 0 && (
                        <Box sx={{ mt: searchResults.employees.length > 0 ? 2 : 0 }}>
                          <Box sx={{ 
                            p: 2, 
                            background: 'linear-gradient(90deg, transparent, rgba(247, 147, 30, 0.03), transparent)',
                            borderTop: '1px solid rgba(247, 147, 30, 0.05)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5
                          }}>
                            <DirectionsCarIcon sx={{ color: '#f7931e', fontSize: '24px' }} />
                            <Typography 
                              variant="h6" 
                              sx={{ 
                                color: '#f7931e',
                                fontWeight: '700',
                                fontSize: '18px'
                              }}
                            >
                              ລົດ ({searchResults.cars.length})
                            </Typography>
                          </Box>
                          {searchResults.cars.map((car: any) => (
                            <Box 
                              key={car.car_id}
                              onClick={() => navigate(`/service-detail/${car.emp_id}`)}
                              sx={{ 
                                p: 2.5, 
                                mx: 2,
                                mb: 1.5,
                                borderRadius: 2,
                                background: `linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.95))`,
                                border: '1px solid rgba(247, 147, 30, 0.08)',
                                transition: 'all 0.3s ease',
                                '&:hover': { 
                                  transform: 'translateY(-4px) translateX(8px)',
                                  boxShadow: '0 12px 24px rgba(247, 147, 30, 0.12), -5px 0 20px rgba(97, 20, 99, 0.08)',
                                  borderColor: '#611463',
                                  cursor: 'pointer'
                                },
                                position: 'relative',
                                overflow: 'hidden',
                                '&::before': {
                                  content: '""',
                                  position: 'absolute',
                                  left: 0,
                                  top: 0,
                                  height: '100%',
                                  width: '4px',
                                  background: 'linear-gradient(to bottom, #f7931e, #611463)',
                                  transform: 'translateX(-100%)',
                                  transition: 'transform 0.3s ease',
                                },
                                '&:hover::before': {
                                  transform: 'translateX(0)',
                                }
                              }}
                            >
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <Avatar
                                  sx={{ 
                                    bgcolor: 'linear-gradient(45deg, #f7931e, #611463)',
                                    width: 40,
                                    height: 40,
                                    mr: 2,
                                    boxShadow: '0 4px 12px rgba(247, 147, 30, 0.3)'
                                  }}
                                >
                                  <DirectionsCarIcon />
                                </Avatar>
                                <Box>
                                  <Typography 
                                    variant="h6" 
                                    fontWeight="bold"
                                    sx={{ 
                                      fontSize: '17px',
                                      color: '#f7931e'
                                    }}
                                  >
                                    {car.car_brand} {car.model}
                                  </Typography>
                                  <Typography 
                                    variant="body2" 
                                    sx={{ 
                                      color: '#611463',
                                      fontWeight: '600',
                                      fontSize: '14px',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: 0.5
                                    }}
                                  >
                                    <BadgeIcon sx={{ fontSize: '16px' }} />
                                    {car.license_plate}
                                  </Typography>
                                </Box>
                              </Box>
                              <Box sx={{ mt: 2 }}>
                                <img 
                                  src={car.car_image} 
                                  alt={`${car.car_brand} ${car.model}`}
                                  style={{ 
                                    width: '100%', 
                                    height: '120px', 
                                    objectFit: 'cover', 
                                    borderRadius: '8px',
                                    border: '1px solid rgba(0, 0, 0, 0.1)'
                                  }}
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                  }}
                                />
                              </Box>
                              <Button
                                variant="contained"
                                onClick={(e) => handleViewDetails(car.emp_id, e)}
                                fullWidth
                                sx={{
                                  mt: 2,
                                  bgcolor: '#f7931e',
                                  '&:hover': { bgcolor: '#e07f1a' },
                                  textTransform: 'none',
                                  borderRadius: '10px',
                                  fontSize: '14px'
                                }}
                              >
                                ເບິ່ງລາຍລະອຽດ
                              </Button>
                            </Box>
                          ))}
                        </Box>
                      )}
                    </>
                  )}
                </Paper>
              )}
            </Box>
          </Grid>
        </Box>
      </AppBar>

      <LoginDialog open={loginDialogOpen} onClose={handleCloseLoginDialog} />
    </>
  );
}

export default ResponsiveAppBar;