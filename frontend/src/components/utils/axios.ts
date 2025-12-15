import axios from "axios";

/**
 * Base API URL
 * Change in production
 */
const API_URL = "http://localhost:8000/api";

/**
 * Read CSRF token from cookie
 * (csrftoken is NOT HttpOnly by design)
 */
function getCSRFToken(): string | null {
    if (typeof document === "undefined") return null;

    const match = document.cookie
        .split("; ")
        .find(row => row.startsWith("csrftoken="));

    return match ? match.split("=")[1] : null;
}

/**
 * Axios instance configured for:
 * - HttpOnly JWT cookies
 * - CSRF protection
 */
export const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true, // REQUIRED
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * Attach CSRF token to unsafe methods
 */
axiosInstance.interceptors.request.use(
    (config) => {
        const csrfToken = getCSRFToken();

        if (csrfToken) {
            config.headers["X-CSRFToken"] = csrfToken;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

/**
 * Handle authentication failures
 * Backend handles token refresh automatically
 */
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Optional: redirect to login
            if (typeof window !== "undefined") {
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

/**
 * Initialize CSRF cookie (call once on app load)
 */
export async function initCSRF() {
    await axios.get("http://localhost:8000/api/auth/csrf/", {
        withCredentials: true,
    });
}
