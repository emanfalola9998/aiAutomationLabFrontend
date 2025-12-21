export type Blog = {
    id: string,
    title: string,
    content: string,
    image: string,
    tags: string,
    author: string,
    datePublished: string,
    likes: number
}

export type Comments = {
    blogId: string
    id: number,
    username: string,
    comment: string,
    timestamp: string,
    rating: number
}

export type CreateComment = { 
    [blogId: string]: {
        comment: string;
    };
}

export interface User {
  id: string;
  email: string;
  name: string;
  provider: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface SignUpData {
  email: string;
  password: string;
  name: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: LoginData) => Promise<void>;
  signUp: (data: SignUpData) => Promise<void>;
  googleLogin: (credential: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}