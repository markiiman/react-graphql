import { users } from "./data.js";

const resolvers = {
  Query: {
    getUsers: () => {
      return users;
    },
    getUserById: (_, { id }) => {
      return users.find((user) => user.id === parseInt(id));
    },
  },
  Mutation: {
    createUser: (_, { name, age, isMarried }) => {
      const id = (users.length + 1).toString();
      const newUser = { id, name, age, isMarried };
      users.push(newUser);

      return newUser;
    },
  },
};

export default resolvers;
