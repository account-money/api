export type Login = {
    email: string
    password: string
}


export interface ILogin {
    login: (data: Login) => Promise<string>
}
