import { Controller, Get, HttpException, Res } from "@nestjs/common";
import { CallHomeService } from "./call-home.service";
import { Response } from "express";

@Controller("demo-3")
export class PingController {
    public constructor(private callHomeService: CallHomeService) {}

    @Get("ping")
    public async ping(): Promise<{ answer: string }> {
        try {
            const answer = await this.callHomeService.callHome();
            return { answer };
        } catch (error) {
            throw new HttpException(error.message ?? "An error occurred!", error.statusCode ?? 400);
        }
    }
}
