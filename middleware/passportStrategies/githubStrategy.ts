import { Strategy as GitHubStrategy, Profile } from "passport-github2";
import { PassportStrategy } from "../../interfaces/index";
import {
  findUserByGitHubId,
  createUserFromGitHubProfile,
} from "../../controllers/userController";
import dotenv from "dotenv";
import { Request } from "express";

dotenv.config();

const githubStrategy = new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID || "",
    clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    callbackURL: process.env.GITHUB_CALLBACK_URL || "",
    passReqToCallback: true,
  },

  /* FIXED */
  async (
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: Express.User | false) => void
  ) => {
    let user = findUserByGitHubId(Number(profile.id));
    if (!user) {
      user = await createUserFromGitHubProfile(profile);
    }
    return done(null, user);
  }
);

const passportGitHubStrategy: PassportStrategy = {
  name: "github",
  strategy: githubStrategy,
};

export default passportGitHubStrategy;
