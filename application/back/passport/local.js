const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'loginId',
    passwordField: 'password',
  }, async (loginId, password, done) => {
    try {
      const user = await User.findOne({
        where: { loginId },
      });
      if (!user) {
        done(null, false, { reason: '존재하지 않는 ID입니다.' });
      }
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        return done(null, user);
      }
      return done(null, false, { reason: '비밀번호가 일치하지 않습니다.' });
    } catch (error) {
      console.error(error);
      return done(error);
    }
  }));
};
