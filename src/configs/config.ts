export const config = {
  port: Number(process.env.PORT) || 1337,
  mongoServer: process.env.MONGO_SERVER || "",
};
