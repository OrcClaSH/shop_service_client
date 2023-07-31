import { AxiosResponse } from 'axios';

import $api from '../http';

import { IAuthResponse } from 'redux/slices/user/types';

export default class AuthService {
  static async registration(
    email: string,
    password: string,
  ): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post<IAuthResponse>('/registration', { email, password });
  }

  static async login(
    email: string,
    password: string,
  ): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post<IAuthResponse>('/login', { email, password });
  }

  static async logout(): Promise<void> {
    return $api.post('./logout');
  }

  static async refresh(): Promise<AxiosResponse<IAuthResponse>> {
    return $api.get<IAuthResponse>('/refresh', { withCredentials: true });
  }
}
