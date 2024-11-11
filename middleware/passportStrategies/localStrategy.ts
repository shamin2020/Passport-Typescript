import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import {
  getUserByEmailIdAndPassword,
  getUserById,
} from "../../controllers/userController";
import { PassportStrategy } from "../../interfaces/index";

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (
    email: string,
    password: string,
    done: (
      error: any,
      user?: Express.User | false,
      options?: { message: string }
    ) => void
  ) => {
    const user = getUserByEmailIdAndPassword(email, password);
    if (!user) {
      // User not found
      return done(null, false, {
        message: `Couldn't find user with email: ${email}`,
      });
    }

    const validUser = getUserByEmailIdAndPassword(email, password);
    if (!validUser) {
      // Incorrect password
      return done(null, false, { message: "Password is incorrect" });
    }

    // Successful login
    return done(null, validUser);
  }
);

/* FIXED */
passport.serializeUser(function (
  user: Express.User,
  done: (err: any, id?: number) => void
) {
  done(null, user.id);
});

/* FIXED */
passport.deserializeUser(function (
  id: number,
  done: (err: any, user?: Express.User | null) => void
) {
  const user = getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

const passportLocalStrategy: PassportStrategy = {
  name: "local",
  strategy: localStrategy,
};

export default passportLocalStrategy;
