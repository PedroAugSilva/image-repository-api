export interface AuthenticationUserPayload {
  accessToken: string;
  user: {
    name: string;
    uuid: string;
    email: string;
    photo?: string;
  };
}
