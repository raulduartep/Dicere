module.exports = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  migrations: ['./src/infra/typeorm/migrations/*.ts'],
  cli: {
    migrationsDir: './src/infra/typeorm/migrations',
  },
  entities: ['./src/modules/**/entities/implementations/typeorm/*.ts'],
};
