// index.ts - Settings Functions and Logic
import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import { loginSuccess } from "../../../store/authenticationSlice";
import { UserModel } from "../../../models/user";

// Types and Interfaces
export interface ProfileFormData {
    username: string;
    firstName: string;
    lastName: string;
}

export interface PasswordFormData {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface ValidationErrors {
    username: string;
    firstName: string;
    lastName: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface NotificationState {
    open: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
}

export interface AvatarState {
    preview: string | null;
    file: File | null;
    isUploading: boolean;
}

// Validation Functions
export const validateProfileForm = (formData: ProfileFormData): ValidationErrors => {
    const errors: ValidationErrors = {
        username: "",
        firstName: "",
        lastName: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    };

    if (!formData.username.trim()) {
        errors.username = "ຊື່ບັນຊີບໍ່ສາມາດຫວ່າງເປົ່າໄດ້";
    } else if (formData.username.length < 3) {
        errors.username = "ຊື່ບັນຊີຕ້ອງມີຢ່າງໜ້ອຍ 3 ຕົວອັກສອນ";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
        errors.username = "ຊື່ບັນຊີສາມາດມີແຕ່ຕົວອັກສອນ, ຕົວເລກ ແລະ _";
    }

    if (!formData.firstName.trim()) {
        errors.firstName = "ຊື່ບໍ່ສາມາດຫວ່າງເປົ່າໄດ້";
    } else if (formData.firstName.length < 2) {
        errors.firstName = "ຊື່ຕ້ອງມີຢ່າງໜ້ອຍ 2 ຕົວອັກສອນ";
    }

    if (!formData.lastName.trim()) {
        errors.lastName = "ນາມສະກຸນບໍ່ສາມາດຫວ່າງເປົ່າໄດ້";
    } else if (formData.lastName.length < 2) {
        errors.lastName = "ນາມສະກຸນຕ້ອງມີຢ່າງໜ້ອຍ 2 ຕົວອັກສອນ";
    }

    return errors;
};

export const validatePasswordForm = (formData: PasswordFormData): ValidationErrors => {
    const errors: ValidationErrors = {
        username: "",
        firstName: "",
        lastName: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    };

    if (!formData.newPassword) {
        errors.newPassword = "ກະລຸນາໃສ່ລະຫັດຜ່ານໃໝ່";
    } else if (formData.newPassword.length < 6) {
        errors.newPassword = "ລະຫັດຜ່ານຕ້ອງມີຢ່າງໜ້ອຍ 6 ຕົວອັກສອນ";
    } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(formData.newPassword)) {
        errors.newPassword = "ລະຫັດຜ່ານຕ້ອງມີທັງຕົວອັກສອນແລະຕົວເລກ";
    }

    if (!formData.confirmPassword) {
        errors.confirmPassword = "ກະລຸນາຢືນຢັນລະຫັດຜ່ານໃໝ່";
    } else if (formData.newPassword !== formData.confirmPassword) {
        errors.confirmPassword = "ລະຫັດຜ່ານບໍ່ຕົງກັນ";
    }

    return errors;
};

// File validation functions
export const validateImageFile = (file: File): string | null => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
        return "ກະລຸນາເລືອກໄຟລ์ຮູບພາບ (JPEG, PNG, GIF, WebP)";
    }

    if (file.size > maxSize) {
        return "ຂະໜາດໄຟລ์ຕ້ອງນ້ອຍກວ່າ 5MB";
    }

    return null;
};

export const createImagePreview = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            resolve(e.target?.result as string);
        };
        reader.onerror = () => {
            reject(new Error("ບໍ່ສາມາດອ່ານໄຟລ້ໄດ້"));
        };
        reader.readAsDataURL(file);
    });
};

