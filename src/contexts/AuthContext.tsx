import { UserDTO } from "@dtos/UserDTO";
import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "@services/api";
export type AuthContextDataProps = {
  user: UserDTO;
  updateUserProfile: (userUpdated: UserDTO) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoadingUserStorageData: boolean;
  refreshedToken: string;
};
import {
  storageUserSave,
  storageUserGet,
  storageUserRemove,
} from "@storage/storageUser";
export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);
import {
  storageAuthTokenSave,
  storageAuthTokenGet,
  storageAuthTokenRemove,
} from "@storage/storageAuthToken";
type authContextProviderProps = {
  children: ReactNode;
};

export function AuthContextProvider({ children }: authContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [refreshedToken, setRefreshedToken] = useState("");
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] =
    useState(true);

  async function userAndTokenUpdate(userData: UserDTO, token: string) {
    try {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser(userData);
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function storageUserAndTokenSave(userData: UserDTO, token: string) {
    try {
      setIsLoadingUserStorageData(true);
      await storageUserSave(userData);
      await storageAuthTokenSave(token);
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post("/sessions", { email, password });

      if (data.user && data.token) {
        await storageUserAndTokenSave(data.user, data.token);
        userAndTokenUpdate(data.user, data.token);
      }
    } catch (error) {
      throw error;
    } finally {
      {
        setIsLoadingUserStorageData(false);
      }
    }
  }
  async function signOut() {
    try {
      setIsLoadingUserStorageData(true);
      setUser({} as UserDTO);
      await storageUserRemove();
      await storageAuthTokenRemove();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function updateUserProfile(userUpdated: UserDTO) {
    try {
      setUser(userUpdated);
      await storageUserSave(userUpdated);
    } catch (error) {
      throw error;
    }
  }

  async function loadUserData() {
    setIsLoadingUserStorageData(true);

    const userLogged = await storageUserGet();
    const token = await storageAuthTokenGet();

    if (token && userLogged) {
      userAndTokenUpdate(userLogged, token);
    }
  }
  function refreshTokenUpdated(newToken: string) {
    setRefreshedToken(newToken);
  }

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager({
      signOut,
      refreshTokenUpdated,
    });

    return () => {
      subscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        updateUserProfile,
        signIn,
        isLoadingUserStorageData,
        refreshedToken,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
