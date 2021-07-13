import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PingModule } from "./modules/demo-1/ping.module";

@Module({
    imports: [ConfigModule.forRoot(), PingModule],
    providers: [],
})
export class AppModule {}
