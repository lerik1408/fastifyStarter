import z, { TypeOf } from 'zod';
import { InputEnums } from '../../types';

export namespace ZodSharedSchemas {
  export namespace EntitiesComponents {
    // Each entity mast contains this id
    // Because we can switch type. id -> uuid
    export const id = z.number();
    // System can have different password and different validation.
    export const password = z.string().min(3);
  }

  export namespace EntitiesSchemas {
    export const userSchemas = {
      id: EntitiesComponents.id,
      name: z.string().min(1, { message: 'Must be 1 or more characters long' }),
      email: z.string().email(),
    };

    export const profileSchema = {
      id: EntitiesComponents.id,
      bio: z.string().nullable(),
    };

    export const userAuthSchema = {
      tokens: z.object({
        accessToken: z.string(),
      }),
    };
  }

  export namespace OutputSchemas {
    export const profileForResponseSchema = {
      bio: EntitiesSchemas.profileSchema.bio,
    };
  }

  export namespace InputSchemas {
    export const orderBy = z.nativeEnum(InputEnums.OrderByType);
  }
}
