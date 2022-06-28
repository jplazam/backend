require("dotenv").config();

const config = {
  default: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST || "127.0.0.1",
  },
  development: {
    dialect: process.env.DB_DIALECT || "postgres",
  },
  test: {
    dialect: process.env.DB_DIALECT || "postgres",
  },
  production: {
    dialect: process.env.DB_DIALECT || "postgres",
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};

module.exports = config;
