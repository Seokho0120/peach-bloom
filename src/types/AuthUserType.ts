export type AuthUser = {
  id: string | number;
  name: string;
  username: string;
  email: string;
  image?: string;
  isAdmin: boolean;
};
