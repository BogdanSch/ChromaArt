import axios from "axios";
import { TokenDataDto } from "../types";
import { API_URL } from "shared/variables";
import { convertToUTCDate } from "shared/utils/helpers/dateHelper";

export const refreshTokens = async (): Promise<void> => {
  try {
    const response = await axios.post<TokenDataDto>(
      `${API_URL}/Auth/refresh`,
      {},
      {
        withCredentials: true,
      },
    );

    localStorage.setItem(
      "accessTokenExpirationTimeUTC",
      JSON.stringify(convertToUTCDate(response.data.accessTokenExpirationTime)),
    );
  } catch (error) {
    console.log("Refresh failed:", error);
    localStorage.setItem("accessTokenExpirationTimeUTC", "");
  }
};

const EXPIRATION_OFFSET_MS: number = 30 * 1000;

const protectedAxios = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

protectedAxios.interceptors.request.use(
  async (config) => {
    let accessTokenExpirationTimeUTC: string = "";
    const value = localStorage.getItem("accessTokenExpirationTimeUTC");
    if (value) accessTokenExpirationTimeUTC = JSON.parse(value);

    const nowUtc = new Date().getTime();
    const expiryUtc = new Date(accessTokenExpirationTimeUTC)?.getTime();

    if (
      !Number.isNaN(expiryUtc) &&
      expiryUtc - EXPIRATION_OFFSET_MS <= nowUtc
    ) {
      console.log("Refreshing the tokens");
      await refreshTokens();
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default protectedAxios;