// API Functions
export const updateUserProfile = async (
    formData: ProfileFormData,
    userData: UserModel,
    dispatch: Dispatch
): Promise<{ success: boolean; message: string }> => {
    try {
        const token = localStorage.getItem("accessToken");
        
        if (!token || !userData?.id) {
            throw new Error("ບໍ່ພົບຂໍ້ມູນການເຂົ້າສູ່ລະບົບ");
        }

        const response = await axios.put(
            `https://homecare-pro.onrender.com/users/rename_user/${userData.id}`,
            {
                newUsername: formData.username,
                newFirstname: formData.firstName,
                newLastname: formData.lastName
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // Update Redux state with new user data
        const updatedUserData = {
            ...userData,
            username: formData.username,
            first_name: formData.firstName,
            last_name: formData.lastName
        };
        
        dispatch(loginSuccess(updatedUserData));

        return {
            success: true,
            message: "ບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ!"
        };

    } catch (error: any) {
        console.error("Error updating profile:", error);
        return {
            success: false,
            message: error.response?.data?.message || "ເກີດຄວາມຜິດພາດໃນການບັນທຶກຂໍ້ມູນ"
        };
    }
};

export const changeUserPassword = async (
    formData: PasswordFormData,
    userEmail: string
): Promise<{ success: boolean; message: string }> => {
    try {
        const response = await axios.post(
            "https://homecare-pro.onrender.com/users/forgot_password",
            {
                email: userEmail,
                newPassword: formData.newPassword
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        return {
            success: true,
            message: "ປ່ຽນລະຫັດຜ່ານສຳເລັດແລ້ວ!"
        };

    } catch (error: any) {
        console.error("Error changing password:", error);
        
        // Handle specific error cases
        if (error.response?.status === 400) {
            return {
                success: false,
                message: "ອີເມວບໍ່ຖືກຕ້ອງ ຫຼື ຂໍ້ມູນບໍ່ຄົບຖ້ວນ"
            };
        } else if (error.response?.status === 404) {
            return {
                success: false,
                message: "ບໍ່ພົບຜູ້ໃຊ້ງານນີ້ໃນລະບົບ"
            };
        }
        
        return {
            success: false,
            message: error.response?.data?.message || "ເກີດຄວາມຜິດພາດໃນການປ່ຽນລະຫັດຜ່ານ"
        };
    }
};

export const uploadUserAvatar = async (
    file: File,
    userData: UserModel,
    dispatch: Dispatch
): Promise<{ success: boolean; message: string; avatarUrl?: string }> => {
    try {
        const token = localStorage.getItem("accessToken");
        
        if (!token || !userData?.id) {
            throw new Error("ບໍ່ພົບຂໍ້ມູນການເຂົ້າສູ່ລະບົບ");
        }

        // Validate file type and size
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            throw new Error("ກະລຸນາເລືອກໄຟລ໌ຮູບພາບທີ່ຖືກຕ້ອງ (JPEG, PNG, GIF)");
        }

        // Check file size (e.g., 5MB limit)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            throw new Error("ຂະໜາດໄຟລ໌ໃຫຍ່ເກີນໄປ ກະລຸນາເລືອກໄຟລ໌ທີ່ນ້ອຍກວ່າ 5MB");
        }

        // Create FormData for file upload
        const formData = new FormData();
        formData.append('avatar', file);
        
        // Include current user data to maintain other fields
        if (userData.username) {
            formData.append('newUsername', userData.username);
        }
        if (userData.firstName) {
            formData.append('newFirstname', userData.firstName);
        }
        if (userData.lastName) {
            formData.append('newLastname', userData.lastName);
        }

        // Use the correct endpoint from your API documentation
        const response = await axios.put(
            `https://homecare-pro.onrender.com/users/rename_user/${userData.id}`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    // Don't set Content-Type manually for FormData
                    // Let the browser set it with the boundary
                },
                timeout: 30000 // 30 second timeout
            }
        );

        // Check if response is successful
        if (response.status !== 200) {
            throw new Error(response.data?.message || "ເກີດຄວາມຜິດພາດໃນການອັບໂຫລດ");
        }

        // Extract avatar URL from response
        const avatarUrl = response.data?.avatar || 
                         response.data?.avatarUrl ||
                         response.data?.data?.avatar ||
                         response.data?.user?.avatar;

        if (!avatarUrl) {
            console.warn("No avatar URL returned from server, using existing avatar");
        }

        // Update Redux state with new avatar URL
        const updatedUserData = {
            ...userData,
            avatar: avatarUrl || userData.avatar
        };
        
        dispatch(loginSuccess(updatedUserData));

        return {
            success: true,
            message: "ອັບໂຫລດຮູບໂປຣໄຟລ໌ສຳເລັດແລ້ວ!",
            avatarUrl: avatarUrl
        };

    } catch (error: any) {
        console.error("Error uploading avatar:", error);
        
        // Handle different types of errors
        let errorMessage = "ເກີດຄວາມຜິດພາດໃນການອັບໂຫລດຮູບພາບ";
        
        if (error.response) {
            // Server responded with error status
            errorMessage = error.response.data?.message || 
                          error.response.data?.error || 
                          `ເຊີບເວີຜິດພາດ: ${error.response.status}`;
        } else if (error.request) {
            // Network error
            errorMessage = "ບໍ່ສາມາດເຊື່ອມຕໍ່ກັບເຊີບເວີໄດ້";
        } else if (error.message) {
            // Custom error message
            errorMessage = error.message;
        }

        return {
            success: false,
            message: errorMessage
        };
    }
};

