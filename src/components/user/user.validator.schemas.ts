import z from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';
import { FastifySchema } from 'fastify';

import { InputEnums } from '../../types';
import { ZodSharedSchemas } from '../../libs';

export namespace UserValidatorSchemas {
  export namespace ListUsers {
    const requestQuery = z.object({
      orderBy: ZodSharedSchemas.InputSchemas.orderBy.default(InputEnums.OrderByType.asc),
    });

    export type RequestQueryType = z.infer<typeof requestQuery>

    const response = z.array(
      z.object({
        ...ZodSharedSchemas.EntitiesSchemas.userSchemas,
        profile: z.object({
          ...ZodSharedSchemas.OutputSchemas.profileForResponseSchema,
        }),
      }),
    );

    const requestQueryJSONSchema = zodToJsonSchema(requestQuery);
    const responseJSONSchema = zodToJsonSchema(response);

    export const schema: FastifySchema = {
      querystring: requestQueryJSONSchema,
      response: {
        200: responseJSONSchema,
        401: { $ref: 'customError' },
      },
    };
  }

  export namespace RetrieveUserById {
    const requestParams = z.object({
      userId: z.number(),
    }).required();

    export type RequestParamsType = z.infer<typeof requestParams>

    const response = z.object({
      ...ZodSharedSchemas.EntitiesSchemas.userSchemas,
      profile: z.object({
        ...ZodSharedSchemas.OutputSchemas.profileForResponseSchema,
      }),
    });

    const requestParamsJSONSchema = zodToJsonSchema(requestParams);
    const responseJSONSchema = zodToJsonSchema(response);

    export const schema: FastifySchema = {
      params: requestParamsJSONSchema,
      response: {
        200: responseJSONSchema,
      },
    };
  }

    export namespace CreateUser {
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
}
