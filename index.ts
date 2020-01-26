import { App } from "./app";
import * as path from "path";
import "reflect-metadata";
import {createConnection} from "typeorm";
import {UService} from "./entity/UService";
import { USlider } from "./entity/USlider";
import { PageOptions } from "./entity/PageOptions";
import { UQuestion } from "./entity/UQuestion";

export const createApp = async () => {
    const app = new App();
    await app.create({
        folders: [{
            alias: "/",
            path: path.join(__dirname, "../static")
        }]
    });
    process.env.APP_URL = "http://localhost:4000";
    return app;
};
if (process.env.NODE_ENV !== "test") {
    createApp().then((app) => {
        app.logger.debug(`Your fort is located at address - ${process.env.APP_URL}`);
    }).catch(err => {
        console.error(err);
    });
}

 
createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "db user",
    password: "db password",
    database: "db name",
    entities: [
        UService,
        USlider,
        PageOptions,
        UQuestion 
    ],
    synchronize: true,
    logging: false
}).then(connection => { 
}).catch(error => console.log(error));
