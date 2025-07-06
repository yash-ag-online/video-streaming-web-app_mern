function required(key: string, fallback?: string): string {
  const value = process.env[key];
  if (!value && fallback === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value ?? fallback!;
}

const env = {
  Node_Env: required('NODE_ENV', 'development'),
  MongoDB_URI: required('MONGODB_URI'),
  DB_Name: required('DB_NAME'),
  Access_Token_Secret: required('ACCESS_TOKEN_SECRET'),
  Access_Token_Expires_In: required('ACCESS_TOKEN_EXPIRES_IN'),
  Refresh_Token_Secret: required('REFRESH_TOKEN_SECRET'),
  Refresh_Token_Expires_In: required('REFRESH_TOKEN_EXPIRES_IN'),
  Client_URLs: required('CLIENT_URLS')
    .split(',')
    .map((url) => url.trim()),
  Debug: required('DEBUG', 'app:development'),
  // Cloudinary_Cloud_Name: required('CLOUDINARY_CLOUD_NAME'),
  // Cloudinary_API_Key: required('CLOUDINARY_API_KEY'),
  // Cloudinary_Api_Secret: required('CLOUDINARY_API_SECRET'),
};

export default env;
