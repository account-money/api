export class BadRequest extends Error{
    private readonly _status = 400

    constructor(private readonly _errors: string[] | string){
        super('Bad Request')
    }
    public get errors(): string[] | string {
        return this._errors;
    }

    public get status() {
        return this._status;
    }
}

export class Forbbiden extends Error{
    private readonly _status = 404;
    

    constructor(private readonly _error: string){
        super('Acess Denied')
    }

    public get error(): string {
        return this._error;
    }

    public get status() {
        return this._status;
    }
}

export class ServerError extends Error{
    
    constructor(){
        super('Server error. Try again later.')
    }
}