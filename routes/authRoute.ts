import express from "express";
import passport from "passport";
import { forwardAuthenticated, isAdmin } from "../middleware/checkAuth";
import { Response, Request } from "express";
import { activeSessionIds } from "../app";
import { Session } from "express-session";

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => {
  const messages = req.session.messages || [];
  req.session.messages = [];
  res.render("login", { messages });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    /* FIXED */
    failureMessage: true,
  })
);

router.get("/admin", isAdmin, (req: Request, res: Response) => {
  res.render("admin", {
    sessions: activeSessionIds,
    user: req.user,
  });
});

router.post("/admin", isAdmin, (req: Request, res: Response) => {
  const { sessionId } = req.body;
  console.log("Received session ID for revocation:", sessionId); // Debugging line

  req.sessionStore.get(sessionId, (err, session) => {
    if (err) {
      console.error("Error retrieving session:", err); // Debugging line
      return res.status(500).send("Failed to retrieve session");
    }
    if (!session) {
      return res.status(404).send("Session not found");
    }

    req.sessionStore.destroy(sessionId, (err) => {
      if (err) {
        console.error("Error destroying session:", err); // Debugging line
        return res.status(500).send("Failed to destroy session");
      }
      console.log("Session successfully destroyed"); // Debugging line
      res.redirect("/admin");
    });
  });
});

// GitHub login route
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// GitHub callback route
router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    failureMessage: "GitHub authentication failed. Please try again",
  })
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect("/auth/login");
});

export default router;
