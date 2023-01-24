import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

// Each e2e test should test a given module in isolation from the others,
// we should import a specific module and test it from a e2e perspective
describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    // beforeAll because we don't want to recreate the application for each test
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // by importing AppModule we create a FULL application, including DB connections and all controllers, services, etc
    }).compile();

    app = moduleFixture.createNestApplication(); // reference of an entire nest application
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .set('Authorization', process.env.API_KEY) // set header, needed because of the api-key global guard we're using
      .expect(200)
      .expect('Hello World!');
  });

  afterAll(async () => {
    await app.close();
  });
});
