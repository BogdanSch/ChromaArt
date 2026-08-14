export type SocialLinkDto = {
  id: number;
  platformName: string;
  url: string;
}

export type SiteSettingDto = {
  id: number;
  key: string;
  value: string;
  category: number;
}

export type PricingCategoryDto = {
  id: number;
  name: string;
  description: string;
  startingPrice: number;
  previewUrl: string;
  displayOrder: number;
  isActive: boolean;
}

export type PostDto = {
  id: string;
  type: string;
  caption: string;
  hashtags: string[];
  mentions: string[];
  url: string;
  displayUrl: string;
  alt: string;
}

export type LoginDto = {
  email: string;
  password: string;
  rememberMe: boolean;
}
