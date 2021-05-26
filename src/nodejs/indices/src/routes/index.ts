/**
 * Index router.
 */

import { IndexController } from "../controllers/index";
import { Router } from "express";

export class IndexRoute {
    private api: Router = Router();
    private readonly controller: IndexController;

    constructor() {
        this.controller = new IndexController();
        this.routes();
    }

    public getAPI(): Router {
        return this.api;
    }

    private routes(): void {
        this.api.get("/", this.controller.findAllIndices.bind(this.controller));
    }
}
