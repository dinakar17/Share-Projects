export type signInDetails = {
  email: string;
  password: string;
};

export type signUpDetails = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type Details = {
  title: string;
  category: string;
  description: string;
  image: string;
  github: string;
};

export interface SearchQuery{
  search: String;
  tags: String;
}
