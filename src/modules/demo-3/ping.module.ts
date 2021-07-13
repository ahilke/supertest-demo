import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { CallHomeService } from "./call-home.service";
import { PingController } from "./ping.controller";
import { ResponseFormatterInterceptor } from "./response-formatter.interceptor";

@Module({
    imports: [],
    controllers: [PingController],
    providers: [CallHomeService, { provide: APP_INTERCEPTOR, useClass: ResponseFormatterInterceptor }],
})
export class PingModule {}
