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

  // Handle form submission
  const handleSubmit = async () => {
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
      // let houseImagePath = "";

      // if (images) {
      //   // Upload image first
      //   const imageData = new FormData();
      //   // imageData.append("user_id", id);
      //   imageData.append("image", images);

      //   const uploadRes = await axiosInstance.post(
      //     "https://homecare-pro.onrender.com/address_users_details/upload",
      //     imageData,
      //     {
      //       headers: {
      //         "Content-Type": "multipart/form-data",
      //       },
      //     }
      //   );

      //   houseImagePath = uploadRes.data?.path || ""; // adjust depending on API response
      // }

      // Create form data to submit address
      // const data = new FormData();
      // data.append("gender_owner", "MALE");
      // data.append("users_id", "21");
      // data.append("address_name", placeName);
      // // data.append("house_image", houseImagePath);
      // data.append("google_link_map",mapLink );
      // data.append("address_description", detailAddress );
      // data.append("city", placeCity);
      // data.append("tel", phoneNumber);
      // data.append("village", placeVillage);

      const newData = {
        gender_owner: "MALE",
        users_id: 21,
        address_name: placeName,
        google_link_map: mapLink,
        address_description: detailAddress,
        city: placeCity,
        village: placeVillage,
        tel: phoneNumber,
      };

      await axios.post(
        "https://homecare-pro.onrender.com/address_users_details/create",
        newData
      );

      Swal.fire({
        title: "ສຳເລັດ!",
        text: "ບັນທຶກຂໍ້ມູນສຳເລັດ",
        icon: "success",
        confirmButtonText: "ຕົກລົງ",
      });

      handleGetData();
      resetForm();

      // Optionally clear form or refresh list
      // ctrl.resetForm(); or setState({})
    } catch (error) {
      console.error("Error submitting address:", error);
      Swal.fire("ຜິດພາດ", "ບໍ່ສາມາດບັນທຶກຂໍ້ມູນໄດ້", "error");
    }
  };

  // Handle image upload
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files;
    if (!files) return;

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
      })
      .catch((error) => {
        console.error("Error reading image files:", error);
      });
  };

  // Handle location selection
  const handleLocationSelect = (location: Useraddress): void => {
    setSelectedLocation(location);

    // Save location name to local storage
    localStorage.setItem("selectedLocationName", location.address_name);

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
    localStorage.getItem("selectedLocation");

    if (!selectedLocation?.id) {
      console.error("No location ID found in localStorage.");
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

        // Optionally remove from localStorage
        localStorage.removeItem("selectedLocation");

        // You may also want to update the state or refresh the list here
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
    setPhoneNumber(e.target.value);
    if (e.target.value.trim()) {
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
    handleSubmit,
    showAllAddresses,
    setShowAllAddresses,
    address,

    // State values
    savedLocations,
    selectedLocation,
    detailAddress,
    placeName,
    placeVillage,
    placeCity,
    countryCode,
    phoneNumber,
    hasWhatsapp,
    mapLink,
    images,
    errors,
    openSnackbar,
    snackbarMessage,
    snackbarSeverity,

    // State setters (including combined setters with validation)
    setSavedLocations,
    setSelectedLocation,
    setDetailAddress,
    setPlaceName,
    setVillage,
    setCity,
    setCountryCode,
    setPhoneNumber,
    setHasWhatsapp,
    setMapLink,
    setImages,
    setErrors,
    setOpenSnackbar,
    setSnackbarMessage,
    setSnackbarSeverity,

    // Functions
    // validateForm,
    // handleSubmit,
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
  };
};

export default useMainController;
