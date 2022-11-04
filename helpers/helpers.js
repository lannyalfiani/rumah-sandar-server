const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secretKey="Rahasia"


const createHashPassword = (password) => bcrypt.hashSync(password);
const compareHashWithPassword = (password, hash) =>
  bcrypt.compareSync(password, hash);

const signPayloadToToken = (payload) => jwt.sign(payload, secretKey);
const verifyTokenToPayload = (token) => jwt.verify(token, secretKey);


module.exports = {createHashPassword, compareHashWithPassword, signPayloadToToken, verifyTokenToPayload}
