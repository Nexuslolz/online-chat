export interface IPages {
  name: string;
  route: string;
}

export interface ILikes {
  user: string;
  _id: string;
}

export interface IUseInput {
  value: string;
  isValid: boolean;
  isDirty: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  clear: () => void;
}

export interface IUserBody {
  about: string;
  education: string;
  hobby: string;
}

export interface IUserPost {
  body: string;
  user: string;
  username: string;
  likes: ILikes[];
  createdDate: string;
  _id: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  body?: IUserBody;
  posts?: IUserPost[];
}

export interface IAuthResponse {
  action: string;
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface IIndexedStr {
  [key: string]: string;
}

export interface IFriendItem {
  name: string;
  id: string;
}
