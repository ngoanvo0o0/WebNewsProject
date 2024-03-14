import { Router } from "express";
import passport from "passport";
import { createUser, getUser } from "../repositories/user.repository";
import { Users } from "../models/Users";
import { CustomError } from "../errorHandler";
import { generateUserSecret } from "../services/authentication.service";

export const routes = Router();
const FINISH_SSO_URL = process.env.FINISH_SSO_URL || "";

routes.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

routes.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/error" }),
  async function (req, res) {
    const profile = req.user as any;
    const id = profile.id;
    const email = profile.email;

    let user = await getUser({ where: { googleId: id, isDeleted: false } });
    if (!user) {
      if (!email) throw new CustomError("Invalid email", 400);

      user = await getUser({ where: { email: email } });
      if (user) {
        await user.update({ googleId: id, isDeleted: false });
      } else {
        const newUser = {
          email: email,
          name: profile.displayName,
          googleId: id,
        } as Users;
        user = await createUser(newUser);
      }
    }

    const secretToken = await generateUserSecret(user.id);
    res.redirect(
      `${FINISH_SSO_URL}?token=${secretToken.token}&id=${secretToken.id}`
    );
  }
);

routes.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["public_profile", "email"],
  })
);

routes.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/error",
  }),
  async function (req, res) {
    const profile = req.user as any;
    const id = profile.id;
    const email = profile.emails?.[0].value;

    let user = await getUser({ where: { facebookId: id, isDeleted: false } });
    if (!user) {
      if (!email) throw new CustomError("Invalid email", 400);

      user = await getUser({ where: { email: email } });
      if (user) {
        await user.update({ facebookId: id, isDeleted: false });
      } else {
        const newUser = {
          email: email,
          name: profile.displayName || "",
          facebookId: id,
        } as Users;
        user = await createUser(newUser);
      }
    }

    const secretToken = await generateUserSecret(user.id);
    res.redirect(
      `${FINISH_SSO_URL}?token=${secretToken.token}&id=${secretToken.id}`
    );
  }
);
