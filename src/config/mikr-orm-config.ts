import { __mongodb_uri__, __mongodb_db_name__ } from 'src/constants';
import { Options } from '@mikro-orm/core';
import { Attractions, Hotel } from 'src/modules/attractions/attractions.entity';

export const mikroORMConfig = (options?: Options): Options => ({
  type: 'mongo',
  clientUrl: __mongodb_uri__,
  dbName: __mongodb_db_name__,
  validate: true,
  // strict: true,
  debug: true,
  discovery: { disableDynamicFileAccess: true },
  entities: [Attractions, Hotel],
  ...options,
});
