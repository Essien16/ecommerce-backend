const bcrypt = require("bcryptjs");
const passport = require("passport");
JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require("passport-jwt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
  algorithim: ['HS256']
};

const loginCheck = passport => {
  passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
      User.findOne({_id: jwt_payload._id})
          .then((user) => {
            if (user) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          })
          .catch(err => done(err, null));
    })
  )
};
module.exports = {
  loginCheck,
};