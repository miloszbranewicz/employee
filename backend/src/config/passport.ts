import { TokenPayload } from "../types";
import passport from "passport";
import { Strategy as JwtStrategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import { db } from "./db";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const JWTStrategy = new JwtStrategy({ ...options }, async function (
  jwt_payload,
  done
) {
  try {
    const user = await db.employee.findUnique({
      where: {
        id: jwt_payload.sub,
      },
    });
    done(null, jwt_payload);
    if (user) {
      return done(null, user);
    } else {
      return done(new Error("User not found"), false);
    }
  } catch (error) {
    return done(null, false);
  }
});

export const passportLocal = passport.use(JWTStrategy);
