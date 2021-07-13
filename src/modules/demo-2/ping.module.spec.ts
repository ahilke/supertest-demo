import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as request from "supertest";
import { CallHomeService, ConnectionError } from "./call-home.service";
import { PingModule } from "./ping.module";

/**
 * What went wrong?
 *
 * In our module definition, we forgot to add `PongController` to the `controller` array!
 * The application boots up fine, but our `/pong` route is not loaded and thus not accessible.
 * The unit test passes, because it uses its own (test) module definition.
 *
 * SuperTest allows you to test your module definitions, giving you more confidence!
 * This also makes the tests easier to write, since you can use the existing module definition.
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

        await request(testApplication.getHttpServer()).get("/demo-2/ping").expect(200, {
            answer: "Hi there :)",
        });
    });

    test("Call-Home Service error", async () => {
        jest.spyOn(callHomeService, "callHome").mockRejectedValue(new ConnectionError("Nobody's home :(", 400));

        await request(testApplication.getHttpServer()).get("/demo-2/ping").expect(400, {
            statusCode: 400,
            message: "Nobody's home :(",
        });
    });

    test("Pong", async () => {
        await request(testApplication.getHttpServer()).get("/demo-2/pong").expect(200, {
            ping: "pong",
        });
    });

    async function createTestApplication(): Promise<INestApplication> {
        const testModule = await Test.createTestingModule({
            imports: [PingModule],
        }).compile();

        return testModule.createNestApplication().init();
    }
});
