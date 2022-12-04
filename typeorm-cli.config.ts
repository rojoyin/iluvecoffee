import { DataSource } from 'typeorm';

console.log('>>>>>>>>>>>>>>>>>>>', __dirname);
export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: [__dirname + '/**/*.entity.{js,ts}'],
  migrations: [__dirname + '/src/database/migrations/*{.ts,.js}'],
});
