import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const PageParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const page: number = parseInt(request.query.page) || 1;
    const limit: number = parseInt(request.query.limit) || 0;
    const skip: number = (page - 1) * limit;
    return {
      take: limit,
      skip,
      page
    };
  }
)

export const PageParamQuery = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const page: number = parseInt(request.query.page) || 1;
    const limit: number = parseInt(request.query.limit) || 1;
    const offset = (page - 1) * limit;
    return {
      limit,
      offset,
      page,
    };
  }
);