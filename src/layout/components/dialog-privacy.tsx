import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    Typography,
    Box,
    Tabs,
    Tab,
    IconButton,
    Button,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GavelIcon from "@mui/icons-material/Gavel";
import SecurityIcon from "@mui/icons-material/Security";

// Define colors to match the footer
const PRIMARY_PURPLE = "#611463";
const ACCENT_ORANGE = "#f7931e";

interface PrivacyDialogProps {
    open: boolean;
    onClose: () => void;
}

const PrivacyDialog: React.FC<PrivacyDialogProps> = ({ open, onClose }) => {
    const [activeTab, setActiveTab] = useState(0);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    // Last updated date
    const lastUpdated = "15 ມີນາ 2025";

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            PaperProps={{
                sx: {
                    borderRadius: 4,
                    width: "90%",
                    maxWidth: "800px",
                    overflow: "hidden",
                    m: 0,
                    p: 0,
                    boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                        transform: "translateY(-5px)",
                    },
                    height: "80vh"
                },
            }}
        >
            <DialogContent sx={{ p: 0, display: "flex", flexDirection: "column", height: "100%" }}>
                {/* Header with Gradient Background */}
                <Box
                    sx={{
                        background: "linear-gradient(45deg, #611463 30%, #611463 90%)",
                        p: 3,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        color: "#fff",
                        position: "relative"
                    }}
                >
                    <IconButton
                        onClick={onClose}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: "white"
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <Typography
                        variant="h4"
                        fontWeight={700}
                        sx={{
                            textAlign: "center",
                            textShadow: "1px 1px 3px rgba(0,0,0,0.2)"
                        }}
                    >
                        ຂໍ້ມູນເງື່ອນໄຂ ແລະ ນະໂຍບາຍ
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            opacity: 0.9,
                            textAlign: "center",
                            mt: 1
                        }}
                    >
                        ກະລຸນາອ່ານຂໍ້ກຳນົດເຫຼົ່ານີ້ຢ່າງລະມັດລະວັງ, ມັນມີຂໍ້ມູນສຳຄັນກ່ຽວກັບສິດ ແລະ ພັນທະຂອງທ່ານ.
                    </Typography>
                </Box>

                {/* Tab Navigation */}
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    variant={isMobile ? "fullWidth" : "standard"}
                    centered
                    sx={{
                        bgcolor: PRIMARY_PURPLE,
                        '& .MuiTab-root': {
                            color: 'white',
                            fontWeight: 500,
                            opacity: 0.7,
                            py: 2,
                            mb: 22,
                            '&.Mui-selected': {
                                color: 'white',
                                opacity: 1,
                            },
                        },
                        '& .MuiTabs-indicator': {
                            backgroundColor: ACCENT_ORANGE,
                            height: 3,
                        },
                    }}
                >
                    <Tab
                        icon={<GavelIcon />}
                        iconPosition="start"
                        label="ເງື່ອນໄຂການນຳໃຊ້"
                        id="tab-0"
                        aria-controls="tabpanel-0"
                    />
                    <Tab
                        icon={<SecurityIcon />}
                        iconPosition="start"
                        label="ນະໂຍບາຍຄວາມເປັນສ່ວນຕົວ"
                        id="tab-1"
                        aria-controls="tabpanel-1"
                    />
                </Tabs>

                {/* Content Container with Scrolling */}
                <Box sx={{
                    flexGrow: 1,
                    overflow: "auto",
                    bgcolor: "#fafafa"
                }}>
                    {/* Terms of Use Content */}
                    <Box
                        role="tabpanel"
                        hidden={activeTab !== 0}
                        id="tabpanel-0"
                        aria-labelledby="tab-0"
                        sx={{ p: { xs: 3, md: 4 } }}
                    >
                        <Typography variant="h5" component="h2" gutterBottom sx={{ color: PRIMARY_PURPLE, fontWeight: 600 }}>
                            ເງື່ອນໄຂການນຳໃຊ້
                        </Typography>

                        <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 3 }}>
                            ອັບເດດລ່າສຸດ: {lastUpdated}
                        </Typography>

                        <Typography variant="h6" gutterBottom sx={{ mt: 4, color: PRIMARY_PURPLE, fontWeight: 600 }}>
                            1. ການຍອມຮັບເງື່ອນໄຂ
                        </Typography>
                        <Typography variant="body1" paragraph>
                            ໂດຍການເຂົ້າເຖິງ ແລະ ນຳໃຊ້ບໍລິການຂອງ HomeCare ("ບໍລິການ"), ທ່ານຕົກລົງທີ່ຈະຖືກຜູກມັດດ້ວຍເງື່ອນໄຂການນຳໃຊ້ເຫຼົ່ານີ້ ("ເງື່ອນໄຂ"). ຖ້າທ່ານບໍ່ເຫັນດີຕາມເງື່ອນໄຂເຫຼົ່ານີ້, ກະລຸນາຢ່າໃຊ້ບໍລິການຂອງພວກເຮົາ.
                        </Typography>

                        <Typography variant="h6" gutterBottom sx={{ mt: 4, color: PRIMARY_PURPLE, fontWeight: 600 }}>
                            2. ຄຳອະທິບາຍບໍລິການ
                        </Typography>
                        <Typography variant="body1" paragraph>
                            HomeCare ສະໜອງບໍລິການດູແລບ້ານລວມທັງແຕ່ບໍ່ຈຳກັດເຖິງການປະຕິບັດງານທຳຄວາມສະອາດ, ສ້ອມແປງໄຟຟ້າ, ສ້ອມແປງນ້ຳປະປາ, ສ້ອມແປງແອ, ແກ່ເຄື່ອງ, ດູດສ້ວມ, ແລະ ກຳຈັດປວກ. ບໍລິການຂອງພວກເຮົາມີຢູ່ໃນເວັບໄຊທ໌, ແອັບຯໂທລະສັບມືຖື, ແລະ ບໍລິການລູກຄ້າໂດຍກົງ.
                        </Typography>

                        <Typography variant="h6" gutterBottom sx={{ mt: 4, color: PRIMARY_PURPLE, fontWeight: 600 }}>
                            3. ບັນຊີຜູ້ໃຊ້
                        </Typography>
                        <Typography variant="body1" paragraph>
                            3.1. ການສ້າງບັນຊີ: ເພື່ອໃຊ້ບາງຄຸນສົມບັດຂອງບໍລິການຂອງພວກເຮົາ, ທ່ານອາດຈຳເປັນຕ້ອງສ້າງບັນຊີ. ທ່ານຕົກລົງທີ່ຈະໃຫ້ຂໍ້ມູນທີ່ຖືກຕ້ອງ, ປະຈຸບັນ, ແລະ ຄົບຖ້ວນໃນລະຫວ່າງການລົງທະບຽນ.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            3.2. ຄວາມປອດໄພຂອງບັນຊີ: ທ່ານມີຄວາມຮັບຜິດຊອບໃນການຮັກສາຄວາມລັບຂອງຂໍ້ມູນບັນຊີຂອງທ່ານ ແລະ ກິດຈະກຳທັງໝົດທີ່ເກີດຂຶ້ນພາຍໃຕ້ບັນຊີຂອງທ່ານ. ກະລຸນາແຈ້ງໃຫ້ HomeCare ຮູ້ທັນທີຖ້າມີການນຳໃຊ້ບັນຊີຂອງທ່ານໂດຍບໍ່ໄດ້ຮັບອະນຸຍາດ.
                        </Typography>

                        {/* Additional sections omitted for brevity but would continue in same format */}
                        <Typography variant="h6" gutterBottom sx={{ mt: 4, color: PRIMARY_PURPLE, fontWeight: 600 }}>
                            4. ການຈອງ ແລະ ຍົກເລີກບໍລິການ
                        </Typography>
                        <Typography variant="body1" paragraph>
                            4.1. ການຈອງ: ເມື່ອທ່ານຈອງບໍລິການ, ທ່ານຕົກລົງທີ່ຈະໃຫ້ຂໍ້ມູນທີ່ຖືກຕ້ອງກ່ຽວກັບຄວາມຕ້ອງການບໍລິການ ແລະ ສະຖານທີ່ຂອງທ່ານ.
                        </Typography>

                        <Typography variant="body1" paragraph>
                            4.2. ການຍົກເລີກ: ນະໂຍບາຍການຍົກເລີກແຕກຕ່າງກັນໄປຕາມບໍລິການ. ກະລຸນາອ້າງອີງເຖິງລາຍລະອຽດບໍລິການສະເພາະ ຫຼື ຕິດຕໍ່ບໍລິການລູກຄ້າຂອງພວກເຮົາເພື່ອຂໍ້ມູນ.
                        </Typography>

                        <Typography variant="h6" gutterBottom sx={{ mt: 4, color: PRIMARY_PURPLE, fontWeight: 600 }}>
                            5. ເງື່ອນໄຂການຈ່າຍເງິນ
                        </Typography>
                        <Typography variant="body1" paragraph>
                            5.1. ຄ່າບໍລິການ: ຄ່າບໍລິການຈະຖືກສະແດງຢ່າງຊັດເຈນກ່ອນການຢືນຢັນ. ອາດຈະມີຄ່າບໍລິການເພີ່ມເຕີມສຳລັບບໍລິການນອກເວທີມາດຕະຖານ.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            5.2. ວິທີການຈ່າຍເງິນ: ພວກເຮົາຍອມຮັບວິທີການຈ່າຍເງິນຕ່າງໆດັ່ງທີ່ລະບຸໄວ້ໃນເວທີຂອງພວກເຮົາ.
                        </Typography>

                        <Typography variant="h6" gutterBottom sx={{ mt: 4, color: PRIMARY_PURPLE, fontWeight: 600 }}>
                            6. ພຶດຕິກຳຂອງຜູ້ໃຊ້
                        </Typography>
                        <Typography variant="body1" paragraph>
                            ທ່ານຕົກລົງທີ່ຈະບໍ່ໃຊ້ບໍລິການຂອງພວກເຮົາເພື່ອ:
                        </Typography>
                        <Typography variant="body1" component="ul" sx={{ pl: 2 }}>
                            <li>ລະເມີດກົດໝາຍ ຫຼື ລະບຽບການທີ່ນຳໃຊ້ໄດ້</li>
                            <li>ປອມແປງບຸກຄົນ ຫຼື ການຈັດຕັ້ງໃດໆ</li>
                            <li>ລົບກວນ, ຂົ່ມຂູ່, ຫຼື ເຮັດອັນຕະລາຍພະນັກງານ ຫຼື ຜູ້ໃຊ້ອື່ນໆຂອງພວກເຮົາ</li>
                            <li>ລົບກວນການເຮັດວຽກປົກກະຕິຂອງບໍລິການຂອງພວກເຮົາ</li>
                        </Typography>

                        <Typography variant="h6" gutterBottom sx={{ mt: 4, color: PRIMARY_PURPLE, fontWeight: 600 }}>
                            7. ຊັບສິນທາງປັນຍາ
                        </Typography>
                        <Typography variant="body1" paragraph>
                            ເນື້ອຫາ, ຄຸນສົມບັດ, ແລະ ການເຮັດວຽກຂອງບໍລິການຂອງພວກເຮົາທັງໝົດ, ລວມແຕ່ບໍ່ຈຳກັດເຖິງຂໍ້ຄວາມ, ຮູບພາບ, ໂລໂກ້, ແລະ ຊອບແວ, ເປັນຊັບສິນຂອງ HomeCare ແລະ ໄດ້ຮັບການປົກປ້ອງໂດຍກົດໝາຍລິຂະສິດ, ເຄື່ອງໝາຍການຄ້າ, ແລະ ກົດໝາຍຊັບສິນທາງປັນຍາອື່ນໆ.
                        </Typography>

                        <Typography variant="h6" gutterBottom sx={{ mt: 4, color: PRIMARY_PURPLE, fontWeight: 600 }}>
                            8. ການປະຕິເສດການຮັບປະກັນ
                        </Typography>
                        <Typography variant="body1" paragraph>
                            ບໍລິການຂອງພວກເຮົາໄດ້ຖືກສະໜອງ "ດັ່ງທີ່ເປັນຢູ່" ໂດຍບໍ່ມີການຮັບປະກັນໃດໆ, ທີ່ໄດ້ລະບຸ ຫຼື ເປັນນິດ. HomeCare ບໍ່ໄດ້ຮັບປະກັນວ່າບໍລິການຂອງພວກເຮົາຈະບໍ່ມີຂໍ້ຜິດພາດ ຫຼື ບໍ່ມີການຂັດຂວາງ.
                        </Typography>

                        <Typography variant="h6" gutterBottom sx={{ mt: 4, color: PRIMARY_PURPLE, fontWeight: 600 }}>
                            9. ຂໍ້ຈຳກັດຄວາມຮັບຜິດຊອບ
                        </Typography>
                        <Typography variant="body1" paragraph>
                            HomeCare ຈະບໍ່ຮັບຜິດຊອບຕໍ່ຄວາມເສຍຫາຍໃດໆທີ່ເກີດຈາກທາງອ້ອມ, ບັງເອີນ, ສະເພາະ, ເສຍຫາຍຕາມລຳດັບ, ຫຼື ຄວາມເສຍຫາຍທີ່ເປັນການລົງໂທດທີ່ເກີດຈາກການນຳໃຊ້ ຫຼື ຄວາມບໍ່ສາມາດໃນການນຳໃຊ້ບໍລິການຂອງພວກເຮົາ.
                        </Typography>

                        <Typography variant="h6" gutterBottom sx={{ mt: 4, color: PRIMARY_PURPLE, fontWeight: 600 }}>
                            10. ການຊົດໃຊ້
                        </Typography>
                        <Typography variant="body1" paragraph>
                            ທ່ານຕົກລົງທີ່ຈະຊົດໃຊ້ ແລະ ປົກປ້ອງ HomeCare ຈາກຄຳຮ້ອງທຸກ, ຄວາມເສຍຫາຍ, ຄວາມຮັບຜິດຊອບ, ແລະ ຄ່າໃຊ້ຈ່າຍທີ່ເກີດຈາກການນຳໃຊ້ບໍລິການຂອງພວກເຮົາ ຫຼື ການລະເມີດເງື່ອນໄຂເຫຼົ່ານີ້.
                        </Typography>

                        <Typography variant="h6" gutterBottom sx={{ mt: 4, color: PRIMARY_PURPLE, fontWeight: 600 }}>
                            11. ການປັບປຸງເງື່ອນໄຂ
                        </Typography>
                        <Typography variant="body1" paragraph>
                            HomeCare ສະຫງວນສິດໃນການແກ້ໄຂເງື່ອນໄຂເຫຼົ່ານີ້ໄດ້ທຸກເວລາ. ພວກເຮົາຈະໃຫ້ການແຈ້ງເຕືອນກ່ຽວກັບການປ່ຽນແປງທີ່ສຳຄັນ. ການນຳໃຊ້ບໍລິການຂອງທ່ານຕໍ່ໄປຫຼັງຈາກການແກ້ໄຂດັ່ງກ່າວຈະເປັນການຍອມຮັບເງື່ອນໄຂທີ່ປັບປຸງແລ້ວ.
                        </Typography>

                        <Typography variant="h6" gutterBottom sx={{ mt: 4, color: PRIMARY_PURPLE, fontWeight: 600 }}>
                            12. ກົດໝາຍທີ່ນຳໃຊ້
                        </Typography>
                        <Typography variant="body1" paragraph>
                            ເງື່ອນໄຂເຫຼົ່ານີ້ຈະຖືກຄຸ້ມຄອງ ແລະ ຕີຄວາມໝາຍຕາມກົດໝາຍຂອງ ສປປ ລາວ, ໂດຍບໍ່ພິຈາລະນາຫຼັກການຂອງກົດໝາຍຂໍ້ຂັດແຍ່ງ.
                        </Typography>

                        <Typography variant="h6" gutterBottom sx={{ mt: 4, color: PRIMARY_PURPLE, fontWeight: 600 }}>
                            13. ຂໍ້ມູນຕິດຕໍ່
                        </Typography>
                        <Typography variant="body1" paragraph>
                            ຖ້າທ່ານມີຄຳຖາມກ່ຽວກັບເງື່ອນໄຂເຫຼົ່ານີ້, ກະລຸນາຕິດຕໍ່ພວກເຮົາທີ່ homecaredolaebn@gmail.com ຫຼື +856-20-5482-1624.
                        </Typography>
                    </Box>

                    {/* Privacy Policy Content */}
                    <Box
                        role="tabpanel"
                        hidden={activeTab !== 1}
                        id="tabpanel-1"
                        aria-labelledby="tab-1"
                        sx={{ p: { xs: 3, md: 4 } }}
                    >
                        <Typography variant="h5" component="h2" gutterBottom sx={{ color: PRIMARY_PURPLE, fontWeight: 600 }}>
                            ນະໂຍບາຍຄວາມເປັນສ່ວນຕົວ
                        </Typography>

                        <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 3 }}>
                            ອັບເດດລ່າສຸດ: {lastUpdated}
                        </Typography>

                        <Typography variant="body1" paragraph>
                            ທີ່ HomeCare, ພວກເຮົາເອົາໃຈໃສ່ເຖິງຄວາມເປັນສ່ວນຕົວຂອງທ່ານ. ນະໂຍບາຍຄວາມເປັນສ່ວນຕົວນີ້ອະທິບາຍວິທີທີ່ພວກເຮົາເກັບກຳ, ນຳໃຊ້, ເປີດເຜີຍ, ແລະ ປົກປ້ອງຂໍ້ມູນຂອງທ່ານໃນເວລາທີ່ທ່ານໃຊ້ບໍລິການຂອງພວກເຮົາ.
                        </Typography>

                        <Typography variant="h6" gutterBottom sx={{ mt: 4, color: PRIMARY_PURPLE, fontWeight: 600 }}>
                            1. ຂໍ້ມູນທີ່ພວກເຮົາເກັບກຳ
                        </Typography>
                        <Typography variant="body1" paragraph>
                            1.1. ຂໍ້ມູນສ່ວນຕົວ: ພວກເຮົາອາດຈະເກັບກຳຂໍ້ມູນສ່ວນຕົວເຊັ່ນ:
                        </Typography>
                        <Typography variant="body1" component="ul" sx={{ pl: 2 }}>
                            <li>ຊື່, ທີ່ຢູ່ອີເມວ, ເບີໂທລະສັບ, ແລະ ທີ່ຢູ່ບ້ານ</li>
                            <li>ຂໍ້ມູນການຈ່າຍເງິນ</li>
                            <li>ຄວາມມັກ ແລະ ປະຫວັດການໃຊ້ບໍລິການ</li>
                            <li>ການສື່ສານກັບບໍລິການລູກຄ້າຂອງພວກເຮົາ</li>
                        </Typography>
                        <Typography variant="body1" paragraph>
                            1.2. ຂໍ້ມູນທີ່ເກັບກຳໂດຍອັດຕະໂນມັດ: ເມື່ອທ່ານໃຊ້ບໍລິການຂອງພວກເຮົາ, ພວກເຮົາອາດຈະເກັບກຳຂໍ້ມູນໂດຍອັດຕະໂນມັດ:
                        </Typography>
                        <Typography variant="body1" component="ul" sx={{ pl: 2 }}>
                            <li>ຂໍ້ມູນອຸປະກອນ (ເຊັ່ນ: ທີ່ຢູ່ IP, ປະເພດບຣາວເຊີ)</li>
                            <li>ຂໍ້ມູນການໃຊ້ງານ (ເຊັ່ນ: ໜ້າທີ່ໄດ້ເຂົ້າເບິ່ງ, ເວລາທີ່ໃຊ້)</li>
                            <li>ຂໍ້ມູນສະຖານທີ່ (ດ້ວຍຄວາມຍິນຍອມຂອງທ່ານ)</li>
                        </Typography>
                        {/* Additional sections omitted for brevity but would continue in same format */}
                        <Typography variant="h6" gutterBottom sx={{ mt: 4, color: PRIMARY_PURPLE, fontWeight: 600 }}>
                            2. ວິທີທີ່ພວກເຮົາໃຊ້ຂໍ້ມູນຂອງທ່ານ
                        </Typography>
                        <Typography variant="body1" paragraph>
                            ພວກເຮົາໃຊ້ຂໍ້ມູນຂອງທ່ານເພື່ອຈຸດປະສົງດັ່ງຕໍ່ໄປນີ້:
                        </Typography>
                        <Typography variant="body1" component="ul" sx={{ pl: 2 }}>
                            <li>ການສະໜອງ ແລະ ປັບປຸງບໍລິການຂອງພວກເຮົາ</li>
                            <li>ການຈັດການການຈ່າຍເງິນ ແລະ ທຸລະກຳ</li>
                            <li>ການສື່ສານກັບທ່ານກ່ຽວກັບບໍລິການ, ການສົ່ງເສີມ, ແລະ ການອັບເດດ</li>
                        </Typography>

                        <Typography variant="h6" gutterBottom sx={{ mt: 4, color: PRIMARY_PURPLE, fontWeight: 600 }}>
                            3. ການແບ່ງປັນ ແລະ ເປີດເຜີຍຂໍ້ມູນ
                        </Typography>
                        <Typography variant="body1" paragraph>
                            3.1. ຜູ້ສະໜອງບໍລິການ: ພວກເຮົາອາດຈະແບ່ງປັນຂໍ້ມູນຂອງທ່ານກັບຜູ້ສະໜອງບໍລິການພາກສ່ວນທີສາມທີ່ຊ່ວຍພວກເຮົາຈັດສົ່ງບໍລິການຂອງພວກເຮົາ.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            3.2. ຄວາມຕ້ອງການທາງກົດໝາຍ: ພວກເຮົາອາດຈະເປີດເຜີຍຂໍ້ມູນຂອງທ່ານຖ້າຕ້ອງການໂດຍກົດໝາຍ ຫຼື ໃນການຕອບສະໜອງຄຳຮ້ອງຂໍທີ່ຖືກຕ້ອງຈາກອຳນາດການປົກຄອງ.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            3.3. ການໂອນທຸລະກິດ: ໃນກໍລະນີທີ່ມີການລວມທຸລະກິດ, ການຊື້, ຫຼື ການຂາຍຊັບສິນ, ຂໍ້ມູນຂອງທ່ານອາດຈະຖືກໂອນເປັນຊັບສິນທຸລະກິດ.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            3.4. ດ້ວຍຄວາມຍິນຍອມຂອງທ່ານ: ພວກເຮົາອາດຈະແບ່ງປັນຂໍ້ມູນຂອງທ່ານໃນວິທີອື່ນໆດ້ວຍຄວາມຍິນຍອມຢ່າງຊັດເຈນຈາກທ່ານ.
                        </Typography>

                        <Typography variant="h6" gutterBottom sx={{ mt: 4, color: PRIMARY_PURPLE, fontWeight: 600 }}>
                            4. ຄວາມປອດໄພຂອງຂໍ້ມູນ
                        </Typography>
                        <Typography variant="body1" paragraph>
                            ພວກເຮົາຈັດຕັ້ງມາດຕະການທາງດ້ານເຕັກນິກ ແລະ ການຈັດຕັ້ງທີ່ເໝາະສົມເພື່ອປົກປ້ອງຂໍ້ມູນສ່ວນຕົວຂອງທ່ານຈາກການເຂົ້າເຖິງ, ການປ່ຽນແປງ, ການເປີດເຜີຍ, ຫຼື ການທຳລາຍທີ່ບໍ່ໄດ້ຮັບອະນຸຍາດ.
                        </Typography>

                        <Typography variant="h6" gutterBottom sx={{ mt: 4, color: PRIMARY_PURPLE, fontWeight: 600 }}>
                            5. ສິດ ແລະ ທາງເລືອກຂອງທ່ານ
                        </Typography>
                        <Typography variant="body1" paragraph>
                            ຂຶ້ນກັບສະຖານທີ່ຂອງທ່ານ, ທ່ານອາດຈະມີສິດທີ່ຈະ:
                        </Typography>
                        <Typography variant="body1" component="ul" sx={{ pl: 2 }}>
                            <li>ເຂົ້າເຖິງ ແລະ ໄດ້ຮັບສຳເນົາຂໍ້ມູນສ່ວນຕົວຂອງທ່ານ</li>
                            <li>ແກ້ໄຂຂໍ້ມູນທີ່ບໍ່ຖືກຕ້ອງ ຫຼື ບໍ່ຄົບຖ້ວນ</li>
                            <li>ຮ້ອງຂໍລົບລ້າງຂໍ້ມູນສ່ວນຕົວຂອງທ່ານ</li>
                            <li>ຈຳກັດ ຫຼື ຄັດຄ້ານການຈັດການຂໍ້ມູນບາງຢ່າງຂອງທ່ານ</li>
                            <li>ການໂອນຂໍ້ມູນ</li>
                            <li>ຖອນຄວາມຍິນຍອມໄດ້ທຸກເວລາ (ໃນກໍລະນີທີ່ການຈັດການແມ່ນອີງໃສ່ຄວາມຍິນຍອມ)</li>
                        </Typography>

                        <Typography variant="h6" gutterBottom sx={{ mt: 4, color: PRIMARY_PURPLE, fontWeight: 600 }}>
                            6. ຄຸກກີ ແລະ ເຕັກໂນໂລຢີທີ່ຄ້າຍຄືກັນ
                        </Typography>
                        <Typography variant="body1" paragraph>
                            ພວກເຮົາໃຊ້ຄຸກກີ ແລະ ເຕັກໂນໂລຢີທີ່ຄ້າຍຄືກັນເພື່ອປັບປຸງປະສົບການຂອງທ່ານ, ວິເຄາະການນຳໃຊ້, ແລະ ເກັບກຳຂໍ້ມູນກ່ຽວກັບຜູ້ເຂົ້າເບິ່ງເວັບໄຊທ໌ຂອງພວກເຮົາ. ທ່ານສາມາດຄວບຄຸມຄຸກກີໂດຍຜ່ານການຕັ້ງຄ່າບຣາວເຊີຂອງທ່ານ.
                        </Typography>

                        <Typography variant="h6" gutterBottom sx={{ mt: 4, color: PRIMARY_PURPLE, fontWeight: 600 }}>
                            7. ຄວາມເປັນສ່ວນຕົວຂອງເດັກນ້ອຍ
                        </Typography>
                        <Typography variant="body1" paragraph>
                            ບໍລິການຂອງພວກເຮົາບໍ່ໄດ້ມີເຈດຈຳນົງສຳລັບບຸກຄົນທີ່ມີອາຍຸຕໍ່າກວ່າ 18 ປີ. ພວກເຮົາບໍ່ໄດ້ເກັບກຳຂໍ້ມູນສ່ວນຕົວຈາກເດັກນ້ອຍທີ່ມີອາຍຸຕໍ່າກວ່າ 18 ປີ.
                        </Typography>

                        <Typography variant="h6" gutterBottom sx={{ mt: 4, color: PRIMARY_PURPLE, fontWeight: 600 }}>
                            8. ການໂອນຂໍ້ມູນຂ້າມປະເທດ
                        </Typography>
                        <Typography variant="body1" paragraph>
                            ຂໍ້ມູນຂອງທ່ານອາດຈະຖືກໂອນໄປ ແລະ ດຳເນີນການໃນປະເທດອື່ນນອກຈາກປະເທດທີ່ທ່ານອາໄສຢູ່. ປະເທດເຫຼົ່ານີ້ອາດຈະມີກົດໝາຍການປົກປ້ອງຂໍ້ມູນທີ່ແຕກຕ່າງຈາກປະເທດທີ່ທ່ານອາໄສຢູ່.
                        </Typography>

                        <Typography variant="h6" gutterBottom sx={{ mt: 4, color: PRIMARY_PURPLE, fontWeight: 600 }}>
                            9. ການປ່ຽນແປງນະໂຍບາຍຄວາມເປັນສ່ວນຕົວນີ້
                        </Typography>
                        <Typography variant="body1" paragraph>
                            ພວກເຮົາອາດຈະປັບປຸງນະໂຍບາຍຄວາມເປັນສ່ວນຕົວຂອງພວກເຮົາເປັນຄັ້ງຄາວ. ພວກເຮົາຈະແຈ້ງໃຫ້ທ່ານຮູ້ກ່ຽວກັບການປ່ຽນແປງໂດຍການລົງນະໂຍບາຍຄວາມເປັນສ່ວນຕົວໃໝ່ໃນໜ້ານີ້ ແລະ ອັບເດດວັນທີ "ອັບເດດລ່າສຸດ".
                        </Typography>

                        <Typography variant="h6" gutterBottom sx={{ mt: 4, color: PRIMARY_PURPLE, fontWeight: 600 }}>
                            10. ຕິດຕໍ່ພວກເຮົາ
                        </Typography>
                        <Typography variant="body1" paragraph>
                            ຖ້າທ່ານມີຄຳຖາມກ່ຽວກັບນະໂຍບາຍຄວາມເປັນສ່ວນຕົວນີ້, ກະລຸນາຕິດຕໍ່ພວກເຮົາທີ່:
                        </Typography>
                        <Typography variant="body1" paragraph>
                            ອີເມວ: homecaredolaebn@gmail.com<br />
                            ໂທລະສັບ: +856-20-5482-1624<br />
                            ທີ່ຢູ່: ນະຄອນຫຼວງວຽງຈັນ, ລາວ
                        </Typography>
                    </Box>
                </Box>

                {/* Footer with Accept Button */}
                <Box sx={{
                    p: 3,
                    borderTop: '1px solid rgba(0,0,0,0.1)',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    bgcolor: 'white'
                }}>
                    <Button
                        variant="contained"
                        onClick={onClose}
                        sx={{
                            py: 1,
                            px: 4,
                            borderRadius: 6,
                            textTransform: "none",
                            fontSize: "1rem",
                            fontWeight: 600,
                            background: "linear-gradient(45deg, #611463 30%, #8e24aa 90%)",
                            boxShadow: "0 3px 5px 2px rgba(97, 20, 99, .3)",
                            transition: "all 0.3s ease",
                            "&:hover": {
                                background: "linear-gradient(45deg, #f7931e 30%, #ffa726 90%)",
                                transform: "translateY(-2px)",
                                boxShadow: "0 6px 10px 2px rgba(247, 147, 30, .4)"
                            }
                        }}
                    >
                        ຂ້ອຍເຂົ້າໃຈແລ້ວ
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default PrivacyDialog;