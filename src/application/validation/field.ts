import {z} from 'zod'
import { BadRequest } from '../errors/http';

export function validateFields<T>(schema: z.ZodSchema, data: T): T {
    try {
        return schema.parse(data)
    } catch (error: any) {
        const errors = error.errors.map((error: {message: string}) => error.message)
        throw new BadRequest(errors)
    }
}