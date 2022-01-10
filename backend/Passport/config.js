import passportLocal from "passport-local";
import Passenger from "../Models/Passenger.js";
import { validatePassword } from "../Utilities/hashing.js";
import passportJWT from "passport-jwt";
import dotenv from "dotenv";
import passport from "passport";
import { checkIfUserExists } from "../Services/passenger.js";

const dot = dotenv.config();

const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.TOKEN_SECRET;

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        if (checkIfUserExists(email)) {
          return done(null, false, { message: "passenger already exists" });
        }

        const passenger = await Passenger.create({ email, password });

        return done(null, passenger);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const passenger = await Passenger.findOne({ email });

        if (!passenger) {
          return done(null, false, { message: "passenger not found" });
        }

        const validate = await validatePassword(password, passenger.password);

        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }

        return done(null, passenger, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JwtStrategy(options, async (jwt_payload, done) => {
    // We will assign the `sub` property on the JWT to the database ID of user
    await Passenger.findById(jwt_payload._id, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

export const auth = passport.authenticate("jwt", {
  session: false,
});

export const signUp = passport.authenticate("signup", { session: false });
