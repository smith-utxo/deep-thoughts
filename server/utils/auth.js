const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhhh';

const expiration = '2h';

module.exports = {

  // the signtoken function expects a user object and will add that user's username, email, and id properties to the token. Expiration dates are optional and a secret to sign the token with. The secret has nothing to do with encoding, the secret merely enables the server to verify whether it recognizes this token. Note, you should store your secret somewhere other than a javascript file, like an environment variable. 
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // separate "Bearer" from "<tokenvalue>"
    if (req.headers.authorization) {
      token = token
        .split(' ')
        .pop()
        .trim();
    }

    // if no token, return request object as is
    if (!token) {
      return req;
    }

    try {
      // decode and attach user data to request object
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    // return updated request object
    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  }
};