export const deleteUserAvatar = async (
    userData: UserModel,
    dispatch: Dispatch
): Promise<{ success: boolean; message: string }> => {
    try {
        const token = localStorage.getItem("accessToken");
        
        if (!token || !userData?.id) {
            throw new Error("ບໍ່ພົບຂໍ້ມູນການເຂົ້າສູ່ລະບົບ");
        }

        const response = await axios.delete(
            `https://homecare-pro.onrender.com/users/delete_avatar/${userData.id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        // Update Redux state to remove avatar
        const updatedUserData = {
            ...userData,
            avatar: ""
        };
        
        dispatch(loginSuccess(updatedUserData));

        return {
            success: true,
            message: "ລຶບຮູບໂປຣໄຟລ໌ສຳເລັດແລ້ວ!"
        };

    } catch (error: any) {
        console.error("Error deleting avatar:", error);
        return {
            success: false,
            message: error.response?.data?.message || "ເກີດຄວາມຜິດພາດໃນການລຶບຮູບພາບ"
        };
    }
};

// Utility Functions
export const getInitialProfileForm = (userData: UserModel | null): ProfileFormData => {
    return {
        username: userData?.username || "",
        firstName: userData?.first_name || "",
        lastName: userData?.last_name || ""
    };
};

export const getInitialPasswordForm = (): PasswordFormData => {
    return {
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    };
};

export const getInitialValidationErrors = (): ValidationErrors => {
    return {
        username: "",
        firstName: "",
        lastName: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    };
};

export const getInitialAvatarState = (): AvatarState => {
    return {
        preview: null,
        file: null,
        isUploading: false
    };
};

export const createNotification = (
    message: string,
    severity: "success" | "error" | "info" | "warning" = "info"
): NotificationState => {
    return {
        open: true,
        message,
        severity
    };
};

export const hasValidationErrors = (errors: ValidationErrors): boolean => {
    return Object.values(errors).some(error => error !== "");
};

// Avatar utility functions
export const getAvatarDisplayName = (userData: UserModel | null): string => {
    if (!userData) return "";
    
    const firstName = userData.first_name || "";
    const lastName = userData.last_name || "";
    
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

export const getAvatarSource = (userData: UserModel | null, preview: string | null): string | undefined => {
    if (preview) return preview;
    if (userData?.avatar) return userData.avatar;
    return undefined;
};