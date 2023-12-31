import { z } from 'zod'
import { routeSchema } from '../../../lib/routeSchema'
import {
  createAppErrorSchema,
  createAppErrorSchemas,
} from '../../../lib/AppError'
import { UserSchema } from '../../../schema/userSchema'

export const RegisterAuthBody = z.object({
  username: z.string(),
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email(),
  password: z.string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string',
  }),
})

export const LoginBody = RegisterAuthBody.omit({ username: true })

const TokensSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
})

const AuthResult = z.object({
  tokens: TokensSchema,
  user: UserSchema,
})

export const registerSchema = routeSchema({
  tags: ['auth'],
  body: RegisterAuthBody,
  response: {
    200: AuthResult,
    409: createAppErrorSchema({
      name: 'UserExistsError',
      message: 'User already exists',
      statusCode: 409,
    }),
  },
})

export const loginSchema = routeSchema({
  tags: ['auth'],
  body: LoginBody,
  response: {
    200: AuthResult,
    401: createAppErrorSchemas([
      {
        name: 'AuthenticationError',
        message: 'Authentication failed',
        statusCode: 401,
      },
      {
        name: 'TokenExpiredError',
        message: 'Token expired',
        statusCode: 401,
      },
    ]),
  },
})

export const refreshTokenSchema = z.object({
  body: z.object({
    refreshToken: z.string(),
  }),
})
