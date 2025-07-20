// UI Component file: LocationDetailPage.tsx

import {
  Autocomplete,
  Box,
  Container,
  Typography,
  TextField,
  Button,
  IconButton,
  Paper,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  FormControl,
  Chip,
  Fade,
  Divider,
  alpha,
  MenuItem,
  Select,
  FormHelperText,
  Grid,
  Card,
  CardContent,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import PhoneIcon from "@mui/icons-material/Phone";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import UploadIcon from "@mui/icons-material/Upload";
import DeleteIcon from "@mui/icons-material/Delete";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import LinkIcon from "@mui/icons-material/Link";
import LaunchIcon from "@mui/icons-material/Launch";
import ErrorIcon from "@mui/icons-material/Error";
import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";
import LocationCityOutlinedIcon from "@mui/icons-material/LocationCityOutlined";
import { LocationCity, NoAccounts } from "@mui/icons-material";
import { LOCATION_PATH } from "../../../routes/path";
import useMainController from "../controllers";
import HomeIcon from "@mui/icons-material/Home";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';

// Define districts with both English and Lao values
const districts = [
  { en: 'CHANTHABULY', lo: 'ຈັນທະບູລີ' },
  { en: 'SIKHOTTABONG', lo: 'ສີໂຄດຕະບອງ' },
  { en: 'XAYSETHA', lo: 'ໄຊເສດຖາ' },
  { en: 'SISATTANAK', lo: 'ສີສັດຕະນາກ' },
  { en: 'NAXAITHONG', lo: 'ນາຊາຍທອງ' },
  { en: 'XAYTANY', lo: 'ໄຊທານີ' },
  { en: 'HADXAIFONG', lo: 'ຫາດຊາຍຟອງ' }
];

// Village data organized by district
const villagesByDistrict = {
  'CHANTHABULY': [
    { en: 'Anou', lo: 'ອານຸ' },
    { en: 'Bonangoua', lo: 'ບໍ່ນາງົງ' },
    { en: 'ChommanyKang', lo: 'ຈອມມະນີກາງ' },
    { en: 'ChommanyNeua', lo: 'ຈອມມະນີເໜືອ' },
    { en: 'Dondeng', lo: 'ດອນແດງ' },
    { en: 'Dongmiang', lo: 'ດົງໝ້ຽງ' },
    { en: 'HatsadeeTai', lo: 'ຫັດສະດີໃຕ້' },
    { en: 'HatsadyNeua', lo: 'ຫັດສະດີເໜືອ' },
    { en: 'Haysok', lo: 'ຫາຍໂສກ' },
    { en: 'Hongkaikeo', lo: 'ຮ່ອງໄກ່ແກ້ວ' },
    { en: 'HongkhaNeua', lo: 'ຮ່ອງຄ້າເໜືອ' },
    { en: 'HongkhaTai', lo: 'ຮ່ອງຄ້າໃຕ້' },
    { en: 'Hongxeng', lo: 'ຮ່ອງແຊງ' },
    { en: 'Houayhong', lo: 'ຫ້ວຍຫົງ' },
    { en: 'HoualouangTai', lo: 'ຂົວຫຼວງໃຕ້' },
    { en: 'Mixay', lo: 'ມີໄຊ' },
    { en: 'Nongping', lo: 'ໜອງປິງ' },
    { en: 'NongthaNeua', lo: 'ໜອງທາເໜືອ' },
    { en: 'NongthaTai', lo: 'ໜອງທາໃຕ້' },
    { en: 'Phonsavang', lo: 'ໂພນສະຫວ່າງ' },
    { en: 'PhonetongChommany', lo: 'ໂພນຕ້ອງຈອມມະນີ' },
    { en: 'PhonetongSawat', lo: 'ໂພນຕ້ອງສະຫວາດ' },
    { en: 'PhonetongSavang', lo: 'ໂພນຕ້ອງສະຫວ່າງ' },
    { en: 'Saylom', lo: 'ສາຍລົມ' },
    { en: 'Sibounheuang', lo: 'ສີບຸນເຮືອງ' },
    { en: 'Sidamdouane', lo: 'ສີດຳດວນ' },
    { en: 'Sihome', lo: 'ສີຫອມ' },
    { en: 'Sisaket', lo: 'ສີສະເກດ' },
    { en: 'SisavatKang', lo: 'ສີສະຫວາດກາງ' },
    { en: 'SisavatNeua', lo: 'ສີສະຫວາດເໜືອ' },
    { en: 'SisavatTai', lo: 'ສີສະຫວາດໃຕ້' },
    { en: 'ThongkhankhamNeua', lo: 'ທົ່ງຂັນຄຳເໜືອ' },
    { en: 'ThongkhankhamTai', lo: 'ທົ່ງຂັນຄຳໃຕ້' },
    { en: 'Thongsangnan', lo: 'ທົ່ງສ້າງນາງ' },
    { en: 'Thongtoum', lo: 'ທົ່ງຕູມ' },
    { en: 'Vatchan', lo: 'ວັດຈັນ' },
    { en: 'Xiengngeun', lo: 'ຊຽງຍືນ' }
  ],
  'SIKHOTTABONG': [
    { en: 'Akat', lo: 'ອາກາດ' },
    { en: 'Ang-Gnai', lo: 'ອ່າງໃຫຍ່' },
    { en: 'Champa', lo: 'ຈຳປາ' },
    { en: 'Chansavang', lo: 'ຈັນສະຫວ່າງ' },
    { en: 'Dankham', lo: 'ດ່ານຄຳ' },
    { en: 'Dongkalao', lo: 'ດົງກະເລົາ' },
    { en: 'Dongnathong', lo: 'ດົງນາທອງ' },
    { en: 'Dongnasok-Nuea', lo: 'ດົງນາໂຊກເໜືອ' },
    { en: 'Dongnasok-Tai', lo: 'ດົງນາໂຊກໃຕ້' },
    { en: 'Dongpalep', lo: 'ດົງປະແຫຼບ' },
    { en: 'Dongxingsou', lo: 'ດົງຊິງຊູ້' },
    { en: 'Houayhoam', lo: 'ຫ້ວຍຫ້ອມ' },
    { en: 'Kaoliao', lo: 'ເກົ້າລ້ຽວ' },
    { en: 'KhoualuangNuea', lo: 'ຂົວຫຼວງເໜືອ' },
    { en: 'KhountaTha', lo: 'ຂຸນຕາທ່າ' },
    { en: 'KhountaThong', lo: 'ຂຸນຕາທົ່ງ' },
    { en: 'Lakhin', lo: 'ຫຼັກຫຶນ' },
    { en: 'Mai', lo: 'ໃໝ່' },
    { en: 'MuangvaTha', lo: 'ເມືອງວາທ່າ' },
    { en: 'MuangvaThong', lo: 'ເມືອງວາທົ່ງ' },
    { en: 'Nahe', lo: 'ນາເຫ' },
    { en: 'Nakham', lo: 'ນາຄຳ' },
    { en: 'Nalao', lo: 'ນາເລົ່າ' },
    { en: 'NongbuathongNuea', lo: 'ໜອງບົວທອງເໜືອ' },
    { en: 'NongbuathongTai', lo: 'ໜອງບົວທອງໃຕ້' },
    { en: 'NongbukNuea', lo: 'ໜອງບຶກເໜືອ' },
    { en: 'NongbukTai', lo: 'ໜອງບຶກໃຕ້' },
    { en: 'Nongda', lo: 'ໜອງດາ' },
    { en: 'NongdouangNuea', lo: 'ໜອງດ້ວງເໜືອ' },
    { en: 'NongdouangTai', lo: 'ໜອງດ້ວງໃຕ້' },
    { en: 'NongdouangThong', lo: 'ໜອງດ້ວງທົ່ງ' },
    { en: 'Nongniao', lo: 'ໜອງໜ້ຽວ' },
    { en: 'Nongsanokham', lo: 'ໜອງສະໂນຄຳ' },
    { en: 'NongtengNuea', lo: 'ໜອງແຕ່ງເໜືອ' },
    { en: 'NongtengTai', lo: 'ໜອງແຕ່ງໃຕ້' },
    { en: 'Nonkeo', lo: 'ໂນນແກ້ວ' },
    { en: 'Nonkhilek', lo: 'ໂນນຂີ້ເຫຼັກ' },
    { en: 'Nonsavang', lo: 'ໂນນສະຫວ່າງ' },
    { en: 'Pakthang', lo: 'ປາກທ້າງ' },
    { en: 'Phonkham', lo: 'ໂພນຄຳ' },
    { en: 'PhonsavathNuea', lo: 'ໂພນສະຫວາດເໜືອ' },
    { en: 'PhonsavatTai', lo: 'ໂພນສະຫວາດໃຕ້' },
    { en: 'Phonsomboun', lo: 'ໂພນສົມບູນ' },
    { en: 'Phosi', lo: 'ໂພສີ' },
    { en: 'SibounhuangTha', lo: 'ສີບຸນເຮືອງທ່າ' },
    { en: 'SibounhuangThong', lo: 'ສີບຸນເຮືອງທົ່ງ' },
    { en: 'SikhaiTha', lo: 'ສີໄຄທ່າ' },
    { en: 'SikhaiThong', lo: 'ສີໄຄທົ່ງ' },
    { en: 'VattaingaiTha', lo: 'ວັດໄຕໃຫຍ່ທ່າ' },
    { en: 'Vattaingai-Thong', lo: 'ວັດໄຕໃຫຍ່ທົ່ງ' },
    { en: 'VattainoyTha', lo: 'ວັດໄຕນ້ອຍທ່າ' },
    { en: 'VattainoyThong', lo: 'ວັດໄຕນ້ອຍທົ່ງ' },
    { en: 'Viangkham', lo: 'ວຽງຄຳ' },
    { en: 'Viangsavan', lo: 'ວຽງສະຫວັນ' },
    { en: 'Xamket', lo: 'ຊຳເກດ' }
  ],
  // Add the rest of the districts following the same pattern...
  'XAYSETHA': [
    { en: 'Amon', lo: 'ອາມອນ' },
    { en: 'Chommani-Kang', lo: 'ຈອມມະນີກາງ' },
    { en: 'Chommani-Tai', lo: 'ຈອມມະນີໃຕ້' },
    { en: 'Chomsi', lo: 'ຈອມສີ' },
    { en: 'DoungGnai', lo: 'ດອນໄຫງ່' },
    { en: 'DoungKang', lo: 'ດອນກາງ' },
    { en: 'Fay', lo: 'ຝ້າຍ' },
    { en: 'Haikham', lo: 'ໄຫຄຳ' },
    { en: 'Honke', lo: 'ຮ່ອງແກ' },
    { en: 'Hongsouphap', lo: 'ຮ່ອງສູພາ' },
    { en: 'Huakhoua', lo: 'ຫົວຂົວ' },
    { en: 'Khamngoy', lo: 'ຄຳງອຍ' },
    { en: 'Khamsavat', lo: 'ຄຳສະຫວາດ' },
    { en: 'Muang-Noy', lo: 'ເມືອງນ້ອຍ' },
    { en: 'Nabian', lo: 'ນາບຽນ' },
    { en: 'Nahai', lo: 'ນາໄຫ' },
    { en: 'Nakhoy-Nua', lo: 'ນາຄວາຍເໜືອ' },
    { en: 'Nakhoay-Tai', lo: 'ນາຄວາຍໃຕ້' },
    { en: 'Nano', lo: 'ນາໂນ' },
    { en: 'Nasangphai', lo: 'ນາສັງໄຜ' },
    { en: 'Naxai', lo: 'ນາໄຊ' },
    { en: 'Nongbon', lo: 'ໜອງບອນ' },
    { en: 'Nongniang', lo: 'ໜອງໜ່ຽງ' },
    { en: 'Nongsangtho', lo: 'ໜອງສ້າງທໍ່' },
    { en: 'Nonkho-Nua', lo: 'ໂນນຄໍ້ເໜືອ' },
    { en: 'Nonkho-Tai', lo: 'ໂນນຄໍ້ໃຕ້' },
    { en: 'Nomsanga', lo: 'ໂນນສັງຫງ່າ' },
    { en: 'Nonsavan', lo: 'ໂນນສະຫວັນ' },
    { en: 'Nonsavang', lo: 'ໂນນສະຫວ່າງ' },
    { en: 'Nonvay', lo: 'ໂນນຫວາຍ' },
    { en: 'Phonkheng', lo: 'ໂພນເຄັງ' },
    { en: 'Phonphanao', lo: 'ໂພນພະເນົາ' },
    { en: 'Phonsa-At', lo: 'ໂພນສາອາດ' },
    { en: 'Phonthan-Nua', lo: 'ໂພນທັນເໜືອ' },
    { en: 'Phonthan-Tai', lo: 'ໂພນທັນໃຕ້' },
    { en: 'Phonthong', lo: 'ໂພນຕ້ອງ' },
    { en: 'Phonxai', lo: 'ໂພນໄຊ' },
    { en: 'Saphangmo', lo: 'ສະພາງໝໍ້' },
    { en: 'Sengsavang', lo: 'ແສງສະຫວ່າງ' },
    { en: 'Sisangvon', lo: 'ສີສັງວອນ' },
    { en: 'Somsanga', lo: 'ສົມສະຫງ່າ' },
    { en: 'ThalouangKang', lo: 'ທາດຫຼວງກາງ' },
    { en: 'ThalouangNua', lo: 'ທາດຫຼວງເໜືອ' },
    { en: 'ThatlouangTai', lo: 'ທາດຫຼວງໃຕ້' },
    { en: 'Vangxay', lo: 'ວັງຊາຍ' },
    { en: 'Viangchaleun', lo: 'ວຽງຈະເລີນ' },
    { en: 'Xamkhe', lo: 'ຊຳເຄ້' },
    { en: 'Xiangda', lo: 'ຊຽງດາ' },
    { en: 'XokGnai', lo: 'ໂຊກໃຫຍ່' },
    { en: 'Xokkham', lo: 'ໂຊກຄຳ' },
    { en: 'XokNoy', lo: 'ໂຊກນ້ອຍ' }
],
  'SISATTANAK': [
    { en: 'BungkhagnongNuea', lo: 'ບຶງຂະຫຍອງເໜືອ' },
    { en: 'BungkhagnongTai', lo: 'ບຶງຂະຫຍອງໃຕ້' },
    { en: 'Chomcheng', lo: 'ຈອມແຈ້ງ' },
    { en: 'ChomphetNuea', lo: 'ຈອມເພັດເໜືອ' },
    { en: 'ChomphetTai', lo: 'ຈອມເພັດໃຕ້' },
    { en: 'Donkoy', lo: 'ດອນກອຍ' },
    { en: 'Donnokkhoum', lo: 'ດອນນົກຂູ້ມ' },
    { en: 'DonpaMai', lo: 'ດອນປ່າໃໝ່' },
    { en: 'DongpalanTha', lo: 'ດົງປະລານທ່າ' },
    { en: 'DongpalanThong', lo: 'ດົງປະລານທົ່ງ' },
    { en: 'Dongsavat', lo: 'ດົງສະຫວາດ' },
    { en: 'Haysok', lo: 'ຫາຍໂສກ' },
    { en: 'Kaognot', lo: 'ເກົ້າຍອດ' },
    { en: 'Khoknin', lo: 'ໂຄກນິນ' },
    { en: 'Nongchan', lo: 'ໜອງຈັນ' },
    { en: 'Phapho', lo: 'ພະໂພ' },
    { en: 'Phaxai', lo: 'ພະໄຊ' },
    { en: 'Phiavat', lo: 'ເພຍວັດ' },
    { en: 'PhonpapaTha', lo: 'ໂພນປາເປົ້າທ່າ' },
    { en: 'PhonpapaoThong', lo: 'ໂພນປາເປົ້າທົ່ງ' },
    { en: 'Phonsavang', lo: 'ໂພນສະຫວ່າງ' },
    { en: 'PhonsavanNuea', lo: 'ໂພນສະຫວັນເໜືອ' },
    { en: 'PhonsavanTai', lo: 'ໂພນສະຫວັນໃຕ້' },
    { en: 'Phonsinouan', lo: 'ໂພນສີນວນ' },
    { en: 'Phosai', lo: 'ໂພໄຊ' },
    { en: 'Sangveuy', lo: 'ສ້າງເຫວີຍ' },
    { en: 'SaphanthongKang', lo: 'ສະພານທອງກາງ' },
    { en: 'SaphanthonNuea', lo: 'ສະພານທອງເໜືອ' },
    { en: 'Simuang', lo: 'ສີເມືອງ' },
    { en: 'Sokpalouang', lo: 'ໂສກປະຫຼວງ' },
    { en: 'Souamon', lo: 'ສວນມອນ' },
    { en: 'Thapalanxai', lo: 'ທ່າພະລານໄຊ' },
    { en: 'Thatkhao', lo: 'ທາດຂາວ' },
    { en: 'Thong-Kang', lo: 'ທົ່ງກາງ' },
    { en: 'Thongphanthong', lo: 'ທົ່ງພານທອງ' },
    { en: 'Vatnak', lo: 'ວັດນາກ' },
    { en: 'Vatsao', lo: 'ວັດເສົາ' },
    { en: 'Xaisathan', lo: 'ໄຊສະຖານ' }
],
'NAXAITHONG': [
    { en: 'Boua', lo: 'ບົວ' },
    { en: 'Chengsavang', lo: 'ຈັນສະຫວ່າງ' },
    { en: 'Dongbong', lo: 'ນາບົງ' },
    { en: 'Dongxiangdi', lo: 'ດົງຊຽງດີ' },
    { en: 'Houakhoua', lo: 'ຫົວຂົວ' },
    { en: 'Nadi', lo: 'ນາດີ' },
    { en: 'NakhounNua', lo: 'ນາຄູນເໜືອ' },
    { en: 'NakhounTai', lo: 'ນາຄູນໃຕ້' },
    { en: 'NaxaythongKang', lo: 'ນາຊາຍທອງກາງ' },
    { en: 'NaxaythongNuea', lo: 'ນາຊາຍທອງເໜືອ' },
    { en: 'NaxaythongTai', lo: 'ນາຊາຍທອງໃຕ້' },
    { en: 'Naxon', lo: 'ນາຊອນ' },
    { en: 'Nongsa', lo: 'ໜອງສະ' },
    { en: 'Sikeut', lo: 'ສີເກີດ' },
    { en: 'Xaimoungkhount', lo: 'ໄຊມຸງຄຸນ' }
],
  'XAYTANY': [
    { en: 'Hai', lo: 'ໄຮ່' },
    { en: 'Dansang', lo: 'ດ່ານຊ້າງ' },
    { en: 'Dongdok', lo: 'ດົງໂດກ' },
    { en: 'Dongmakkhaiy', lo: 'ດົງໝາກຄານຍ' },
    { en: 'Donnoun', lo: 'ດອນໜູນ' },
    { en: 'Donsanghin', lo: 'ດົງສ້າງຫິນ' },
    { en: 'Dontiw', lo: 'ດອນຕິ້ວ' },
    { en: 'Hatkieng', lo: 'ຫາດກ້ຽງ' },
    { en: 'Houana', lo: 'ຫົວນາ' },
    { en: 'Houakhua', lo: 'ຫົວຂົວ' },
    { en: 'Houaxiang', lo: 'ຫົວຊຽງ' },
    { en: 'Houaytoei', lo: 'ຫ້ວຍເຕີຍ' },
    { en: 'Houaydaenmueang', lo: 'ຫ້ວຍແດນເມືອງ' },
    { en: 'Kaengkhai', lo: 'ແກ້ງໄຄ້' },
    { en: 'Khamhoung', lo: 'ຄຳຮຸ່ງ' },
    { en: 'Khoksivilai', lo: 'ໂຄກສິວິໄລ' },
    { en: 'Khoudsambard', lo: 'ຂຸດສາມບາດ' },
    { en: 'Lardkhuay', lo: 'ລາດຄວາຍ' },
    { en: 'Nakae', lo: 'ນາແຄ' },
    { en: 'Nakoung', lo: 'ນາກຸງ' },
    { en: 'Nakhanthong', lo: 'ນາຄັນທຸງ' },
    { en: 'Nasiew', lo: 'ນາສ້ຽງ' },
    { en: 'Nathae', lo: 'ນາແຖ' },
    { en: 'Nathom', lo: 'ນາທົ່ມ' },
    { en: 'Nonbokeo', lo: 'ໂນນບໍ່ແກ້ວ' },
    { en: 'Nongphaya', lo: 'ໜອງພະຍາ' },
    { en: 'Nongsonghong', lo: 'ໜອງສອງຫ້ອງ' },
    { en: 'Nongviengkham', lo: 'ໜອງວຽງຄຳ' },
    { en: 'Nonsaart', lo: 'ໂນນສະອາດ' },
    { en: 'Nonthong', lo: 'ນາທອງ' },
    { en: 'Oudomphon', lo: 'ອຸດົມຜົນ' },
    { en: 'Phakhao', lo: 'ພະຂາວ' },
    { en: 'Phonhaikham', lo: 'ໂພນໄຮຄຳ' },
    { en: 'Phonngamnueng', lo: 'ໂພນງາມ 1' },
    { en: 'Phonngamsong', lo: 'ໂພນງາມ 2' },
    { en: 'Phoukham', lo: 'ພູຄຳ' },
    { en: 'SaiNamNgern', lo: 'ສາຍນ້ຳເງິນ' },
    { en: 'Sangkhou', lo: 'ຊ້າງຄູ້' },
    { en: 'Saphangmuek', lo: 'ສະພັງເມິກ' },
    { en: 'Sivilai', lo: 'ສີວິໄລ' },
    { en: 'Tarnmixay', lo: 'ຕານມີໄຊ' },
    { en: 'ThadingdaengNeua', lo: 'ທ່າດິນແດງເໜືອ' },
    { en: 'ThadingdaengTai', lo: 'ທ່າດິນແດງໃຕ້' },
    { en: 'Thadindaeng', lo: 'ທ່າດິນແດງ' },
    { en: 'Thangon', lo: 'ທ່າງ່ອນ' },
    { en: 'Thasavang', lo: 'ທ່າສະຫວ່າງ' }
],
  'HADXAIFONG': [
    { en: 'BoO', lo: 'ບໍ່ໂອ' },
    { en: 'Chomthong', lo: 'ຈອມທອງ' },
    { en: 'Chienaimo', lo: 'ຈີ່ນາຍໂມ້' },
    { en: 'Dondou', lo: 'ດອນດູ່' },
    { en: 'Dongkhamxang', lo: 'ດົງຄຳຊ້າງ' },
    { en: 'Dongphonehe', lo: 'ດົງໂພນແຮ່' },
    { en: 'Dongphonlao', lo: 'ດົງໂພນເລົາ' },
    { en: 'Dongphosi', lo: 'ດົງໂພສີ' },
    { en: 'Donkeut', lo: 'ດອນເກີດ' },
    { en: 'Donkhaxay', lo: 'ດອນຂາຊ້າຍ' },
    { en: 'Hatdonkeo', lo: 'ຫາດດອນແກ້ວ' },
    { en: 'Hatxaykhao', lo: 'ຫາດຊາຍຂາວ' },
    { en: 'HomTai', lo: 'ຫ້ອມໃຕ້' },
    { en: 'Homnuea', lo: 'ຫ້ອມເໜືອ' },
    { en: 'Kang', lo: 'ກາງ' },
    { en: 'Nahai', lo: 'ນາໄຫ' },
    { en: 'Nonghai', lo: 'ໜອງໄຮ' },
    { en: 'Nongheo', lo: 'ໜອງແຫ້ວ' },
    { en: 'Nongveng', lo: 'ໜອງແວງ' },
    { en: 'Pava', lo: 'ປ່າຫວ້າ' },
    { en: 'Phao', lo: 'ພ້າວ' },
    { en: 'SalakhamNuea', lo: 'ສາລາຄຳເໜືອ' },
    { en: 'SalakhamTai', lo: 'ສາລສຄຳໃຕ້' },
    { en: 'SomvangNuea', lo: 'ສົມຫວັງເໜືອ' },
    { en: 'SomvangTai', lo: 'ສົມຫວັງໃຕ້' },
    { en: 'Thadua', lo: 'ທ່າເດື່ອ' },
    { en: 'Thamouang', lo: 'ທ່າມ່ວງ' },
    { en: 'Thana', lo: 'ທ່ານາ' },
    { en: 'Thanaleng', lo: 'ທ່ານາແລ້ງ' },
    { en: 'Thinphia', lo: 'ຖິ້ນເພຍ' },
    { en: 'Thintom', lo: 'ຖິ່ນຕົມ' },
    { en: 'Xiangkhouan', lo: 'ຊຽງຄວນ' }
]
};

// Helper function to find village by English value
const findVillageByEnglishValue = (englishValue, districtValue) => {
  if (!districtValue) return null;
  const villages = villagesByDistrict[districtValue] || [];
  return villages.find(village => village.en === englishValue) || null;
};

// Helper function to get available villages for selected district
const getAvailableVillages = (districtValue) => {
  return villagesByDistrict[districtValue] || [];
};

// Helper function to find the city object from English value
const findCityByEnglishValue = (englishValue) => {
  return districts.find(district => district.en === englishValue) || null;
};

// Helper function to find the city object from Lao value
const findCityByLaoValue = (laoValue) => {
  return districts.find(district => district.lo === laoValue) || null;
};

// Helper to display city in proper language
const displayCity = (englishValue) => {
  const city = findCityByEnglishValue(englishValue);
  return city ? city.lo : englishValue;
};

const LocationDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const ctrl = useMainController();

  const getLocationIcon = (type: string): React.ReactElement => {
    switch (type) {
      case "home":
        return <HomeIcon />;
      default:
        return <HomeIcon />;
    }
  };

  // Function to handle the confirmation and navigation with selected address
  const handleConfirmAddress = () => {
    if (!ctrl?.selectedLocation) {
      // Show warning if no location is selected
      return;
    }
    navigate(`/Location/${id}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #611463 0%, #812e84 100%)",
        p: 2,
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          width: {
            xs: "100%", // full width on mobile
            sm: "90%", // slightly less on tablet
            md: "80%", // even less on desktop
            lg: "60%", // constrained on large screens
          },
        }}
      >
        {/* First Box - Saved Addresses */}
        <Paper
          elevation={6}
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            borderRadius: 3,
            maxWidth: "100%",
            mx: "auto",
            mb: 3,
            overflow: "hidden",
            position: "relative",
            boxShadow: "0 8px 24px rgba(97, 20, 99, 0.12)",
          }}
        >
          {/* Header with back button */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 3,
            }}
          >
            <IconButton
              onClick={() => navigate(`/Location/${id}`)}
              sx={{
                mr: 2,
                backgroundColor: alpha("#611463", 0.08),
                "&:hover": {
                  backgroundColor: alpha("#611463", 0.12),
                },
              }}
            >
              <ArrowBackIcon sx={{ color: "#611463" }} />
            </IconButton>
            <Typography
              variant="h5"
              color="#611463"
              sx={{
                fontSize: "1.5rem",
                fontWeight: 700,
                letterSpacing: "-0.01em",
              }}
            >
              ການຈັດການທີ່ຢູ່ລະອຽດ
            </Typography>
          </Box>

          {/* Saved locations */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="subtitle1"
              color="#611463"
              sx={{
                fontSize: "1.1rem",
                mb: 1.5,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
              }}
            >
              <BookmarkIcon sx={{ mr: 1, fontSize: "1.2rem" }} />
              ທີ່ຢູ່ທີ່ບັນທຶກໄວ້
            </Typography>

            {ctrl?.loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress size={40} sx={{ color: '#611463' }} />
              </Box>
            ) : ctrl?.address && ctrl?.address.length > 0 ? (
              <Box
                sx={{
                  maxHeight: "500px",
                  overflowY: ctrl?.address.length > 6 ? "auto" : "visible",
                  "&::-webkit-scrollbar": {
                    width: "6px",
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: alpha("#f5f5f5", 0.8),
                    borderRadius: "10px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: alpha("#611463", 0.4),
                    borderRadius: "10px",
                    "&:hover": {
                      backgroundColor: alpha("#611463", 0.6),
                    },
                  },
                }}
              >
                {ctrl?.address.map((location) => (
                  <Paper
                    key={location.id || location.user_id}
                    elevation={0}
                    sx={{
                      mb: 1.5,
                      borderRadius: 2,
                      overflow: "hidden",
                      backgroundColor: alpha("#f9f5f9", 0.7),
                      cursor: "pointer",
                      transition: "all 0.2s",
                      "&:hover": {
                        backgroundColor: alpha("#f5ebf6", 0.9),
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 8px rgba(97, 20, 99, 0.08)",
                      },
                      border: location.id === ctrl?.selectedLocation?.id ? `2px solid #f7931e` : "none",
                      position: "relative",
                    }}
                    onClick={() => ctrl?.handleLocationSelect(location)}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        p: 2,
                        alignItems: "flex-start"
                      }}
                    >
                      <Box
                        sx={{
                          mr: 2,
                          mt: 0.5,
                          backgroundColor: alpha("#f5ebf6", 0.5),
                          borderRadius: "50%",
                          p: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <HomeIcon sx={{ color: "#611463" }} />
                      </Box>

                      <Box sx={{ flex: 1 }}>
                        <Typography
                          sx={{
                            fontSize: "1rem",
                            fontWeight: 600,
                            color: "#333",
                            mb: 0.5
                          }}
                        >
                          {location.address_name}
                        </Typography>

                        <Typography
                          sx={{
                            fontSize: "0.85rem",
                            color: "#666",
                            mb: 0.5
                          }}
                        >
                          {location.address_description}, {location.village} {displayCity(location.city)}
                        </Typography>

                      </Box>

                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (location.id === ctrl?.selectedLocation?.id) {
                            ctrl?.handleDeleteLocation();
                          } else {
                            // Set selected then delete
                            ctrl?.setSelectedLocation(location);
                            setTimeout(() => {
                              ctrl?.handleDeleteLocation();
                            }, 100);
                          }
                        }}
                        sx={{
                          color: "#d32f2f",
                          p: 1,
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>

                    {location.id === ctrl?.selectedLocation?.id && (
                      <Box
                        sx={{
                          position: "absolute",
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: "4px",
                          backgroundColor: "#f7931e",
                        }}
                      />
                    )}
                  </Paper>
                ))}
              </Box>
            ) : (
              <Box
                sx={{
                  p: 3,
                  textAlign: "center",
                  bgcolor: alpha("#f5f5f5", 0.5),
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2
                }}
              >
                <AddLocationAltIcon sx={{ fontSize: 40, color: alpha("#611463", 0.7) }} />
                <Typography sx={{ color: "#666" }}>
                  ທ່ານຍັງບໍ່ມີທີ່ຢູ່ທີ່ບັນທຶກໄວ້ເທື່ອ
                </Typography>
                <Typography variant="body2" sx={{ color: "#888", fontStyle: "italic" }}>
                  ກະລຸນາເພີ່ມທີ່ຢູ່ໃໝ່ຂອງທ່ານໃນຟອມຂ້າງລຸ່ມນີ້
                </Typography>
              </Box>
            )}
          </Box>

          {/* Action buttons */}
          <Grid container sx={{ mt: 3 }}>
            <Grid item xs={12} sm={12}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => navigate(`/Location/${id}`)}
                disabled={!ctrl?.selectedLocation}
                sx={{
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: 2,
                  background: ctrl?.selectedLocation ? "#611463" : alpha("#611463", 0.5),
                  transition: "all 0.2s",
                  "&:hover": {
                    background: "#7a1980",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(97, 20, 99, 0.2)",
                  },
                }}
              >
                ຢືນຢັນໃຊ້ທີ່ຢູ່
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Second Box - Add New Address */}
        <Paper
          elevation={6}
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            borderRadius: 3,
            maxWidth: "100%",
            mx: "auto",
            overflow: "hidden",
            position: "relative",
            boxShadow: "0 8px 24px rgba(97, 20, 99, 0.12)",
          }}
        >
          <Typography
            variant="h5"
            color="#611463"
            sx={{
              fontSize: "1.5rem",
              fontWeight: 700,
              letterSpacing: "-0.01em",
              mb: 3,
              display: "flex",
              alignItems: "center",
            }}
          >
            <LocationCity sx={{ mr: 1, fontSize: "1.8rem" }} />
            ເພີ່ມທີ່ຢູ່ໃໝ່
          </Typography>

          {/* Map link section */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: "1rem",
                mb: 1.5,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
              }}
            >
              <LinkIcon sx={{ mr: 1, color: "#611463" }} />
              ລິ້ງ Google Maps *
            </Typography>

            <TextField
              fullWidth
              variant="outlined"
              placeholder="ວາງລິ້ງແຜນທີ່ຈາກ Google Maps ທີ່ນີ້"
              value={ctrl?.mapLink ?? ""}
              onChange={(e) => {
                ctrl?.setMapLink(e.target.value);
                if (e.target.value.trim()) {
                  ctrl?.setErrors({ ...ctrl?.errors, mapLink: undefined });
                }
              }}
              error={!!ctrl?.errors.mapLink}
              helperText={ctrl?.errors.mapLink}
              required
              sx={{
                mb: 2,
                backgroundColor: "#fff",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  transition: "all 0.2s",
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: alpha("#611463", 0.5),
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#611463",
                    borderWidth: 2,
                  },
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      variant="contained"
                      onClick={ctrl?.handleOpenGoogleMaps}
                      startIcon={<LaunchIcon />}
                      sx={{
                        background: "#f79313",
                        "&:hover": {
                          background: "#611463",
                        },
                        borderRadius: 1.5,
                        px: 2,
                      }}
                    >
                      Google Maps
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
            <FormHelperText sx={{ mb: 1, ml: 1, color: "#f7931e" }}>
              ແນະນຳ: ສາມາດຄົ້ນຫາສະຖານທີ່ໃນ Google Maps ແລ້ວວາງລິ້ງຈາກນັ້ນບ່ອນນີ້
            </FormHelperText>
          </Box>

          <Divider sx={{ my: 3, opacity: 0.6 }} />

          {/* Form for place name and details */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: "1rem",
                mb: 1.5,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
              }}
            >
              <LocationOnIcon sx={{ mr: 1, color: "#611463" }} />
              ຊື່ສະຖານທີ່ *
            </Typography>

            <TextField
              fullWidth
              variant="outlined"
              placeholder="ຊື່ອາຄານ, ທີ່ຢູ່, ຫລືຊື່ຮ້ານ"
              value={ctrl?.placeName ?? ""}
              onChange={(e) => {
                ctrl?.setPlaceName(e.target.value);
                if (e.target.value.trim()) {
                  ctrl?.setErrors({ ...ctrl?.errors, placeName: undefined });
                }
              }}
              error={!!ctrl?.errors.placeName}
              helperText={ctrl?.errors.placeName}
              required
              sx={{
                mb: 3,
                backgroundColor: "#fff",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  transition: "all 0.2s",
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: alpha("#611463", 0.5),
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#611463",
                    borderWidth: 2,
                  },
                },
              }}
              InputProps={{
                sx: { fontSize: "0.95rem", py: 0.5 },
                endAdornment: ctrl?.errors.placeName && (
                  <InputAdornment position="end">
                    <ErrorIcon color="error" />
                  </InputAdornment>
                ),
              }}
            />

            <Typography
              variant="subtitle1"
              sx={{
                fontSize: "1rem",
                mb: 1.5,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
              }}
            >
              <MyLocationIcon sx={{ mr: 1, color: "#611463" }} />
              ລາຍລະອຽດສະຖານທີ່ *
            </Typography>

            <TextField
              fullWidth
              variant="outlined"
              multiline
              rows={3}
              placeholder="ປ້ອນລາຍລະອຽດເພີ່ມເຕີມເຊັ່ນ: ໝາຍເລກອາຄານ, ຊັ້ນ, ຫ້ອງ"
              value={ctrl?.detailAddress ?? ""}
              onChange={(e) => {
                ctrl?.setDetailAddress(e.target.value);
                if (e.target.value.trim()) {
                  ctrl?.setErrors({
                    ...ctrl?.errors,
                    detailAddress: undefined,
                  });
                }
              }}
              error={!!ctrl?.errors.detailAddress}
              helperText={ctrl?.errors.detailAddress}
              required
              sx={{
                mb: 3,
                backgroundColor: "#fff",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  transition: "all 0.2s",
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: alpha("#611463", 0.5),
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#611463",
                    borderWidth: 2,
                  },
                },
              }}
              InputProps={{
                sx: { fontSize: "0.95rem" },
                endAdornment: ctrl?.errors.detailAddress && (
                  <InputAdornment position="end">
                    <ErrorIcon color="error" />
                  </InputAdornment>
                ),
              }}
            />
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: "1rem",
                mb: 1.5,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
              }}
            >
              <LocationCityOutlinedIcon sx={{ mr: 1, color: "#611463" }} />{" "}
              ເມືອງ *
            </Typography>

            <Autocomplete
              fullWidth
              options={districts}
              getOptionLabel={(option) => typeof option === 'string' ? displayCity(option) : option.lo}
              value={ctrl?.placeCity ? findCityByEnglishValue(ctrl?.placeCity) : null}
              onChange={(
  event: React.SyntheticEvent,
  newValue: { en: string, lo: string } | null
) => {
  ctrl?.setCity(newValue ? newValue.en : "");
  // Clear village when district changes
  ctrl?.setVillage("");
  if (newValue) {
    ctrl?.setErrors({ ...ctrl?.errors, placeCity: undefined });
  }
}}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="ເລືອກເມືອງ"
                  error={!!ctrl?.errors.placeCity}
                  helperText={ctrl?.errors.placeCity}
                  required
                  sx={{
                    mb: 3,
                    backgroundColor: "#fff",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      transition: "all 0.2s",
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: alpha("#611463", 0.5),
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#611463",
                        borderWidth: 2,
                      },
                    },
                  }}
                  InputProps={{
                    ...params.InputProps,
                    sx: { fontSize: "0.95rem", py: 0.5 },
                    endAdornment: (
                      <>
                        {ctrl?.errors.placeCity && (
                          <InputAdornment position="end">
                            <ErrorIcon color="error" />
                          </InputAdornment>
                        )}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
              renderOption={(props, option) => (
                <li {...props}>
                  {option.lo}
                </li>
              )}
            />
              <Typography
  variant="subtitle1"
  sx={{
    fontSize: "1rem",
    mb: 1.5,
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
  }}
>
  <HouseOutlinedIcon sx={{ mr: 1, color: "#611463" }} />
  ບ້ານ *
</Typography>

<Autocomplete
  fullWidth
  options={getAvailableVillages(ctrl?.placeCity)}
  getOptionLabel={(option) => typeof option === 'string' ? option : option.lo}
  value={ctrl?.placeVillage ? findVillageByEnglishValue(ctrl?.placeVillage, ctrl?.placeCity) : null}
  onChange={(
    event: React.SyntheticEvent,
    newValue: { en: string, lo: string } | null
  ) => {
    ctrl?.setVillage(newValue ? newValue.en : "");
    if (newValue) {
      ctrl?.setErrors({ ...ctrl?.errors, placeVillage: undefined });
    }
  }}
  disabled={!ctrl?.placeCity}
  renderInput={(params) => (
    <TextField
      {...params}
      variant="outlined"
      placeholder={ctrl?.placeCity ? "ເລືອກບ້ານ" : "ກະລຸນາເລືອກເມືອງກ່ອນ"}
      error={!!ctrl?.errors.placeVillage}
      helperText={ctrl?.errors.placeVillage}
      required
      sx={{
        mb: 3,
        backgroundColor: "#fff",
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
          transition: "all 0.2s",
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: alpha("#611463", 0.5),
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#611463",
            borderWidth: 2,
          },
        },
      }}
      InputProps={{
        ...params.InputProps,
        sx: { fontSize: "0.95rem", py: 0.5 },
        endAdornment: (
          <>
            {ctrl?.errors.placeVillage && (
              <InputAdornment position="end">
                <ErrorIcon color="error" />
              </InputAdornment>
            )}
            {params.InputProps.endAdornment}
          </>
        ),
      }}
    />
  )}
  renderOption={(props, option) => (
    <li {...props}>
      {option.lo}
    </li>
  )}
/>
            {/* Phone number field */}
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: "1rem",
                mb: 1.5,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
              }}
            >
              <PhoneIcon sx={{ mr: 1, color: "#611463" }} />
              ເບີໂທລະສັບ *
            </Typography>

            <TextField
              fullWidth
              variant="outlined"
              placeholder="ເບີໂທລະສັບ (ເຊັ່ນ: XXXXXXXX)"
              value={ctrl?.phoneNumber ?? ""}
              onChange={(e) => {
                ctrl?.handlePhoneNumberChange(e);
              }}
              error={!!ctrl?.errors.phoneNumber}
              helperText={ctrl?.errors.phoneNumber}
              required
              sx={{
                mb: 3,
                backgroundColor: "#fff",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  transition: "all 0.2s",
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: alpha("#611463", 0.5),
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#611463",
                    borderWidth: 2,
                  },
                },
              }}
              InputProps={{
                sx: {
                  fontSize: "0.95rem",
                  py: 0.5,
                  color: "#611463",
                  fontWeight: 500
                },
                endAdornment: ctrl?.errors.phoneNumber && (
                  <InputAdornment position="end">
                    <ErrorIcon color="error" />
                  </InputAdornment>
                ),
                onFocus: (e) => {
                  if (!e.target.value || !e.target.value.startsWith("+85620")) {
                    ctrl?.setPhoneNumber("+85620");
                  }
                  // Position cursor at the end
                  setTimeout(() => {
                    const len = e.target.value.length;
                    e.target.setSelectionRange(len, len);
                  }, 0);
                }
              }}
            />
          </Box>
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: "1rem",
              mb: 1.5,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              mt: 1,
            }}
          >
            <CameraAltOutlinedIcon sx={{ mr: 1, color: "#611463" }} />
            ຮູບພາບຂອງສະຖານທີ່
          </Typography>

          <Card
            sx={{
              mb: 4,
              borderRadius: 3,
              boxShadow: "none",
              border: "1px dashed",
              borderColor: alpha("#611463", 0.3),
              overflow: "hidden",
              transition: "all 0.2s",
              "&:hover": {
                borderColor: "#611463",
                backgroundColor: alpha("#611463", 0.02),
              },
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 3,
                  borderRadius: 2,
                }}
              >
                {ctrl.images[0]?.preview ? (
                  <Box
                    sx={{
                      width: "100%",
                      height: 320,
                      mb: 2,
                      display: "flex",
                      justifyContent: "center",
                      position: "relative",
                      borderRadius: 2,
                      overflow: "hidden",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  >
                    <img
                      src={ctrl.images[0].preview}
                      alt="Preview"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        zIndex: 2,
                      }}
                    >
                      <IconButton
                        onClick={() => ctrl.setImages([])}
                        sx={{
                          bgcolor: "rgba(255,255,255,0.9)",
                          "&:hover": {
                            bgcolor: "rgba(255,255,255,1)",
                          },
                          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        }}
                      >
                        <DeleteIcon sx={{ color: "#d32f2f" }} />
                      </IconButton>
                    </Box>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      py: 5,
                    }}
                  >
                    <PhotoCameraIcon
                      sx={{ fontSize: 60, color: alpha("#611463", 0.7), mb: 2 }}
                    />
                    <Typography
                      sx={{ color: "#666", mb: 2, textAlign: "center" }}
                    >
                      ອັບໂຫລດຮູບພາບເພື່ອໃຫ້ຜູ້ໃຫ້ບໍລິການເຫັນສະຖານທີ່ຂອງທ່ານໄດ້ງ່າຍຂຶ້ນ
                    </Typography>
                  </Box>
                )}

                <input
                  type="file"
                  accept="image/*"
                  id="upload-image"
                  onChange={ctrl.handleImageChange}
                  style={{ display: "none" }}
                />
                <label htmlFor="upload-image">
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<UploadIcon />}
                    sx={{
                      background: "#611463",
                      borderRadius: 2,
                      boxShadow: "0 4px 12px rgba(97, 20, 99, 0.15)",
                      px: 3,
                      py: 1.2,
                      transition: "all 0.2s",
                      "&:hover": {
                        background: "#7a1980",
                        transform: "translateY(-2px)",
                        boxShadow: "0 6px 16px rgba(97, 20, 99, 0.25)",
                      },
                      fontSize: "0.95rem",
                      fontWeight: 600,
                    }}
                  >
                    {ctrl.images[0]?.preview ? "ປ່ຽນຮູບພາບ" : "ອັບໂຫລດຮູບພາບ"}
                  </Button>
                </label>
                {ctrl.errors.image && (
                  <Typography color="error" sx={{ mt: 1, fontSize: "0.85rem" }}>
                    {ctrl.errors.image}
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Card>

          {/* Action buttons */}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate(LOCATION_PATH)}
                sx={{
                  py: 1.5,
                  color: "#d32f2f",
                  borderColor: "#d32f2f",
                  borderWidth: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  transition: "all 0.2s",
                  "&:hover": {
                    borderColor: "#d32f2f",
                    backgroundColor: alpha("#d32f2f", 0.05),
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(211, 47, 47, 0.15)",
                  },
                }}
              >
                ຍົກເລີກ
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                fullWidth
                onClick={ctrl?.handleSubmit}
                disabled={ctrl?.loading}
                sx={{
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: 2,
                  background: "#611463",
                  transition: "all 0.2s",
                  "&:hover": {
                    background: "#7a1980",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(97, 20, 99, 0.2)",
                  },
                }}
              >
                {ctrl?.loading ? (
                  <CircularProgress size={24} sx={{ color: '#fff' }} />
                ) : (
                  "ບັນທຶກ"
                )}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default LocationDetailPage;