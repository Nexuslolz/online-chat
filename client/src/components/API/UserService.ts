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
  static async getAllUsers(limit?: number, skip?: number): Promise<AxiosResponse<IFriendItem[]>> {
    return $api.get<IFriendItem[]>(`/subscriptions/all?skip=${skip}&limit=${limit}`);
  }
  static async getUser(id: string) {
    return $api.get(`/users/${id}`);
  }
  static async addFriend(userId: string, id: string) {
    return $api.put('/subscriptions/add-friend', { subscriber: userId, friend: id });
  }
  static async deleteFriend(userId: string, id: string) {
    return $api.put('/subscriptions/delete-friend', { subscriber: userId, friend: id });
  }
}
