export interface IUser {
  id: string;
  email: string;
  isActivated: boolean;
}

export interface IAuthResponse {
  error: true;
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface IUserState {
  user: IUser;
  isAuth: Boolean;
  isLoading: Boolean;
  error: string;
}
