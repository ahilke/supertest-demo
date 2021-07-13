import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";

@Controller("demo-2")
export class PongController {
    @Get("pong")
    public pong(@Res() response: Response<{ ping: string }>) {
        response.json({ ping: "pong" });
    }
}
