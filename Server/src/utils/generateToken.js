import jwt from "jsonwebtoken";

export const GenerateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  const jwtToken = token;
  return jwtToken;
};
