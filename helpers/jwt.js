const expressJwt = require("express-jwt");

function authJwt() {
  const secret = process.env.secret;
  const api = process.env.API_URL;
  return expressJwt({
    secret,
    algorithms: ["HS256"],
    userProperty: "auth",
    isRevoked: isRevoked,
  }).unless({
    path: [
      { url: /\/public\/uploads(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/products(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/categories(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/orders(.*)/, methods: ["GET", "OPTIONS", "POST"] },
      `${api}/users/login`,
      `${api}/users/register`,
      // { url: /(.*)/ },
    ],
  });
}

async function isRevoked(req, payload, done) {
  if (!payload.isAdmin) {
    done(null, true);
  }

  done();
}

module.exports = authJwt;
