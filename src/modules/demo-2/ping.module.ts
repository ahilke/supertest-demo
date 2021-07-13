import { Module } from "@nestjs/common";
import { CallHomeService } from "../demo-2/call-home.service";
import { PingController } from "./ping.controller";

@Module({
    imports: [],
    controllers: [PingController],
    providers: [CallHomeService],
})
export class PingModule {}
