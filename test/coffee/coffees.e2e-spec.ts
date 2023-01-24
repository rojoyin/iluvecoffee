import { INestApplication } from '@nestjs/common';

describe('[Feature] Coffees - /coffees', () => {
  let app: INestApplication;
  beforeAll(async () => {
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });
});