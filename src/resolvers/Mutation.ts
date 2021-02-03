import { PrismaClient, User } from '@prisma/client';

interface ContextProps {
  prisma: PrismaClient;
}

interface AddUserArgs {
  name: string;
  age: number;
}

interface DeleteUserArgs {
  id: string;
}

const addUser = (
  _parent: unknown,
  args: AddUserArgs,
  context: ContextProps
): Promise<User> => {
  return context.prisma.user.create({
    data: {
      name: args.name,
      age: args.age,
    },
  });
};

const deleteUser = (
  _parent: unknown,
  args: DeleteUserArgs,
  context: ContextProps
): Promise<User> => {
  return context.prisma.user.delete({
    where: { id: args.id },
  });
};

const Mutation = {
  addUser,
  deleteUser,
};

export default Mutation;
