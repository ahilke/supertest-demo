import { Test, TestingModule } from "@nestjs/testing";
import { Response } from "express";
import { PongController } from "./pong.controller";

describe("Pong Controller Unit Test", () => {
    const response = { json: jest.fn(), status: jest.fn(), send: jest.fn() } as unknown as Response;

    let pongController: PongController;
    beforeAll(async () => {
        const testModule: TestingModule = await Test.createTestingModule({
            controllers: [PongController],
            providers: [],
        }).compile();

        pongController = testModule.get(PongController);
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("pong", () => {
        pongController.pong(response);

        expect(response.json).toHaveBeenCalledWith({ ping: "pong" });
    });
});
