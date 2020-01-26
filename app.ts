import { Fort, MustacheViewEngine } from 'fortjs';
import { routes } from './routes';
import { ApiController } from './controllers/ApiController';
import { DefaultController } from './controllers/default_controller';
import { CrosWall } from './wall/CrosWall';




export class App extends Fort {
    constructor() {
        super();
        this.routes = routes;
        this.viewEngine = MustacheViewEngine;
        this.walls = [CrosWall]
        this.routes = [
        {
            path: "/*",
            controller: DefaultController
        },
        {
            controller: ApiController,
            path:"/api"
        },
    
    ]
    }
}


