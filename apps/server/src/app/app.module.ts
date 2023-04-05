import { Module } from "@nestjs/common";
import { ServerFeatureTodoModule } from '@fst/server/feature-todo'

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [ServerFeatureTodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
