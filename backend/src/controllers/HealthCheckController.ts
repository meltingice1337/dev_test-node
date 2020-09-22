import { controller, httpGet } from "inversify-express-utils";

@controller("/healthcheck")
export class HealthCheckController {
    @httpGet('/')
    public async index() {
        return true;
    }
}