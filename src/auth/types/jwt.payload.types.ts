type JwtPayload = {
  email: string;
  name: string;
  sub: string;
};

type JwtPayloadWithRefreshToken = JwtPayload & { refreshToken: string };
