export type UserDto = {
  email: string;
  userName: string;
  phoneNumber: string;
  registeredAt: string;
  isAdmin: boolean;
};

export type TokenDataDto = {
  accessTokenExpirationTime: string;
  refreshTokenExpirationTime: string;
};
