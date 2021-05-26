/**
 * Movie interface.
 */

import { Document } from "mongoose";

export interface IMovie extends Document {
    title: string;
    count: number;
}

export default IMovie;
