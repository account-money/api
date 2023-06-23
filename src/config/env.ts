import 'dotenv/config'

export const env = {
    port: parseInt(process.env.API_PORT!),
    urlDB: process.env.DB_URL,
    main: process.env.MAIN!,
    salt: parseInt(process.env.BCRYPT_SALT!),
}