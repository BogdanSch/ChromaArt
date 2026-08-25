import axios from "axios";
import { createContext, useContext, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import type { SocialLinkDto } from "@/types";
import { API_URL } from "shared/variables";

type ISocialsContext = {
  data: SocialLinkDto[];
  isLoading: boolean;
  instagramData?: SocialLinkDto | null;
  error?: string;
};
const SocialsContext = createContext<ISocialsContext>({
  data: [],
  isLoading: true,
});
export default SocialsContext;

type ISocialsProviderProps = {
  children: ReactNode;
};
export function SocialsProvider({ children }: ISocialsProviderProps) {
  const fetchSocialLinks = async (): Promise<SocialLinkDto[]> => {
    try {
      const { data } = await axios.get<SocialLinkDto[]>(
        `${API_URL}/social-links`,
      );
      return data;
    } catch (error) {
      let errorMessage: string = "Couldn't fetch the social links.";
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        errorMessage = error.response.data.message;
      }
      console.error(errorMessage, error);
      throw new Error(errorMessage);
    }
  };
  const fetchInstagramLink = async (): Promise<SocialLinkDto | null> => {
    try {
      const { data } = await axios.get<SocialLinkDto[]>(
        `${API_URL}/social-links?search=instagram`,
      );

      if (data.length > 0) return data[0];
      return null;
    } catch (error) {
      let errorMessage: string = "Couldn't fetch the Instagram link.";
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        errorMessage = error.response.data.message;
      }
      console.error(errorMessage, error);
      throw new Error(errorMessage);
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["contactLinks"],
    queryFn: fetchSocialLinks,
    retry: 2,
  });
  const {
    data: instagramData,
    isLoading: instagramLoading,
    error: instagramError,
  } = useQuery({
    queryKey: ["instagramLink"],
    queryFn: fetchInstagramLink,
    retry: 2,
  });

  return (
    <SocialsContext.Provider
      value={{
        data: data ?? [],
        isLoading: isLoading && instagramLoading,
        error: error?.message || instagramError?.message,
        instagramData: instagramData,
      }}
    >
      {children}
    </SocialsContext.Provider>
  );
}

export function useSocials() {
  return useContext(SocialsContext);
}
