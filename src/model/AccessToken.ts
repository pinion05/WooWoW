export default interface AccessToken {
  access_token: string;
  token_type: "bearer";
  expires_in: number;
  sub: string;
}
