import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';

export const ActiveUserId = createParamDecorator<undefined>(
  (data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const userID = request.userID;

    if (!userID) {
      throw new UnauthorizedException();
    }

    return userID;
  },
);
