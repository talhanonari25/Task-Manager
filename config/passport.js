const { Strategy, ExtractJwt } = require('passport-jwt');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const keys = { secretOrKey: 'Id5Lzy6koCe7zWedG6BNr579a/XrSGjb5/iYj/t8s7fz1NGj3CGovzy+dlBYVDV4' };

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = (passport) => {
  passport.use(
    new Strategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => console.error(err));
    })
  );
};
