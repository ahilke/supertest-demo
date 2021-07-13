import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as request from "supertest";
import { CallHomeService, ConnectionError } from "./call-home.service";
import { PingModule } from "./ping.module";

/**
 * What went wrong?
 *
 * In the controller, we expect any error thrown to have a property `statusCode`, but `ConnectionError` has no
 * such property (it does have `code` though). Thus, our controller returns the HTTP code 200 instead of 400,
 * but we cannot easily catch that in our unit test as the HTTP code is determined externally by NestJS.
 *
 * A big advantage of SuperTest is that you test what is actually returned on the API, no matter how it is produced.
 * Note that it is much easier to understand what is returned in the error case than in the unit test.
 * In this way, this test acts as a sort of living documentation.
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

        await request(testApplication.getHttpServer()).get("/demo-1/ping").expect(200, {
            answer: "Hi there :)",
        });
    });

    test("Call-Home Service error", async () => {
        jest.spyOn(callHomeService, "callHome").mockRejectedValue(new ConnectionError("Nobody's home :(", 400));

        await request(testApplication.getHttpServer()).get("/demo-1/ping").expect(400, {
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
