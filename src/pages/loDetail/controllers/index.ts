// Controller file: useMainController.ts

import { useState, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertColor, SelectChangeEvent } from "@mui/material";
import { LOCATION_PATH } from "../../../routes/path";
import { Useraddress } from "../../../models/useraddress";
import axios from "axios";
import Swal from "sweetalert2";

export interface ImageFile {
  file: File;
  preview: string;
}

export interface ErrorState {
  placeName?: string;
  detailAddress?: string;
  placeVillage?: string;
  placeCity?: string;
  phoneNumber?: string;
  mapLink?: string;
  image?: string;
  [key: string]: string | undefined;
}

const useMainController = () => {
  const navigate = useNavigate();

  // State hooks for UI
  const [savedLocations, setSavedLocations] = useState<Useraddress[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Useraddress | null>(
    null
  );
  const [detailAddress, setDetailAddress] = useState<string>("");
  const [placeName, setPlaceName] = useState<string>("");
  const [placeVillage, setVillage] = useState<string>("");
  const [placeCity, setCity] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("+856");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [hasWhatsapp, setHasWhatsapp] = useState<boolean>(false);
  const [mapLink, setMapLink] = useState<string>("");
  const [images, setImages] = useState<ImageFile[]>([]);
  const [address, setAddress] = useState<Useraddress[]>([]);

  const [errors, setErrors] = useState<ErrorState>({});

  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] =
    useState<AlertColor>("success");
  const [showAllAddresses, setShowAllAddresses] = useState(false);

  const handleGetData = async () => {
    try {
      const res = await axios.get(
        "https://homecare-pro.onrender.com/address_users_details"
      );
      setAddress(res?.data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  // Validate form fields before submission
  const validateForm = (): boolean => {
    const newErrors: ErrorState = {};

    if (!placeName?.trim()) {
      newErrors.placeName = "ກະລຸນາປ້ອນຊື່ສະຖານທີ່";
    }

    if (!detailAddress?.trim()) {
      newErrors.detailAddress = "ກະລຸນາປ້ອນລາຍລະອຽດທີ່ຢູ່";
    }

    if (!placeVillage?.trim()) {
      newErrors.placeVillage = "ກະລຸນາປ້ອນຊື່ບ້ານ";
    }

    if (!placeCity) {
      newErrors.placeCity = "ກະລຸນາເລືອກເມືອງ";
    }

    if (!phoneNumber?.trim()) {
      newErrors.phoneNumber = "ກະລຸນາປ້ອນເບີໂທລະສັບ";
    } else if (!/^\d+$/.test(phoneNumber)) {
      newErrors.phoneNumber = "ເບີໂທລະສັບຕ້ອງເປັນຕົວເລກເທົ່ານັ້ນ";
    } else if (phoneNumber.length < 8 || phoneNumber.length > 12) {
      newErrors.phoneNumber = "ເບີໂທລະສັບບໍ່ຖືກຕ້ອງ";
    }

    if (!mapLink?.trim()) {
      newErrors.mapLink = "ກະລຸນາປ້ອນລິ້ງ Google Maps";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Validate form first
    if (!validateForm()) {
      Swal.fire({
        title: "ແຈ້ງເຕືອນ",
        text: "ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ",
        icon: "warning",
        confirmButtonColor: "#611463",
        confirmButtonText: "ຕົກລົງ",
      });
      return;
    }

    const result = await Swal.fire({
      title: "ຢືນຢັນການບັນທຶກ?",
      text: "ກົດຕົກລົງເພື່ອບັນທຶກຂໍ້ມູນທີ່ຢູ່ໃໝ່.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#611463",
      cancelButtonColor: "#d33",
      confirmButtonText: "ຕົກລົງ",
      cancelButtonText: "ຍົກເລີກ",
    });

    if (!result.isConfirmed) return;

    try {
      // Create a single FormData for both address data and image
      const formData = new FormData();
      formData.append("gender_owner", "MALE");
      formData.append("users_id", "21");
      formData.append("address_name", placeName);
      formData.append("google_link_map", mapLink);
      formData.append("address_description", detailAddress);
      formData.append("city", placeCity);
      formData.append("village", placeVillage);
      formData.append("tel", phoneNumber);
      
      // Append image if it exists
      if (images.length > 0) {
        formData.append("house_image", images[0].file);
      }

      // Submit everything in a single request
      await axios.post(
        "https://homecare-pro.onrender.com/address_users_details/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Swal.fire({
        title: "ສຳເລັດ!",
        text: "ບັນທຶກຂໍ້ມູນສຳເລັດ",
        icon: "success",
        confirmButtonText: "ຕົກລົງ",
      });

      handleGetData();
      resetForm();
    } catch (error) {
      console.error("Error submitting address:", error);
      Swal.fire("ຜິດພາດ", "ບໍ່ສາມາດບັນທຶກຂໍ້ມູນໄດ້", "error");
    }
  };

  // Handle image upload
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const newFiles = Array.from(files);

    // Check if adding new files would exceed the limit of 3
    if (images.length + newFiles.length > 3) {
      setErrors((prev) => ({
        ...prev,
        image: "ສາມາດອັບໂຫລດຮູບພາບໄດ້ສູງສຸດ 3 ຮູບເທົ່ານັ້ນ",
      }));
      setSnackbarMessage("ສາມາດອັບໂຫລດຮູບພາບໄດ້ສູງສຸດ 3 ຮູບເທົ່ານັ້ນ");
      setSnackbarSeverity("warning");
      setOpenSnackbar(true);
      return;
    }

    const imagePromises = newFiles.map((file) => {
      return new Promise<ImageFile>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve({
            file,
            preview: reader.result as string,
          });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises)
      .then((newImageFiles) => {
        setImages((prev) => [...prev, ...newImageFiles]);
        // Clear image error if it exists
        if (errors.image) {
          setErrors({ ...errors, image: undefined });
        }
      })
      .catch((error) => {
        console.error("Error reading image files:", error);
      });
  };

  // Handle location selection
  const handleLocationSelect = (location: Useraddress): void => {
    setSelectedLocation(location);
    
    // Store each component separately
    localStorage.setItem("addressName", location.address_name);
    localStorage.setItem("addressVillage", location.village);
    localStorage.setItem("addressCity", location.city);
    
    // Also store the combined string for backwards compatibility
    const locationString = `${location.address_name}, ${location.village}, ${location.city}`;
    localStorage.setItem("selectedLocationName", locationString);

    // If you want to save more location information, you can store it as JSON
    localStorage.setItem(
      "selectedLocation",
      JSON.stringify({
        id: location.id,
        name: location.address_name,
        description: location.address_description,
      })
    );
  };

  // Handle delete location
  const handleDeleteLocation = async () => {
    if (!selectedLocation?.id) {
      Swal.fire("ແຈ້ງເຕືອນ", "ກະລຸນາເລືອກທີ່ຢູ່ກ່ອນ", "warning");
      return;
    }

    const locationId = selectedLocation.id;

    const result = await Swal.fire({
      title: "ລຶບທີ່ຢູ່ນີ້?",
      text: "ທ່ານຈະບໍ່ສາມາດກູ້ຄືນໄດ້!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ຕົກລົງ",
      cancelButtonText: "ຍົກເລີກ",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `https://homecare-pro.onrender.com/address_users_details/delete/${locationId}`
        );

        Swal.fire({
          title: "ສຳເລັດ!",
          text: "ລຶບທີ່ຢູ່ແລ້ວ.",
          icon: "success",
          confirmButtonText: "ຕົກລົງ",
        });

        // Remove from localStorage
        localStorage.removeItem("selectedLocation");
        localStorage.removeItem("selectedLocationName");
        localStorage.removeItem("addressName");
        localStorage.removeItem("addressVillage");
        localStorage.removeItem("addressCity");

        // Reset selected location
        setSelectedLocation(null);
        
        // Refresh address list
        handleGetData();
      } catch (error) {
        console.error("Error deleting location:", error);
        Swal.fire("ຜິດພາດ", "ບໍ່ສາມາດລຶບທີ່ຢູ່ໄດ້", "error");
      }
    }
  };

  // Open Google Maps with the provided link
  const handleOpenGoogleMaps = (): void => {
    if (mapLink) {
      window.open(mapLink, "_blank");
    } else {
      window.open("https://www.google.com/maps", "_blank");
    }
  };

  // Reset form function
  const resetForm = (): void => {
    // Reset UI state as well
    setMapLink("");
    setPlaceName("");
    setDetailAddress("");
    setVillage("");
    setCity("");
    setPhoneNumber("");
    setHasWhatsapp(false);
    setImages([]);
    setErrors({});
  };

  // Handle fields change
  const handleMapLinkChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setMapLink(e.target.value);
    if (e.target.value.trim()) {
      setErrors({ ...errors, mapLink: undefined });
    }
  };

  const handlePlaceNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPlaceName(e.target.value);
    if (e.target.value.trim()) {
      setErrors({ ...errors, placeName: undefined });
    }
  };

  const handleDetailAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setDetailAddress(e.target.value);
    if (e.target.value.trim()) {
      setErrors({ ...errors, detailAddress: undefined });
    }
  };

  const handleVillageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setVillage(e.target.value);
    if (e.target.value.trim()) {
      setErrors({ ...errors, placeVillage: undefined });
    }
  };

  const handleDistrictChange = (
    event: React.SyntheticEvent,
    newValue: string | null
  ): void => {
    setCity(newValue || "");
    if (newValue) {
      setErrors({ ...errors, placeCity: undefined });
    }
  };

  const handlePhoneNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    // Only allow numeric input
    const numericValue = e.target.value.replace(/\D/g, '');
    setPhoneNumber(numericValue);
    
    if (numericValue.trim()) {
      setErrors({ ...errors, phoneNumber: undefined });
    }
  };

  const handleWhatsappChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setHasWhatsapp(e.target.checked);
  };

  const handleCountryCodeChange = (event: SelectChangeEvent): void => {
    setCountryCode(event.target.value);
  };

  // Handle snackbar close
  const handleCloseSnackbar = (): void => {
    setOpenSnackbar(false);
  };

  // Handle cancel button
  const handleCancel = (): void => {
    navigate(LOCATION_PATH);
  };

  // Get color based on location type - kept for reference, typically would be in UI
  const getLocationColor = (type: string): string => {
    switch (type) {
      default:
        return "#f7931e";
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);

  return {
    // Methods
    validateForm,
    handleSubmit,
    handleImageChange,
    handleLocationSelect,
    handleDeleteLocation,
    handleOpenGoogleMaps,
    resetForm,
    handleMapLinkChange,
    handlePlaceNameChange,
    handleDetailAddressChange,
    handleVillageChange,
    handleDistrictChange,
    handlePhoneNumberChange,
    handleWhatsappChange,
    handleCountryCodeChange,
    handleCloseSnackbar,
    handleCancel,
    getLocationColor,
    handleGetData,
    
    // State values and setters
    showAllAddresses,
    setShowAllAddresses,
    address,
    savedLocations,
    setSavedLocations,
    selectedLocation,
    setSelectedLocation,
    detailAddress,
    setDetailAddress,
    placeName,
    setPlaceName,
    placeVillage,
    setVillage,
    placeCity,
    setCity,
    countryCode,
    setCountryCode,
    phoneNumber,
    setPhoneNumber,
    hasWhatsapp,
    setHasWhatsapp,
    mapLink,
    setMapLink,
    images,
    setImages,
    errors,
    setErrors,
    openSnackbar,
    setOpenSnackbar,
    snackbarMessage,
    setSnackbarMessage,
    snackbarSeverity,
    setSnackbarSeverity,
  };
};

export default useMainController;