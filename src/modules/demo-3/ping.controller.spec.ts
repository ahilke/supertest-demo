import { HttpException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { CallHomeService, ConnectionError } from "./call-home.service";
import { PingController } from "./ping.controller";

describe("Ping Controller Unit Test", () => {
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

        const responseBody = await pingController.ping();

        expect(callHomeService.callHome).toHaveBeenCalled();
        expect(responseBody).toStrictEqual({ answer: "Hi there :)" });
    });

    test("Call-Home Service error", async () => {
        jest.spyOn(callHomeService, "callHome").mockRejectedValue(new ConnectionError("Nobody's home :(", 400));

        expect(pingController.ping()).rejects.toBeInstanceOf(HttpException);
    });
});
