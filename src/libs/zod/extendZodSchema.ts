// import zod, { ZodSchema } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

// type customJsonSchema = ReturnType<typeof zodToJsonSchema>;

export const extendZodSchemaWithId = <T extends object>(schema: T, id: string): T & { $id: string } => {
  const link: T & { $id: string } = {
    $id: id,
    ...schema,
  };

  return link;
};
