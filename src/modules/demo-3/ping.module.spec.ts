import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as request from "supertest";
import { CallHomeService, ConnectionError } from "./call-home.service";
import { PingModule } from "./ping.module";

/**
 * What went wrong?
 *
 * Here we use an interceptor to transform the response body, but its implementation is faulty.
 * NestJS has many ways to interact with requests and responses outside of controller functions
 * (various decorators, interceptors, pipes, filters and more), which can combine to a complex system.
 * SuperTest helps you to ensure correct behavior in such a complex system.
 *
 * Writing tests this way also makes them more robust against changes of implementation details.
 * For example, when moving functionality between controllers and middlewares, these integration
 * tests do not need to be changed.
 */
describe("Ping Controller Integration Test", () => {
    let testApplication: INestApplication;
    let callHomeService: CallHomeService;

    beforeAll(async () => {
        testApplication = await createTestApplication();
        callHomeService = testApplication.get(CallHomeService);
    });

    afterAll(async () => {
        await testApplication.close();
    });

    test("Call-Home Service success", async () => {
        jest.spyOn(callHomeService, "callHome").mockResolvedValue("Hi there :)");

        await request(testApplication.getHttpServer()).get("/demo-3/ping").expect(200, {
            answer: "Hi there :)",
        });
    });

    test("Call-Home Service error", async () => {
        jest.spyOn(callHomeService, "callHome").mockRejectedValue(new ConnectionError("Nobody's home :(", 400));

        await request(testApplication.getHttpServer()).get("/demo-3/ping").expect(400, {
            statusCode: 400,
            message: "Nobody's home :(",
        });
    });

    async function createTestApplication(): Promise<INestApplication> {
        const testModule = await Test.createTestingModule({
            imports: [PingModule],
        }).compile();

        return testModule.createNestApplication().init();
    }
});
