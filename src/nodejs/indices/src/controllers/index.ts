/**
 * Index Controller.
 */

import express from 'express';

import MovieReadRepo from "../models/repo";

export class IndexController {
    private repo: MovieReadRepo;

    constructor() {
        this.repo = new MovieReadRepo();
    }

    /**
     * Return all movie indices from Mongodb. This will not scale for large datasets.
     * @param req Request
     * @param res Response
     * @param next Next Function
     */
    public async findAllIndices(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            this.repo.findAllIndices().then((value: any) => {
                res.status(200).json(value);
            }).catch(next);
        } catch (error) {
            next(error);
        }
    }
}
