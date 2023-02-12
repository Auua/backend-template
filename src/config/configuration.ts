export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  jwtService: {
    secretKey: process.env.JWT_SECRET,
    secretRefreshKey: process.env.JWT_REFRESH_TOKEN,
  },
  cookie: process.env.COOKIE_SECRET,
});
