import { protectedAxios } from "./axiosInstances/index";
import {
  FC,
  createContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import { API_URL } from "shared/variables";
import { TokenDateDto, UserDto } from "shared/types";
import useStorage from "shared/hooks/useStorage";
import { convertToUTCDate } from "shared/utils/helpers/dateHelper";

type IAuthContextProps = {
  user: UserDto | null;
  authenticateUser: (tokenDate: TokenDateDto) => Promise<void>;
  logoutUser: () => Promise<void>;
  isAuthenticated: () => boolean;
  isAdmin: () => boolean;
  refreshUserData: () => Promise<void>;
  loading: boolean;
};
const AuthContext = createContext<IAuthContextProps>({
  user: null,
  authenticateUser: async () => {},
  logoutUser: async () => {},
  isAuthenticated: () => false,
  isAdmin: () => false,
  refreshUserData: async () => {},
  loading: false,
});

export default AuthContext;

type AuthProviderProps = {
  children: ReactNode;
};
export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [
    accessTokenExpirationTimeUTC,
    setAccessTokenExpirationTimeUTC,
    removeAccessTokenExpirationTimeUTC,
    isAccessTokenExpirationTimeHydrated,
  ] = useStorage<string>("accessTokenExpirationTimeUTC", "");
  const [user, setUser, removeUser, isUserHydrated] =
    useStorage<UserDto | null>("user", null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async (
    accessTokenExpirationTime: string,
  ): Promise<void> => {
    if (
      !accessTokenExpirationTime ||
      accessTokenExpirationTime.trim().length === 0
    ) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await protectedAxios.get<UserDto>(
        `${API_URL}/account/me`,
      );
      setUser(data);
    } catch (error) {
      await logoutUser();
      console.log("Error while fetching the user info: " + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAccessTokenExpirationTimeHydrated || !isUserHydrated) return;
    fetchUserData(accessTokenExpirationTimeUTC);
  }, [
    accessTokenExpirationTimeUTC,
    isAccessTokenExpirationTimeHydrated,
    isUserHydrated,
  ]);

  const authenticateUser = async (tokenDate: TokenDateDto): Promise<void> => {
    setLoading(true);

    const accessTokenExpirationTimeUTC: string = convertToUTCDate(
      tokenDate.accessTokenExpirationTime,
    );
    setAccessTokenExpirationTimeUTC(accessTokenExpirationTimeUTC);

    await fetchUserData(accessTokenExpirationTimeUTC);
  };

  const logoutUser = async (): Promise<void> => {
    try {
      await protectedAxios.post(`${API_URL}/account/logout`);
    } finally {
      removeUser();
      removeAccessTokenExpirationTimeUTC();
    }
  };

  const isAuthenticated = () => {
    return user !== null && accessTokenExpirationTimeUTC.trim().length > 0;
  };

  const isAdmin = () => user?.isAdmin ?? false;

  const refreshUserData = async (): Promise<void> => {
    if (!isAuthenticated()) {
      await logoutUser();
      return;
    }
    setLoading(true);
    await fetchUserData(accessTokenExpirationTimeUTC);
  };

  const contextValue = useMemo(
    () => ({
      user,
      authenticateUser,
      logoutUser,
      isAuthenticated,
      isAdmin,
      refreshUserData,
      loading:
        loading || !isAccessTokenExpirationTimeHydrated || !isUserHydrated,
    }),
    [user, loading, isAccessTokenExpirationTimeHydrated, isUserHydrated],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export function useAuth() {
  return AuthContext();
}
