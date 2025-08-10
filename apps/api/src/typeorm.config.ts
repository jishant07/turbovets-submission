import { DataSource } from 'typeorm';

const isProd = process.env.NODE_ENV === 'production';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: +(process.env.DB_PORT || 5432),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'ABCD@123',
  database: process.env.DB_NAME || 'turbovets',
  // entities: ['src/entities/**/*.entity.{ts,js}'],
  // migrations: ['src/migrations/**/*.{ts,js}'],
  entities: ['libs/data/src/lib/entities/**/*.entity.{ts,js}'],
  migrations: ['libs/data/src/lib/migrations/**/*.{ts,js}'],
  synchronize: false,
  logging: !isProd,
});