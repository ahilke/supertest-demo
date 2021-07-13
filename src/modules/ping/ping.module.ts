import { Module } from "@nestjs/common";
import { PingController } from "./ping.controller";

@Module({
    imports: [],
    controllers: [PingController],
})
export class PingModule {}
