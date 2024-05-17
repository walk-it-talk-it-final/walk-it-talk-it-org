const passport = require("passport");
const User = require("../models/user");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

module.exports = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_KEY,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: "/api/auth/google/callback",
        returnURL: "http://localhost:8000",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const exUser = await User.findOne({
            where: {
              snsId: profile.id,
              provider: "google",
            },
          });
          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = await User.create({
              nickname: profile.displayName,
              snsId: profile.id,
              provider: "google",
            });
            done(null, newUser);
          }
        } catch (err) {
          console.error(err);
          done(err);
        }
      }
    )
  );
};
