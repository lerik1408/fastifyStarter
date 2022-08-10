import {
  createHmac,
} from 'node:crypto';
import {
  User,
  Profile,
} from 'prisma/prisma-client';

import jwt from 'jsonwebtoken';

import { appConfig } from '../../configs/appConfig';
import { BaseRepository } from './base.repository';
import { DataBaseTypes, Authentication } from '../../types';

interface IRetrieveByIdPayload {
  id: number;
}

interface IGetListPayload {
  orderBy: DataBaseTypes.OrderByType
}

interface ICreateUserPayload {
  name: string,
  email: string,
  password: string,
}

interface IRetrieveByEmail {
  email: string,
}

interface IRetrieveByEmailAndPasswordPayload extends IRetrieveByEmail {
  password: string,
}

class UserRepository extends BaseRepository {
  private generatePasswordHash(password: string): string {
    const hash = createHmac('sha256', appConfig.USER_PASSWORD_SECRET)
      .update(password)
      .digest('hex');

    return hash;
  }

  public async retrieveById(payload: IRetrieveByIdPayload) {
    const user = this.connections.user.findUnique({
      where: {
        id: payload.id,
      },
      include: {
        profile: true,
      },
    });
    return user;
  }

  public async getList(payload: IGetListPayload) {
    const users = this.connections.user.findMany({
      orderBy: {
        id: payload.orderBy,
      },
      include: {
        profile: true,
      },
    });
    return users;
  }

  public async create(payload: ICreateUserPayload) {
    const user = this.connections.user.create({
      include: {
        profile: true,
      },
      data: {
        name: payload.name,
        email: payload.email,
        password: this.generatePasswordHash(payload.password),
        profile: {
          create: {
            bio: null,
          },
        },
      },
    });

    return user;
  }

  public async retrieveByEmailAndPassword(payload: IRetrieveByEmailAndPasswordPayload) {
    const user = this.connections.user.findFirst({
      where: {
        email: payload.email,
        password: this.generatePasswordHash(payload.password),
      },
    });

    return user;
  }

  public async retrieveByEmail(payload: IRetrieveByEmail) {
    const user = this.connections.user.findFirst({
      where: {
        email: payload.email,
      },
    });

    return user;
  }

  static beautifyInfo(users: Array<User>) {
    const response = users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    });

    return response;
  }

  static beautifyForResponse(users: Array<User & { profile: Profile | null}>) {
    const response = users.map((user) => {
      const baseUserInfo = UserRepository.beautifyInfo([user]);
      return {
        ...baseUserInfo[0],
        profile: {
          bio: user.profile?.bio,
        },
      };
    });

    return response;
  }

  static retrieveAuthenticationInfo(user: User) {
    const jwtPayload: Authentication.UserJWTPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const accessToken = jwt.sign(jwtPayload, appConfig.TOKEN_SECRET);

    return {
      tokens: {
        accessToken,
      },
    };
  }
}

export { UserRepository };
