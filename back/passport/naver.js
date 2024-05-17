const passport = require("passport");
const User = require("../models/user");
const naverStrategy = require("passport-naver").Strategy;

module.exports = () => {
  passport.use(
    new naverStrategy(
      {
        clientID: process.env.NAVER_KEY,
        clientSecret: process.env.NAVER_SECRET,
        callbackURL: "/api/auth/naver/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const exUser = await User.findOne({
            where: {
              snsId: profile.id,
              provider: "naver",
            },
          });
          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = await User.create({
              nickname: profile.displayName,
              snsId: profile.id,
              provider: "naver",
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
