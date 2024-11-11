const database: Express.User[] = [
  {
    id: 1,
    name: "Jimmy Smith",
    role: "admin",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
  },
  {
    id: 2,
    name: "Johnny Doe",
    role: "admin",
    email: "johnny123@gmail.com",
    password: "johnny123!",
  },
  {
    id: 3,
    name: "Jonathan Chen",
    role: "admin",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
  },
];

const userModel = {
  /* FIXED */
  findOne: (email: string) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    return null;
  },
  /* FIXED */
  findById: (id: number) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    return null;
  },
  findByGitHubId: (githubId: number) => {
    const user = database.find((user) => user.id === githubId);
    if (user) {
      return user;
    }
  },
  createUser: (user: any) => {
    user.id = database.length + 1;
    database.push(user);
    return user;
  },
};

export { database, userModel };
