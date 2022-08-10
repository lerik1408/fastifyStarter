import z from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';
import { FastifySchema } from 'fastify';

import { ZodSharedSchemas } from '../../libs';

export namespace AuthValidatorSchemas {
    export namespace SignUp {
      const requestBody = z.object({
        name: ZodSharedSchemas.EntitiesSchemas.userSchemas.name,
        email: ZodSharedSchemas.EntitiesSchemas.userSchemas.email,
        password: ZodSharedSchemas.EntitiesComponents.password,
      });

      export type RequestBody = z.infer<typeof requestBody>

      const response = z.object({
        ...ZodSharedSchemas.EntitiesSchemas.userSchemas,
        profile: z.object({
          ...ZodSharedSchemas.OutputSchemas.profileForResponseSchema,
        }),
      });

      const requestBodyJSONSchema = zodToJsonSchema(requestBody);
      const responseJSONSchema = zodToJsonSchema(response);

      export const schema: FastifySchema = {
        body: requestBodyJSONSchema,
        response: {
          201: responseJSONSchema,
        },
      };
  }
    export namespace SignIn {
      const requestBody = z.object({
        email: ZodSharedSchemas.EntitiesSchemas.userSchemas.email,
        password: ZodSharedSchemas.EntitiesComponents.password,
      });

      export type RequestBody = z.infer<typeof requestBody>

      const response = z.object({
        ...ZodSharedSchemas.EntitiesSchemas.userSchemas,
        ...ZodSharedSchemas.EntitiesSchemas.userAuthSchema,
      });

      const requestBodyJSONSchema = zodToJsonSchema(requestBody);
      const responseJSONSchema = zodToJsonSchema(response);

      export const schema: FastifySchema = {
        body: requestBodyJSONSchema,
        response: {
          200: responseJSONSchema,
        },
      };
    }
}
