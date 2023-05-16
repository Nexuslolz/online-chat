import { AxiosResponse } from 'axios';

import { $api } from './ApiInstance';

import { IFriendItem, IIndexedStr } from '../../types/types';

export default class UserService {
  static async editUser(id: string, body: IIndexedStr) {
    return $api.put('/users/edit-user', { id, body });
  }
  static async getUserPosts() {
    return $api.get('/users');
  }
  static async getAllUsers(): Promise<AxiosResponse<IFriendItem[]>> {
    return $api.get<IFriendItem[]>('/subscriptions/all');
  }
}
