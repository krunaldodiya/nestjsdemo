import { getUserFromToken } from './getUserFromToken';

export const context = async (ctx: any) => {
  let token;

  if (ctx.connection) {
    token = ctx.connection.context['Authorization']
      ? ctx.connection.context['Authorization'].slice(7)
      : null;
  } else {
    token = ctx.req.headers['authorization']
      ? ctx.req.headers['authorization'].slice(7)
      : null;
  }

  const user = await getUserFromToken(token);

  return {
    ...ctx,
    user,
  };
};
