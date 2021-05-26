/**
 * Movie Exception.
 */

import ApplicationException from "./app_exception";

class MovieNotFoundException extends ApplicationException {
    constructor(context: string) {
        super("MovieNotFoundException", 404, "Cannot find indices");
    }
}

export default MovieNotFoundException;
