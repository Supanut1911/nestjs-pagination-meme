import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin'
import 'dotenv/config'
import { database } from 'firebase-admin';

//export GOOGLE_APPLICATION_CREDENTIALS = "/Users/x/Desktop/nest/nestjs-pagination-type-orm/e-la-ff65c-firebase-adminsdk-3brl6-29aac8f07d.json"

async function bootstrap() {

  if(!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        clientEmail: process.env.client_email,
        privateKey: process.env.private_key.replace(/\\n/g, '\n'),
        projectId: process.env.project_id
      }),
      databaseURL: 'gs://e-la-ff65c.appspot.com'
    })
  }

  console.log(admin.SDK_VERSION, "app");

  const app = await NestFactory.create(AppModule);
  app.enableCors()
  await app.listen(7777);
}
bootstrap();
