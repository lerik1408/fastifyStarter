import { FastifyInstance } from 'fastify';

import { SharedErrorsSchemas, SharedModulesSchemas } from '../../../../components/shared/shared.validator.schemas';
import { extendZodSchemaWithId } from '../../..';

function initSchemas(instance: FastifyInstance, options: object, done: () => void) {
  instance.addSchema(extendZodSchemaWithId(SharedModulesSchemas.authUserSchemas, 'userAuth'));
  instance.addSchema(extendZodSchemaWithId(SharedModulesSchemas.userSchemas, 'user'));
  instance.addSchema(extendZodSchemaWithId(SharedModulesSchemas.profileSchema, 'profile'));
  instance.addSchema(extendZodSchemaWithId(SharedErrorsSchemas.customErrorJSONSchema, 'customError'));
  done();
}

const key = Symbol.for('skip-override');

initSchemas[key] = true;

export default initSchemas;
