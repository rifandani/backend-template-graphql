import { PrismaClient, User } from '@prisma/client';

interface ArgsProps {
  id: string;
}

interface ContextProps {
  prisma: PrismaClient;
}

const getUsers = (
  _parent: unknown,
  _args: unknown,
  context: ContextProps
): Promise<User[]> => {
  return context.prisma.user.findMany();
};

const getUser = (
  _parent: unknown,
  args: ArgsProps,
  context: ContextProps
): Promise<User | null> => {
  return context.prisma.user.findUnique({
    where: { id: args.id },
  });
};

const Query = {
  getUsers,
  getUser,
};

export default Query;
