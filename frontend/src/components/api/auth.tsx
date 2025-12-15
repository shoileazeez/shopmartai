import { axiosInstance } from "../utils/axios";

/**
 * Register a new user
 * Returns { user?, emailVerificationRequired: boolean }
 */
export const register = async (data: any) => {
    try {
        const response = await axiosInstance.post("/auth/registration/", data);
        // Backend may return "detail: Verification e-mail sent."
        const emailVerificationRequired = response.data?.detail?.includes("Verification e-mail sent");

        return { emailVerificationRequired };
    } catch (error: any) {
        throw error.response?.data || error;
    }
};

/**
 * Login user
 * Will fail if email not verified when verification is mandatory
 */
export const login = async (data: any) => {
    try {
        await axiosInstance.post("/auth/login/", data);
        // Fetch user after login to update context
        const resUser = await axiosInstance.get("/auth/user/");
        return resUser.data;
    } catch (error: any) {
        throw error.response?.data || error;
    }
};

/**
 * Logout
 */
export const logout = async () => {
    try {
        await axiosInstance.post("/auth/logout/");
    } catch (error: any) {
        throw error.response?.data || error;
    }
};

/**
 * Verify email with key
 */
export const verifyEmail = async (key: string) => {
    try {
        await axiosInstance.post("/auth/registration/verify-email/", { key });
        return true;
    } catch (error: any) {
        throw error.response?.data || error;
    }
};
