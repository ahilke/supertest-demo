import { Controller, Get, HttpException, Res } from "@nestjs/common";
import { CallHomeService } from "./call-home.service";
import { Response } from "express";

@Controller("demo-1")
export class PingController {
    public constructor(private callHomeService: CallHomeService) {}

    @Get("ping")
    public async ping(@Res() response: Response<{ answer: string }>) {
        try {
            const answer = await this.callHomeService.callHome();
            response.json({ answer });
        } catch (error) {
            throw new HttpException(error.message, error.statusCode);
        }
    }
}
