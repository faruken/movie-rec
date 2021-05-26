/**
 * Application exception.
 */

class ApplicationException extends Error {
    public name: string;
    public status: number;

    constructor(name: string, status: number, message: string) {
        super(message);
        this.name = name;
        this.status = status;
    }

    public toString(): string {
        return `${this.status} => ${this.message}`;
    }
}

export default ApplicationException;
