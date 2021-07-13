import { HttpException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { Response } from "express";
import { CallHomeService, ConnectionError } from "./call-home.service";
import { PingController } from "./ping.controller";

describe("Ping Controller Unit Test", () => {
    const response = { json: jest.fn(), status: jest.fn(), send: jest.fn() } as unknown as Response;

    let pingController: PingController;
    let callHomeService: CallHomeService;
    beforeAll(async () => {
        const testModule: TestingModule = await Test.createTestingModule({
            controllers: [PingController],
            providers: [CallHomeService],
        }).compile();

        pingController = testModule.get(PingController);
        callHomeService = testModule.get(CallHomeService);
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("Call-Home Service success", async () => {
        jest.spyOn(callHomeService, "callHome").mockResolvedValue("Hi there :)");

        await pingController.ping(response);

        expect(callHomeService.callHome).toHaveBeenCalled();
        expect(response.json).toHaveBeenCalledWith({ answer: "Hi there :)" });
    });

    test("Call-Home Service error", async () => {
        jest.spyOn(callHomeService, "callHome").mockRejectedValue(new ConnectionError("Nobody's home :(", 400));

        expect(pingController.ping(response)).rejects.toBeInstanceOf(HttpException);
        expect(response.json).not.toHaveBeenCalled();
    });
});
