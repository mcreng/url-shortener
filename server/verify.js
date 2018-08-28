const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client("259902397583-g94c052uvh0urlk2r83a711icpuuuqo8.apps.googleusercontent.com");

async function verifyID(token) {
  return client.verifyIdToken({
      idToken: token,
      audience: "259902397583-g94c052uvh0urlk2r83a711icpuuuqo8.apps.googleusercontent.com"
  });
}

module.exports = { verifyID }