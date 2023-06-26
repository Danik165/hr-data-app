const generateUniqueId = require("generate-unique-id");


// example 2
const generateOtp = () => {
  const otp = generateUniqueId({
    length: 6,
    useLetters: false,
  });

  const id = generateUniqueId({
    length: 32,
  });

  return { otp: otp, uniqueId: id };
};

module.exports.generateOtp = generateOtp;
