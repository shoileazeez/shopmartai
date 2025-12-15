export const tokenStorage = {
    setToken: (acessToken: string, refreshToken: string) => {
        localStorage.setItem("accessToken", acessToken);
        localStorage.setItem("refreshToken", refreshToken);
    },
    getAccessToken: () => {
        return localStorage.getItem("accessToken");
    },
    getRefreshToken: () => {
        return localStorage.getItem("refreshToken");
    },
    removeToken: () => {
        localStorage.removeItem("accessToken");
    },
    clear: () => {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
    }
}