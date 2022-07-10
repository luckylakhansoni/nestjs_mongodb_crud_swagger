import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";

import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Constants } from "./helper/constant/constant";
import { ResponseHandlerInterceptor } from "./helper/response-handler.interceptor";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

const logger = new Logger("Main", true);

(async () => {
  // HTTP Server
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger: console,
    }
  );

  const cors = {
    origin: true,
  };

  app.enableCors(cors);
  app.setGlobalPrefix(Constants.API_BASE_PATH);

  const options = new DocumentBuilder()
    .setTitle(Constants.SWAGGER_API_NAME)
    .setDescription(Constants.SWAGGER_API_DESCRIPTION)
    .setVersion(Constants.SWAGGER_API_CURRENT_VERSION)
    .setBasePath(Constants.SWAGGER_API_BASE_PATH)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(Constants.SWAGGER_API_ROOT, app, document);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseHandlerInterceptor());
  await app.listen(9000, Constants.PORT_ADDRESS);
})();
