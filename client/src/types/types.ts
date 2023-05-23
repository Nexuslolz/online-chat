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
  age: string;
  city: string;
}

export interface IUserPost {
  body: string;
  user: string;
  username: string;
  likes: ILikes[];
  createdDate: string;
  _id: string;
  image: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  body?: IUserBody;
  posts?: IUserPost[];
  isError?: boolean;
  friends: string[];
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
  _id: string;
  body: { city: string; age: string };
  createdDate: string;
  birth: string;
}

export interface IPostData {
  content: string;
  image: string;
}

export interface IData {
  body: string;
  createdDate: string;
  likes: ILikes[];
  _id: string;
  username: string;
  image: string;
  user?: string;
}
