import {z} from 'zod'
import { BadRequest } from '../errors/http';

export function validateFields<T>(schema: z.ZodSchema, data: T): T {
    try {
        const teste = schema.parse(data)
        return teste
    } catch (error: any) {
        const errors = error.errors.map((error: {message: string, path: string[]}) => ({message: error.message, path: error.path}))
        throw new BadRequest(errors)
    }
}