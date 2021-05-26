import { Express } from "express";
import { IndexRoute } from "./routes/index";
import server from "./bootstrap/server";
import connect from "./bootstrap/db";

class Application {
    private readonly app: Express;
    private route: IndexRoute

    constructor() {
        this.app = server;
        this.route = new IndexRoute();
        this.routes();
        this.listen();
    }

    public getApp(): Express {
        return this.app;
    }

    private listen(): void {
        this.app.listen(3000, () => {console.log(`Started on :3000`);
        });
    }

    private routes(): void {
        this.app.use("/", this.route.getAPI());
    }
}

const db = ''
connect({db});
export default new Application().getApp();
