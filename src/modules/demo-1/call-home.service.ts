import { Injectable, HttpStatus } from "@nestjs/common";
import { sample } from "lodash";

/**
 * A service that can fail randomly based on external factors.
 */
@Injectable()
export class CallHomeService {
    public async callHome() {
        if (sample([true, false])) {
            return "Hi there :)";
        } else {
            throw new ConnectionError("Nobody's home :(", 400);
        }
    }
}

export class ConnectionError extends Error {
    public constructor(public message: string, public code?: HttpStatus) {
        super(message);
    }
}
