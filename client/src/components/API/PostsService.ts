import { AxiosResponse } from 'axios';

import { $api } from './ApiInstance';

import { IAuthResponse, IPostData, IUserPost } from '../../types/types';

interface ILikesPost {
  userId: string;
  post: IUserPost;
  response?: {
    status: number;
  };
}

export default class PostsService {
  static async getPosts(limit?: number, skip?: number) {
    return $api.get(`/posts?skip=${skip}&limit=${limit}`);
  }

  static async addPosts(body: IPostData) {
    return $api.post<IAuthResponse>('/posts', { body });
  }

  static async addUserPosts(body: IPostData) {
    return $api.put<IAuthResponse>('/users/add-post', { body });
  }

  static async likePost(id: string): Promise<AxiosResponse<ILikesPost>> {
    return $api.post<ILikesPost>(`/posts/${id}/likes`);
  }

  static async removeLikePost(idPost: string, idLike: string) {
    return $api.delete(`/posts/${idPost}/likes/${idLike}`);
  }

  static async getPost(id: string) {
    return $api.get(`/posts/${id}`);
  }

  static async addFile(file: string) {
    return $api.put(`/posts/add-file`, { file });
  }
}
