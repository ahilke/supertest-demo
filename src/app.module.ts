import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PingModule as Demo1 } from "./modules/demo-1/ping.module";
import { PingModule as Demo2 } from "./modules/demo-2/ping.module";

@Module({
    imports: [ConfigModule.forRoot(), Demo1, Demo2],
    providers: [],
})
export class AppModule {}
