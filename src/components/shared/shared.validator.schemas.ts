import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';
import { FastifySchema } from 'fastify';

import { ZodSharedSchemas } from '../../libs';

export namespace SharedControllerSchemas {
  export namespace Ping {
    const pingRequestBody = z.object({
      want: z.string().max(5).default('pong'),
    });

    const pingResponse = z.object({
      pong: z.string(),
    });

    export type PingRequestBody = z.infer<typeof pingRequestBody>;

    const pingRequestBodyJSONSchema = zodToJsonSchema(pingRequestBody);
    const pingResponseBodyJSONSchema = zodToJsonSchema(pingResponse);

    export const pingSchema: FastifySchema = {
      body: pingRequestBodyJSONSchema,
      response: {
        200: pingResponseBodyJSONSchema,
        400: { $ref: 'customError' },
      },
    };
  }
}

export namespace SharedErrorsSchemas {
  const customError = z.object({
    statusCode: z.number(),
    error: z.string(),
    message: z.string(),
  });

  export const customErrorJSONSchema = zodToJsonSchema(customError);
}

export namespace SharedModulesSchemas {
  const user = z.object(ZodSharedSchemas.EntitiesSchemas.userSchemas);
  const profile = z.object(ZodSharedSchemas.EntitiesSchemas.profileSchema);
  const authInfo = z.object(ZodSharedSchemas.EntitiesSchemas.userAuthSchema);

  export const userSchemas = zodToJsonSchema(user);
  export const profileSchema = zodToJsonSchema(profile);
  export const authUserSchemas = zodToJsonSchema(authInfo);
}
