import { PrismaClient } from '@prisma/client';

import prismaConnections from '../connections';

abstract class BaseRepository {
  protected connections: PrismaClient;

  constructor() {
    this.connections = prismaConnections;
  }

  abstract retrieveById(id: object): Promise<any | null>;

  abstract getList(payload: object): Promise<any[]>;

  abstract create(payload: object): Promise<any>;

  // abstract update(payload: object): Promise<BaseSchema>;

  // abstract remove(payload: object): Promise<void>;
}

export { BaseRepository };
