const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_URL);

async function verifyID(token) {
  return client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_URL
  });
}

module.exports = { verifyID };
