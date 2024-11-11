import { userModel } from "../models/userModel";
import { Profile } from "passport-github2";

const getUserByEmailIdAndPassword = (email: string, password: string) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id: number) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

const findUserByGitHubId = (githubId: number) => {
  return userModel.findByGitHubId(githubId);
};

const createUserFromGitHubProfile = (profile: Profile) => {
  const newUser = {
    id: profile.id,
    name: profile.displayName || profile.username || "Unknown",
    role: "admin",
    email: profile.emails ? profile.emails[0].value : "",
    password: "",
  };
  return userModel.createUser(newUser);
};

function isUserValid(user: Express.User, password: string): boolean {
  return user.password === password;
}

export {
  getUserByEmailIdAndPassword,
  getUserById,
  findUserByGitHubId,
  createUserFromGitHubProfile,
};
