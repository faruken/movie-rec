/**
 * Movie model.
 */

import { Schema, model} from "mongoose";
import { IMovie } from "./imovie";

const Movie: Schema = new Schema({
    title: {
        type: String,
        unique: true
    },
    count: {
        type: Number,
    }
}, { strict: "throw"});

export default model<IMovie>("indices", Movie);
