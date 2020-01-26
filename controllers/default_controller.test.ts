import { DefaultController } from "./default_controller";
import { viewResult, Fort } from "fortjs";
import { createApp } from "../index";

describe('DefaultController', () => {
    let app: Fort;
    let controller: DefaultController;
    beforeAll(async () => {
        app = await createApp();
        controller = new DefaultController();
    });

    it('index', async () => {
        controller.initialize();
       
    });

    afterAll(() => {
        return app.destroy();
    });
});