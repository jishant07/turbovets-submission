import { DataSource } from 'typeorm';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isProd = process.env.NODE_ENV === 'production';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: +(process.env.DB_PORT || 5432),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'ABCD@123',
  database: process.env.DB_NAME || 'turbovets',
  entities: [
    join(__dirname, 'entities', '*.entity.{ts,js}')
  ],
  migrations: [
    `src/migrations/**/*.${isProd ? 'js' : 'ts'}`
  ],
  synchronize: false,
  logging: !isProd,
});