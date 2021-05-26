/**
 * Movie repo.
 */

import MovieNotFoundException from "../exceptions/movie_exception";
import IMovie from "./imovie";
import movie from "./movie";

class MovieReadRepo {
    /**
     * Find all movie indices (movie title and counter).
     * @returns All movie indices
     */
    public async findAllIndices(): Promise<IMovie[]> {
        const value = await movie
            .find()
            .exec();
        if (value === null) {
            throw new MovieNotFoundException("There are no indices");
        }
        return value;
    }
}

export default MovieReadRepo;
