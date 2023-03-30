export const projectConfig = {
  BASE_URL: process.env.BASE_URL,
  ENV: process.env.NODE_ENV,
  JWT: {
    secret: process.env.JWT_SECRET,
  },
  DB: {
    MongoURL: process.env.MONGODB_URL,
  },
  STRIPE: {
    //  "pk_test_51Lv1JPByzAsF6qVaGrVyT6XijgRvGqFrBDfu5AzCQtv99BuTFykAh9ZUIjTsrXBYPIfd88V6OT2m3PIgApJuOTAo00qpsi6Y4n",
    public_key: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
    secret_key: process.env.STRIPE_SECRET_KEY,
    webhook_secret: process.env.STRIPE_SUCCESS_WEBHOOK_SECRET,
  },
  SMTP: {
    user: process.env.SMTP_USER,
    server: process.env.SMTP_SERVER,
    port: process.env.SMTP_PORT,
    pwd: process.env.SMTP_PASSWORD,
    email: process.env.EMAIL_FROM,
  },
  CLOUDINARY: {
    name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
};
