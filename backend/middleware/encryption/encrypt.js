const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const hashedpwd = await bcrypt.hash(password, 10);
  return hashedpwd;
};

const verifyPassword = async (password, hash) => {
  const result = await bcrypt.compare(password, hash);
  return result;
};

module.exports.hashPassword = hashPassword;
module.exports.verifyPassword = verifyPassword;
